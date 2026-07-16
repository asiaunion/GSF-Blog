/**
 * FAQPage JSON-LD for GEO / AdSense-era refresh posts.
 * Pass result via Layout `extraJsonLd` (keeps default BlogPosting intact).
 */
export type FaqItem = {
  question: string;
  answer: string;
};

export function buildFaqPageJsonLd(items: FaqItem[]): Record<string, unknown> {
  const trimmed = items
    .map(item => ({
      question: item.question.trim(),
      answer: item.answer.trim(),
    }))
    .filter(item => item.question.length > 0 && item.answer.length > 0);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: trimmed.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
