# Website Builder & Hosting — Bonga Bhengu OS

An additive product module. The existing Bonga Bhengu website and Creative Studio remain unchanged.

## Product
- Website Builder & Hosting: website creation, hosting, SEO and Digital Visibility.
- Digital Banner and Digital Studio remain separate subscription products.
- Choose Any One R299/month; Choose Any Two R499/month; All-in-One R699/month.

## Existing customer journey
Business Search → Candidate Selection → Profile Confirmation → Business Master File → Public Visibility Score → Digital Visibility Growth Builder → Website Builder → Review → Authorized Publishing → Measurement.

## Current implementation
`builder.py` generates a tenant-specific static HTML site from an approved business profile, including metadata, service listings and brand colors. The result is local build output, **not a hosted website**.

## Required production layers
1. Authenticated owner signup/login and verified tenant membership.
2. Persisted Business Master File with evidence links, change history and permissions.
3. Site/page editor, templates, assets, responsive previews and draft versions.
4. Subscription entitlements and payments (never use the tier enquiry selector as a payment grant).
5. Domain and hosting authorization wizard (Cloudflare, supported CMS, etc.).
6. Server-side deployment credentials, signed publishing approvals, rollback and verified live URLs.
7. SEO audit, visibility evidence, analytics, rescoring and publishing audit logs.
8. Security controls: PostgreSQL RLS, encrypted credentials, content sanitization, rate limits, backups and tests.

Do not claim website publication, OAuth connections or live hosting until verified.
