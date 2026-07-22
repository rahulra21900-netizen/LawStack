"use client";

import React, { useState } from "react";
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
  BookOpen,
  X,
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
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

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
        <div className="flex flex-wrap items-center gap-2">
          <Badge label={`${activeTenant.tier} Subscription`} variant="success" />
          <Button
            variant="outline"
            leftIcon={<BookOpen className="w-4 h-4" />}
            onClick={() => setShowDeveloperGuide(true)}
          >
            Developer Guide
          </Button>
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

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Workspace Dashboard — Developer Handoff Guide</h2>
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
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  1. Core Purpose & Mandatory Overview
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-3">
                  <div>
                    <strong className="text-white text-sm block mb-1">What it is:</strong>
                    <p className="text-slate-300">
                      The Workspace Dashboard is the central digital mission control center for an Indian law practice. When an advocate, senior partner, associate lawyer, or court clerk (Munshi) logs into LawStack each morning, this is the primary screen they see.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Advocate's Perspective):</strong>
                    <p className="text-slate-400">
                      Indian advocates handle dozens of court cases simultaneously across multiple court forums (e.g. High Court, District Courts, NCLT, Consumer Commissions). Without a centralized real-time dashboard:
                      <br />
                      • Advocates miss court hearing dates, leading to adverse dismissal orders or ex-parte judgments against clients.
                      <br />
                      • Junior lawyers get overburdened while others remain underutilized.
                      <br />
                      • Unbilled court appearance hours and uncollected client retainers slip through paper diaries.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Indian Court & Practice Glossary for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in Indian legal systems, here are the essential concepts you need to know to build this dashboard:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Advocate & Senior Counsel</strong>
                      <p className="text-slate-400 text-[11px]">
                        Licensed lawyers registered under the Advocates Act, 1961. Partners lead the firm, Senior Counsel present oral arguments in court, and Associates draft legal papers.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Court Clerk (Munshi)</strong>
                      <p className="text-slate-400 text-[11px]">
                        Legal administrative staff responsible for physical court registry filings, cause-list monitoring, and obtaining certified order copies from court readers.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Cause List</strong>
                      <p className="text-slate-400 text-[11px]">
                        The official daily schedule published by Indian High Courts & District Courts listing case numbers, item numbers, courtroom numbers, and presiding judges for that day.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. Litigation Pipeline Stages</strong>
                      <p className="text-slate-400 text-[11px]">
                        Cases move through 4 stages: <strong className="text-slate-200">Intake</strong> (Initial onboarding) ➔ <strong className="text-slate-200">Pleadings</strong> (Filing petitions & reply affidavits) ➔ <strong className="text-slate-200">Discovery</strong> (Filing evidence & witness cross-examination) ➔ <strong className="text-slate-200">Trial/Arguments</strong> (Final oral arguments).
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Component Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Complete Dashboard Components Breakdown (All 10 Core Widgets)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* 1. Active Matters */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                    <p className="font-bold text-white text-sm flex items-center gap-2">
                      <span>📁 1. Active Matters Metric Card</span>
                    </p>
                    <p><strong className="text-slate-200">What it is:</strong> A metric card displaying the total count of active court cases currently handled by the firm (e.g. 34 active matters).</p>
                    <p><strong className="text-slate-200">Why it is needed:</strong> Managing partners need an instant count of active litigation volume without sifting through paper case files.</p>
                    <div className="text-slate-400 space-y-1 pt-1 border-t border-slate-800/80">
                      <p className="font-semibold text-slate-200">Developer Instructions:</p>
                      <p>• Endpoint: <code className="text-blue-400">GET /api/workspace/stats</code></p>
                      <p>• Filter logic: Count cases where <code className="text-blue-300">status === "Active"</code>.</p>
                    </div>
                  </div>

                  {/* 2. Clients */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                    <p className="font-bold text-white text-sm flex items-center gap-2">
                      <span>👥 2. Clients Metric Card</span>
                    </p>
                    <p><strong className="text-slate-200">What it is:</strong> Total registered individual clients and corporate company accounts in the workspace roster (e.g. 18 clients).</p>
                    <p><strong className="text-slate-200">Why it is needed:</strong> Tracks active client engagements and DPDP Act 2023 verified consent records.</p>
                    <div className="text-slate-400 space-y-1 pt-1 border-t border-slate-800/80">
                      <p className="font-semibold text-slate-200">Developer Instructions:</p>
                      <p>• Endpoint: <code className="text-blue-400">GET /api/clients/count</code></p>
                      <p>• Card Click Route: Redirects to <code className="text-blue-400">/workspace/clients</code>.</p>
                    </div>
                  </div>

                  {/* 3. Documents */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                    <p className="font-bold text-white text-sm flex items-center gap-2">
                      <span>📄 3. Documents Metric Card</span>
                    </p>
                    <p><strong className="text-slate-200">What it is:</strong> Total legal petitions, affidavits, evidence exhibits, and written submissions stored (e.g. 156 documents).</p>
                    <p><strong className="text-slate-200">Why it is needed:</strong> Flags pending drafts awaiting senior partner review before court registry submission.</p>
                    <div className="text-slate-400 space-y-1 pt-1 border-t border-slate-800/80">
                      <p className="font-semibold text-slate-200">Developer Instructions:</p>
                      <p>• Endpoint: <code className="text-blue-400">GET /api/documents/stats</code></p>
                      <p>• Card Click Route: Redirects to <code className="text-blue-400">/workspace/documents</code>.</p>
                    </div>
                  </div>

                  {/* 4. Hearings */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                    <p className="font-bold text-white text-sm flex items-center gap-2">
                      <span>⚖️ 4. Hearings Metric Card</span>
                    </p>
                    <p><strong className="text-slate-200">What it is:</strong> Total court hearings scheduled for the firm's advocates during the current calendar week (e.g. 3 hearings this week).</p>
                    <p><strong className="text-slate-200">Why it is needed:</strong> Missing a hearing date can result in an ex-parte order or contempt notice. Advocates must know their weekly hearing load.</p>
                    <div className="text-slate-400 space-y-1 pt-1 border-t border-slate-800/80">
                      <p className="font-semibold text-slate-200">Developer Instructions:</p>
                      <p>• Endpoint: <code className="text-blue-400">GET /api/calendar/hearings?week=current</code></p>
                      <p>• UI Text: Display next scheduled hearing date & court room (e.g. "Next: Mon 10:00 AM").</p>
                    </div>
                  </div>

                  {/* 5. Active Matter Docket & Pipeline */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2 md:col-span-2">
                    <p className="font-bold text-white text-sm flex items-center gap-2">
                      <span>📋 5. Active Matter Docket & Case Stage Pipeline</span>
                    </p>
                    <p><strong className="text-slate-200">What it is:</strong> A table listing primary active cases with case number, title, practice area, lead advocate, and stage badge. Below the list, a 4-step pipeline displays case counts across court stages (<span className="text-amber-400 font-semibold">Intake: 4</span> ➔ <span className="text-amber-400 font-semibold">Pleadings: 9</span> ➔ <span className="text-amber-400 font-semibold">Discovery: 14</span> ➔ <span className="text-amber-400 font-semibold">Trial: 7</span>).</p>
                    <p><strong className="text-slate-200">Why it is needed:</strong> Advocates need instant access to active case files and a visual overview of how matters progress through the judicial system.</p>
                    <div className="text-slate-400 space-y-1 pt-1 border-t border-slate-800/80">
                      <p className="font-semibold text-slate-200">Developer Instructions:</p>
                      <p>• Endpoint: <code className="text-blue-400">GET /api/cases?limit=5&status=active</code></p>
                      <p>• Row Click: Navigates to <code className="text-blue-400">/workspace/cases/[id]</code>.</p>
                    </div>
                  </div>

                  {/* 6. Upcoming Calendar */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                    <p className="font-bold text-white text-sm flex items-center gap-2">
                      <span>📅 6. Upcoming Calendar</span>
                    </p>
                    <p><strong className="text-slate-200">What it is:</strong> Chronological schedule of court appearances, client consultations, filing limitation deadlines, and witness depositions.</p>
                    <p><strong className="text-slate-200">Why it is needed:</strong> Court limitation periods are strictly enforced under the Limitation Act, 1963. Missing a deadline bars the client from court relief.</p>
                    <div className="text-slate-400 space-y-1 pt-1 border-t border-slate-800/80">
                      <p className="font-semibold text-slate-200">Developer Instructions:</p>
                      <p>• Badges: <span className="text-amber-400 font-semibold">Amber</span> for Hearings, <span className="text-blue-400 font-semibold">Blue</span> for Client Meetings, <span className="text-red-400 font-semibold">Red</span> for Deadlines.</p>
                      <p>• Endpoint: <code className="text-blue-400">GET /api/calendar/events?upcoming=true</code></p>
                    </div>
                  </div>

                  {/* 7. Priority Tasks */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                    <p className="font-bold text-white text-sm flex items-center gap-2">
                      <span>✅ 7. Priority Tasks List</span>
                    </p>
                    <p><strong className="text-slate-200">What it is:</strong> Action items assigned to advocates and paralegals (e.g. draft reply affidavit, obtain certified copy, prepare vakalatnama).</p>
                    <p><strong className="text-slate-200">Why it is needed:</strong> Ensures daily legal drafting and court registry work items are completed on schedule.</p>
                    <div className="text-slate-400 space-y-1 pt-1 border-t border-slate-800/80">
                      <p className="font-semibold text-slate-200">Developer Instructions:</p>
                      <p>• Endpoint: <code className="text-blue-400">GET /api/tasks?assignedTo=currentUser</code></p>
                      <p>• Priority badges: High (Red), Medium (Yellow), Low (Gray).</p>
                    </div>
                  </div>

                  {/* 8. Team Workload */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                    <p className="font-bold text-white text-sm flex items-center gap-2">
                      <span>📊 8. Team Workload & Hours Tracker</span>
                    </p>
                    <p><strong className="text-slate-200">What it is:</strong> Progress bars showing logged billable court hours for each advocate in the firm against a 40-hour weekly capacity.</p>
                    <p><strong className="text-slate-200">Why it is needed:</strong> Managing partners use this to ensure work is distributed fairly and junior associates are not burnout.</p>
                    <div className="text-slate-400 space-y-1 pt-1 border-t border-slate-800/80">
                      <p className="font-semibold text-slate-200">Developer Instructions:</p>
                      <p>• Progress Bar Formula: <code className="text-blue-300">(loggedHours / 40) * 100</code></p>
                      <p>• Endpoint: <code className="text-blue-400">GET /api/team/workload</code></p>
                    </div>
                  </div>

                  {/* 9. Billing Snapshot */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                    <p className="font-bold text-white text-sm flex items-center gap-2">
                      <span>💳 9. Billing Snapshot</span>
                    </p>
                    <p><strong className="text-slate-200">What it is:</strong> Financial summary: Outstanding Invoices (₹18,42,500), MTD Revenue (₹12.4L), Billable Hours (1,284h), and Realization Rate (78%).</p>
                    <p><strong className="text-slate-200">Why it is needed:</strong> Tracks fee collections and retainer deposits without opening external accounting tools.</p>
                    <div className="text-slate-400 space-y-1 pt-1 border-t border-slate-800/80">
                      <p className="font-semibold text-slate-200">Developer Instructions:</p>
                      <p>• Realization Rate Formula: <code className="text-blue-300">(Collected Revenue / Billed Revenue) * 100</code></p>
                      <p>• Endpoint: <code className="text-blue-400">GET /api/billing/summary</code></p>
                    </div>
                  </div>

                  {/* 10. Activity Feed */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2 md:col-span-2">
                    <p className="font-bold text-white text-sm flex items-center gap-2">
                      <span>🔔 10. Recent Workspace Activity Feed</span>
                    </p>
                    <p><strong className="text-slate-200">What it is:</strong> Chronological audit timeline showing real-time updates performed by team members across case files.</p>
                    <p><strong className="text-slate-200">Why it is needed:</strong> Keeps all partners, associates, and clerks informed on recent filings, status edits, and document uploads.</p>
                    <div className="text-slate-400 space-y-1 pt-1 border-t border-slate-800/80">
                      <p className="font-semibold text-slate-200">Developer Instructions:</p>
                      <p>• Stream or fetch events from <code className="text-blue-400">GET /api/activity?limit=5</code></p>
                      <p>• Clicking "Full feed" opens <code className="text-blue-400">/workspace/activity</code>.</p>
                    </div>
                  </div>

                </div>
              </section>

              {/* Section 4: Navigation Map */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Navigation Map & Click Routes
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                        <th className="pb-2">UI Element</th>
                        <th className="pb-2">Behavior</th>
                        <th className="pb-2">Target URL Route</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-2 font-semibold text-white">+ New Matter Button</td>
                        <td className="py-2">Opens 5-step case creation wizard</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/cases/new</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Active Matter Item Row</td>
                        <td className="py-2">Opens case workspace for selected ID</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/cases/[id]</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Master Calendar Link</td>
                        <td className="py-2">Opens full calendar schedule</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/calendar</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Billing Snapshot Link</td>
                        <td className="py-2">Opens financial ledger and invoices</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/billing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5: Developer API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  5. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• <strong className="text-white">Workspace Stats API:</strong> <code className="text-blue-400">GET /api/workspace/stats</code></li>
                    <li>• <strong className="text-white">Active Matters API:</strong> <code className="text-blue-400">GET /api/cases?status=active</code></li>
                    <li>• <strong className="text-white">Upcoming Events API:</strong> <code className="text-blue-400">GET /api/calendar/events</code></li>
                    <li>• <strong className="text-white">Team Workload API:</strong> <code className="text-blue-400">GET /api/team/workload</code></li>
                    <li>• <strong className="text-white">Billing Summary API:</strong> <code className="text-blue-400">GET /api/billing/summary</code></li>
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

