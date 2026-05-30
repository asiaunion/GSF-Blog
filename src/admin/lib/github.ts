import { ADMIN_CONFIG } from "../config";

const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";
const GITHUB_REPO = import.meta.env.GITHUB_REPO || "asiaunion/GSF-Blog";

export type GitHubFile = {
  path: string;
  sha: string;
  name: string;
};

/**
 * GitHub API 공통 헤더 반환
 */
function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "GSF-Blog-Admin-CMS",
  };
  if (GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
  }
  return headers;
}

/**
 * GitHub API를 사용하여 src/data/blog 내의 모든 마크다운 파일 목록을 재귀적으로 가져옵니다.
 * Git Tree API (recursive=1) 사용.
 */
export async function getBlogFiles(branch = "main"): Promise<GitHubFile[]> {
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/git/trees/${branch}?recursive=1`;
    const res = await fetch(url, { headers: getHeaders() });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`GitHub API 호출 실패 (${res.status}): ${errorText}`);
    }

    const data = await res.json();
    if (!data.tree || !Array.isArray(data.tree)) {
      return [];
    }

    // src/data/blog/ 하위에 있는 .md 또는 .mdx 파일만 필터링
    const blogFiles = data.tree
      .filter((file: any) => {
        return (
          file.type === "blob" &&
          file.path.startsWith("src/data/blog/") &&
          (file.path.endsWith(".md") || file.path.endsWith(".mdx"))
        );
      })
      .map((file: any) => {
        const parts = file.path.split("/");
        const name = parts[parts.length - 1];
        return {
          path: file.path,
          sha: file.sha,
          name,
        };
      });

    return blogFiles;
  } catch (error) {
    console.error("getBlogFiles 에러:", error);
    throw error;
  }
}

/**
 * 특정 마크다운 파일의 raw 본문을 GitHub API를 사용해 가져옵니다.
 */
export async function getBlogFileContent(path: string): Promise<string> {
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;
    const res = await fetch(url, {
      headers: {
        ...getHeaders(),
        Accept: "application/vnd.github.v3.raw", // raw 본문 콘텐츠를 직접 수신
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`GitHub 콘텐츠 호출 실패 (${res.status}): ${errorText}`);
    }

    return await res.text();
  } catch (error) {
    console.error("getBlogFileContent 에러:", error);
    throw error;
  }
}

