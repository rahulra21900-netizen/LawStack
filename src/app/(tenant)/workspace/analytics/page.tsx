"use client";

import React from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { Card, MetricCard } from "@/components/cards";
import { ChartPie as PieChart, RefreshCw, TrendingUp, Clock, DollarSign, CircleCheck as CheckCircle2, ArrowUpRight, ArrowDownRight } from "lucide-react";

const practiceMix = [
  { name: "Intellectual Property", value: 42, color: "bg-blue-500" },
  { name: "Tax Law", value: 28, color: "bg-emerald-500" },
  { name: "Corporate Law", value: 18, color: "bg-amber-500" },
  { name: "Litigation", value: 12, color: "bg-indigo-500" },
];

const monthlyTrend = [
  { m: "Jan", v: 42 },
  { m: "Feb", v: 48 },
  { m: "Mar", v: 55 },
  { m: "Apr", v: 49 },
  { m: "May", v: 62 },
  { m: "Jun", v: 68 },
  { m: "Jul", v: 74 },
];

export default function AnalyticsPage() {
  const { addToast } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Analytics" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600/15 border border-cyan-500/30">
              <PieChart className="w-4 h-4 text-cyan-400" />
            </span>
            <span>Practice Analytics</span>
          </h1>
          <p className="text-xs text-slate-400">Review billable yields, caseload averages, and task velocity indicators.</p>
        </div>
        <Button
          variant="secondary"
          leftIcon={<RefreshCw className="w-4 h-4" />}
          onClick={() => addToast("Sync Analytics", "Re-indexed data indicators from Delaware namespaces.", "success")}
        >
          Recalculate Yields
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Billable Hours Yield" value="342.5 hrs" change="+14% this month" trend="up" info="Logged" />
        <MetricCard title="Task Closure Rate" value="94.2%" change="No modifications" trend="neutral" info="On time" />
        <MetricCard title="Retainer Values" value="$156,000" change="+8.9% YoY" trend="up" info="Held" />
        <MetricCard title="Realization Rate" value="78%" change="+4.2%" trend="up" info="Collected" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly billable trend */}
        <Card
          className="lg:col-span-2"
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-xs">Monthly Billable Hours</span>
              </div>
              <Badge label="7 months" variant="info" />
            </div>
          }
        >
          <div className="flex items-end justify-between gap-3 h-48 pt-4">
            {monthlyTrend.map((m) => {
              const max = Math.max(...monthlyTrend.map((x) => x.v));
              const heightPct = (m.v / max) * 100;
              return (
                <div key={m.m} className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full flex flex-col items-center justify-end h-full">
                    <div
                      className="w-full max-w-[36px] rounded-t-md bg-gradient-to-t from-blue-600/40 to-blue-500 transition-all hover:from-blue-500 hover:to-blue-400"
                      style={{ height: `${heightPct}%` }}
                      title={`${m.v} hrs`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold">{m.m}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-blue-500" /> Billable hours</span>
            <span className="flex items-center gap-1.5 text-emerald-400"><ArrowUpRight className="w-3 h-3" /> +32% YTD growth</span>
          </div>
        </Card>

        {/* Practice area mix */}
        <Card
          header={
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-white text-xs">Practice Area Mix</span>
            </div>
          }
        >
          <div className="space-y-3">
            {practiceMix.map((p) => (
              <div key={p.name}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">{p.name}</span>
                  <span className="text-slate-500">{p.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Secondary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Clock, label: "Avg Matter Duration", value: "4.2 months", trend: "down", change: "-0.3 mo" },
          { icon: DollarSign, label: "Avg Invoice Value", value: "$3,240", trend: "up", change: "+$180" },
          { icon: CheckCircle2, label: "Client Satisfaction", value: "4.8/5.0", trend: "up", change: "+0.2" },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{m.label}</span>
                <Icon className="w-4 h-4 text-slate-400" />
              </div>
              <div className="mt-2 text-2xl font-extrabold text-white">{m.value}</div>
              <div className={`mt-1 text-[10px] font-bold flex items-center gap-1 ${m.trend === "up" ? "text-emerald-400" : "text-red-400"}`}>
                {m.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {m.change}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
