"use client";

import React from "react";
import Link from "next/link";
import { useSimulation } from "@/providers/SimulationProvider";
import { Breadcrumb, Badge, Button, Avatar } from "@/components/ui";
import { MetricCard, Card } from "@/components/cards";
import { MOCK_CASES } from "@/mocks/cases";
import {
  Briefcase,
  Users,
  FileText,
  Scale,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ChevronRight,
  DollarSign,
  TrendingUp,
  Activity,
  Bell,
  Sparkle,
} from "lucide-react";

const upcomingEvents = [
  {
    title: "Anticipatory Bail Arguments",
    matter: "CRLM.A. 4382/2026 · State v. Sharma",
    time: "Tomorrow · 10:30 AM",
    location: "Delhi High Court · Court No. 24",
    type: "hearing",
  },
  {
    title: "Client Consultation — Rakesh Sharma",
    matter: "CRLM.A. 4382/2026",
    time: "Today · 03:30 PM",
    location: "Chandra & Associates · Meeting Room 2",
    type: "meeting",
  },
  {
    title: "IP Injunction Reply — Filing Deadline",
    matter: "CS(COMM) 942/2026 · Reliance Retail",
    time: "Tomorrow · 05:00 PM",
    location: "eFiling Portal — Delhi HC",
    type: "deadline",
  },
  {
    title: "Deposition — Anjali Nair (Reliance Retail)",
    matter: "CS(COMM) 942/2026",
    time: "Fri · 09:00 AM",
    location: "Delhi High Court · IP Division",
    type: "deposition",
  },
];

const taskList = [
  { title: "Draft reply to opposing counsel's affidavit", matter: "CRLM.A. 4382/2026", due: "Today", priority: "high" },
  { title: "Review discovery documents", matter: "CS(COMM) 942/2026", due: "Tomorrow", priority: "medium" },
  { title: "Prepare vakalatnama for new matter", matter: "New client", due: "Fri", priority: "low" },
  { title: "File status report with NCLT", matter: "CP(CAA) 118/2026", due: "Mon", priority: "medium" },
];

const teamWorkload = [
  { name: "Priya Chandra", initials: "PC", matters: 8, hours: 32, color: "from-blue-500 to-cyan-500" },
  { name: "Arjun Mehta", initials: "AM", matters: 6, hours: 28, color: "from-emerald-500 to-teal-500" },
  { name: "Meera Verma", initials: "MV", matters: 5, hours: 24, color: "from-amber-500 to-orange-500" },
  { name: "Rohan Deshpande", initials: "RD", matters: 4, hours: 19, color: "from-indigo-500 to-blue-500" },
];

const eventType: Record<string, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  hearing: { color: "text-amber-400", icon: Scale },
  meeting: { color: "text-blue-400", icon: Users },
  deadline: { color: "text-red-400", icon: AlertTriangle },
  deposition: { color: "text-cyan-400", icon: FileText },
};

const priorityMap: Record<string, "error" | "warning" | "neutral"> = {
  high: "error",
  medium: "warning",
  low: "neutral",
};

export default function TenantDashboard() {
  const { activeTenant, activeRole, activeUser, featureFlags } = useSimulation();
  const isAiEnabled = featureFlags.find((f) => f.id === "ai-copilot")?.enabled;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Dashboard" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeTenant.primaryColor }} />
            {activeTenant.name} Workspace
          </h1>
          <p className="text-xs text-slate-400">
            Welcome back, {activeUser.name}. Signed in as <span className="text-slate-300 font-semibold">{activeRole}</span>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge label={`${activeTenant.tier} Subscription`} variant="success" />
          <Link href="/workspace/cases/new">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              New Matter
            </Button>
          </Link>
        </div>
      </div>

      {/* Role conflict notice */}
      {activeRole === "Client" && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-400 flex items-center justify-between">
          <span>
            <strong>Simulating Role Conflict:</strong> You are viewing the firm workspace as a <strong>Client</strong>.
            Clients should typically use the Client Portal layout.
          </span>
          <Link href="/client/dashboard" className="underline font-bold hover:text-white shrink-0">
            Switch to Client Portal
          </Link>
        </div>
      )}

      {/* Legal Intelligence Banner (India-specific differentiators) */}
      <Link
        href="/workspace/intelligence"
        className="group relative overflow-hidden rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-950/40 via-slate-900/40 to-transparent p-4 flex items-center justify-between hover:border-amber-500/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Legal Intelligence Suite <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 font-mono">INDIA</span></p>
            <p className="text-[10px] text-slate-400">IPC → BNS concordance · CNR / eCourts sync · High Court defect scanner · Precedent finder.</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 group-hover:gap-2 transition-all">
          Open Intelligence <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </Link>

      {/* AI banner */}
      {isAiEnabled && (
        <Link
          href="/workspace/ai-workspace"
          className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-900/20 via-indigo-900/10 to-transparent p-4 flex items-center justify-between hover:border-blue-500/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">AI Legal Copilot is active</p>
              <p className="text-[10px] text-slate-400">Draft motions, extract clauses, summarize briefs in seconds.</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-300 group-hover:gap-2 transition-all">
            Open AI Workspace <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Active Matters" value="34" trend="up" change="+3 this month" info="2 trials pending" />
        <MetricCard title="Clients" value="18" trend="up" change="+2 this week" info="Active roster" />
        <MetricCard title="Documents" value="156" trend="neutral" change="12 awaiting review" info="Drafted" />
        <MetricCard title="Hearings" value="3" trend="neutral" change="Next: Mon 10:00 AM" info="This week" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active matter docket */}
        <Card
          className="lg:col-span-2"
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-white text-xs">Active Matter Docket</span>
              </div>
              <Link href="/workspace/cases" className="text-[10px] text-blue-400 hover:underline flex items-center gap-0.5">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          }
        >
          <div className="space-y-2.5">
            {MOCK_CASES.map((c) => (
              <Link
                key={c.id}
                href={`/workspace/cases/${c.id}`}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-3 hover:border-slate-700 hover:bg-slate-900/60 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">{c.caseNumber}</span>
                      <span className="text-xs font-bold text-white truncate">{c.title}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {c.practiceArea} · Lead: {c.leadCounsel}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge label={c.stage} variant="info" />
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </div>
              </Link>
            ))}
          </div>

          {/* Mini pipeline */}
          <div className="mt-5 grid grid-cols-4 gap-2">
            {[
              { stage: "Intake", count: 4 },
              { stage: "Pleadings", count: 9 },
              { stage: "Discovery", count: 14 },
              { stage: "Trial", count: 7 },
            ].map((p) => (
              <div key={p.stage} className="rounded-lg border border-slate-800 bg-slate-950/40 p-2.5 text-center">
                <div className="text-lg font-bold text-white">{p.count}</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">{p.stage}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming calendar */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-xs">Upcoming Calendar</span>
              </div>
              <Link href="/workspace/calendar" className="text-[10px] text-blue-400 hover:underline flex items-center gap-0.5">
                Open <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          }
        >
          <div className="space-y-2.5">
            {upcomingEvents.map((e, idx) => {
              const meta = eventType[e.type];
              const Icon = meta.icon;
              return (
                <div key={idx} className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                  <div className="flex items-start gap-2.5">
                    <span className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 ${meta.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">{e.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{e.matter}</div>
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-semibold">{e.time}</span>
                        <span className="text-[9px] text-slate-600">{e.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Tasks + Team workload + Billing snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white text-xs">Priority Tasks</span>
              </div>
              <Link href="/workspace/tasks" className="text-[10px] text-blue-400 hover:underline flex items-center gap-0.5">
                Board <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          }
        >
          <div className="space-y-2">
            {taskList.map((t, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="h-2 w-2 rounded-full bg-slate-600 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-white font-semibold truncate">{t.title}</div>
                    <div className="text-[10px] text-slate-500">{t.matter}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge label={t.due} variant={priorityMap[t.priority]} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Team workload */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-white text-xs">Team Workload</span>
              </div>
              <Link href="/workspace/team" className="text-[10px] text-blue-400 hover:underline flex items-center gap-0.5">
                Team <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          }
        >
          <div className="space-y-3">
            {teamWorkload.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${m.color} text-[10px] font-bold text-white`}>
                  {m.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{m.name}</span>
                    <span className="text-[10px] text-slate-500">{m.matters} matters</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
                      style={{ width: `${(m.hours / 40) * 100}%` }}
                    />
                  </div>
                  <div className="mt-0.5 text-[9px] text-slate-500">{m.hours}h logged this week</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Billing snapshot */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-xs">Billing Snapshot</span>
              </div>
              <Link href="/workspace/billing" className="text-[10px] text-blue-400 hover:underline flex items-center gap-0.5">
                Ledger <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          }
        >
          <div className="space-y-3">
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Outstanding Invoices</div>
              <div className="mt-1 text-2xl font-extrabold text-white">₹18,42,500</div>
              <div className="mt-0.5 text-[10px] text-amber-400">6 invoices awaiting payment</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Collected (MTD)</div>
                <div className="mt-1 text-lg font-bold text-emerald-400">₹12.4L</div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Billable Hours</div>
                <div className="mt-1 text-lg font-bold text-white">1,284</div>
              </div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Realization Rate</span>
                <span className="text-[10px] text-emerald-400 font-bold">+4.2%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: "78%" }} />
              </div>
              <div className="mt-1 text-[10px] text-slate-500">78% of billable time collected</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Activity feed */}
      <Card
        header={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white text-xs">Recent Workspace Activity</span>
            </div>
            <Link href="/workspace/activity" className="text-[10px] text-blue-400 hover:underline flex items-center gap-0.5">
              Full feed <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        }
      >
        <ol className="relative border-l border-slate-800 ml-2 space-y-3 pl-6">
          {[
            { who: "Priya Chandra", what: "filed Anticipatory Bail Application", matter: "CRLM.A. 4382/2026", time: "12m ago" },
            { who: "Arjun Mehta", what: "uploaded 4 discovery documents", matter: "CS(COMM) 942/2026", time: "1h ago" },
            { who: "Meera Verma", what: "scheduled deposition for Friday", matter: "CS(COMM) 942/2026", time: "3h ago" },
            { who: "Rohan Deshpande", what: "approved vakalatnama", matter: "New client", time: "5h ago" },
          ].map((a, idx) => (
            <li key={idx} className="relative">
              <span className="absolute -left-[33px] flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 border border-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              </span>
              <p className="text-xs text-slate-300">
                <span className="font-bold text-white">{a.who}</span> {a.what}{" "}
                <span className="font-mono text-blue-400">{a.matter}</span>
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">{a.time}</p>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
