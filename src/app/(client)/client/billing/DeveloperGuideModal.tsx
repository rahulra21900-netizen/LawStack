"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X,
  BookOpen,
  Route,
  FolderTree,
  Database,
  Layout,
  Zap,
  PlugZap,
  Palette,
  Accessibility,
  FlaskConical,
  Wrench,
  AlertTriangle,
  ListChecks,
  Rocket,
} from "lucide-react";

type Section = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const SECTIONS: Section[] = [
  { id: "overview", label: "1. Overview & Purpose", icon: BookOpen },
  { id: "route", label: "2. Route & Layout", icon: Route },
  { id: "files", label: "3. File Map", icon: FolderTree },
  { id: "data", label: "4. Data Model", icon: Database },
  { id: "anatomy", label: "5. Component Anatomy", icon: Layout },
  { id: "state", label: "6. State & Handlers", icon: Zap },
  { id: "api", label: "7. Mocks → Real API", icon: PlugZap },
  { id: "styling", label: "8. Styling", icon: Palette },
  { id: "a11y", label: "9. Accessibility", icon: Accessibility },
  { id: "testing", label: "10. Testing", icon: FlaskConical },
  { id: "extend", label: "11. Extension Recipes", icon: Wrench },
  { id: "gotchas", label: "12. Gotchas", icon: AlertTriangle },
  { id: "checklist", label: "13. PR Checklist", icon: ListChecks },
  { id: "next", label: "14. Where to look next", icon: Rocket },
];

export function DeveloperGuideModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [active, setActive] = useState<string>("overview");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Close on Escape + body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  // Reset scroll position every time we open.
  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollTo({ top: 0 });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const goTo = (id: string) => {
    setActive(id);
    const el = scrollRef.current?.querySelector<HTMLElement>(`#dg-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dg-title"
      data-testid="dev-guide-modal"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-6xl h-[90vh] rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/50 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3 min-w-0">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600/15 border border-emerald-500/30 shrink-0">
              <BookOpen className="w-4 h-4 text-emerald-400" />
            </span>
            <div className="min-w-0">
              <h2
                id="dg-title"
                className="text-sm sm:text-base font-bold text-white truncate"
              >
                Developer Guide — <span className="font-mono text-emerald-400">/client/billing</span>
              </h2>
              <p className="text-[11px] text-slate-400 truncate">
                Everything a new engineer needs to understand, extend, and ship this page.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close developer guide"
            data-testid="dev-guide-close-btn"
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body: sidebar nav + scrollable content */}
        <div className="flex-1 min-h-0 flex">
          {/* Sidebar nav */}
          <nav
            aria-label="Guide sections"
            className="hidden md:block w-64 shrink-0 border-r border-slate-800 bg-slate-950/20 overflow-y-auto py-3"
          >
            <ul className="space-y-0.5 px-2">
              {SECTIONS.map((s) => {
                const Icon = s.icon;
                const isActive = active === s.id;
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => goTo(s.id)}
                      data-testid={`dev-guide-nav-${s.id}`}
                      className={
                        "w-full text-left flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-semibold transition-colors " +
                        (isActive
                          ? "bg-emerald-600/15 text-emerald-300 border border-emerald-500/25"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent")
                      }
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{s.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Content */}
          <div
            ref={scrollRef}
            className="flex-1 min-w-0 overflow-y-auto px-5 sm:px-8 py-6 text-slate-300 text-[13px] leading-relaxed"
          >
            <GuideContent />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 bg-slate-950/40 px-5 py-3 flex items-center justify-between text-[11px] text-slate-500">
          <span>
            Source of truth:{" "}
            <span className="font-mono text-slate-400">
              src/app/(client)/client/billing/page.tsx
            </span>
          </span>
          <span className="hidden sm:inline">
            Press{" "}
            <kbd className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300 font-mono text-[10px]">
              Esc
            </kbd>{" "}
            to close
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  The actual guide content — mirrors the co-located README.md.              */
/* -------------------------------------------------------------------------- */

function H({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3
      id={`dg-${id}`}
      className="scroll-mt-4 text-white text-base font-bold mb-3 mt-8 first:mt-0 flex items-center gap-2"
    >
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-slate-300">{children}</p>;
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="my-3 rounded-lg border border-slate-800 bg-slate-950/60 p-3 overflow-x-auto text-[11.5px] leading-relaxed text-slate-300 font-mono">
      <code>{children}</code>
    </pre>
  );
}

function Inline({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-slate-800/70 border border-slate-700 text-emerald-300 font-mono text-[11.5px]">
      {children}
    </code>
  );
}

function Callout({
  tone = "info",
  children,
}: {
  tone?: "info" | "warn" | "danger";
  children: React.ReactNode;
}) {
  const tones = {
    info: "border-blue-500/25 bg-blue-500/5 text-blue-100",
    warn: "border-amber-500/25 bg-amber-500/5 text-amber-100",
    danger: "border-red-500/25 bg-red-500/5 text-red-100",
  } as const;
  return (
    <div className={`my-3 rounded-lg border p-3 text-[12px] ${tones[tone]}`}>
      {children}
    </div>
  );
}

function GuideContent() {
  return (
    <article className="max-w-3xl">
      {/* 1. OVERVIEW ------------------------------------------------------- */}
      <H id="overview">1. Overview &amp; Purpose</H>
      <P>
        <Inline>/client/billing</Inline> is the client-facing <b>Billing &amp; Invoices</b> portal.
        A signed-in client lands here to see how much they owe, review recent invoices, pay outstanding
        balances, and download PDFs.
      </P>
      <P>
        <b>Why it exists:</b> the tenant-side app already tracks invoices in{" "}
        <Inline>/workspace/billing</Inline>. Clients need a read-mostly, safe surface — no editing,
        no seeing other clients&apos; data — with one job: convert an outstanding balance into a paid one
        as quickly as possible. That&apos;s why the page leads with a big <b>Outstanding</b> KPI, a bright{" "}
        <b>Pay Now</b> banner, and per-invoice pay buttons.
      </P>
      <P>
        <b>What it is technically:</b> a Next.js App Router page that renders on the client
        (<Inline>&quot;use client&quot;</Inline>), mounted inside <Inline>ClientLayout</Inline>.
        Data today comes from <Inline>MOCK_INVOICES</Inline>; payments are simulated via toasts.
      </P>

      {/* 2. ROUTE & LAYOUT ------------------------------------------------- */}
      <H id="route">2. Route &amp; Layout Contract</H>
      <Code>{`URL          : /client/billing
Segment      : src/app/(client)/client/billing/page.tsx
Route group  : (client)          → does not appear in the URL
Layout       : src/app/(client)/layout.tsx → wraps in <ClientLayout>
Nav entry    : src/components/navigation/Sidebar.tsx
               { name: "Invoices & Billing", href: "/client/billing",
                 icon: DollarSign, badge: "2 Due" }`}</Code>
      <P>
        Because the file starts with <Inline>&quot;use client&quot;</Inline>, everything runs in the browser.
        Don&apos;t convert it to a Server Component without also removing the <Inline>useNotifications</Inline> hook.
      </P>
      <P>
        The parent <Inline>ClientLayout</Inline> supplies the Header, Sidebar, and container padding.
        The global <Inline>NotificationProvider</Inline> (mounted in <Inline>src/providers/index.tsx</Inline>)
        is what <Inline>useNotifications()</Inline> reads.
      </P>

      {/* 3. FILE MAP ------------------------------------------------------- */}
      <H id="files">3. File Map</H>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-[12px] border border-slate-800 rounded-lg overflow-hidden">
          <thead className="bg-slate-950/60 text-slate-300">
            <tr>
              <th className="text-left px-3 py-2 border-b border-slate-800">Import</th>
              <th className="text-left px-3 py-2 border-b border-slate-800">Path</th>
              <th className="text-left px-3 py-2 border-b border-slate-800">Role</th>
            </tr>
          </thead>
          <tbody className="text-slate-400">
            <tr>
              <td className="px-3 py-2 border-b border-slate-800/60"><Inline>useNotifications</Inline></td>
              <td className="px-3 py-2 border-b border-slate-800/60 font-mono text-[11px]">src/hooks/useNotifications.ts</td>
              <td className="px-3 py-2 border-b border-slate-800/60">Toast when Pay buttons are clicked.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border-b border-slate-800/60"><Inline>Breadcrumb, Badge, Button</Inline></td>
              <td className="px-3 py-2 border-b border-slate-800/60 font-mono text-[11px]">src/components/ui/CoreUi.tsx</td>
              <td className="px-3 py-2 border-b border-slate-800/60">Header nav, status pill, actions.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border-b border-slate-800/60"><Inline>Card, MetricCard</Inline></td>
              <td className="px-3 py-2 border-b border-slate-800/60 font-mono text-[11px]">src/components/cards/ContentCards.tsx</td>
              <td className="px-3 py-2 border-b border-slate-800/60">Invoice cards + KPI tiles.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border-b border-slate-800/60"><Inline>MOCK_INVOICES</Inline></td>
              <td className="px-3 py-2 border-b border-slate-800/60 font-mono text-[11px]">src/mocks/billing.ts</td>
              <td className="px-3 py-2 border-b border-slate-800/60">Seed data (Invoice[]).</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border-b border-slate-800/60"><Inline>formatCurrency</Inline></td>
              <td className="px-3 py-2 border-b border-slate-800/60 font-mono text-[11px]">src/utils/formatCurrency.ts</td>
              <td className="px-3 py-2 border-b border-slate-800/60">INR (<Inline>en-IN</Inline>) formatter.</td>
            </tr>
            <tr>
              <td className="px-3 py-2"><Inline>Invoice</Inline> (type)</td>
              <td className="px-3 py-2 font-mono text-[11px]">src/types/Billing.ts</td>
              <td className="px-3 py-2">Shape of every item in <Inline>MOCK_INVOICES</Inline>.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4. DATA MODEL ----------------------------------------------------- */}
      <H id="data">4. Data Model</H>
      <Code>{`// src/types/Billing.ts
export interface Invoice {
  id: string;
  tenantId: string;
  clientId: string;
  caseId?: string;
  invoiceNumber: string;
  amount: number;      // total invoice amount
  amountPaid: number;  // sum of payments applied
  status: "Draft" | "Sent" | "Partially_Paid"
        | "Paid" | "Overdue" | "Void";
  issueDate: string;   // ISO date (YYYY-MM-DD)
  dueDate: string;
}`}</Code>
      <P>Derived on the page:</P>
      <Code>{`outstanding = Σ (invoice.amount − invoice.amountPaid)
              for invoices where status !== "Paid"`}</Code>
      <Callout tone="warn">
        <b>Bug worth knowing:</b> <Inline>.slice(0, 3)</Inline> is applied <i>before</i> computing{" "}
        <Inline>outstanding</Inline>. The banner therefore reflects only the on-screen 3 invoices, not the
        client&apos;s true total. Fix when wiring the API — see §7.
      </Callout>

      {/* 5. ANATOMY -------------------------------------------------------- */}
      <H id="anatomy">5. Component Anatomy</H>
      <P>Four vertical sections in a <Inline>space-y-6</Inline> column:</P>
      <Code>{`ClientBillingPage
├─ A  Page header — Breadcrumb + Title + subtitle
├─ B  KPI grid (2 cols / 4 cols ≥lg)
│     Outstanding · Paid (YTD) · Next Due · Auto-Pay
├─ C  Amber outstanding banner + "Pay Now" button
└─ D  Invoice cards (1 col / 2 cols ≥md)
       ├ invoiceNumber, amount, dueDate
       ├ <Badge> success (Paid) / warning (unpaid)
       ├ progress bar (amountPaid / amount)
       └ Pay invoice + PDF buttons`}</Code>

      <P><b>Component APIs (what this page passes):</b></P>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-[12px] border border-slate-800 rounded-lg overflow-hidden">
          <thead className="bg-slate-950/60 text-slate-300">
            <tr>
              <th className="text-left px-3 py-2 border-b border-slate-800">Component</th>
              <th className="text-left px-3 py-2 border-b border-slate-800">Props used</th>
              <th className="text-left px-3 py-2 border-b border-slate-800">Notes</th>
            </tr>
          </thead>
          <tbody className="text-slate-400">
            <tr>
              <td className="px-3 py-2 border-b border-slate-800/60"><Inline>Button</Inline></td>
              <td className="px-3 py-2 border-b border-slate-800/60"><Inline>variant, size, leftIcon, rightIcon, isLoading</Inline></td>
              <td className="px-3 py-2 border-b border-slate-800/60">Spinner shows when <Inline>isLoading</Inline>.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border-b border-slate-800/60"><Inline>Breadcrumb</Inline></td>
              <td className="px-3 py-2 border-b border-slate-800/60"><Inline>items: {`{name, href?}[]`}</Inline></td>
              <td className="px-3 py-2 border-b border-slate-800/60">Last item is inert.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border-b border-slate-800/60"><Inline>Badge</Inline></td>
              <td className="px-3 py-2 border-b border-slate-800/60"><Inline>label, variant, size</Inline></td>
              <td className="px-3 py-2 border-b border-slate-800/60"><Inline>success</Inline> = Paid, else <Inline>warning</Inline>.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border-b border-slate-800/60"><Inline>Card</Inline></td>
              <td className="px-3 py-2 border-b border-slate-800/60"><Inline>header?, footer?, className?</Inline></td>
              <td className="px-3 py-2 border-b border-slate-800/60">Slate-900 container.</td>
            </tr>
            <tr>
              <td className="px-3 py-2"><Inline>MetricCard</Inline></td>
              <td className="px-3 py-2"><Inline>title, value, change?, trend?, info?</Inline></td>
              <td className="px-3 py-2"><Inline>trend</Inline> toggles arrow color.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 6. STATE ---------------------------------------------------------- */}
      <H id="state">6. State &amp; Handlers</H>
      <P>
        There is <b>no local <Inline>useState</Inline></b> in the page. Interactivity flows entirely through the app-wide{" "}
        <Inline>NotificationProvider</Inline>.
      </P>
      <Code>{`const { addToast } = useNotifications();

// Banner
onClick={() => addToast("Payment Initiated",
                        "Secure payment session started (simulated).",
                        "success")}

// Per-invoice
onClick={() => addToast("Payment Initiated",
                        \`Paying invoice \${inv.invoiceNumber}.\`,
                        "success")}`}</Code>
      <P>
        Toasts auto-dismiss after 4&nbsp;s. Nothing else happens on click — no fetch, no navigation.
        Consciously simulated so the whole page stays runnable without a backend.
      </P>

      {/* 7. API MIGRATION -------------------------------------------------- */}
      <H id="api">7. Mocks → Real API Migration</H>
      <P><b>Recommended endpoints</b> (server derives <Inline>clientId</Inline> from session — never trust the client):</P>
      <Code>{`GET  /api/client/billing/summary
     → { outstanding, paidYtd, nextDueDate, autoPay }
GET  /api/client/invoices?limit=3&sort=-issueDate → Invoice[]
POST /api/client/invoices/:id/pay  → { checkoutUrl }
GET  /api/client/invoices/:id/pdf  → application/pdf`}</Code>

      <P><b>Option A — minimal change</b> (stay client-side with SWR):</P>
      <Code>{`"use client";
import useSWR from "swr";
const fetcher = (u: string) => fetch(u).then(r => r.json());

const { data: summary } = useSWR("/api/client/billing/summary", fetcher);
const { data: invoices = [] } = useSWR<Invoice[]>(
  "/api/client/invoices?limit=3&sort=-issueDate", fetcher
);`}</Code>

      <P><b>Option B — recommended</b> (split into Server + Client):</P>
      <Code>{`src/app/(client)/client/billing/
├── page.tsx         ← Server Component (async, no "use client")
└── BillingView.tsx  ← "use client", owns Pay buttons + toasts

// page.tsx
export default async function Page() {
  const [summary, invoices] = await Promise.all([
    getClientBillingSummary(),
    listRecentInvoices({ limit: 3 }),
  ]);
  return <BillingView summary={summary} invoices={invoices} />;
}`}</Code>

      <P><b>Wiring Pay:</b></P>
      <Code>{`const onPay = async (invoiceId: string) => {
  addToast("Payment Initiated", "Redirecting to secure checkout…", "info");
  const res = await fetch(\`/api/client/invoices/\${invoiceId}/pay\`, { method: "POST" });
  const { checkoutUrl } = await res.json();
  window.location.assign(checkoutUrl);
};`}</Code>

      {/* 8. STYLING -------------------------------------------------------- */}
      <H id="styling">8. Styling Conventions</H>
      <ul className="list-disc pl-5 space-y-1 mb-3 text-slate-300">
        <li>Theme: <b>dark slate</b> (<Inline>bg-slate-900</Inline>, borders <Inline>slate-800</Inline>).</li>
        <li>Status colors: <span className="text-emerald-400 font-semibold">emerald</span> = paid / success, <span className="text-amber-400 font-semibold">amber</span> = warning, <span className="text-red-400 font-semibold">red</span> = danger.</li>
        <li>Outer container is <Inline>space-y-6</Inline>; grids use <Inline>gap-4</Inline>; cards get <Inline>p-5</Inline>.</li>
        <li>Icons come from <Inline>lucide-react</Inline>. <b>Do not</b> substitute with emoji.</li>
        <li>Typography: title <Inline>text-xl sm:text-2xl font-bold</Inline>, metric values <Inline>text-2xl font-extrabold</Inline>, captions <Inline>text-[10px]–[11px] uppercase</Inline>.</li>
      </ul>

      {/* 9. A11Y ----------------------------------------------------------- */}
      <H id="a11y">9. Accessibility</H>
      <ul className="list-disc pl-5 space-y-1 mb-3 text-slate-300">
        <li>✅ Breadcrumb has <Inline>aria-label=&quot;Breadcrumb&quot;</Inline>.</li>
        <li>✅ Buttons are real <Inline>&lt;button&gt;</Inline> elements with focus rings.</li>
        <li>⚠️ Progress bar needs <Inline>role=&quot;progressbar&quot; aria-valuenow …</Inline>.</li>
        <li>⚠️ PDF icon-only button needs <Inline>{"aria-label={`Download PDF for ${inv.invoiceNumber}`}"}</Inline>.</li>
        <li>ℹ️ Status is signaled by both color <i>and</i> label text — good.</li>
        <li>ℹ️ Consider swapping Breadcrumb <Inline>&lt;a&gt;</Inline> for <Inline>next/link</Inline> to keep client-side transitions.</li>
      </ul>

      {/* 10. TESTING ------------------------------------------------------- */}
      <H id="testing">10. Testing</H>
      <P><b>Unit</b> (RTL + Vitest/Jest):</P>
      <Code>{`import { render, screen } from "@testing-library/react";
import ClientBillingPage from "./page";
import { NotificationProvider } from "@/providers/NotificationProvider";

it("renders the outstanding total", () => {
  render(
    <NotificationProvider>
      <ClientBillingPage />
    </NotificationProvider>
  );
  expect(screen.getByRole("heading",
    { name: /Billing & Invoices/i })).toBeVisible();
});`}</Code>
      <P><b>E2E</b> (Playwright): log in as a client with unpaid invoices → visit <Inline>/client/billing</Inline> → assert banner → click <b>Pay Now</b> → expect toast or checkout redirect.</P>
      <P><b>Recommended test IDs to add on <Inline>page.tsx</Inline>:</b></P>
      <ul className="list-disc pl-5 space-y-1 mb-3 text-slate-400 font-mono text-[11.5px]">
        <li>billing-pay-now-btn</li>
        <li>billing-invoice-card</li>
        <li>{`billing-pay-invoice-btn-\${invoiceNumber}`}</li>
        <li>{`billing-invoice-pdf-btn-\${invoiceNumber}`}</li>
        <li>billing-metric-outstanding</li>
      </ul>

      {/* 11. EXTENSIONS ---------------------------------------------------- */}
      <H id="extend">11. Extension Recipes</H>
      <P><b>a. Paginate all invoices</b></P>
      <Code>{`const [page, setPage] = useState(1);
const pageSize = 10;
const invoices = MOCK_INVOICES.slice(
  (page - 1) * pageSize, page * pageSize
);`}</Code>
      <P><b>b. Filter by status</b></P>
      <Code>{`type Filter = "All" | "Unpaid" | "Paid" | "Overdue";
const [filter, setFilter] = useState<Filter>("All");
const visible = MOCK_INVOICES.filter(i =>
  filter === "All"    ? true :
  filter === "Unpaid" ? i.status !== "Paid" :
  filter === "Paid"   ? i.status === "Paid" :
                        i.status === "Overdue"
);`}</Code>
      <P><b>c. Derive real KPI values</b></P>
      <Code>{`const paidYtd = MOCK_INVOICES
  .filter(i => i.status === "Paid"
       && new Date(i.issueDate).getFullYear() === new Date().getFullYear())
  .reduce((s, i) => s + i.amountPaid, 0);

const nextDue = MOCK_INVOICES
  .filter(i => i.status !== "Paid")
  .map(i => i.dueDate).sort()[0];`}</Code>
      <P><b>d. Real PDF download</b></P>
      <Code>{`<button
  onClick={() => window.open(\`/api/client/invoices/\${inv.id}/pdf\`, "_blank")}
  aria-label={\`Download PDF for \${inv.invoiceNumber}\`}
>
  <Download className="w-3.5 h-3.5" /> PDF
</button>`}</Code>

      {/* 12. GOTCHAS ------------------------------------------------------- */}
      <H id="gotchas">12. Gotchas &amp; Non-obvious Behaviour</H>
      <ol className="list-decimal pl-5 space-y-2 mb-3 text-slate-300">
        <li><Inline>.slice(0, 3)</Inline> runs before <Inline>outstanding</Inline> — the banner can under-report the true debt.</li>
        <li>&quot;2 invoices&quot; caption on the Outstanding tile is <b>hard-coded</b>, not derived.</li>
        <li>&quot;Paid (YTD)&quot; <Inline>₹8,640</Inline>, &quot;Next Due&quot; <Inline>Aug 1</Inline>, and &quot;Auto-Pay&quot; <Inline>Off</Inline> are all static placeholders.</li>
        <li>Progress bar can divide by zero if <Inline>amount === 0</Inline>. Type says it&apos;s required, but be defensive at API boundary.</li>
        <li>Breadcrumb uses raw <Inline>&lt;a&gt;</Inline> — full page reload on click. Prefer <Inline>next/link</Inline>.</li>
        <li><b>All payments are simulated.</b> No real gateway is wired.</li>
        <li>Assumes it&apos;s mounted inside <Inline>ClientLayout</Inline> (for <Inline>NotificationProvider</Inline> scope). Wrap manually in Storybook.</li>
        <li>Sidebar badge &quot;2 Due&quot; in <Inline>Sidebar.tsx</Inline> is also hard-coded.</li>
      </ol>

      {/* 13. PR CHECKLIST -------------------------------------------------- */}
      <H id="checklist">13. PR Checklist</H>
      <ul className="space-y-1.5 mb-3 text-slate-300">
        {[
          "outstanding still derived, not hard-coded",
          "All buttons have accessible labels; icon-only buttons use aria-label",
          "No new mock data added here — extend src/mocks/billing.ts or the API layer",
          "data-testid added for every new interactive element",
          "Payment side-effects go through a single onPay(invoiceId) helper",
          "Screenshots refreshed in the PR (dark theme is easy to break)",
          "Sidebar badge in Sidebar.tsx still accurate",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1 accent-emerald-500 shrink-0"
              aria-label={item}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* 14. WHERE TO LOOK NEXT ------------------------------------------- */}
      <H id="next">14. Where to look next</H>
      <ul className="list-disc pl-5 space-y-1 mb-6 text-slate-300">
        <li><b>Tenant counterpart:</b> <Inline>src/app/(tenant)/workspace/billing/page.tsx</Inline> and its subroutes (<Inline>invoices/</Inline>, <Inline>payments/</Inline>, <Inline>expenses/</Inline>, <Inline>time-entries/</Inline>, <Inline>write-offs/</Inline>, <Inline>settings/</Inline>). Shared types, different audience.</li>
        <li><b>Client dashboard</b> links here in two places: <Inline>src/app/(client)/client/dashboard/page.tsx</Inline> (lines ~178 and ~200). Keep those hrefs correct if the route ever moves.</li>
        <li><b>Types:</b> <Inline>src/types/Billing.ts</Inline> — single source of truth for <Inline>Invoice</Inline> and <Inline>Payment</Inline>.</li>
        <li><b>Toasts:</b> <Inline>src/providers/NotificationProvider.tsx</Inline> — 4&nbsp;s auto-dismiss, safe to fire many.</li>
        <li><b>Full markdown copy of this guide:</b> co-located <Inline>README.md</Inline>.</li>
      </ul>
    </article>
  );
}
