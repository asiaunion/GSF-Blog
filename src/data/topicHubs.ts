/**
 * Four editorial hubs — flagship slugs shared across en/ko/ja.
 * Curated for completeness and representativeness (not an exhaustive archive).
 */
export const TOPIC_HUB_SLUGS = {
  urbanInvestment: [
    "tokyo-real-estate-investment-complete-guide",
    "japan-shinchiku-vs-chuko-mansion-investor-guide",
    "tokyo-mansion-market-reins-2026-04",
    "j-reit-five-things-to-know",
    "tokyo-office-vacancy-five-wards-2026",
  ],
  macroPolicy: [
    "weak-yen-korean-japan-asset-allocation-fx-scenarios",
    "japan-rate-hike-cycle-j-reit-three-lessons",
    "korea-japan-inheritance-gift-tax-cross-border-basics",
    "japan-visa-paths-permanent-business-manager-asset-holders",
    "japan-corporate-vs-personal-rental-after-tax-sketch",
  ],
  tokyoLife: [
    "nihonbashi-hamacho-walking-guide",
    "why-i-chose-nihonbashi",
    "ginza-marunouchi-walk-dna",
    "tokyo-korean-community-beyond-shinokubo",
    "tsukiji-to-toyosu-morning-tokyo",
  ],
  essay: [
    "why-warm-investing-holds",
    "buying-property-japan-checklist-before-you-commit",
    "buying-property-japan-surprises-foreign-investor",
    "one-failure-three-lessons-postmortem",
    "reading-korea-japan-markets-together",
  ],
} as const;

export type TopicHubKey = keyof typeof TOPIC_HUB_SLUGS;
