"use client";

import React from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_AI_HISTORY } from "@/mocks/ai";
import {
  Sparkles,
  FileText,
  Scale,
  MessageSquare,
  Zap,
  TrendingUp,
  Clock,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function AiWorkspacePage() {
  const { addToast } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "AI Workspace" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/15 border border-blue-500/30">
              <Sparkles className="w-4 h-4 text-blue-400" />
            </span>
            <span>AI Legal Assistant Workspace</span>
          </h1>
          <p className="text-xs text-slate-400">Automate drafting, extract clauses, or summarize briefs using AI-guided pipelines.</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Sparkles className="w-4 h-4" />}
          onClick={() => addToast("AI Synthesis Trigger", "Simulated prompt analysis completed. Summary dispatched.", "success")}
        >
          Draft New Clause
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Prompts (30d)" value="184" trend="up" change="+24%" info="This month" />
        <MetricCard title="Tokens Used" value="48.2k" trend="up" change="+8.1k" info="Billable" />
        <MetricCard title="Avg Latency" value="2.4s" trend="neutral" change="Stable" info="Per request" />
        <MetricCard title="Drafts Saved" value="42" trend="up" change="+6 this week" info="Reusable" />
      </div>

      {/* Quick action tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: FileText, label: "Draft Motion", href: "/workspace/ai-workspace/chat", color: "text-blue-400", desc: "Generate filings" },
          { icon: Scale, label: "Extract Clauses", href: "/workspace/ai-workspace/chat", color: "text-emerald-400", desc: "From contracts" },
          { icon: MessageSquare, label: "Summarize Brief", href: "/workspace/ai-workspace/chat", color: "text-cyan-400", desc: "Condense filings" },
          { icon: Zap, label: "Precedent Search", href: "/workspace/ai-workspace/chat", color: "text-amber-400", desc: "Find citations" },
        ].map((a) => {
          const Icon = a.icon;
          return (
            <Link
              key={a.label}
              href={a.href}
              className="group flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/40 p-4 hover:border-slate-700 hover:bg-slate-900/60 transition-all"
            >
              <Icon className={`w-5 h-5 ${a.color}`} />
              <div>
                <div className="text-xs font-bold text-white">{a.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{a.desc}</div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 ml-auto group-hover:text-slate-400 transition-colors" />
            </Link>
          );
        })}
      </div>

      {/* AI banner */}
      <div className="rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-900/20 via-indigo-900/10 to-transparent p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">AI Legal Copilot is active</p>
            <p className="text-[11px] text-slate-400">Context-aware drafting with audit-tracked outputs.</p>
          </div>
        </div>
        <Link href="/workspace/ai-workspace/chat" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-300 hover:gap-2.5 transition-all">
          Open chat <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <DataTable
        title="Prompt History Audit Logs"
        data={MOCK_AI_HISTORY}
        columns={[
          { header: "AI Prompt", accessor: (a) => <span className="font-bold text-white max-w-xs truncate block">{a.prompt}</span> },
          { header: "AI Generated Response", accessor: (a) => <p className="text-slate-400 truncate max-w-sm">{a.response}</p> },
          { header: "Tokens Used", accessor: (a) => <span className="font-mono text-slate-500">{a.tokensUsed} tokens</span> },
          { header: "Generated Time", accessor: (a) => <span className="text-[10px] text-slate-500">{new Date(a.createdAt).toLocaleString()}</span> },
        ]}
      />
    </div>
  );
}
