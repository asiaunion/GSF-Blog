import React, { useState } from "react";

interface PublishPanelProps {
  postId: string;
  onPublishSuccess?: () => void;
}

export default function PublishPanel({ postId, onPublishSuccess }: PublishPanelProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conflict, setConflict] = useState<string[] | null>(null);

  const handlePublish = async (force = false) => {
    try {
      setLoading(true);
      setError(null);
      setConflict(null);

      const res = await fetch(`/admin/api/posts/${postId}/publish/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ force }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setConflict(data.conflicts || []);
          return;
        }
        throw new Error(data.error || "발행 중 오류가 발생했습니다.");
      }

      alert("발행이 완료되었습니다!");
      if (onPublishSuccess) {
        onPublishSuccess();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">게시 및 퍼블리싱</h3>
      <p className="text-sm text-gray-600 mb-4">
        GitHub 저장소에 직접 커밋하여 Vercel 배포를 트리거합니다.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded border border-red-200">
          {error}
        </div>
      )}

      {conflict && (
        <div className="mb-4 p-4 bg-yellow-50 text-yellow-800 text-sm rounded border border-yellow-200">
          <p className="font-semibold mb-2">⚠️ Git 충돌 발생</p>
          <p className="mb-2">
            저장소의 원본 파일이 외부에서 변경되었습니다. (대상 언어: {conflict.join(", ")})
          </p>
          <p className="mb-3">기존 변경사항을 덮어쓰고 현재 내용으로 강제 발행하시겠습니까?</p>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePublish(true)}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-foreground rounded font-medium transition-colors"
              disabled={loading}
            >
              강제 덮어쓰기
            </button>
            <button
              onClick={() => setConflict(null)}
              className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded font-medium transition-colors"
              disabled={loading}
            >
              취소
            </button>
          </div>
        </div>
      )}

      {!conflict && (
        <button
          onClick={() => handlePublish(false)}
          disabled={loading}
          className="flex items-center justify-center w-full px-4 py-2 bg-accent text-background hover:bg-accent text-background text-foreground rounded-md font-semibold transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-foreground" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              발행 중...
            </>
          ) : (
            "지금 발행하기"
          )}
        </button>
      )}
    </div>
  );
}
