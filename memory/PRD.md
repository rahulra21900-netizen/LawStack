# LawStack V2 — Product & Iteration Log

## Original Problem Statement
"Review my application it is for my developer UI prototype do not add backend, api and database.
I also attached my product document. Review it everything and let me know your opinion."

Follow-up: "Fix each and everything one by one, I want to go with your opinion."

## Product Overview
LawStack V2 is a **frontend-only, multi-tenant UI prototype** for a practice-management operating system built for **Indian advocates and law firms**. It replaces paper diaries, WhatsApp threads, and spreadsheets with a unified workspace covering matter management, hearings, documents, billing, client collaboration, and India-specific legal intelligence (IPC→BNS concordance, CNR/eCourts sync, filing defect scanner).

## Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack) + React 19
- **Styling:** Tailwind CSS 4 + custom design-tokens.css
- **Motion:** framer-motion
- **Icons:** lucide-react
- **Data:** typed mocks under `src/mocks/*` (no backend)

## User Personas
1. **Independent Advocate (solo)** — needs simple, one-hand practice management.
2. **Small/Mid-size Law Firm** — needs role-based collaboration + docket automation.
3. **Client** — invite-only closed portal for their own matters and invoices.
4. **Platform Owner (LawStack ops)** — provisions tenants, monitors audit, cannot see firm data.
5. **Developer** — uses `/dev` sandbox to simulate personas, tenants, feature flags.

## Route Groups
- `(public)` — marketing pages (features, pricing, security, docs, contact, solutions, resources, about)
- `(platform)` — Platform Owner control plane (dashboard, tenant admin, audit, provisioning, settings)
- `(tenant)` — Firm workspace (dashboard, cases, clients, documents, calendar, hearings, tasks, team, billing, reports, knowledge base, templates, **legal intelligence**, ai copilot, activity, notifications, settings)
- `(client)` — Client portal (dashboard, matters, documents, billing, messages, profile, support, notifications)
- `(dev)` — Developer sandbox and simulator
- `not-found.tsx` — custom 404

## Iteration Log

### 2026-01-20 — Comprehensive review + fix-everything pass
Product-document review delivered, then user asked to fix each item raised.

**Bug fixes**
- `src/lib/auth.ts`: rewrote `isProtectedRoute` from a leaky blacklist to a whitelist model. Only `/workspace/*`, `/client/*`, and specific `/platform/*` prefixes require auth. `/dev`, marketing pages, 404, and all auth screens now render freely.
- `src/components/auth/ProtectedRoute.tsx`: replaced `useMemo` + `sessionStorage` (SSR-unsafe, non-reactive) with a `useState` + `useEffect` pattern that reads session on the client after mount. Prevents redirect flicker and stale reads.
- `src/components/auth/AuthShell.tsx`: fixed low-contrast tenant login side panel — heading now `text-white`, panel background darkened to `from-{accent}-950/60 via-slate-950/90 to-slate-950`, borders bumped from `/20` to `/25` for legibility.
- `src/app/not-found.tsx`: created custom 404 (“This chamber is out of the docket”) with dark canvas + subtle blue glow.
- Removed duplicate `next.config.ts`; consolidated into `next.config.js` with `allowedDevOrigins` for the emergent preview host.
- Deleted `package-lock.json` (yarn-only).
- Renamed invalid Tailwind shades `text-{emerald,slate,blue}-450` → `-400` across 10 files.

**India-localisation (PRD ↔ UI alignment)**
- `src/utils/formatCurrency.ts`: switched from USD `en-US` to INR `en-IN`; added `formatCurrencyCompact`.
- Every hard-coded `$` currency in tenant/platform/client/dev/analytics pages replaced with `₹` (18 files).
- **Reseeded mocks** with Indian data:
  - `src/mocks/cases.ts` — 5 realistic matters (State v. Sharma anticipatory bail, Reliance v. QuickCart IP, Krishna Textiles v. CIT, In re Oakwood Estates scheme, Durga Prasad consumer) with proper CNR numbers, courts (Delhi HC, Bombay HC, NCLT Mumbai, State Consumer Commission), BNS/BNSS/CrPC sections.
  - `src/mocks/clients.ts` — Indian clients with +91 phone numbers and INR-plausible companies.
  - `src/mocks/hearings.ts` — Indian judges, court numbers, real HC addresses.
  - `src/mocks/billing.ts` — INR amounts (₹14.5L, ₹85k, ₹39.5k, ₹24.5k), UPI as a payment method.
  - `src/mocks/tenants.ts` — Chandra & Associates, Iyer Legal Chambers, Rahul Bansal (Solo), Verma & Partners LLP, Nova Law Group, Justice Associates (Bengaluru).
  - `src/mocks/users.ts` — full Indian roster (Aditya Menon, Shruti Kapoor, Meera Verma, Priya Chandra, Arjun Mehta, Neha Iyer, Kabir Singh, Rohit Malhotra, Rakesh Sharma).
  - `src/mocks/calendar.ts` — Indian court venues.
- Global rename via sed across 60+ files: Harvey Specter → Priya Chandra, Mike Ross → Arjun Mehta, Louis Litt → Rohan Deshpande, Eleanor Vance → Meera Verma, Bruce Wayne → Rakesh Sharma, Tony Stark → Suresh Krishnan, Selina Kyle → Anjali Nair, Wayne Enterprises → Krishna Textiles, Stark Industries → Reliance Retail, LexCorp → Oakwood Estates, Acme Corp → Reliance Retail, Delaware Chancery → NCLT Mumbai, Delaware Rule 210 → Delhi HC Original Side Rules, Oakwood LLP → Chandra & Associates, lexbridge-partners → verma-partners, etc. All Suits/US-superhero content removed.
- `src/types/Case.ts` gained `cnr` and `court` fields.
- `src/app/(tenant)/workspace/cases/page.tsx` DataTable now shows Court column and displays CNR under the case title.
- `src/app/tenant/login/page.tsx`: side panel bullets rewritten around CNR sync, BNS concordance, GST/UPI/Razorpay billing, defect scanning.

**Navigation & IA**
- `src/components/navigation/Sidebar.tsx`: promoted **Legal Intelligence** to a top-tier item with an `IN` badge, renamed generic “AI Workspace” to **AI Copilot**, removed the meaningless “Update” badge on Documents.
- `src/app/(tenant)/workspace/dashboard/page.tsx`: added a prominent India-orange **Legal Intelligence Suite** promo banner above the AI Copilot banner. Updated all hardcoded events, tasks, workload names, and activity feed entries to reference the new Indian matters and case numbers (CRLM.A. 4382/2026, CS(COMM) 942/2026, CP(CAA) 118/2026 etc.).

**Content polish**
- `client/dashboard` and `client/notifications` — replaced legacy “Motion for Summary Judgment / Advanced Tech Corp / IRS Auditing” references with Indian equivalents.
- `ai-workspace/chat` placeholder now asks about “Indian statute, case timelines, or draft contract terms”.

**Verified visually** (screenshots): Home, Tenant Dashboard, Cases list, Legal Intelligence Suite, Billing (INR), Client Portal, /dev sandbox, /tenant/login side panel, 404 page.

## What's Implemented (as of Jan 20, 2026)
- Complete UI shell for 5 route groups (public / platform / tenant / client / dev).
- 213 `.tsx` pages, 99 `.ts` files, full design system (buttons, cards, tables, drawers, modals, command bar, breadcrumbs, feedback, empty states, skeletons).
- 6 context providers (theme, notifications, simulation, navigation, settings, command palette).
- Legal Intelligence Suite: IPC→BNS concordance, CNR/eCourts fetcher, filing defect scanner, precedent finder.
- Simulated auth (sessionStorage), MFA screens, invite-only tenant workspace flow.

## Backlog / Not Implemented
- **P1** — GST-aware invoice templates (currently only INR display; no GSTIN/HSN/CGST/SGST fields).
- **P1** — Court Mode (mobile-first offline cause-list + voice-memo capture in court).
- **P1** — WhatsApp Business Hub UI (client updates, template gallery).
- **P2** — Break-glass dual-approval flow (mentioned in copy only).
- **P2** — Light-theme wiring (toggle exists in `/dev` but slate-950 is hard-coded in RootLayout).
- **P2** — `tailwindcss-animate` plugin (some `animate-in fade-in slide-in-from-top` classes currently no-op).
- **P2** — Suspense boundaries on other `useSearchParams` pages for `next build`.
- **P3** — Font pairing refresh (Inter is functional but generic; consider IBM Plex + Source Serif for a more distinctive brand voice).
- **Enhancement suggestion** (revenue): expose the “Court Mode” PWA as a paid add-on. Advocates spend 60%+ of their day in courtrooms with no laptop — a mobile companion that shows today's cause list, next hearing, quick voice notes, and a one-tap clash alert is a genuine wedge no competitor is shipping. Would tie beautifully into the CNR sync engine already scaffolded on the Intelligence page.

## Test Credentials (simulated auth only)
No real backend — auth is simulated via sessionStorage. Enter any email + password on `/tenant/login` or `/platform/login` and it will "log you in" and route to the MFA screen (any 6-digit code accepted).
