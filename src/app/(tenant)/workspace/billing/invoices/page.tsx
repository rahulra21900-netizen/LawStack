"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Input, Select } from "@/components/forms";
import { MOCK_INVOICES } from "@/mocks/billing";
import { DollarSign, Download, Plus, BookOpen, X } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/utils";

export default function InvoicesListPage() {
  const { addToast } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  const filteredInvoices = MOCK_INVOICES.filter((i) => i.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Billing", href: "/workspace/billing" }, { name: "Invoices" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            <span>Invoices Ledger</span>
          </h1>
          <p className="text-xs text-slate-400">Search and audit client bills, payments, and overdue accounts.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeveloperGuide(true)}
            className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10"
            leftIcon={<BookOpen className="h-4 w-4" />}
          >
            Developer Guide
          </Button>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => addToast("Export Invoices", "Invoice spreadsheet CSV exported.", "success")}
          >
            Export CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => addToast("Create Invoice", "Invoice creation wizard launched.", "info")}
          >
            New Invoice
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <Input
          placeholder="Search by invoice number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          options={[
            { label: "All Invoice Statuses", value: "all" },
            { label: "Paid", value: "Paid" },
            { label: "Unpaid", value: "Unpaid" },
            { label: "Overdue", value: "Overdue" }
          ]}
          onChange={() => {}}
        />
      </div>

      {/* Invoices Data Table */}
      <DataTable
        data={filteredInvoices}
        columns={[
          {
            header: "Invoice Number",
            accessor: (i) => (
              <Link href={`/workspace/billing/invoices/${i.id}`} className="font-bold text-blue-400 hover:underline">
                {i.invoiceNumber}
              </Link>
            )
          },
          { header: "Total Amount", accessor: (i) => <span className="font-semibold text-white">{formatCurrency(i.amount)}</span> },
          { header: "Due Date", accessor: (i) => <span className="text-slate-400">{i.dueDate}</span> },
          { header: "Status", accessor: (i) => <Badge label={i.status} variant={i.status === "Paid" ? "success" : i.status === "Overdue" ? "error" : "warning"} /> }
        ]}
      />

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Invoices Ledger — Developer Guide</h2>
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
                      The Invoices Ledger is the complete legal bill register detailing fee statements, retainer draw-downs, payment status badges, and due dates.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Advocate's Perspective):</strong>
                    <p className="text-slate-400">
                      Attorneys must track unpaid and overdue client accounts (e.g. invoices pending for &gt;30 days) to issue formal payment notices before taking further legal steps.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1 text-slate-300">
                    <li>• <strong className="text-white">List Invoices API:</strong> <code className="text-blue-400">GET /api/billing/invoices?search=&status=</code></li>
                    <li>• <strong className="text-white">Create Invoice API:</strong> <code className="text-blue-400">POST /api/billing/invoices</code></li>
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

