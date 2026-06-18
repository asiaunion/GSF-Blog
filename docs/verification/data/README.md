# Data Directory

This directory contains processed datasets for verification and benchmarking.
Raw data files (like MLIT GML/SHP files or ZIP archives) are git-ignored to prevent bloating the repository.

## Regeneration

If you need to regenerate `n02-stations-tokyo.geojson` or `tokyo-wards-boundary.geojson`, you must download the raw MLIT N02 and N03 datasets, extract them into this directory (`N02-22/`, `N03-2024/`), and run the following script:

```bash
node scripts/prepare-n02-tokyo.mjs
```

This will parse the raw GIS files and generate the filtered GeoJSON files used by the application.
