"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { formatCurrency } from "@/utils";

interface Expense {
  id: string;
  description: string;
  type: string;
  amount: number;
  billable: boolean;
}

const MOCK_EXPENSES: Expense[] = [
  { id: "exp-1", description: "Delaware filings fee", type: "Court Fees", amount: 450, billable: true },
  { id: "exp-2", description: "LexisNexis research search query dockets", type: "Research", amount: 120, billable: true }
];

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Billing", href: "/workspace/billing" }, { name: "Expenses" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Disbursements & Expenses</h1>
        <p className="text-xs text-slate-400">Track third-party services, court filing fees, and travel disbursements.</p>
      </div>

      <DataTable
        title="Expense Entries"
        data={MOCK_EXPENSES}
        columns={[
          { header: "Expense Details", accessor: (e) => <span className="font-bold text-white">{e.description}</span> },
          { header: "Expense Type", accessor: (e) => <Badge label={e.type} variant="info" /> },
          { header: "Amount Billed", accessor: (e) => <span className="font-semibold text-emerald-400">{formatCurrency(e.amount)}</span> },
          { header: "Billable Status", accessor: (e) => <Badge label={e.billable ? "Billable" : "Non-billable"} variant={e.billable ? "success" : "neutral"} /> }
        ]}
      />
    </div>
  );
}
