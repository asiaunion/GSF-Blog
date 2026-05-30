import React, { useState, useEffect } from "react";

export type Revision = {
  id: string;
  translation_id: string;
  body_md_snapshot: string;
  edited_by: string;
  created_at: string;
};

interface RevisionPanelProps {
  postId: string;
  activeLang: "ko" | "en" | "ja";
  onRestore: (bodyMd: string) => void;
  triggerRefresh: number; // 부모 컴포넌트에서 강제 리프레시하기 위한 카운터
}

export default function RevisionPanel({ postId, activeLang, onRestore, triggerRefresh }: RevisionPanelProps) {
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchRevisions = async () => {
    if (!postId) return;
    try {
      setLoading(true);
      const res = await fetch(`/admin/api/posts/${postId}/revisions/`);
      if (!res.ok) throw new Error("이력 조회 실패");
      const data = await res.json();
      
      // 현재 선택된 언어의 translation_id에 맵핑되는 이력만 필터링하거나,
      // API 단에서 필터링해서 가져옴. (여기서는 안전하게 전체 가져온 후 컴포넌트 단에서도 체크 가능)
      setRevisions(data);
    } catch (err) {
      console.error("이력 불러오기 에러:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchRevisions();
    }
  }, [isOpen, postId, activeLang, triggerRefresh]);

  // 날짜 포맷팅 헬퍼
  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    } catch {
      return isoString;
    }
  };

  return (
    <div className="relative">
      {/* 슬라이드 온/오프 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs font-semibold rounded-xl border border-white/5 transition-colors cursor-pointer"
      >
        <span>🕒</span> {isOpen ? "이력 닫기" : "수정 이력"}
      </button>

      {/* 이력 사이드바 (오버레이가 아닌 우측 밀어내기/플로팅 형태) */}
      {isOpen && (
        <div className="absolute right-0 top-11 z-30 w-80 max-h-[500px] bg-slate-900/95 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-md overflow-y-auto animate-scaleUp">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
            <h3 className="text-sm font-bold text-gray-200">역사 기록 ({activeLang.toUpperCase()})</h3>
            <button
              onClick={fetchRevisions}
              disabled={loading}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
            >
              {loading ? "갱신 중..." : "새로고침"}
            </button>
          </div>

          {loading ? (
            <div className="py-10 text-center text-xs text-gray-500 animate-pulse">
              이력 불러오는 중...
            </div>
          ) : revisions.length === 0 ? (
            <div className="py-10 text-center text-xs text-gray-500">
              저장된 이전 버전이 없습니다.
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {revisions.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 bg-slate-950/60 border border-white/5 hover:border-emerald-500/20 rounded-xl transition-all duration-200 group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-gray-400 font-medium">
                      👤 {rev.edited_by}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {formatDate(rev.created_at)}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 line-clamp-2 bg-slate-900/40 p-1.5 rounded border border-white/5 font-mono mb-2">
                    {rev.body_md_snapshot.substring(0, 100)}...
                  </p>
                  <button
                    onClick={() => {
                      if (confirm("이 버전으로 본문 내용을 복원하시겠습니까? 현재 작성 중인 글은 이력으로 백업된 후 덮어써집니다.")) {
                        onRestore(rev.body_md_snapshot);
                      }
                    }}
                    className="w-full py-1.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 text-[10px] font-bold rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    이 시점으로 복원
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
