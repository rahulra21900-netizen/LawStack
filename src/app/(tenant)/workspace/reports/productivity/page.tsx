"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_USERS } from "@/mocks/users";

export default function ProductivityReportsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Reports", href: "/workspace/reports" }, { name: "Productivity" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Attorney Productivity Reports</h1>
        <p className="text-xs text-slate-400">Audit billable work ratios and dockets task closures velocity.</p>
      </div>

      <DataTable
        title="Attorney Capacity summary"
        data={MOCK_USERS}
        columns={[
          { header: "Associate name", accessor: (u) => <span className="font-bold text-white">{u.name}</span> },
          { header: "Administrative Role", accessor: (u) => <span>{u.role}</span> },
          { header: "Capacity Status", accessor: (u) => <span className="text-slate-400">80% Yield</span> }
        ]}
      />
    </div>
  );
}
