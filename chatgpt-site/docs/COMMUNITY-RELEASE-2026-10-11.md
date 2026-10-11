# Bonga Bhengu Community release

This release adds Community & messages to the existing My Business workspace and phone shortcuts. The storefront remains the home page. The existing Worker, D1, R2, ChatGPT sign-in, Studio, seller/admin modules and checkout are retained.

## Implemented

- Account-bound display profiles with separate public member IDs; sign-in identifiers are not exposed in feed responses.
- Persistent shared feed, idempotent likes, comments and author-only post removal.
- Participant-scoped direct messages and conversation lists. The visible page refreshes conversations every 15 seconds; this is polling, with no push notifications or end-to-end encryption.
- Invite links redirect to the storefront. The account can see counted GET requests; HEAD requests do not increment counts. Repeated visits and bot requests can count. No unique-visitor or sales attribution is claimed.
- Locally generated QR codes, PNG download, clipboard copying and a WhatsApp compose link. Sharing requires the user's action.
- Black, white and gold responsive Community UI, retained app navigation and module instructions.
- Server-side origin checks, bounded inputs, parameterized SQL and persistent limits of 30 write attempts per account per minute.

## Verification

Run `npm ci`, `npm run build`, then `npm test` using Node 22.13 or later (tests use node:sqlite).

All 45 test files pass, including SQLite-backed Community profile/post/comment/like persistence, forged-author rejection, ownership, private-message isolation, input bounds, write throttling, and invite-count semantics. Existing tests cover package prices, checkout request storage, auth, phone/laptop modules, Studio workflows, media handling and website publishing. Build bundles QR rendering locally and includes its MIT license.

Browser layout, real Android hardware, microphone/camera output and QR scanning were not manually exercised in this release. Automated tests are not evidence of live media or payment-provider success.

## Remaining blueprint work

The current phone and laptop offering is a browser app with an install manifest; this release does not produce a signed Android APK/AAB or Electron installer. A native monorepo migration would require a separately tested mobile build and distribution pipeline.

Checkout packages remain Start R299, Build R499, Grow R699 and Studio R999 per month. Requests can be saved; payment collection, active subscription entitlements and transfers remain disconnected. Do not mark a request as a paid subscription.

There is no verified HLS transcoding/CDN pipeline, distributed streaming backend, WhatsApp-style encryption, large-scale load benchmark or Supabase migration in this release. Studio services retain their existing availability checks.

CodeRabbit and Replica were not callable in this session. The source PR can be reviewed by an installed GitHub reviewer; creating a PR does not activate those services. The intended Nero Tech repository remains unidentified and is not substituted with an arbitrary repository.

Related to the larger Studio roadmap in GitHub issue #13; this release does not close its media acceptance criteria.

## GitHub mirror repair

The GitHub baseline independently failed `npm run build`: worker/index.mjs imported podcasts.mjs, but the module and build-path rewrite were missing. This PR restores that module and its schema-only migration from the hosted source. Existing Zuxuru imports, schema and archive restoration remain intact. A new idempotent schema migration registers the existing Zuxuru table definition, which had previously been supplied only through db/zuxuru-merge.sql. No existing migration SQL is rewritten.

The GitHub mirror contains fewer historical test files than production. Its checks are run independently; the 45-file result above refers to the hosted source.

GitHub mirror validation: `npm run build` and `npm test` pass all 43 test files. Device-link tests now validate registered app routes, module counts track the shared registry, motion checks accept the actual release query, and MCP discovery verifies all five existing tool names.
