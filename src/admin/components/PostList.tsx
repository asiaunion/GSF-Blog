import React, { useState, useEffect } from "react";

export type PostTranslation = {
  title: string;
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
  displayTitle: string;
  isDbOnly: boolean;
  isGitOnly: boolean;
  gitLangs: string[];
  gitShas: Record<string, string>;
  isSynced: boolean;
};

interface PostListProps {
  defaultStatusFilter?: string;
}

export default function PostList({ defaultStatusFilter = "all" }: PostListProps = {}) {
  const [posts, setPosts] = useState<MergedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 필터 및 검색 상태
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>(defaultStatusFilter);

  // 새 포스트 작성 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSlug, setNewSlug] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<MergedPost["category"]>("investment");
  const [newLang, setNewLang] = useState<"ko" | "en" | "ja">("ko");
  const [modalError, setModalError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  // 데이터 fetch
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/admin/api/posts/");
      if (!res.ok) {
        throw new Error(`포스트 목록을 불러오는 데 실패했습니다 (${res.status})`);
      }
      const data = await res.json();
      setPosts(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "알 수 없는 에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 포스트 생성 처리
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlug || !newTitle) {
      setModalError("슬러그와 제목은 필수 입력 항목입니다.");
      return;
    }

    // 슬러그 포맷 검증 (소문자, 숫자, 하이픈)
    if (!/^[a-z0-9-]+$/.test(newSlug)) {
      setModalError("슬러그는 소문자, 숫자, 하이픈(-)만 사용할 수 있습니다.");
      return;
    }

    try {
      setCreating(true);
      setModalError(null);
      const res = await fetch("/admin/api/posts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: newSlug,
          title: newTitle,
          category: newCategory,
          lang: newLang,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "포스트 생성 실패");
      }

      const createdPost = await res.json();
      
      // 모달 초기화 및 닫기
      setIsModalOpen(false);
      setNewSlug("");
      setNewTitle("");
      setNewCategory("investment");
      setNewLang("ko");
      
      // 글 편집 페이지로 즉시 이동
      window.location.href = `/admin/posts/${createdPost.id}/`;
    } catch (err: any) {
      setModalError(err.message || "새 포스트 생성 중 에러 발생");
    } finally {
      setCreating(false);
    }
  };

  // 필터링된 포스트 목록
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.slug.toLowerCase().includes(search.toLowerCase()) ||
      post.displayTitle.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || post.category === categoryFilter;

    let matchesStatus = true;
    if (statusFilter !== "all") {
      if (statusFilter === "db-draft") {
        matchesStatus = post.isDbOnly;
      } else if (statusFilter === "git-only") {
        matchesStatus = post.isGitOnly;
      } else if (statusFilter === "unsynced") {
        matchesStatus = !post.isSynced && !post.isDbOnly && !post.isGitOnly;
      } else {
        matchesStatus = post.status === statusFilter;
      }
    }

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* 타이틀 및 헤더 영역 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-accent">
            📝 포스트 라이브러리
          </h1>
          <p className="opacity-80 mt-2 text-sm">
            글 목록을 한눈에 관리할 수 있어요.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 hover:text-foreground font-medium rounded-xl shadow-emerald-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <span className="text-lg">+</span> 새 글 쓰기
        </button>
      </div>

      {/* 필터 및 검색 바 */}
      <div className="bg-card-bg border border-border rounded-2xl p-4 md:p-6 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-1/3 relative">
          <input
            type="text"
            placeholder="제목 또는 주소 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-foreground placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          />
          <span className="absolute left-3.5 top-3.5 opacity-70 text-sm">🔍</span>
        </div>

        <div className="flex flex-wrap w-full md:w-auto gap-4 items-center">
          {/* 카테고리 필터 */}
          <div className="flex items-center gap-2">
            <span className="text-xs opacity-70 whitespace-nowrap">분류</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-xl text-sm opacity-90 focus:outline-none focus:border-accent transition-colors"
            >
              <option value="all">전체</option>
              <option value="investment">📈 투자</option>
              <option value="safety">🛡️ 안전</option>
              <option value="life">🌱 라이프</option>
              <option value="local">🇯🇵 로컬</option>
              <option value="essay">✍️ 에세이</option>
            </select>
          </div>

          {/* 상태 필터 */}
          <div className="flex items-center gap-2">
            <span className="text-xs opacity-70 whitespace-nowrap">상태</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-xl text-sm opacity-90 focus:outline-none focus:border-accent transition-colors"
            >
              <option value="all">전체</option>
              <option value="db-draft">📁 작성 중</option>
              <option value="git-only">🌍 발행됨</option>
              <option value="unsynced">⚠️ 수정됨</option>
              <option value="published">✅ 발행 완료</option>
              <option value="draft">임시 저장</option>
              <option value="editing">편집 중</option>
              <option value="review">검토 요청</option>
            </select>
          </div>
        </div>
      </div>

      {/* 로딩 / 에러 / 리스트 영역 */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-card-bg border border-border rounded-2xl backdrop-blur-sm">
          <div className="w-10 h-10 border-4 border-accent border-t-accent rounded-full animate-spin"></div>
          <p className="opacity-80 mt-4 text-sm animate-pulse">글 목록을 병합하여 불러오는 중...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-950/20 border border-red-500/20 rounded-2xl text-center">
          <span className="text-3xl">⚠️</span>
          <h3 className="text-red-400 font-semibold mt-2">에러가 발생했습니다</h3>
          <p className="text-red-300/80 text-sm mt-1">{error}</p>
          <button
            onClick={fetchPosts}
            className="mt-4 px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-200 border border-red-500/20 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            다시 시도
          </button>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="py-20 text-center bg-card-bg border border-border rounded-2xl">
          <span className="text-4xl text-gray-600 block">📭</span>
          <p className="opacity-70 mt-4 text-sm">일치하는 포스트가 없습니다.</p>
        </div>
      ) : (
        <div className="bg-card-bg border border-border rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-background opacity-80 text-xs font-semibold uppercase tracking-wider">
                  <th className="px-6 py-4">상태</th>
                  <th className="px-6 py-4">제목</th>
                  <th className="px-6 py-4">카테고리</th>
                  <th className="px-6 py-4">번역</th>
                  <th className="px-6 py-4 text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredPosts.map((post) => {
                  // 동기화 배지 계산
                  let badge = (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-accent text-background text-accent border border-accent">
                      ● 발행됨
                    </span>
                  );

                  if (post.isDbOnly) {
                    badge = (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 animate-pulse">
                        ● 작성 중
                      </span>
                    );
                  } else if (post.isGitOnly) {
                    badge = (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-accent border border-cyan-500/20">
                        ● 발행됨
                      </span>
                    );
                  } else if (!post.isSynced) {
                    badge = (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        ▲ 수정됨
                      </span>
                    );
                  } else if (post.status === "editing" || post.status === "review") {
                    badge = (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        ● 편집 중
                      </span>
                    );
                  }

                  // 카테고리 이모지 변환
                  const categoryEmoji: Record<string, string> = {
                    investment: "📈",
                    safety: "🛡️",
                    life: "🌱",
                    local: "🇯🇵",
                    essay: "✍️",
                  };

                  return (
                    <tr
                      key={post.id}
                      className="hover:bg-foreground/[0.03] transition-colors group"
                    >
                      <td className="px-6 py-4.5 whitespace-nowrap">{badge}</td>
                      <td className="px-6 py-4.5">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                            {post.displayTitle}
                          </span>
                          <span className="text-xs opacity-70 font-mono tracking-tight select-all">
                            /{post.slug}/
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <span className="text-xs opacity-90 font-medium">
                          {categoryEmoji[post.category] || "📂"}{" "}
                          <span className="capitalize">{post.category}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {/* DB 상 지원 언어 뱃지 */}
                          {["ko", "en", "ja"].map((l) => {
                            const isGitHas = post.gitLangs.includes(l);
                            const isDbHas = !!post.translations[l]?.title;
                            
                            // 색상 매핑
                            let classes = "text-[10px] px-1.5 py-0.5 font-bold rounded-md border ";
                            if (isGitHas && isDbHas) {
                              classes += "bg-accent text-background text-accent border-accent";
                            } else if (isGitHas) {
                              classes += "bg-cyan-500/10 text-accent border-cyan-500/20";
                            } else if (isDbHas) {
                              classes += "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
                            } else {
                              classes += "bg-card-bg text-gray-600 border-transparent";
                            }

                            return (
                              <span key={l} className={classes} title={`${l.toUpperCase()} 번역본`}>
                                {l.toUpperCase()}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap text-right">
                        {post.isGitOnly ? (
                          <button
                            onClick={async () => {
                              try {
                                if (!confirm("이 글을 가져와서 편집할까요?")) return;
                                const res = await fetch(`/admin/api/posts/${post.slug}/import/`, {
                                  method: "POST"
                                });
                                if (!res.ok) throw new Error("가져오기 실패");
                                const imported = await res.json();
                                window.location.href = `/admin/posts/${imported.id}/`;
                              } catch (err: any) {
                                alert(err.message || "가져오기 실패");
                              }
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-accent border border-cyan-500/20 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                          >
                            ⬇️ 가져오기
                          </button>
                        ) : (
                          <a
                            href={`/admin/posts/${post.id}/`}
                            className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-accent text-background hover:bg-accent text-background text-accent border border-accent text-xs font-semibold rounded-lg transition-all duration-200 hover:scale-[1.03] cursor-pointer"
                          >
                            📝 편집
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 새 포스트 작성 모달 (Glassmorphic Modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fadeIn">
          <div className="w-full max-w-lg bg-card-bg border border-border rounded-2xl overflow-hidden shadow-2xl animate-scaleUp">
            <div className="px-6 py-4.5 bg-background border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">새 포스트 작성</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="opacity-70 hover:opacity-90 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleCreatePost} className="p-6 flex flex-col gap-4">
              {modalError && (
                <div className="px-4 py-2.5 bg-red-950/40 border border-red-500/20 rounded-xl text-xs text-red-300">
                  ⚠️ {modalError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold opacity-80 uppercase tracking-wider mb-1.5">
                  포스트 제목 (대표 번역용)
                </label>
                <input
                  type="text"
                  placeholder="예: 서울-도쿄 25년 부동산 트렌드 비교"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-foreground placeholder-gray-600 focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold opacity-80 uppercase tracking-wider mb-1.5">
                  웹 주소 (영문)
                </label>
                <input
                  type="text"
                  placeholder="예: seoul-tokyo-real-estate-trends"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-foreground placeholder-gray-600 focus:outline-none focus:border-accent transition-colors font-mono text-sm"
                  required
                />
                <span className="text-[10px] opacity-70 mt-1 block">
                  소문자, 숫자, 하이픈(-)만 허용됩니다. (공백 입력 시 자동으로 -로 변환)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold opacity-80 uppercase tracking-wider mb-1.5">
                    기본 언어
                  </label>
                  <select
                    value={newLang}
                    onChange={(e) => setNewLang(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm opacity-90 focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="ko">한국어 (KO)</option>
                    <option value="en">영어 (EN)</option>
                    <option value="ja">일본어 (JA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold opacity-80 uppercase tracking-wider mb-1.5">
                    카테고리
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm opacity-90 focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="investment">📈 투자</option>
                    <option value="safety">🛡️ 안전</option>
                    <option value="life">🌱 라이프</option>
                    <option value="local">🇯🇵 로컬</option>
                    <option value="essay">✍️ 에세이</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex gap-3 justify-end border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-card-bg hover:bg-muted opacity-90 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2.5 hover:text-foreground text-xs font-semibold rounded-xl transition-all duration-200 shadow-emerald-950/20 cursor-pointer"
                >
                  {creating ? "포스트 생성 중..." : "글 작성 시작"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
