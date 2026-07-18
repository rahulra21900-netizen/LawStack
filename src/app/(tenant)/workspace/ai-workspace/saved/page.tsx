"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { DataTable } from "@/components/tables";

export default function SavedOutputsPage() {
  const outputs = [
    { name: "Affidavit Brief Draft #4029", date: "2026-07-14", tags: "Pleadings, Drafts" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "AI Workspace", href: "/workspace/ai-workspace/dashboard" }, { name: "Saved" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Saved AI Outputs</h1>
        <p className="text-xs text-slate-400">Access saved templates drafts, summaries, and research timelines.</p>
      </div>

      <DataTable
        data={outputs}
        columns={[
          { header: "Draft Title Name", accessor: (o) => <span className="font-bold text-white">{o.name}</span> },
          { header: "Saved Date", accessor: (o) => <span className="text-slate-400">{o.date}</span> },
          { header: "Tags Classification", accessor: (o) => <span className="font-semibold text-slate-300">{o.tags}</span> }
        ]}
      />
    </div>
  );
}
