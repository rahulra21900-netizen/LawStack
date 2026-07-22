"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_INVOICES } from "@/mocks/billing";
import { DollarSign, Download, TrendingUp, Clock, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, BookOpen, X } from "lucide-react";
import { formatCurrency } from "@/utils";
import { MetricCard, Card } from "@/components/cards";

export default function BillingPage() {
  const { addToast } = useNotifications();
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Billing" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600/15 border border-emerald-500/30">
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </span>
            <span>Billing Ledger & Invoices</span>
          </h1>
          <p className="text-xs text-slate-400">Track outstanding retainer fees, payment receipts, and draft bills.</p>
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
            variant="primary"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => addToast("Export Ledgers", "CSV financial summary report downloaded (simulated).", "success")}
          >
            Export Ledger Report
          </Button>
        </div>
      </div>

      {/* Module 6: Live 1-Click Active Billable Hours Timer Widget */}
      <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">Active Billable Hours Tracker</span>
                <Badge label="Timer Running: 01:42:18" variant="success" size="sm" />
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">
                Active Matter: <strong>State v. Sharma (Anticipatory Bail Brief)</strong> · Lead: Priya Chandra
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                Rate: ₹4,500/hr · Unbilled Time Accrued: ₹7,650
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="primary"
              size="sm"
              onClick={() => addToast("Time Entry Logged", "Logged 1 hr 42 mins (₹7,650) to State v. Sharma ledger & generated draft invoice.", "success")}
            >
              Stop & Auto-Generate Invoice
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Outstanding" value="₹42,180" trend="up" change="6 invoices" info="Awaiting payment" />
        <MetricCard title="Collected (MTD)" value="₹128.4k" trend="up" change="+12.4%" info="This month" />
        <MetricCard title="Overdue" value="2" trend="down" change="Past due" info="Requires follow-up" />
        <MetricCard title="Billable Hours" value="1,284" trend="up" change="+86 this week" info="Logged" />
      </div>

      <DataTable
        title="Invoices Ledger"
        data={MOCK_INVOICES}
        columns={[
          { header: "Invoice Number", accessor: (i) => <span className="font-mono text-white font-bold">{i.invoiceNumber}</span> },
          { header: "Total Amount", accessor: (i) => <span className="font-semibold">{formatCurrency(i.amount)}</span> },
          { header: "Paid Amount", accessor: (i) => <span className="text-emerald-400 font-semibold">{formatCurrency(i.amountPaid)}</span> },
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
                <h2 className="text-lg font-bold text-white">Billing Ledger & Retainers — Developer Guide</h2>
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
                      The Billing Ledger & Retainers Workspace is the financial operations hub for tracking client retainer deposits, billable hourly work, fixed court appearance fees, out-of-pocket court expenses, and tax-compliant invoicing.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Senior Advocate & Judicial Officer's Perspective):</strong>
                    <p className="text-slate-400">
                      Indian advocates manage distinct fee structures under strict legal regulations:
                      <br />
                      • **Appearance Fees & Retainers:** Senior Advocates charge a fixed fee per court appearance (e.g. ₹2,50,000 per hearing call) or monthly retainers for corporate clients.
                      <br />
                      • **GST Reverse Charge Mechanism (RCM):** Under Notification No. 13/2017-Central Tax (Rate), legal services provided by an advocate or firm to a business entity are subject to 18% GST under Reverse Charge Mechanism (where the client pays GST directly to the government).
                      <br />
                      • **Bar Council Rules (No Contingent Fees):** Rule 36 of the Bar Council of India Rules strictly prohibits advocates from charging contingent fees based on the outcome of litigation.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Indian Legal Billing Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in Indian legal practice, here are the core concepts:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Retainer Ledger / Advance Escrow</strong>
                      <p className="text-slate-400 text-[11px]">
                        Client advance funds deposited upfront before litigation begins. Invoices deduct fees directly from this retainer balance.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Appearance Fee per Hearing</strong>
                      <p className="text-slate-400 text-[11px]">
                        Fixed professional fee charged by Senior Counsel for each court hearing call regardless of hearing duration.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Reverse Charge GST (18% RCM)</strong>
                      <p className="text-slate-400 text-[11px]">
                        Tax mechanism where business clients pay the 18% GST liability directly to GSTN, exempting the advocate from collecting GST on business invoices.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. Out-of-Pocket Expenses (OPE)</strong>
                      <p className="text-slate-400 text-[11px]">
                        Actual court expenses incurred on behalf of clients (e.g. e-stamp paper purchases, process serving fees, paper book binding costs) billed at cost.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Component Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Complete Component & Feature Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 col-span-1 md:col-span-2">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      1. Live 1-Click Active Billable Hours Timer Widget
                    </p>
                    <p className="text-slate-400">Real-time stopwatch tracking active matter legal research (e.g. <strong className="text-white">State v. Sharma</strong> at ₹4,500/hr) with a 1-click button to <strong className="text-emerald-400">Stop & Auto-Generate Invoice</strong>.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      2. Top Financial Metric Cards (4 Cards)
                    </p>
                    <p className="text-slate-400">Displays <strong className="text-slate-200">Outstanding Invoices</strong>, <strong className="text-slate-200">Collected Revenue (MTD)</strong>, <strong className="text-slate-200">Overdue Accounts</strong>, and <strong className="text-slate-200">Total Billable Hours</strong>.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      3. Invoices Ledger Data Table
                    </p>
                    <p className="text-slate-400">Displays Invoice Number (clickable link to <code className="text-blue-400">/workspace/billing/invoices/[id]</code>), Total Amount, Paid Amount, Due Date, and Status badge.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Navigation & Button Actions Map */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Button Actions & Navigation Links
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                        <th className="pb-2">UI Action</th>
                        <th className="pb-2">Behavior</th>
                        <th className="pb-2">Target Route</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-2 font-semibold text-white">Stop & Auto-Generate Invoice Button</td>
                        <td className="py-2">Logs accrued time entry & creates draft bill</td>
                        <td className="py-2 font-mono text-emerald-400">Auto Invoice Trigger</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Export Ledger Report Button</td>
                        <td className="py-2">Exports financial ledger CSV summary</td>
                        <td className="py-2 font-mono text-emerald-400">CSV Download</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Clicking Invoice Number Link</td>
                        <td className="py-2">Opens 3-tab Invoice Detail Workspace Hub</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/billing/invoices/[id]</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  5. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• <strong className="text-white">List Invoices API:</strong> <code className="text-blue-400">GET /api/billing/invoices</code></li>
                    <li>• <strong className="text-white">Log Active Time Entry:</strong> <code className="text-blue-400">POST /api/billing/time-entries</code></li>
                    <li>• <strong className="text-white">Generate Draft Invoice:</strong> <code className="text-blue-400">POST /api/billing/invoices/generate</code></li>
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

