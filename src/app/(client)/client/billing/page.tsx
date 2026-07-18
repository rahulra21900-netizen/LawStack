"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_INVOICES } from "@/mocks/billing";
import { formatCurrency } from "@/utils";

export default function ClientBillingPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Portal", href: "/client/dashboard" }, { name: "Billing" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Billing & Invoices</h1>
        <p className="text-xs text-slate-400">Review billable invoices and payment records.</p>
      </div>

      <DataTable
        data={MOCK_INVOICES.slice(0, 2)}
        columns={[
          { header: "Bill Number", accessor: (i) => <span className="font-mono text-white font-bold">{i.invoiceNumber}</span> },
          { header: "Total Amount", accessor: (i) => <span className="font-semibold">{formatCurrency(i.amount)}</span> },
          { header: "Due Date", accessor: (i) => <span className="text-slate-450">{i.dueDate}</span> },
          { header: "Status", accessor: (i) => <Badge label={i.status} variant={i.status === "Paid" ? "success" : "warning"} /> }
        ]}
      />
    </div>
  );
}
