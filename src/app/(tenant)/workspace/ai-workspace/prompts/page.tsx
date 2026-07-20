"use client";

import React from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Badge } from "@/components/ui";

export default function PromptsPage() {
  const { addToast } = useNotifications();

  const promptsList = [
    { title: "Draft NDA Agreement", category: "Contract Drafting", desc: "Generate standard mutual non-disclosure contract agreement with Governing Delhi HC laws." },
    { title: "Supreme Court Precedent Search", category: "Legal Research", desc: "Lookup relevant corporate cases matching trade secret disputes." }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "AI Workspace", href: "/workspace/ai-workspace/dashboard" }, { name: "Prompts" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Prompt Library Catalog</h1>
        <p className="text-xs text-slate-400">Pre-approved legal prompts optimized for contract audits, research summaries, and compliance filings.</p>
      </div>

      <DataTable
        data={promptsList}
        columns={[
          { header: "Prompt Name", accessor: (p) => <span className="font-bold text-white">{p.title}</span> },
          { header: "Category", accessor: (p) => <Badge label={p.category} variant="info" /> },
          { header: "Prompt Instruction Outline", accessor: (p) => <span className="text-slate-400">{p.desc}</span> },
          {
            header: "Action",
            accessor: (p) => (
              <button
                onClick={() => addToast("Prompt Copied", "Instruction copied to clipboard context.")}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded font-bold"
              >
                Copy Prompt
              </button>
            )
          }
        ]}
      />
    </div>
  );
}
