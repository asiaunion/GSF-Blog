import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";

export function getStaticPaths() {
  return [
    { params: { lang: "en" } },
    { params: { lang: "ko" } },
    { params: { lang: "ja" } },
  ];
}

export async function GET({ params }: any) {
  const posts = await getCollection("blog", ({ id }) => id.startsWith(`${params.lang}/`));
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(({ data, id, filePath }) => ({
      link: getPath(id, filePath),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
