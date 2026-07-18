"use client";

import React from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_INVOICES } from "@/mocks/billing";
import { DollarSign, Download } from "lucide-react";
import { formatCurrency } from "@/utils";

export default function BillingPage() {
  const { addToast } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Billing" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-500" />
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
