"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_TEMPLATES } from "@/mocks/templates";

export default function AgreementsPage() {
  const agreements = MOCK_TEMPLATES.filter((t) => t.name.includes("Agreement"));

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Templates", href: "/workspace/templates/dashboard" }, { name: "Agreements" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Client & Partnership Agreements</h1>
        <p className="text-xs text-slate-400">Approved agreements templates.</p>
      </div>

      <DataTable
        data={agreements}
        columns={[
          { header: "Agreement Name", accessor: (t) => <span className="font-bold text-white">{t.name}</span> },
          { header: "Version", accessor: (t) => <span className="font-mono text-[10px] text-slate-500">v{t.version}</span> }
        ]}
      />
    </div>
  );
}
