import React, { useState, useEffect, useRef } from "react";
import RevisionPanel from "./RevisionPanel";
import PreviewPane from "./PreviewPane";
import FrontmatterEditor from "./FrontmatterEditor";
import ImageUploader from "./ImageUploader";

export type PostTranslation = {
  id?: string;
  title: string;
  body_md: string;
  frontmatter?: Record<string, any>;
  updated_at?: string;
};

export type MergedPost = {
  id: string;
  slug: string;
  category: "investment" | "safety" | "life" | "local" | "essay";
  tags: string[];
  status: "memo" | "draft" | "editing" | "review" | "published";
  author: string;
  git_sha: string | null;
  created_at: string;
  updated_at: string;
  translations: Record<string, PostTranslation>;
};

// Milkdown Crepe 스타일 및 테마 명시적 임포트
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";

interface EditorProps {
  id: string;
}

export default function Editor({ id }: EditorProps) {
  const [post, setPost] = useState<MergedPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 현재 편집 중인 언어 탭 ("ko" | "en" | "ja")
  const [activeLang, setActiveLang] = useState<"ko" | "en" | "ja">("ko");

  // 실시간 에디터 입력 상태 (언어별)
  const [localTitles, setLocalTitles] = useState<Record<string, string>>({ ko: "", en: "", ja: "" });
  const [localMarkdown, setLocalMarkdown] = useState<Record<string, string>>({ ko: "", en: "", ja: "" });

  // 프론트매터/메타데이터 로컬 편집 상태
  const [metaSlug, setMetaSlug] = useState("");
  const [metaCategory, setMetaCategory] = useState<MergedPost["category"]>("investment");
  const [metaTags, setMetaTags] = useState<string[]>([]);

  // 상태 동기화 및 자동저장 관리 상태
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"Ready" | "Saving..." | "Saved" | "Error">("Ready");
  const [revisionTrigger, setRevisionTrigger] = useState(0); // 이력 갱신용 강제 트리거

  // Crepe 컨테이너 레퍼런스
  const containerRef = useRef<HTMLDivElement>(null);
  const crepeRef = useRef<any>(null);

  // 1. 상세 정보 불러오기
  const fetchPostDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/admin/api/posts/${id}/`);
      if (!res.ok) {
        throw new Error(`포스트 정보를 불러오지 못했습니다 (${res.status})`);
      }
      const data: MergedPost = await res.json();
      
      setPost(data);
      setMetaSlug(data.slug);
      setMetaCategory(data.category);
      setMetaTags(data.tags);

      // 언어별 본문 및 제목 매핑
      const titles: Record<string, string> = { ko: "", en: "", ja: "" };
      const markdowns: Record<string, string> = { ko: "", en: "", ja: "" };
      
      ["ko", "en", "ja"].forEach((l) => {
        titles[l] = data.translations[l]?.title || "";
        markdowns[l] = data.translations[l]?.body_md || "";
      });

      setLocalTitles(titles);
      setLocalMarkdown(markdowns);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "상세 로드 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  // 2. Milkdown Crepe 마운트 & 리마운트 로직
  // activeLang이 바뀌거나 post가 로드될 때 에디터를 재생성(Re-mount)하여 상태 꼬임 방지
  useEffect(() => {
    if (!containerRef.current || !post) return;

    let activeCrepe: any = null;

    async function initCrepe() {
      try {
        const { Crepe } = await import("@milkdown/crepe");
        
        // 이전 에디터 내용 비우기
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }

        const initialContent = localMarkdown[activeLang] || "";

        activeCrepe = new Crepe({
          root: containerRef.current,
          defaultValue: initialContent,
          features: {
            // 필요에 따라 Crepe 기능 켜고 끄기 설정 가능
          }
        });

        await activeCrepe.create();
        crepeRef.current = activeCrepe;
      } catch (e) {
        console.error("Crepe 초기화 실패:", e);
      }
    }

    initCrepe();

    return () => {
      if (activeCrepe) {
        try {
          activeCrepe.destroy();
        } catch (e) {
          // destroy 중 예외 방지
        }
      }
    };
  }, [activeLang, post?.id]);

  // 3. 에디터 텍스트 Polling 동기화 (1초 주기)
  // 에디터 본문 타이핑 시, 로컬 Markdown 상태를 동적 추출해 감지
  useEffect(() => {
    const checkTimer = setInterval(() => {
      if (crepeRef.current && post) {
        try {
          const editorText = crepeRef.current.getMarkdown() || "";
          if (editorText !== localMarkdown[activeLang]) {
            setLocalMarkdown((prev) => ({
              ...prev,
              [activeLang]: editorText,
            }));
            setIsDirty(true);
            setSaveStatus("Saving...");
          }
        } catch (e) {
          // getMarkdown API 로드 중 예외 처리 방지
        }
      }
    }, 1000);

    return () => clearInterval(checkTimer);
  }, [activeLang, post, localMarkdown]);

  // 4. 2초 Debounce 자동저장 기능 연동
  useEffect(() => {
    if (!isDirty || !post) return;

    const saveTimer = setTimeout(async () => {
      try {
        const res = await fetch(`/admin/api/posts/${post.id}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: metaSlug,
            category: metaCategory,
            tags: metaTags,
            status: post.status, // 현재 임시 상태 유지
            lang: activeLang,
            title: localTitles[activeLang] || "",
            body_md: localMarkdown[activeLang] || "",
          }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "저장 실패");
        }

        setIsDirty(false);
        setSaveStatus("Saved");
        setRevisionTrigger((prev) => prev + 1); // 이력 패널 목록 리프레시 강제 트리거
      } catch (err: any) {
        console.error(err);
        setSaveStatus("Error");
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [localMarkdown, localTitles, metaSlug, metaCategory, metaTags, isDirty, post, activeLang]);

  // 5. 이력 패널 복원 콜백 핸들링
  const handleRestore = (bodyMd: string) => {
    setLocalMarkdown((prev) => ({
      ...prev,
      [activeLang]: bodyMd,
    }));
    setIsDirty(true);
    setSaveStatus("Saving...");
    
    // 에디터 뷰 업데이트
    if (crepeRef.current) {
      try {
        // Crepe를 안전하게 리마운트하여 본문 교체
        crepeRef.current.destroy();
      } catch (e) {}
      
      // useEffect가 활성 언어나 post ID 변경 시 재마운트하므로, 
      // 강제 강도 조절을 위해 post 객체 상태를 리셋 후 재대입하거나 
      // 또는 컨테이너 DOM을 직접 조작해 Crepe 인스턴스를 재기동
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        import("@milkdown/crepe").then(async ({ Crepe }) => {
          const activeCrepe = new Crepe({
            root: containerRef.current,
            defaultValue: bodyMd,
          });
          await activeCrepe.create();
          crepeRef.current = activeCrepe;
        });
      }
    }
  };


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-gray-400">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-sm animate-pulse">포스트 정보 및 Milkdown 에디터 로드 중...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-xl mx-auto my-20 p-6 bg-red-950/20 border border-red-500/20 rounded-2xl text-center">
        <span className="text-4xl">⚠️</span>
        <h2 className="text-red-400 font-bold mt-3">불러오지 못했습니다</h2>
        <p className="text-red-300/80 text-sm mt-2">{error || "포스트 데이터가 존재하지 않습니다."}</p>
        <a
          href="/admin/posts/"
          className="mt-6 inline-block px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs font-semibold rounded-xl transition-colors"
        >
          목록으로 돌아가기
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 py-6">
      {/* 1. 상단 컨트롤 바 */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <a
            href="/admin/posts/"
            className="p-2 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-xl border border-white/5 text-sm transition-colors"
            title="목록으로"
          >
            ←
          </a>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 font-mono">
              Post Editor
            </span>
            <h1 className="text-xl font-bold text-gray-100 line-clamp-1">{localTitles[activeLang] || post.slug}</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* 자동저장 배지 */}
          <div className="flex items-center">
            {saveStatus === "Saving..." && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
                ⏳ 저장 중...
              </span>
            )}
            {saveStatus === "Saved" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ● 자동 저장 완료
              </span>
            )}
            {saveStatus === "Error" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                ▲ 저장 실패 (다시 시도)
              </span>
            )}
            {saveStatus === "Ready" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-800 text-gray-400 border border-transparent">
                ● 편집 대기 중
              </span>
            )}
          </div>

          {/* 세션 2-C 수정 이력 연동 */}
          <RevisionPanel
            postId={post.id}
            activeLang={activeLang}
            onRestore={handleRestore}
            triggerRefresh={revisionTrigger}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* 2. 에디터 및 미리보기 영역 (좌측 9열) */}
        <div className="xl:col-span-9 flex flex-col gap-4">
          {/* 다국어 언어 탭 */}
          <div className="flex border-b border-white/5 bg-slate-900/40 p-1.5 rounded-xl gap-1">
            {(["ko", "en", "ja"] as const).map((l) => (
              <button
                key={l}
                onClick={() => {
                  // 탭 변경 시 현재 에디터 내용 추출해서 최종 업데이트 후 변경
                  if (crepeRef.current) {
                    try {
                      const txt = crepeRef.current.getMarkdown();
                      setLocalMarkdown((prev) => ({ ...prev, [activeLang]: txt }));
                    } catch (e) {}
                  }
                  setActiveLang(l);
                }}
                className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                  activeLang === l
                    ? "bg-gradient-to-r from-emerald-500/15 to-teal-500/15 text-emerald-400 border border-emerald-500/25 shadow-inner"
                    : "text-gray-400 hover:text-gray-200 border border-transparent"
                }`}
              >
                {l === "ko" ? "🇰🇷 한국어" : l === "en" ? "🇺🇸 영어" : "🇯🇵 일본어"}
              </button>
            ))}
          </div>

          {/* 제목 수정 입력 폼 */}
          <div className="bg-slate-900/20 border border-white/5 p-4 rounded-2xl backdrop-blur-sm">
            <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1.5">
              포스트 제목 ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              placeholder={`${activeLang.toUpperCase()} 제목을 입력하세요...`}
              value={localTitles[activeLang]}
              onChange={(e) => {
                setLocalTitles((prev) => ({ ...prev, [activeLang]: e.target.value }));
                setIsDirty(true);
                setSaveStatus("Saving...");
              }}
              className="w-full px-4 py-3 bg-slate-950/60 border border-white/10 rounded-xl text-gray-200 placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors text-base font-semibold"
            />
          </div>

          {/* Split View: 에디터 ↔ 미리보기 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* WYSIWYG Milkdown 에디터 컨테이너 */}
            <div className="bg-slate-900/20 border border-white/5 rounded-2xl backdrop-blur-sm p-4 md:p-6 h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-4 shrink-0">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 select-none">
                  마크다운 에디터 본문
                </label>
                <ImageUploader 
                  postId={post.id} 
                  onUploadSuccess={(url) => {
                    const txt = crepeRef.current?.getMarkdown() || localMarkdown[activeLang] || "";
                    const newTxt = txt + `\n\n![업로드된 이미지](${url})\n\n`;
                    handleRestore(newTxt);
                  }}
                />
              </div>
              
              {/* Milkdown Crepe 에디터 마운트 포인트 */}
              <div 
                ref={containerRef} 
                className="prose prose-invert max-w-none focus:outline-none overflow-y-auto flex-1 pr-2 custom-scrollbar"
              ></div>
            </div>

            {/* 라이브 미리보기 컴포넌트 */}
            <PreviewPane markdown={localMarkdown[activeLang]} />
          </div>
        </div>

        {/* 3. 우측 프론트매터 설정 폼 (우측 3열) */}
        <div className="xl:col-span-3 flex flex-col gap-6">
          <FrontmatterEditor
            slug={metaSlug}
            category={metaCategory}
            tags={metaTags}
            onChange={(data) => {
              setMetaSlug(data.slug);
              setMetaCategory(data.category);
              setMetaTags(data.tags);
              setIsDirty(true);
              setSaveStatus("Saving...");
            }}
          />

          {/* 작가 정보 카드 */}
          <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-5 backdrop-blur-sm text-xs text-gray-400">
            <h4 className="font-bold text-gray-300 mb-2 select-none">📌 포스트 상태 정보</h4>
            <div className="flex flex-col gap-1.5 font-mono text-[10px] leading-tight">
              <div>작성자: <span className="text-gray-200">{post.author}</span></div>
              <div>작성일: <span className="text-gray-200">{new Date(post.created_at).toLocaleDateString()}</span></div>
              <div>수정일: <span className="text-gray-200">{new Date(post.updated_at).toLocaleDateString()}</span></div>
              <div className="truncate">Git SHA: <span className="text-gray-200">{post.git_sha || "미발행 (드래프트)"}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
