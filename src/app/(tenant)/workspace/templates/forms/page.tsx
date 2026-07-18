"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { DataTable } from "@/components/tables";

export default function FormsTemplatesPage() {
  const forms = [
    { name: "New Client Intake Form Schema", version: "1.0" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Templates", href: "/workspace/templates/dashboard" }, { name: "Forms" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Intake & Administrative Forms</h1>
        <p className="text-xs text-slate-400">Intake form templates.</p>
      </div>

      <DataTable
        data={forms}
        columns={[
          { header: "Form Template Name", accessor: (f) => <span className="font-bold text-white">{f.name}</span> },
          { header: "Version", accessor: (f) => <span className="font-mono text-slate-500 text-[10px]">v{f.version}</span> }
        ]}
      />
    </div>
  );
}
