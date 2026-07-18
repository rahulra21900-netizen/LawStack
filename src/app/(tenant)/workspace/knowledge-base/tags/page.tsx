"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";

export default function TagsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Knowledge Base", href: "/workspace/knowledge-base/dashboard" }, { name: "Tags" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Tags Directory</h1>
        <p className="text-xs text-slate-400">Search legal articles by tagging categories.</p>
      </div>

      <div className="flex gap-2 flex-wrap bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <Badge label="Pleadings" variant="info" />
        <Badge label="Filing Rules" variant="warning" />
        <Badge label="indemnity" variant="success" />
      </div>
    </div>
  );
}
