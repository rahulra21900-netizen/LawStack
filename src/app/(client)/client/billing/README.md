# `/client/billing` — Developer Guide

> Client-portal **Billing & Invoices** page. Route: `/client/billing`
> File: `src/app/(client)/client/billing/page.tsx`
> Rendered inside the **Client Portal** shell (`ClientLayout`), reached from the client sidebar entry `"Invoices & Billing"`.

This guide covers everything a new engineer needs to work productively on this page: the route contract, data model, component surface, state/side-effects, mock→API migration, testing, accessibility, and extension recipes.

---

## 1. TL;DR

- **Purpose**: Let an authenticated client review outstanding balance, see recent invoices, pay them, and download PDFs.
- **Type**: Next.js **App Router** page, `"use client"` — pure client component. No server actions, no `fetch`, no auth guard inside the file (auth is enforced at the layout/middleware level).
- **Data source (today)**: `MOCK_INVOICES` from `@/mocks/billing`. Only the **first 3** invoices are rendered.
- **Data source (target)**: A REST/Server-Action endpoint scoped to the signed-in client (see [§7 Mocks → Real API](#7-mocks--real-api-migration)).
- **UI kit**: `@/components/ui` (`Breadcrumb`, `Badge`, `Button`), `@/components/cards` (`Card`, `MetricCard`), Lucide icons.
- **Side-effects**: One — toast notifications via `useNotifications()` on "Pay Now" / "Pay invoice" clicks. **Payments are simulated.**

---

## 2. Route & Layout Contract

```
URL          : /client/billing
Segment      : src/app/(client)/client/billing/page.tsx
Route group  : (client)          → does not appear in URL
Layout       : src/app/(client)/layout.tsx → wraps in <ClientLayout>
Nav entry    : src/components/navigation/Sidebar.tsx
               { name: "Invoices & Billing", href: "/client/billing",
                 icon: DollarSign, badge: "2 Due" }
```

Because the file starts with `"use client"`, everything below runs in the browser. **Do not** turn this into a Server Component without also removing the `useNotifications` hook usage.

The parent `ClientLayout` supplies:
- Header, Sidebar, container padding.
- The `NotificationProvider` (mounted globally in `src/providers/index.tsx`) — this is what `useNotifications()` reads.

The page therefore renders **only its inner content**; no `<html>`, no top-level chrome.

---

## 3. File Map (everything this page touches)

| Import                                          | Path                                              | Role in this page                                    |
| ----------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------- |
| `useNotifications`                              | `src/hooks/useNotifications.ts` → `NotificationProvider` | Fires toasts when the user clicks a Pay button.      |
| `Breadcrumb`, `Badge`, `Button`                 | `src/components/ui/CoreUi.tsx`                    | Header nav, status pill, primary action.             |
| `Card`, `MetricCard`                            | `src/components/cards/ContentCards.tsx`           | Invoice cards + top-of-page KPI tiles.               |
| `MOCK_INVOICES`                                 | `src/mocks/billing.ts`                            | Seed data (Invoice[]).                               |
| `formatCurrency`                                | `src/utils/formatCurrency.ts`                     | INR-locale currency formatter (`en-IN`).             |
| `Invoice` type (transitive)                     | `src/types/Billing.ts`                            | Shape of items in `MOCK_INVOICES`.                   |
| `DollarSign`, `CreditCard`, `Download`, `ArrowRight`, `CheckCircle2`, `Clock` | `lucide-react` | Icons.                                        |

---

## 4. Data Model

Straight from `src/types/Billing.ts`:

```ts
export interface Invoice {
  id: string;
  tenantId: string;
  clientId: string;
  caseId?: string;
  invoiceNumber: string;
  amount: number;       // total invoice amount
  amountPaid: number;   // sum of payments applied
  status: "Draft" | "Sent" | "Partially_Paid" | "Paid" | "Overdue" | "Void";
  issueDate: string;    // ISO date (YYYY-MM-DD)
  dueDate: string;      // ISO date
}
```

Derived value used by the page:

```ts
outstanding = Σ (invoice.amount − invoice.amountPaid)
              for invoices where status !== "Paid"
```

`amountPaid / amount` is used both for the progress bar and the paid/total display.

> ⚠️ **The page slices `MOCK_INVOICES.slice(0, 3)` first, then computes `outstanding`.**
> This means the "Outstanding" number and the "2 invoices" copy in `MetricCard` reflect only what's on screen, not the client's true total. When you switch to the API, decide whether the metric should show *global* outstanding (recommended) and split it from the rendered list.

---

## 5. Component Anatomy

The page is a single default-exported function `ClientBillingPage()` with four visual sections, all stacked in a `space-y-6` column.

```
ClientBillingPage
├─ Section A — Page header
│  ├─ <Breadcrumb items=[Portal → Billing] />
│  ├─ <h1> DollarSign icon + "Billing & Invoices"
│  └─ <p>  subtitle
│
├─ Section B — KPI grid (2 cols mobile / 4 cols ≥ lg)
│  ├─ <MetricCard title="Outstanding"   value={formatCurrency(outstanding)}
│  │                                    change="2 invoices" trend="up"    />
│  ├─ <MetricCard title="Paid (YTD)"    value="₹8,640"      trend="up"    />
│  ├─ <MetricCard title="Next Due"      value="Aug 1"       trend="neutral" />
│  └─ <MetricCard title="Auto-Pay"      value="Off"         trend="neutral" />
│
├─ Section C — Outstanding balance banner (amber)
│  ├─ Clock icon + outstanding total + helper text
│  └─ <Button variant="primary"> "Pay Now"      → addToast(...)
│
└─ Section D — Invoice cards (1 col mobile / 2 cols ≥ md)
   └─ invoices.map(inv → <Card>
        ├─ invoiceNumber, amount, dueDate
        ├─ <Badge> — "success" if Paid else "warning"
        ├─ Progress bar: amountPaid / amount
        └─ Row:
           ├─ if Paid → inline "Payment received" (green)
           │  else   → <Button size="sm"> "Pay invoice" → addToast(...)
           └─ "PDF" button (currently a no-op)
      </Card>)
```

### 5.1 Public API of the components used

| Component     | Props (relevant to this page)                                                                                                | Notes                                                       |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `Button`      | `variant`, `size`, `leftIcon`, `rightIcon`, `isLoading`, plus standard `<button>` attrs                                       | Adds a spinner when `isLoading` is true.                    |
| `Breadcrumb`  | `items: { name: string; href?: string }[]` — last item auto-renders as inert current-page label                              | Uses plain `<a>` tags; consider swapping to `next/link`.    |
| `Badge`       | `label \| children`, `variant: success \| warning \| error \| info \| neutral \| primary`, `size`                             | Uses `variant="success"` for Paid, `"warning"` otherwise.    |
| `Card`        | `header?`, `footer?`, `className?`, `children`                                                                               | Renders a slate-900/800 elevated container.                 |
| `MetricCard`  | `title`, `value`, `change?`, `trend? "up" \| "down" \| "neutral"`, `info?`                                                    | `trend` toggles the arrow color; `change`/`info` are captions. |

---

## 6. State, Side-Effects, Interactions

### 6.1 State
There is **no local `useState`** in the page. All interactivity flows through the app-wide `NotificationProvider`.

### 6.2 Handlers
```tsx
const { addToast } = useNotifications();

// Section C
onClick={() => addToast("Payment Initiated",
                        "Secure payment session started (simulated).",
                        "success")}

// Section D
onClick={() => addToast("Payment Initiated",
                        `Paying invoice ${inv.invoiceNumber}.`,
                        "success")}
```

`addToast(title, message, type)` pushes a toast into `NotificationContext`; it auto-dismisses after 4 s (see `NotificationProvider.tsx`). No navigation, no fetch, no `router.push`.

### 6.3 Not implemented yet
- **PDF button** — pure UI, no `onClick`. Wire this up when the invoice PDF endpoint exists.
- **Auto-Pay tile** — static "Off"; needs a settings source.
- **"Paid (YTD)" tile** — hard-coded `"₹8,640"`; replace with an aggregate.
- **"Next Due" tile** — hard-coded `"Aug 1"`; compute `min(dueDate)` over unpaid invoices.

---

## 7. Mocks → Real API Migration

### 7.1 Recommended contract

```
GET /api/client/billing/summary
→ { outstanding: number,
    paidYtd:    number,
    nextDueDate: string | null,
    autoPay:    boolean }

GET /api/client/invoices?limit=3&sort=-issueDate
→ Invoice[]

POST /api/client/invoices/:id/pay
→ { checkoutUrl: string }        // hand off to Razorpay/Stripe

GET  /api/client/invoices/:id/pdf
→ application/pdf (stream)
```

All endpoints are scoped to the authenticated client — the server derives `clientId` from the session; **never** accept it from the client.

### 7.2 Refactor: keep it a Client Component (minimal change)

```tsx
"use client";
import useSWR from "swr";
// ...
const fetcher = (u: string) => fetch(u).then(r => r.json());

export default function ClientBillingPage() {
  const { data: summary } = useSWR("/api/client/billing/summary", fetcher);
  const { data: invoices = [] } = useSWR<Invoice[]>(
    "/api/client/invoices?limit=3&sort=-issueDate", fetcher
  );
  // ...rest unchanged
}
```

### 7.3 Refactor: split into Server + Client (preferred)

Rename `page.tsx` to be a Server Component that fetches, and delegate rendering to a small client child that owns the `Pay` buttons and toasts:

```
src/app/(client)/client/billing/
├── page.tsx              ← Server Component (async, no "use client")
└── BillingView.tsx       ← "use client", receives {summary, invoices}
```

```tsx
// page.tsx
import { getClientBillingSummary, listRecentInvoices } from "@/server/billing";
import { BillingView } from "./BillingView";

export default async function Page() {
  const [summary, invoices] = await Promise.all([
    getClientBillingSummary(),
    listRecentInvoices({ limit: 3 }),
  ]);
  return <BillingView summary={summary} invoices={invoices} />;
}
```

Benefits: no client-side loader, no auth token in the browser, and SEO-safe defaults. Keep `useNotifications` inside `BillingView`.

### 7.4 Wiring the Pay button

```tsx
const onPay = async (invoiceId: string) => {
  addToast("Payment Initiated", "Redirecting to secure checkout…", "info");
  const res = await fetch(`/api/client/invoices/${invoiceId}/pay`, { method: "POST" });
  const { checkoutUrl } = await res.json();
  window.location.assign(checkoutUrl);
};
```

Keep the mock `addToast` call for the optimistic UI, then hand off.

---

## 8. Styling Conventions

- **Theme**: dark slate (`bg-slate-900`, borders `slate-800`, text `slate-300/400`). Success = emerald, warning = amber, danger = red.
- **Spacing**: outer container is `space-y-6`; grids use `gap-4`; card interiors use `p-5` (from `Card`).
- **Typography**: page title `text-xl sm:text-2xl font-bold`; metric values `text-2xl font-extrabold`; captions `text-[10px]–text-[11px]` uppercase for labels.
- **Icons**: use `lucide-react`. Do **not** substitute with emoji per project guideline.
- **Do not** add `data-testid` here yet — this file is mock-driven UI; add them when payment logic becomes real (see §10).

---

## 9. Accessibility

Current state and required improvements:

| Check                                              | Current | Action                                                              |
| -------------------------------------------------- | ------- | ------------------------------------------------------------------- |
| Breadcrumb has `aria-label="Breadcrumb"`           | ✅       | —                                                                   |
| Buttons are real `<button>` elements               | ✅       | —                                                                   |
| Progress bar has ARIA role                         | ❌       | Add `role="progressbar" aria-valuenow aria-valuemin aria-valuemax`. |
| PDF button has label                               | ⚠️      | Add `aria-label={"Download PDF for " + inv.invoiceNumber}`.         |
| Color-only status signaling                        | ⚠️      | The Badge already includes the text label, but ensure ≥ 4.5:1 contrast (dark theme is fine). |
| Focus ring                                         | ✅       | Provided by `Button` base styles.                                   |
| `<a>` in Breadcrumb → keyboard navigation          | ✅       | But consider `next/link` for client-side transitions.               |

---

## 10. Testing

Testing is not yet wired in the repo, but the intended shape:

**Unit (React Testing Library + Vitest/Jest)** — colocate as `page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import ClientBillingPage from "./page";
import { NotificationProvider } from "@/providers/NotificationProvider";

it("renders outstanding total from first three invoices", () => {
  render(<NotificationProvider><ClientBillingPage /></NotificationProvider>);
  expect(screen.getByText(/Outstanding/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Billing & Invoices/i })).toBeVisible();
});

it("fires a toast when Pay Now is clicked", async () => {
  // …click "Pay Now", assert toast appears
});
```

**E2E (Playwright)**:

1. Log in as a client with unpaid invoices.
2. Navigate to `/client/billing`.
3. Assert outstanding banner is visible and matches API.
4. Click **Pay Now** on the first unpaid invoice → expect redirect to `/checkout/...` or a toast in mock mode.
5. Click **PDF** → expect a PDF download (or the button to be enabled once wired).

Before adding E2E, sprinkle `data-testid` attributes:

- `data-testid="billing-pay-now-btn"` on the banner button
- `data-testid="billing-invoice-card"` on each `<Card>` (with the invoice number in a child)
- `data-testid="billing-pay-invoice-btn-{invoiceNumber}"`
- `data-testid="billing-invoice-pdf-btn-{invoiceNumber}"`
- `data-testid="billing-metric-outstanding"` on the KPI tile

---

## 11. Extension Recipes

### 11.1 Show all invoices with pagination

```tsx
const [page, setPage] = useState(1);
const pageSize = 10;
const invoices = MOCK_INVOICES.slice((page - 1) * pageSize, page * pageSize);
// …render a <Pagination /> below the grid.
```

Migrate to `?page=&pageSize=` query params so it survives refresh.

### 11.2 Filter by status

```tsx
type Filter = "All" | "Unpaid" | "Paid" | "Overdue";
const [filter, setFilter] = useState<Filter>("All");
const visible = MOCK_INVOICES.filter(i =>
  filter === "All"       ? true :
  filter === "Unpaid"    ? i.status !== "Paid" :
  filter === "Paid"      ? i.status === "Paid" :
  /* Overdue */            i.status === "Overdue"
);
```

Render a segmented control above Section D.

### 11.3 Compute the header metrics from data

```ts
const paidYtd = MOCK_INVOICES
  .filter(i => i.status === "Paid" && new Date(i.issueDate).getFullYear() === new Date().getFullYear())
  .reduce((s, i) => s + i.amountPaid, 0);

const nextDue = MOCK_INVOICES
  .filter(i => i.status !== "Paid")
  .map(i => i.dueDate)
  .sort()[0]; // ISO strings sort lexicographically
```

Then swap `value="₹8,640"` and `value="Aug 1"` for `formatCurrency(paidYtd)` and a formatted `nextDue`.

### 11.4 Real PDF download

```tsx
<button
  onClick={() => window.open(`/api/client/invoices/${inv.id}/pdf`, "_blank")}
  aria-label={`Download PDF for ${inv.invoiceNumber}`}
  className="..."
>
  <Download className="w-3.5 h-3.5" /> PDF
</button>
```

### 11.5 Enroll in Auto-Pay

Add a `SettingsProvider`-backed toggle:

```tsx
const { autoPay, setAutoPay } = useClientBillingSettings();

<MetricCard title="Auto-Pay" value={autoPay ? "On" : "Off"} trend="neutral" />
<Button size="sm" onClick={() => setAutoPay(!autoPay)}>Toggle</Button>
```

Persist via `POST /api/client/billing/auto-pay`.

---

## 12. Gotchas & Non-obvious behavior

1. **`.slice(0, 3)` is applied *before* `outstanding` is computed.** If the first 3 invoices are all Paid, the banner shows ₹0 even if the client owes crores. Fix when moving to API.
2. **`"2 invoices"` in the Outstanding tile is hard-coded** — not derived. Replace with `${unpaid.length} invoices`.
3. **Divide-by-zero risk on the progress bar** — `(inv.amountPaid / inv.amount) * 100`. `Invoice.amount` is required and >0 in the type, but be defensive if you loosen the schema.
4. **Breadcrumb uses `<a>`, not `next/link`** — full page reload on click. Migrate when convenient.
5. **All payments are simulated.** Do not ship this to production without wiring a real gateway (Razorpay is already the dominant `paymentMethod` value in mocks; see `src/types/Billing.ts`).
6. **The page assumes it's mounted inside `ClientLayout`** — the layout provides both the visual chrome and the `NotificationProvider` scope. Never render `<ClientBillingPage />` in isolation from Storybook without wrapping it in `NotificationProvider`.
7. **The sidebar badge `"2 Due"` in `Sidebar.tsx` is also hard-coded.** Keep it in sync with real data when you migrate.

---

## 13. Where to look next

- **Tenant-side counterpart** (staff view of the same domain): `src/app/(tenant)/workspace/billing/page.tsx` and its subroutes (`invoices/`, `payments/`, `expenses/`, `time-entries/`, `write-offs/`, `settings/`). Different audience; shared `Invoice`/`Payment` types.
- **Client dashboard** links here in two places: `src/app/(client)/client/dashboard/page.tsx` (`Link` at lines ~178 and ~200). Keep those hrefs correct if you ever move the route.
- **Types**: `src/types/Billing.ts` is the single source of truth for `Invoice` and `Payment`. If you add a status/method, add it here first.
- **Toasts**: `src/providers/NotificationProvider.tsx` — 4 s auto-dismiss, keyed by timestamp; safe to fire many.

---

## 14. Change checklist (for a PR touching this page)

- [ ] `outstanding` still derived, not hard-coded.
- [ ] All buttons have accessible labels; icons alone need `aria-label`.
- [ ] No new mock data added here — extend `src/mocks/billing.ts` or the API layer instead.
- [ ] `data-testid` added for every new interactive element.
- [ ] Payment side-effects go through a single `onPay(invoiceId)` helper.
- [ ] Screenshots refreshed in the PR description (dark theme is easy to break).
- [ ] Sidebar badge in `src/components/navigation/Sidebar.tsx` still accurate.
