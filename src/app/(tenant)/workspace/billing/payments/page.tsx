"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_PAYMENTS } from "@/mocks/billing";
import { formatCurrency } from "@/utils";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Billing", href: "/workspace/billing" }, { name: "Payments" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Payments Received</h1>
        <p className="text-xs text-slate-400">Review client ledger deposit logs and retainer top-ups.</p>
      </div>

      <DataTable
        title="Deposit Ledger Logs"
        data={MOCK_PAYMENTS}
        columns={[
          { header: "Payment Method", accessor: (p) => <span className="font-bold text-white">{p.paymentMethod}</span> },
          { header: "Amount Collected", accessor: (p) => <span className="font-semibold text-emerald-400">{formatCurrency(p.amount)}</span> },
          { header: "Transaction Timestamp", accessor: (p) => <span className="text-slate-400">{p.paymentDate}</span> },
          { header: "Reference", accessor: (p) => <span className="font-mono text-[10px] text-slate-500">{p.transactionReference}</span> }
        ]}
      />
    </div>
  );
}
