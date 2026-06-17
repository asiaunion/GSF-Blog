/** Shared CAGR / YoY helpers for MLIT timeseries scripts */

export function cagr(startVal, endVal, years) {
  if (!startVal || !endVal || years <= 0 || startVal <= 0) return null;
  return Math.round((Math.pow(endVal / startVal, 1 / years) - 1) * 1000) / 10;
}

export function yoyPct(prev, curr) {
  if (!prev || !curr) return null;
  return Math.round(((curr - prev) / prev) * 1000) / 10;
}

export function buildCagrMetrics(series) {
  const years = Object.keys(series).map(Number).sort((a, b) => a - b);
  const first = years[0];
  const last = years.at(-1);
  const span = first != null && last != null ? last - first : 0;

  let prevYear = null;
  const yoy = {};
  for (const y of years) {
    if (prevYear != null) yoy[y] = yoyPct(series[prevYear], series[y]);
    prevYear = y;
  }

  return {
    years,
    first,
    last,
    span,
    yoy_pct: yoy,
    cagr_span_years: span,
    cagr_full: span > 0 ? cagr(series[first], series[last], span) : null,
    cagr_5y: last != null && series[last - 5] != null ? cagr(series[last - 5], series[last], 5) : null,
    cagr_10y: last != null && series[last - 10] != null ? cagr(series[last - 10], series[last], 10) : null,
  };
}

export function parseWardArgs(argv, EPISODE_WARDS, WARD_CODE) {
  const out = { ward: "", episode: "", allWards: false, from: 2005, to: 2025, write: false, noCache: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--ward") out.ward = argv[++i] ?? "";
    else if (a === "--episode") out.episode = (argv[++i] ?? "").toLowerCase();
    else if (a === "--all-wards") out.allWards = true;
    else if (a === "--from") out.from = parseInt(argv[++i] ?? "2005", 10);
    else if (a === "--to") out.to = parseInt(argv[++i] ?? "2025", 10);
    else if (a === "--write") out.write = true;
    else if (a === "--no-cache") out.noCache = true;
  }

  let wards = [];
  if (out.ward) wards = [out.ward];
  else if (out.episode) {
    wards = EPISODE_WARDS[out.episode];
    if (!wards) throw new Error(`Unknown episode: ${out.episode}`);
  } else if (out.allWards) {
    wards = Object.keys(WARD_CODE);
  } else {
    throw new Error("Specify --ward, --episode, or --all-wards");
  }
  return { ...out, wards };
}

export function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}
