#!/bin/bash

SLUGS=(
  buying-property-japan-checklist-before-you-commit
  buying-property-japan-surprises-foreign-investor
  coredo-nihonbashi-mitsui-redevelopment
  ginza-marunouchi-walk-dna
  ginza-weekend-walking-guide
  hotel-reit-vs-office-reit-post-covid
  j-reit-five-things-to-know
  japan-corporate-vs-personal-rental-after-tax-sketch
  japan-rate-hike-cycle-j-reit-three-lessons
  japan-real-estate-three-things
  japan-shinchiku-vs-chuko-mansion-investor-guide
  japan-visa-paths-permanent-business-manager-asset-holders
  korea-japan-inheritance-gift-tax-cross-border-basics
  korea-resident-japan-property-capital-gains-tax
  nihonbashi-hamacho-supermarket-peacock-city-life
  nihonbashi-hamacho-walking-guide
  nihonbashi-mitsui-redevelopment-pipeline-three
  nihonbashi-the-origin-of-japan
  one-failure-three-lessons-postmortem
  reading-korea-japan-markets-together
  three-things-when-fx-shakes
  tokyo-6-wards-real-estate-insight
  tokyo-adachi-katsushika-edogawa
  tokyo-buying-process-step-by-step
  tokyo-core-3-wards-chiyoda-chuo-minato
  tokyo-earthquake-vulnerable-five-areas
  tokyo-five-sophisticated-spots
  tokyo-kita-arakawa-itabashi-nerima
  tokyo-kokubunji-kunitachi-fuchu-tachikawa
  tokyo-korean-community-beyond-shinokubo
  tokyo-mansion-market-reins-2026-04
  tokyo-mansion-tsubo-chiyoda-chuo-minato
  tokyo-meguro-setagaya
  tokyo-moving-contracts-two-notes
  tokyo-musashino-mitaka-chofu
  tokyo-museums-with-kids-five-picks
  tokyo-office-vacancy-five-wards-2026
  tokyo-real-estate-investment-complete-guide
  tokyo-shinagawa-ota
  tokyo-shinjuku-shibuya-bunkyo
  tokyo-small-rental-yield-vs-capital-gain-breakeven
  tokyo-taito-sumida-koto
  tokyo-toshima-nakano-suginami
  tokyo-ward-guide-series-prologue
  tokyo-yokohama-fuji-transport-pass
  tsukiji-last-empty-lot-redevelopment
  tsukiji-to-toyosu-morning-tokyo
  weak-yen-korean-japan-asset-allocation-fx-scenarios
  why-i-chose-nihonbashi
  why-warm-investing-holds
)

SUCCESS=0
FAILED=0
echo "" > batch_failures.log

for slug in "${SLUGS[@]}"; do
  echo "Running for $slug..."
  python3 scripts/naver_blog_gen.py --slug "$slug"
  if [ $? -eq 0 ]; then
    SUCCESS=$((SUCCESS+1))
  else
    FAILED=$((FAILED+1))
    echo "$slug" >> batch_failures.log
  fi
done

echo "SUCCESS: $SUCCESS"
echo "FAILED: $FAILED"
