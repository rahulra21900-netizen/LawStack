"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_CASES } from "@/mocks/cases";
import { Briefcase, Scale, Calendar, TrendingUp } from "lucide-react";

export default function ClientMattersPage() {
  const matters = MOCK_CASES.slice(0, 2);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Portal", href: "/client/dashboard" }, { name: "Matters" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 border border-indigo-500/30">
            <Briefcase className="w-4 h-4 text-indigo-400" />
          </span>
          <span>Your Litigation Matters</span>
        </h1>
        <p className="text-xs text-slate-400">Track active case stages, lead counsel, and trial schedules.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Active Matters" value={matters.length} info="With assigned counsel" trend="neutral" />
        <MetricCard title="In Discovery" value={matters.filter((m) => m.stage === "Discovery").length} info="Currently" trend="neutral" />
        <MetricCard title="Pre-Trial" value={matters.filter((m) => m.stage === "Pre-Trial").length} info="Approaching" trend="up" />
        <MetricCard title="Hearings (30d)" value="2" info="Scheduled" trend="up" />
      </div>

      {/* Matter cards with stage pipelines */}
      <div className="space-y-4">
        {matters.map((c) => {
          const stages = ["Intake", "Pleadings", "Discovery", "Pre-Trial", "Trial"];
          const currentIdx = stages.indexOf(c.stage);
          return (
            <Card key={c.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">{c.caseNumber}</span>
                    <Badge label={c.stage} variant="info" />
                    <Badge label={c.status} variant="success" />
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-white">{c.title}</h3>
                  <p className="mt-1 text-[10px] text-slate-500">
                    {c.practiceArea} · Lead counsel: <span className="text-slate-300">{c.leadCounsel}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                  {stages.map((s) => <span key={s}>{s}</span>)}
                </div>
                <div className="relative h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
                    style={{ width: `${((currentIdx + 1) / stages.length) * 100}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[10px] text-slate-500">Currently in <span className="text-indigo-400 font-bold">{c.stage}</span> · Opened {new Date(c.openDate).toLocaleDateString()}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
