# Subscription access and permission rules

All four products share one agency/customer identity model and Business Master File.

1. Authenticate a person using a trusted login provider.
2. Resolve business membership **server-side** from trusted storage.
3. Load the tenant's verified, active subscription from payment records.
4. Check selected product and its configured monthly allowance.
5. Atomically reserve quota before queuing a job; settle or release on completion/failure.
6. Record a tenant-scoped audit event.

The current access.py is a **pure decision function**, not a login server, OAuth connection, verified membership database, payment processor, or atomic quota service. Do not accept client-provided Principal objects in a public API. Do not deploy publicly until those controls are implemented and tested.
