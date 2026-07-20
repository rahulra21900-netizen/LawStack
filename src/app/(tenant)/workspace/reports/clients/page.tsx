"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_CLIENTS } from "@/mocks/clients";

export default function ClientsReportsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Reports", href: "/workspace/reports" }, { name: "Clients" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Client Value Reports</h1>
        <p className="text-xs text-slate-400">Analyze retainer volumes and corporate client portfolios ratios.</p>
      </div>

      <DataTable
        title="Client Registrants summary"
        data={MOCK_CLIENTS}
        columns={[
          { header: "Client Profile", accessor: (c) => <span className="font-bold text-white">{c.name}</span> },
          { header: "Company Entity", accessor: (c) => <span>{c.companyName || "Personal Case"}</span> },
          { header: "Default Retainers", accessor: (c) => <span className="text-emerald-400 font-semibold">₹10,000.00</span> }
        ]}
      />
    </div>
  );
}
