"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { DataTable } from "@/components/tables";

export default function PoliciesPage() {
  const policies = [
    { name: "Chandra & Associates File Retention Policy Schema", version: "3.0" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Templates", href: "/workspace/templates/dashboard" }, { name: "Policies" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Compliance & File Policies</h1>
        <p className="text-xs text-slate-400">Security retention policies guidelines schemas.</p>
      </div>

      <DataTable
        data={policies}
        columns={[
          { header: "Policy Schema Name", accessor: (p) => <span className="font-bold text-white">{p.name}</span> },
          { header: "Version", accessor: (p) => <span className="font-mono text-[10px] text-slate-500">v{p.version}</span> }
        ]}
      />
    </div>
  );
}
