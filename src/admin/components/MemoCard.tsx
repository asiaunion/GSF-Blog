import React, { useState } from "react";

export type Memo = {
  id: string;
  content: string;
  status: "pending" | "expanded" | "archived";
  created_at: string;
};

interface MemoCardProps {
  memo: Memo;
  onExpandSuccess?: (postId: string) => void;
}

export default function MemoCard({ memo, onExpandSuccess }: MemoCardProps) {
  const [expanding, setExpanding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExpand = async () => {
    if (!confirm("이 메모를 바탕으로 초안을 생성하시겠습니까? (AI 처리 시간이 약 10~30초 소요될 수 있습니다)")) return;
    
    setExpanding(true);
    setError(null);
    try {
      const res = await fetch(`/admin/api/memos/${memo.id}/expand/`, {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "살붙이기 실패");
      }
      const data = await res.json();
      if (onExpandSuccess && data.postId) {
        onExpandSuccess(data.postId);
      }
    } catch (err: any) {
      setError(err.message || "살붙이기 중 에러가 발생했습니다.");
    } finally {
      setExpanding(false);
    }
  };

  const isExpanded = memo.status === "expanded";

  return (
    <div className={`p-5 rounded-2xl border transition-colors ${isExpanded ? "bg-muted/50 border-border/50" : "bg-card-bg border-border hover:border-accent/50"} flex flex-col gap-3 shadow-sm`}>
      <div className="flex justify-between items-start gap-4">
        <p className={`text-sm whitespace-pre-wrap leading-relaxed ${isExpanded ? "text-foreground/60" : "text-foreground"}`}>
          {memo.content}
        </p>
        <span className="text-[10px] opacity-50 whitespace-nowrap pt-1">
          {new Date(memo.created_at).toLocaleDateString()}
        </span>
      </div>
      
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
      
      <div className="flex justify-end mt-2">
        <button
          onClick={handleExpand}
          disabled={expanding || isExpanded}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 
            ${isExpanded 
              ? "bg-transparent text-foreground/40 cursor-not-allowed" 
              : expanding
                ? "bg-accent/20 text-accent cursor-wait"
                : "bg-accent/10 hover:bg-accent hover:text-background text-accent border border-accent/20 cursor-pointer"
            }`}
        >
          {expanding ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
              생성 중...
            </>
          ) : isExpanded ? (
            <>✅ 변환 완료됨</>
          ) : (
            <>✨ 내용 보강</>
          )}
        </button>
      </div>
    </div>
  );
}
