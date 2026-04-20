import type { APIRoute } from "astro";

export const prerender = true;

const EXAMPLE_LINE =
  "# google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0";

function toAdsTxtPublisherLine(value: string | undefined): string | null {
  if (!value) return null;
  const normalized = value.trim();
  const pubId = normalized.startsWith("ca-pub-")
    ? normalized.replace(/^ca-/, "")
    : normalized;

  if (!/^pub-\d{16}$/.test(pubId)) return null;
  return `google.com, ${pubId}, DIRECT, f08c47fec0942fa0`;
}

export const GET: APIRoute = () => {
  const publisherLine = toAdsTxtPublisherLine(
    import.meta.env.PUBLIC_ADSENSE_PUBLISHER_ID
  );

  const body = publisherLine
    ? `${publisherLine}\n`
    : [
        "# Placeholder ads.txt for GSF Blog.",
        "# Set PUBLIC_ADSENSE_PUBLISHER_ID in Vercel to publish a real line.",
        EXAMPLE_LINE,
      ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
};
