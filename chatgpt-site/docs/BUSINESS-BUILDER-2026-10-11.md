# Business builder release

Business builder is an addition to the existing visual website editor. Open My Website → Visual website editor → Business builder · voice / text.

## Flow

1. Answer the business name, industry, offer, customer, desired action, location, confirmed public contact and story questions. Industry-specific questions cover fashion, education, food and services.
2. Optionally provide confirmed evidence and funding requirements for the private investor briefing.
3. Create a guided website directly from those answers, or request AI website copy using the platform's configured provider and admin activation. Guided output is labelled as having no AI call.
4. Review the coach, customer, investor and engineer perspectives; inspect the website preview. AI editing requests can refine website copy. Change factual answers through the interview.
5. Apply the reviewed draft after confirmation. A changed project, name or canvas invalidates the prepared result. Save and public publication remain separate reviewed actions.
6. Reopen a saved project to recover its business answers. Export app plan produces a JSON implementation plan, not an executable app or native installer.

Browser SpeechRecognition supplies optional voice transcription with selectable locale. It may use a browser-operated online service, may not support a selected language, and can fail or be unavailable. Typed answers remain usable. Microphone capture stops when the dialog closes. Closing during AI generation cancels the browser request and ignores a late response.

The investor evidence and funding fields are excluded from the AI public-copy request and from published website snapshots. Investor briefing uses the supplied facts. No fabricated sales, testimonials, awards, funding or connected payment services are seeded.

## AI connection and verification

The shared AI path uses existing encrypted owner provider storage and the global/per-account AI control policy. It never returns a provider key to the browser. It requires same-origin authenticated POST requests, bounded input, three generation attempts per account per minute and a shared twenty-attempt per-minute ceiling. OpenAI Responses structured output is validated again before rendering. HTML is rendered from escaped text, not model-generated scripts.

Configured provider/model access and admin activation are required for real AI output. Missing setup, denied activation, incomplete output, provider failure and usage limits show explicit errors. No live paid-provider request was made as part of verification; API tests use controlled responses.

Validation: `npm run build` and `npm test` pass all 47 hosted-source test files. New tests exercise industry questions, contact validation, text escaping, account-private brief persistence, publication boundaries, origin checks, governance, provider failures, rate limits, changed-editor rejection, denied voice permission, capture cleanup and late-response isolation. Real Android/laptop speech and browser layout checks remain pending.

Native Expo/Electron binaries, HLS processing, payments and the unidentified Nero Tech repository remain separate unfinished blueprint requirements. Existing storefront, community, device, seller/admin, Studio and checkout workflows are retained.

API format reference: https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses

GitHub review branch independently builds and passes all 45 of its test files. The hosted source passes 47. The mirror retains its existing Zuxuru implementation.
