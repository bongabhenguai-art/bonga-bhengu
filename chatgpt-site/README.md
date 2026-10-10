# Existing Bonga Bhengu App site source

This folder mirrors the complete source of the existing Bonga Bhengu App, live version 119, from source commit `2c6c2cd9077e0296b0637658bb3b94676d00b3b3`. It extends this repository without replacing its shared Python modules or creating another application.

The mirror includes the frontend, Worker, database migrations, 30 Node test suites, build scripts, media, and 220 retained project artifacts/source files. Source hashes and provenance are recorded in `project-sources/merge-manifest.json`. See `docs/APP-UPGRADE-2026-10-10.md` for supported behavior and verification limits.

Run from this folder with Node 24:

```bash
npm ci
node scripts/build-ai.mjs
for test in tests/*.mjs; do node "$test" || exit 1; done
```

GitHub stores this source mirror. Publishing continues through the existing site's source repository and deployment process; a GitHub push alone does not redeploy the live app. Provider credentials belong in runtime configuration, never in this repository.

The combined master archive is stored as two checksum-verified parts to fit the connected upload limit. The build restores its exact original bytes; all 220 retained input/source files are also present individually.

The generated Worker bundle is rebuilt with `npm run build`; GitHub stores its source, static assets, migrations and tests.
