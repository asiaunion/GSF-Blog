import React, { useState } from "react";
import { z } from "zod";

export const frontmatterSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "영문 소문자, 숫자, 하이픈(-)만 사용할 수 있어요."),
  category: z.enum(["investment", "safety", "life", "local", "essay"]),
  tags: z.array(z.string()),
});

interface FrontmatterEditorProps {
  slug: string;
  category: "investment" | "safety" | "life" | "local" | "essay";
  tags: string[];
  onChange: (data: { slug: string; category: any; tags: string[] }) => void;
}

export default function FrontmatterEditor({ slug, category, tags, onChange }: FrontmatterEditorProps) {
  const [newTagInput, setNewTagInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newSlug = e.target.value.toLowerCase().replace(/\s+/g, "-");
    const result = frontmatterSchema.safeParse({ slug: newSlug, category, tags });
    if (!result.success) {
      setError(result.error.issues.find(i => i.path.includes("slug"))?.message || null);
    } else {
      setError(null);
    }
    onChange({ slug: newSlug, category, tags });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ slug, category: e.target.value as any, tags });
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const cleaned = newTagInput.trim().toLowerCase().replace(/,/g, "");
      if (cleaned && !tags.includes(cleaned)) {
        onChange({ slug, category, tags: [...tags, cleaned] });
      }
      setNewTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange({ slug, category, tags: tags.filter((t) => t !== tagToRemove) });
  };

  return (
    <div className="bg-card-bg border border-border rounded-2xl p-5 flex flex-col gap-5">
      <h3 className="text-sm font-bold text-foreground border-b border-border pb-2">
        ⚙️ 게시글 설정
      </h3>

      {/* 슬러그 입력 */}
      <div>
        <label className="block text-[10px] uppercase font-bold tracking-wider opacity-70 mb-1.5">
          웹 주소 (영문)
        </label>
        <input
          type="text"
          value={slug}
          onChange={handleSlugChange}
          className={`w-full px-3 py-2 bg-background border ${error ? 'border-red-500/50' : 'border-border'} rounded-xl text-xs opacity-90 focus:outline-none focus:border-accent transition-colors font-mono`}
        />
        {error && <span className="text-[9px] text-red-400 mt-1 block leading-tight">{error}</span>}
        <span className="text-[9px] opacity-70 mt-1 block leading-tight">
          영문 소문자, 숫자, 하이픈(-)만 사용할 수 있어요.
        </span>
      </div>

      {/* 카테고리 셀렉터 */}
      <div>
        <label className="block text-[10px] uppercase font-bold tracking-wider opacity-70 mb-1.5">
          카테고리
        </label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs opacity-90 focus:outline-none focus:border-accent transition-colors cursor-pointer"
        >
          <option value="investment">📈 투자</option>
          <option value="safety">🛡️ 안전</option>
          <option value="life">🌱 라이프</option>
          <option value="local">🇯🇵 로컬</option>
          <option value="essay">✍️ 에세이</option>
        </select>
      </div>

      {/* 태그 지정 */}
      <div>
        <label className="block text-[10px] uppercase font-bold tracking-wider opacity-70 mb-1.5">
          태그
        </label>
        <input
          type="text"
          placeholder="태그 입력 후 Enter..."
          value={newTagInput}
          onChange={(e) => setNewTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs opacity-90 focus:outline-none focus:border-accent transition-colors placeholder-gray-600 mb-2"
        />
        
        {/* 태그 리스트 */}
        <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
          {tags.length === 0 ? (
            <span className="text-[10px] opacity-50 italic">아직 태그가 없어요.</span>
          ) : (
            tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 pl-2 pr-1.5 py-0.5 rounded bg-accent text-background text-accent border border-accent text-[10px] font-medium"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-accent hover:text-accent font-bold ml-0.5 text-xs focus:outline-none cursor-pointer"
                >
                  &times;
                </button>
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
