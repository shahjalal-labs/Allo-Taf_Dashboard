# AGENTS.md — Global Rules (All Projects)

Personal cross-project rules for Sadik Ahmmed Tonmoy. These apply to every repo unless a project-level `AGENTS.md` explicitly overrides something — project rules win on conflict; this file is the shared default, not a ceiling.

## 1. Who's working here

Full-stack developer, 3+ years, primarily Next.js/Node.js/TypeScript. Comfortable with real-time systems (Socket.io, Redis, BullMQ) and building solo end-to-end (KnockMyRide, Glassophite, PerfectoBD, Primely Gaming). Agents should default to production-quality output, not tutorial-level scaffolding — this is not someone learning the stack for the first time.

## 2. Default Tech Stack (unless a project says otherwise)

- **Language:** TypeScript everywhere — frontend and backend. No plain JS in new files.
- **Frontend:** Next.js (App Router by default for new projects), Tailwind CSS, Redux Toolkit + RTK Query for client state/data fetching, Framer Motion for animation.
- **Backend:** Node.js + Express, Prisma as the ORM, MongoDB as the default database unless a project specifies PostgreSQL.
- **Real-time:** Socket.io for websockets, Redis for pub/sub, caching, and BullMQ job queues.
- **Auth:** JWT-based, backend-issued; NextAuth on frontends that need session management. Tokens are treated as sensitive — prefer httpOnly cookies over `localStorage`.
- **Payments:** Stripe, using webhook-driven state changes rather than trusting client-side confirmation.

## 3. Code Style

- Strict TypeScript — no implicit `any`, no silent `as any` casts to dodge a type error. If a type is genuinely awkward (e.g. MongoDB extended-JSON `ObjectId` shapes), model it explicitly rather than casting it away.
- Functional React components with hooks. No class components in new code.
- Keep API clients and data-fetching logic out of components — centralize in RTK Query slices or a dedicated `lib/api` layer.
- Prefer explicit error handling over silent failures. Backend routes should return meaningful HTTP status codes (this codebase has previously shipped bugs where expected errors returned 500 instead of 401/404 — treat error-code correctness as a real bug class, not a nitpick).
- Match existing formatting/lint config in a repo (Prettier/ESLint) rather than introducing personal style preferences into someone else's — or your own past — conventions.

## 4. Backend Conventions

- **Always validate input with Zod.** Every API route/controller that accepts a request body, query params, or route params must define a Zod schema and parse against it before touching business logic — no manual `if (!field) throw ...` checks in place of a schema.
- On validation failure, return the actual Zod error message(s) to the client (e.g. via `error.flatten()` or `error.issues`) in the response body, not a generic "Bad Request" — the client should know exactly which field failed and why. Use a 400 status code for validation errors specifically.
- Reuse Zod schemas between related concerns where possible (e.g. infer a TypeScript type from the schema with `z.infer<>` rather than hand-writing a duplicate interface).
- Prisma schema is the source of truth for data shape — don't hand-write MongoDB queries that bypass it unless there's a specific performance reason, and note that reason in a comment.
- Pagination: always implement it defensively — empty result sets, missing fields, and sort-by-computed-field (e.g. price after variant discounts) are the recurring edge cases in this codebase's history. Test those cases explicitly, don't just test the happy path.
- BullMQ jobs should be idempotent where possible — assume a job can be retried or re-delivered.
- Redis is used both as a cache and as infrastructure (pub/sub, sorted sets, job queues) — be explicit in code/comments about which role a given Redis call is playing.

## 5. Frontend Conventions

- Framer Motion is the standard animation library. `useScroll`/`useTransform` for scroll-linked motion, `useInView` for viewport-triggered reveals, `useSpring` to smooth derived values — not to spring raw scroll progress unless a section wants lag.
- Guard against SSR/hydration bugs as a standing rule: never read `window`/`document` or call `Math.random()` during render. Gate both behind `useEffect` or client-only checks. This has been a recurring bug class — treat it as a checklist item, not a one-off fix.
- Don't introduce a second state library alongside Redux/RTK Query in a project that already uses it.

## 6. Security & Review Habits

- Treat auth/token handling as something to actively review, not just implement once — this codebase has had a real security audit flag token storage before (recommendation: httpOnly cookies over client-readable storage). Apply that standard by default in new auth code, don't wait for an audit to catch it.
- Webhook handlers (Stripe, Microsoft Graph, etc.) must verify signatures/tokens server-side — never trust payload contents without verification.
- Don't log secrets, tokens, or full payment payloads, even in dev-only debug statements.

## 7. Commands (npm)

```bash
npm install                      # install dependencies — respect package-lock.json
npm run dev                      # local dev server
npm run lint                     # must pass before a task is "done"
npm run type-check               # tsc --noEmit (add this script if a repo lacks it)
npm run build                    # must succeed before a task is "done"
```

- Always commit `package-lock.json` alongside `package.json` changes — don't let it drift or get regenerated with a different resolved tree than what's checked in.
- Use `npm ci` instead of `npm install` in CI/build environments for reproducible installs.
- Adding a dependency: `npm install <pkg>` for runtime deps, `npm install -D <pkg>` for dev-only tooling (types, linters, test libs).
- Agents should run lint, type-check, and build before declaring any change complete — not just confirm the dev server boots.

## 8. Communication Style for Generated Content

- Code comments, commit messages, and technical docs: clear, professional, industry-standard English.
- Sadik communicates casually (often Banglish) in informal/social contexts, but expects formal, ATS-friendly, industry-standard English for anything professional — resumes, cover letters, client-facing docs, proposals. Agents generating those artifacts should default to formal tone, not casual.

## 9. What NOT to do (cross-project defaults)

- Don't scaffold a new state-management or animation library when Redux/RTK Query or Framer Motion already covers the need.
- Don't default to `localStorage` for tokens or sensitive session data.
- Don't silently swallow errors or return generic 500s for what are really validation/auth failures.
- Don't assume a single-file solution is done without a build/type-check pass — several past bugs in this codebase (pagination, token TTL, hydration) only surfaced under specific conditions, not on first glance.

## 10. Precedence

`AGENTS.md` (project-level) > this file. Tool-specific files (`GEMINI.md`, `CLAUDE.md`, `.cursorrules`) sit above or below this per that tool's own hierarchy — this file is the cross-tool, cross-project baseline, not a replacement for project-specific rules.