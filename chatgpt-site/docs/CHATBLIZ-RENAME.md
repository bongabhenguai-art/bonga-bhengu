# Chatbliz — existing Chatboard rename and integration

## Scope
Rename the existing Bonga Bhengu OS Chatboard feature to **Chatbliz**. This is an in-place rename, **not** a new app, new route tree, or replacement chat backend.

## Implementation
1. Find all user-facing occurrences of `Chatboard` (case-insensitive) across navigation, dashboard cards, page titles, mobile menus, accessibility labels, help copy, and notification headings. Replace display labels with `Chatbliz`.
2. Preserve existing route IDs, database tables, message IDs, conversation history, permissions, and APIs. Where a new `/chatbliz` route is desired, provide a backward-compatible redirect from the existing Chatboard route.
3. Keep Chatbliz embedded in the unified Bonga Bhengu OS shell. No duplicate home page or independent application.
4. Wire existing chat UI controls to actual conversation, send, attachment, voice, and notification handlers. Do not show success for unsupported functionality.
5. Expose authorized AI-assistant entry points for Jarvis, Hunter, Closer, and sales team; respect tenant access, consent, and human approval before external outreach.
6. Test desktop and Android navigation, opening a conversation, sending and receiving messages, history persistence, permissions, and old links.

## Acceptance
- Navigation and headings display Chatbliz.
- Existing chat data and endpoints remain intact.
- No new standalone app or duplicated interface.
- Tests pass; live publication must follow the site's existing deployment pipeline.

This file documents the approved implementation request. It does not assert that the UI has been modified or deployed.
