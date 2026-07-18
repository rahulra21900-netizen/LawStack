"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_AI_HISTORY } from "@/mocks/ai";

export default function AiHistoryPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "AI Workspace", href: "/workspace/ai-workspace/dashboard" }, { name: "History" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">AI Conversation History</h1>
        <p className="text-xs text-slate-400">Audit session logs, prompt tokens, and generated contract drafts.</p>
      </div>

      <DataTable
        title="Session logs history dockets"
        data={MOCK_AI_HISTORY}
        columns={[
          { header: "Prompt Input", accessor: (a) => <span className="font-bold text-white block max-w-xs truncate">{a.prompt}</span> },
          { header: "Generated Output Details", accessor: (a) => <p className="text-slate-400 truncate max-w-sm">{a.response}</p> },
          { header: "Tokens Used", accessor: (a) => <span className="font-mono text-slate-500">{a.tokensUsed} tokens</span> },
          { header: "Timestamp", accessor: (a) => <span className="text-slate-400 text-[10px]">{new Date(a.createdAt).toLocaleString()}</span> }
        ]}
      />
    </div>
  );
}
