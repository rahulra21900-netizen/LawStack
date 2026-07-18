"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_INVOICES } from "@/mocks/billing";
import { formatCurrency } from "@/utils";

export default function FinancialReportsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Reports", href: "/workspace/reports" }, { name: "Financial" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Financial Reports</h1>
        <p className="text-xs text-slate-400">Review firm revenue streams, retainer top-ups, and write-off audits.</p>
      </div>

      <DataTable
        title="Revenue ledger Summary"
        data={MOCK_INVOICES}
        columns={[
          { header: "Bill Number", accessor: (i) => <span className="font-mono text-white font-bold">{i.invoiceNumber}</span> },
          { header: "Total Amount", accessor: (i) => <span className="font-semibold">{formatCurrency(i.amount)}</span> },
          { header: "Due Date", accessor: (i) => <span className="text-slate-450">{i.dueDate}</span> }
        ]}
      />
    </div>
  );
}
