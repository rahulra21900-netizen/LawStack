"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { DataTable } from "@/components/tables";

export default function RecentArticlesPage() {
  const recents = [
    { title: "Delhi HC Original Side Rules filings", date: "Viewed 5m ago" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Knowledge Base", href: "/workspace/knowledge-base/dashboard" }, { name: "Recent" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Recently Viewed Articles</h1>
        <p className="text-xs text-slate-400">Reading history logs of precedents searches.</p>
      </div>

      <DataTable
        data={recents}
        columns={[
          { header: "Article Title Name", accessor: (r) => <span className="font-bold text-white">{r.title}</span> },
          { header: "Timestamp", accessor: (r) => <span className="text-slate-400">{r.date}</span> }
        ]}
      />
    </div>
  );
}
