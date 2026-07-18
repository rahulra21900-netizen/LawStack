"use client";

import React from "react";
import Link from "next/link";
import { Card, MetricCard } from "@/components/cards";
import { Badge, Button, Avatar } from "@/components/ui";
import { MOCK_CASES } from "@/mocks/cases";
import { Scale, Users, FileText, Calendar, DollarSign, CircleCheck as CheckCircle2, Clock, TriangleAlert as AlertTriangle, Sparkles, ChevronRight, Activity, SquareCheck as CheckSquare } from "lucide-react";

export default function OverviewTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const caseData = MOCK_CASES.find((c) => c.id === id);

  if (!caseData) return null;

  const stages = ["Intake", "Pleadings", "Discovery", "Pre-Trial", "Trial"];
  const currentStageIdx = stages.indexOf(caseData.stage);

  return (
    <div className="space-y-6">
      {/* Top metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Active Stage" value={caseData.stage} info="Proceedings phase" trend="up" />
        <MetricCard title="Case Status" value={caseData.status} info="Docket state" trend="up" />
        <MetricCard title="Open Date" value={new Date(caseData.openDate).toLocaleDateString()} info="Filing date" trend="neutral" />
        <MetricCard title="Health Score" value="98%" info="No overdue filings" trend="up" />
      </div>

      {/* Stage pipeline */}
      <Card
        header={
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="font-bold text-white text-xs">Matter Stage Pipeline</span>
          </div>
        }
      >
        <div className="flex items-center justify-between gap-2 overflow-x-auto">
          {stages.map((s, idx) => {
            const isDone = idx < currentStageIdx;
            const isActive = idx === currentStageIdx;
            return (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[11px] transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                        : isDone
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-500 border border-slate-700"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${isActive ? "text-white" : isDone ? "text-emerald-400" : "text-slate-500"}`}>
                    {s}
                  </span>
                </div>
                {idx < stages.length - 1 && (
                  <div className={`h-0.5 flex-1 min-w-6 rounded-full ${isDone ? "bg-emerald-500/40" : "bg-slate-800"}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </Card>

      {/* Court + Team + Quick stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          header={
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white text-xs">Court Jurisdiction</span>
            </div>
          }
        >
          <div className="space-y-3 text-xs">
            {[
              { label: "Court Venue", value: "Federal District Court, Room 3C" },
              { label: "Presiding Judge", value: "Hon. Sarah Vance" },
              { label: "Opposing Counsel", value: "Robert Zane" },
              { label: "Jurisdiction", value: "Federal · Civil" },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between border-b border-slate-800 last:border-0 pb-2 last:pb-0">
                <span className="text-slate-500">{r.label}</span>
                <span className="font-semibold text-white">{r.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-white text-xs">Assigned Team</span>
              </div>
              <Link href={`/workspace/cases/${id}/team`} className="text-[10px] text-blue-400 hover:underline">
                Manage
              </Link>
            </div>
          }
        >
          <div className="space-y-2.5">
            {[
              { name: caseData.leadCounsel, role: "Lead Counsel", initials: "HS" },
              { name: "Mike Ross", role: "Associate", initials: "MR" },
              { name: "Donna Paulsen", role: "Paralegal", initials: "DP" },
            ].map((m) => (
              <div key={m.name} className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2.5">
                <Avatar name={m.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white truncate">{m.name}</div>
                  <div className="text-[10px] text-slate-500">{m.role}</div>
                </div>
                <Badge label="Active" variant="success" />
              </div>
            ))}
          </div>
        </Card>

        <Card
          header={
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white text-xs">Matter Health</span>
            </div>
          }
        >
          <div className="space-y-3">
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-md bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-300">A</span>
                <span className="text-xs font-bold text-white">98% Health Score</span>
              </div>
              <p className="mt-2 text-[10px] text-slate-400 leading-relaxed">
                No overdue filings. Retainer deposits cleared within standard billing windows.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500"><FileText className="w-3 h-3" /> Documents</div>
                <div className="mt-1 text-lg font-bold text-white">24</div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500"><CheckSquare className="w-3 h-3" /> Tasks</div>
                <div className="mt-1 text-lg font-bold text-white">7</div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500"><Calendar className="w-3 h-3" /> Hearings</div>
                <div className="mt-1 text-lg font-bold text-white">3</div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500"><DollarSign className="w-3 h-3" /> Billed</div>
                <div className="mt-1 text-lg font-bold text-white">$24k</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: FileText, label: "Upload Document", href: `/workspace/cases/${id}/documents`, color: "text-blue-400" },
          { icon: CheckSquare, label: "Add Task", href: `/workspace/cases/${id}/tasks`, color: "text-cyan-400" },
          { icon: Calendar, label: "Schedule Hearing", href: `/workspace/cases/${id}/hearings`, color: "text-amber-400" },
          { icon: Sparkles, label: "Ask AI Copilot", href: `/workspace/cases/${id}/ai`, color: "text-emerald-400" },
        ].map((a) => {
          const Icon = a.icon;
          return (
            <Link
              key={a.label}
              href={a.href}
              className="group flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/40 p-3 hover:border-slate-700 hover:bg-slate-900/60 transition-all"
            >
              <Icon className={`w-4 h-4 ${a.color}`} />
              <span className="text-xs font-semibold text-white">{a.label}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 ml-auto group-hover:text-slate-400 transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
