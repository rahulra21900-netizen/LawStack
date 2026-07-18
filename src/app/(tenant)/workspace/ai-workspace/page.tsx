"use client";

import React from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_AI_HISTORY } from "@/mocks/ai";
import { Sparkles } from "lucide-react";

export default function AiWorkspacePage() {
  const { addToast } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "AI Workspace" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span>AI Legal Assistant Workspace</span>
          </h1>
          <p className="text-xs text-slate-400">Automate drafting, extract clauses, or summarize briefs using AI-guided pipelines.</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Sparkles className="w-4 h-4 text-slate-900" />}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold"
          onClick={() => addToast("AI Synthesis Trigger", "Simulated prompt analysis completed. Summary dispatched.", "success")}
        >
          Draft New Clause
        </Button>
      </div>

      <DataTable
        title="Prompt History Audit Logs"
        data={MOCK_AI_HISTORY}
        columns={[
          { header: "AI Prompt", accessor: (a) => <span className="font-bold text-white max-w-xs truncate block">{a.prompt}</span> },
          { header: "AI Generated Response", accessor: (a) => <p className="text-slate-400 truncate max-w-sm">{a.response}</p> },
          { header: "Tokens Used", accessor: (a) => <span className="font-mono text-slate-500">{a.tokensUsed} tokens</span> },
          { header: "Generated Time", accessor: (a) => <span className="text-[10px] text-slate-500">{new Date(a.createdAt).toLocaleString()}</span> }
        ]}
      />
    </div>
  );
}
