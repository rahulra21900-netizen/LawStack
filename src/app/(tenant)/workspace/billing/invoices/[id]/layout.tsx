"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/ui";
import { MOCK_INVOICES } from "@/mocks/billing";
import { ArrowLeft } from "lucide-react";
import { formatCurrency } from "@/utils";

export default function InvoiceDetailsLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const pathname = usePathname();

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
          <Link href="/workspace/billing/invoices">
            <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Invoices Ledger</span>
            </button>
          </Link>
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
    </div>
  );
}
