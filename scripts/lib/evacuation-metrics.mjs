/**
 * Evacuation Metrics Calculator
 */

export function calculateEvacuationMetrics(evacuationSummary, populationSummary) {
  // 인구: benchmarks의 pop_2020 우선
  const pop = populationSummary.pop_2020 || 0;
  const sites = evacuationSummary.site_count || 0;
  
  const sitesPer10k = pop > 0 ? (sites / pop) * 10000 : 0;
  
  return {
    population_used: pop,
    population_source: populationSummary.source || "none",
    sites_per_10k_people: Number(sitesPer10k.toFixed(1)),
    capacity_per_capita: null, // API does not provide capacity
    capacity_note: "MLIT XGT001 API는 대피소 수용 인원(capacity) 정보를 제공하지 않으므로 1인당 수용 여유도 산출 불가."
  };
}
