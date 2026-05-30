import React, { useState } from "react";
import { z } from "zod";

export const frontmatterSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "슬러그는 소문자, 숫자, 하이픈(-)만 포함할 수 있습니다."),
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
    <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-5 backdrop-blur-sm flex flex-col gap-5">
      <h3 className="text-sm font-bold text-gray-200 border-b border-white/5 pb-2">
        ⚙️ 프론트매터 메타데이터
      </h3>

      {/* 슬러그 입력 */}
      <div>
        <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1.5">
          포스트 슬러그 (URL 경로)
        </label>
        <input
          type="text"
          value={slug}
          onChange={handleSlugChange}
          className={`w-full px-3 py-2 bg-slate-950/60 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-xl text-xs text-gray-300 focus:outline-none focus:border-emerald-500 transition-colors font-mono`}
        />
        {error && <span className="text-[9px] text-red-400 mt-1 block leading-tight">{error}</span>}
        <span className="text-[9px] text-gray-500 mt-1 block leading-tight">
          슬러그 수정 시 즉시 URL 경로에 반영됩니다. (소문자/숫자/하이픈만 허용)
        </span>
      </div>

      {/* 카테고리 셀렉터 */}
      <div>
        <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1.5">
          카테고리 분류
        </label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full px-3 py-2 bg-slate-950/60 border border-white/10 rounded-xl text-xs text-gray-300 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
        >
          <option value="investment">📈 Investment</option>
          <option value="safety">🛡️ Safety</option>
          <option value="life">🌱 Life</option>
          <option value="local">🇯🇵 Local</option>
          <option value="essay">✍️ Essay</option>
        </select>
      </div>

      {/* 태그 지정 */}
      <div>
        <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1.5">
          태그 지정
        </label>
        <input
          type="text"
          placeholder="태그 입력 후 Enter..."
          value={newTagInput}
          onChange={(e) => setNewTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          className="w-full px-3 py-2 bg-slate-950/60 border border-white/10 rounded-xl text-xs text-gray-300 focus:outline-none focus:border-emerald-500 transition-colors placeholder-gray-600 mb-2"
        />
        
        {/* 태그 리스트 */}
        <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
          {tags.length === 0 ? (
            <span className="text-[10px] text-gray-600 italic">지정된 태그가 없습니다.</span>
          ) : (
            tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 pl-2 pr-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[10px] font-medium"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-emerald-500 hover:text-emerald-300 font-bold ml-0.5 text-xs focus:outline-none cursor-pointer"
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
