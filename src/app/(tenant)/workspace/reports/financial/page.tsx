"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_INVOICES } from "@/mocks/billing";
import { formatCurrency } from "@/utils";
import { DollarSign, Lock, ShieldCheck, FileSpreadsheet } from "lucide-react";

export default function FinancialReportsPage() {
  const totalBillable = MOCK_INVOICES.reduce((acc, i) => acc + i.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Reports", href: "/workspace/reports" }, { name: "Financial" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-emerald-400" />
            <span>Financial & Revenue Ledgers</span>
          </h1>
          <p className="text-xs text-slate-400">Firm-wide revenue totals, GST breakdown, and aggregated restricted matter privacy lines.</p>
        </div>
        <Badge label="GST 18% Compliant" variant="success" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Total Firm Revenue" value={formatCurrency(totalBillable + 1250000)} trend="up" change="+18% YOY" info="Includes restricted total" />
        <MetricCard title="Collected Dues" value={formatCurrency(totalBillable)} trend="up" change="88% collected" info="Active client ledger" />
        <MetricCard title="Restricted Matters Total" value="₹12,50,000" trend="neutral" change="3 Restricted Matters" info="Privacy Aggregated" />
      </div>

      {/* Section 8 Differentiator: Restricted Matters Aggregated Summary Line */}
      <Card
        header={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white">Firm Privacy Enforcement (Section 8 Policy)</span>
            </div>
            <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-mono font-semibold">
              Privacy Aggregation Rule
            </span>
          </div>
        }
      >
        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Restricted Matters (Aggregated Revenue Line)</p>
                <p className="text-[10px] text-slate-400">Case names & client details are hidden from non-assigned personnel.</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-amber-400 font-mono">₹12,50,000</span>
              <span className="block text-[9px] text-slate-500">3 Confidential Matters</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800 pt-2">
            ℹ️ <strong>Section 8 Policy:</strong> Restricted cases count toward firm revenue totals so billing reports remain 100% accurate, but details are redacted to non-assigned associates.
          </p>
        </div>
      </Card>

      <DataTable
        title="Standard Revenue Ledger Summary"
        data={MOCK_INVOICES}
        columns={[
          { header: "Bill Number", accessor: (i) => <span className="font-mono text-white font-bold">{i.invoiceNumber}</span> },
          { header: "Total Amount", accessor: (i) => <span className="font-semibold text-emerald-400">{formatCurrency(i.amount)}</span> },
          { header: "GST Breakdown", accessor: (i) => <span className="font-mono text-[10px] text-slate-400">CGST (9%) + SGST (9%)</span> },
          { header: "Due Date", accessor: (i) => <span className="text-slate-400">{i.dueDate}</span> },
          { header: "Status", accessor: (i) => <Badge label={i.status} variant={i.status === "Paid" ? "success" : "warning"} /> }
        ]}
      />
    </div>
  );
}
