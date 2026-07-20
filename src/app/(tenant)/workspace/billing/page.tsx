"use client";

import React from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_INVOICES } from "@/mocks/billing";
import { DollarSign, Download, TrendingUp, Clock, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/utils";
import { MetricCard, Card } from "@/components/cards";

export default function BillingPage() {
  const { addToast } = useNotifications();

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
        <Button
          variant="primary"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={() => addToast("Export Ledgers", "CSV financial summary report downloaded (simulated).", "success")}
        >
          Export Ledger Report
        </Button>
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
    </div>
  );
}
