"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_TEMPLATES } from "@/mocks/templates";

export default function ContractsTemplatesPage() {
  const contracts = MOCK_TEMPLATES.filter((t) => t.practiceArea === "Intellectual Property");

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Templates", href: "/workspace/templates/dashboard" }, { name: "Contracts" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Contract Templates</h1>
        <p className="text-xs text-slate-400">Pre-approved sub-licensing, NDA, and intellectual property agreement templates.</p>
      </div>

      <DataTable
        data={contracts}
        columns={[
          { header: "Template Name", accessor: (t) => <span className="font-bold text-white">{t.name}</span> },
          { header: "Version", accessor: (t) => <span className="font-mono text-slate-500">v{t.version}</span> },
          { header: "Description Details", accessor: (t) => <span className="text-slate-400">{t.description}</span> }
        ]}
      />
    </div>
  );
}
