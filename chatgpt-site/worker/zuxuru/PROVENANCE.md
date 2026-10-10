# Zuxuru backend merge
Adapted from GPL-licensed bongabhenguai-art/zuxuru commit 17e26c3cbaebd85eaa8e46ddbddb73efd1c3db3e (published Site version 9). Original source retained by the root zuxuru submodule.
Existing business investigation, growth, profiles, intelligence, memory, leads, Studio assets, approved Postiz publishing and encrypted AI/GitHub adapters are imported rather than replaced with demo logic.
Request-scoped authentication uses AsyncLocalStorage; all storage is adapted to Bonga Bhengu's DB and MEDIA bindings. Records use zuxuru_records to avoid collisions. CEO access uses the existing JARVIS_OWNER_EMAIL, never a hardcoded account. Existing Jarvis API keys are not automatically disclosed to the customer engine.
No old account data, ciphertext, credentials or business records are transferred automatically.
