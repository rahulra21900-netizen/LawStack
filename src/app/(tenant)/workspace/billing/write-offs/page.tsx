"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";

export default function WriteOffsPage() {
  const writeOffs = [
    { number: "WO-2026-001", client: "Reliance Retail", amount: 1500, reason: "Courtesy fee adjustment" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Billing", href: "/workspace/billing" }, { name: "Write-offs" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Write-offs Ledger</h1>
        <p className="text-xs text-slate-400">Review write-offs, courtesy adjustments, and billing credits.</p>
      </div>

      <DataTable
        data={writeOffs}
        columns={[
          { header: "Credit Number", accessor: (w) => <span className="font-bold text-white">{w.number}</span> },
          { header: "Client Profile", accessor: (w) => <span>{w.client}</span> },
          { header: "Written Off Amount", accessor: (w) => <span className="text-red-400 font-semibold">{"-$" + w.amount}</span> },
          { header: "Adjustment Reason", accessor: (w) => <span className="text-slate-400">{w.reason}</span> }
        ]}
      />
    </div>
  );
}
