"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_USERS } from "@/mocks/users";

export default function TeamReportsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Reports", href: "/workspace/reports" }, { name: "Team" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Team Performance Reports</h1>
        <p className="text-xs text-slate-400">Audit staff workload capacity metrics.</p>
      </div>

      <DataTable
        data={MOCK_USERS}
        columns={[
          { header: "Employee name", accessor: (u) => <span className="font-bold text-white">{u.name}</span> },
          { header: "Role", accessor: (u) => <span>{u.role}</span> }
        ]}
      />
    </div>
  );
}
