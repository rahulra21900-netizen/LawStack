"use client";

import React, { useState } from "react";
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
  BookOpen,
  X,
} from "lucide-react";
import Link from "next/link";

export default function AiWorkspacePage() {
  const { addToast } = useNotifications();
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

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
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeveloperGuide(true)}
            className="border-blue-500/40 text-blue-300 hover:bg-blue-500/10"
            leftIcon={<BookOpen className="h-4 w-4" />}
          >
            Developer Guide
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Sparkles className="w-4 h-4" />}
            onClick={() => addToast("AI Synthesis Trigger", "Simulated prompt analysis completed. Summary dispatched.", "success")}
          >
            Draft New Clause
          </Button>
        </div>
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

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">AI Legal Copilot Workspace — Developer Guide</h2>
              </div>
              <button
                onClick={() => setShowDeveloperGuide(false)}
                className="rounded-lg border border-slate-700 p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                aria-label="Close developer guide modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-6 p-6 text-sm text-slate-300">
              {/* Mandatory Section 1: What it is & Why it is needed */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  1. Core Purpose & Mandatory Overview
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-3">
                  <div>
                    <strong className="text-white text-sm block mb-1">What it is:</strong>
                    <p className="text-slate-300">
                      The AI Legal Copilot Workspace is an AI-powered drafting, clause extraction, brief summarization, and precedent search hub tailored for Indian advocates and judicial officers.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Senior Advocate & Judicial Officer's Perspective):</strong>
                    <p className="text-slate-400">
                      Litigation requires drafting heavy petitions (bail applications, writ petitions, commercial suits) and analyzing hundreds of case precedents:
                      <br />
                      • <strong>Speed & Precision:</strong> AI Legal Copilot acts as an intelligent digital junior associate—synthesizing facts, drafting initial motion clauses, and retrieving case citations in seconds.
                      <br />
                      • <strong>Privilege & Audit Security:</strong> Legal AI queries process confidential client case data. Every AI prompt and generated response is logged with token consumption metrics and cryptographic tenant isolation under DPDP Act 2023 & Section 132 BSA 2023.
                      <br />
                      • <strong>Context-Aware Indian Legal Intelligence:</strong> Trained specifically on BNS/BNSS criminal concordance, Supreme Court ratio decidendi, and High Court filing formats.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. AI Legal Copilot Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in AI legal engineering or Indian legal practice, here are the core concepts:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. AI Legal Copilot</strong>
                      <p className="text-slate-400 text-[11px]">
                        Context-aware LLM engine fine-tuned on Indian statutory codes, High Court rules, and landmark judgments.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Prompt History Audit Trail</strong>
                      <p className="text-slate-400 text-[11px]">
                        Immutable ledger tracking all user prompts, LLM outputs, token usage, and creation timestamps for data security compliance.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Ratio Decidendi Extraction</strong>
                      <p className="text-slate-400 text-[11px]">
                        AI capability that distills binding legal principles from lengthy Supreme Court judgments.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. Token Usage & Latency</strong>
                      <p className="text-slate-400 text-[11px]">
                        Computational metrics tracking LLM API consumption and response delivery speed.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Component Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Complete Component & Feature Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      1. Metric Cards (4 Cards)
                    </p>
                    <p className="text-slate-400">Displays <strong className="text-slate-200">Prompts (30d)</strong>, <strong className="text-slate-200">Tokens Used</strong>, <strong className="text-slate-200">Avg Latency</strong>, and <strong className="text-slate-200">Drafts Saved</strong>.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      2. Quick Action Tiles (4 Tiles)
                    </p>
                    <p className="text-slate-400">Interactive action tiles: <strong className="text-blue-400">Draft Motion</strong>, <strong className="text-emerald-400">Extract Clauses</strong>, <strong className="text-cyan-400">Summarize Brief</strong>, and <strong className="text-amber-400">Precedent Search</strong>.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      3. Active Copilot Banner
                    </p>
                    <p className="text-slate-400">Status banner indicating AI active state with direct link to <code className="text-blue-400">/workspace/ai-workspace/chat</code>.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      4. Prompt History Audit Logs Table
                    </p>
                    <p className="text-slate-400">DataTable displaying AI prompt strings, generated response previews, token counts, and creation timestamps.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Navigation & Button Actions Map */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Button Actions & Interactive Controls Navigation Map
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                        <th className="pb-2">UI Action</th>
                        <th className="pb-2">Behavior</th>
                        <th className="pb-2">Target Route</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-2 font-semibold text-white">Draft New Clause Button</td>
                        <td className="py-2">Triggers AI clause generation modal</td>
                        <td className="py-2 font-mono text-blue-400">AI Clause Synthesis</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Quick Action Tiles</td>
                        <td className="py-2">Navigates to AI Chat with pre-loaded prompt pipeline</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/ai-workspace/chat</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Open Chat Link</td>
                        <td className="py-2">Opens full interactive AI Copilot conversation window</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/ai-workspace/chat</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  5. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• <strong className="text-white">List AI Prompt Audit Logs:</strong> <code className="text-blue-400">GET /api/ai/history</code></li>
                    <li>• <strong className="text-white">AI Stream Chat Synthesis:</strong> <code className="text-blue-400">POST /api/ai/chat/stream</code></li>
                    <li>• <strong className="text-white">Token Usage Tracking:</strong> <code className="text-blue-400">POST /api/ai/usage/log</code></li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

