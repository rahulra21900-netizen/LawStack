"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_CASES } from "@/mocks/cases";

export default function MattersReportsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Reports", href: "/workspace/reports" }, { name: "Matters" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Matters Performance Reports</h1>
        <p className="text-xs text-slate-400">Track active case stages, litigation timelines, and dispute outcomes.</p>
      </div>

      <DataTable
        title="Active Litigations Grid"
        data={MOCK_CASES}
        columns={[
          { header: "Case Title", accessor: (c) => <span className="font-bold text-white">{c.title}</span> },
          { header: "Practice Area", accessor: (c) => <span>{c.practiceArea}</span> },
          { header: "Lead Attorney", accessor: (c) => <span>{c.leadCounsel}</span> }
        ]}
      />
    </div>
  );
}
