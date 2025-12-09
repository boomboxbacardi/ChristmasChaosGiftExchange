# AI Agent Instructions (Backend)

- Scope: backend/server-side tasks; overrides global where conflicts.
- Data: validate all inputs; never log sensitive data; use env vars for secrets.
- Reliability: handle errors with clear messages; prefer retries with backoff for transient calls.
- Performance: keep endpoints lean; avoid N+1 patterns; cache when appropriate.
- Security: enforce auth/authorization where required; sanitize external inputs.
- Observability: log key events with minimal noise; include context for debugging.

