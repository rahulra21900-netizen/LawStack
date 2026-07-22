"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/ui";
import { MOCK_INVOICES } from "@/mocks/billing";
import { ArrowLeft, BookOpen, X } from "lucide-react";
import { formatCurrency } from "@/utils";

export default function InvoiceDetailsLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const pathname = usePathname();
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  const invoiceData = MOCK_INVOICES.find((i) => i.id === id);

  if (!invoiceData) {
    return (
      <div className="p-8 text-center text-xs text-red-400">
        Error: Invoice ID "{id}" does not exist in dockets ledger.
      </div>
    );
  }

  const tabs = [
    { name: "Overview", path: "overview" },
    { name: "Activity Trail", path: "activity" },
    { name: "Payments History", path: "history" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Info Panel */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Billing", href: "/workspace/billing" }, { name: "Invoices", href: "/workspace/billing/invoices" }, { name: invoiceData.invoiceNumber }]} />
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Invoice: {invoiceData.invoiceNumber}</h1>
            </div>
            <p className="text-xs text-slate-400">Amount: <strong className="text-slate-200">{formatCurrency(invoiceData.amount)}</strong> • Status: {invoiceData.status} • Due Date: {invoiceData.dueDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeveloperGuide(true)}
              className="flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg font-semibold transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Developer Guide</span>
            </button>
            <Link href="/workspace/billing/invoices">
              <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg font-semibold">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Invoices Ledger</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Tab Links Row */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-2">
          {tabs.map((tab) => {
            const isSelected = pathname.endsWith(`/workspace/billing/invoices/${id}/${tab.path}`) || (tab.path === "overview" && pathname.endsWith(`/workspace/billing/invoices/${id}`));
            return (
              <Link
                key={tab.path}
                href={`/workspace/billing/invoices/${id}/${tab.path}`}
                className={`px-4 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  isSelected ? "border-emerald-500 text-emerald-400 bg-emerald-500/5 font-bold" : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tab Panels Contents */}
      <div className="bg-slate-900/30 border border-slate-800/80 rounded-xl p-5 md:p-6 min-h-[300px]">
        {children}
      </div>

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Invoice Detail Workspace — Developer Guide ({invoiceData.invoiceNumber})</h2>
              </div>
              <button
                onClick={() => setShowDeveloperGuide(false)}
                className="rounded-lg border border-slate-700 p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                aria-label="Close developer guide modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-6 p-6 text-sm text-slate-300">
              {/* Mandatory Section 1: What it is & Why it is needed */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  1. Core Purpose & Mandatory Overview
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-3">
                  <div>
                    <strong className="text-white text-sm block mb-1">What it is:</strong>
                    <p className="text-slate-300">
                      This is the dedicated 360-degree Invoice Detail Workspace Hub for a specific client bill (ID: <code className="text-emerald-400">{id}</code>). It provides 3 sub-tabs to inspect line-item breakdowns, audit modification logs, and verify payment receipts.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Advocate's Perspective):</strong>
                    <p className="text-slate-400">
                      Enables partners to review detailed professional fee line items, verify court expense reimbursements, inspect partial payment deposits, and export GST-compliant PDF bills.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: 3 Sub-Tabs Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Complete Invoice Sub-Tabs Breakdown (3 Sub-Tabs)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">1. Overview (`/overview`)</p>
                    <p className="text-slate-400">Invoice summary, line items, professional fees, and out-of-pocket expenses.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">2. Activity Trail (`/activity`)</p>
                    <p className="text-slate-400">Audit log of invoice generation, client dispatches, and status changes.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">3. Payments History (`/history`)</p>
                    <p className="text-slate-400">Historical transaction log of client payments, retainer draw-downs, and UPI/NEFT references.</p>
                  </div>
                </div>
              </section>

              {/* Section 3: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1 text-slate-300">
                    <li>• <strong className="text-white">Get Invoice Profile:</strong> <code className="text-blue-400">GET /api/billing/invoices/[id]</code></li>
                    <li>• <strong className="text-white">Get Payment History:</strong> <code className="text-blue-400">GET /api/billing/invoices/[id]/history</code></li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

