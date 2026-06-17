# Verification manifest schema

Manifest files live in `docs/verification/manifests/<slug>.manifest.json`.

## Gates (required before publish)

| Gate | Set by | Blocks |
|------|--------|--------|
| `manifest_approved_by` | Joseph | Step 4 (KO draft) |
| `cursor_audit_passed` | Cursor agent | Step 6 (deploy) |
| `joseph_final_approved` | Joseph | git push / deploy |

## Claim tiers

| tier | Meaning |
|------|---------|
| `primary` | `[1차 확인]` — artifact or SSOT lookup required |
| `secondary` | `[2차 출처]` — must not be labeled primary in draft |

## Layers

| layer | Source type |
|-------|-------------|
| `A` | MLIT JSON, PKM verified card, benchmarks.json |
| `B` | SUUMO HTML snapshot in `.cache/verification/` |
| `C` | Transit estimate, PR, user capture — secondary only |

## Methods

| method | Script check |
|--------|--------------|
| `benchmark_lookup` | Value matches `tokyo-ward-series-benchmarks.json` |
| `json_lookup` | Value matches `tokyo_mansion_stats_2025.json` |
| `suumo_snapshot` | Snippet found in cached HTML |
| `user_capture` | `evidence.capture_by: user` |
| `pkm_verified_card` | Card path + verified:true |

Agent self-report without `evidence` is invalid for `tier: primary`.
