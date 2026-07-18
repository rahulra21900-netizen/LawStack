"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { DataTable } from "@/components/tables";

export default function NoticesPage() {
  const notices = [
    { name: "Default Notice of Service Outline", version: "2.1" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Templates", href: "/workspace/templates/dashboard" }, { name: "Notices" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Legal Notices Templates</h1>
        <p className="text-xs text-slate-400">Approved service notices templates.</p>
      </div>

      <DataTable
        data={notices}
        columns={[
          { header: "Notice Template Name", accessor: (n) => <span className="font-bold text-white">{n.name}</span> },
          { header: "Version", accessor: (n) => <span className="font-mono text-[10px] text-slate-500">v{n.version}</span> }
        ]}
      />
    </div>
  );
}
