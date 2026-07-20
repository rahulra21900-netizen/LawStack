"use client";

import React from "react";
import Link from "next/link";
import { Breadcrumb, Badge, Button, Avatar } from "@/components/ui";
import { MetricCard, Card } from "@/components/cards";
import { MOCK_CASES } from "@/mocks/cases";
import { Briefcase, FileText, DollarSign, MessageSquare, Shield, ArrowRight, ChevronRight, Clock, CircleCheck as CheckCircle2, TriangleAlert as AlertTriangle, Calendar, Bell, Plus, Scale } from "lucide-react";

const clientMatters = MOCK_CASES.slice(0, 2);

const recentUpdates = [
  {
    title: "Anticipatory Bail Application filed",
    matter: "Reliance Retail v. QuickCart Technologies",
    time: "2 days ago",
    type: "filing",
  },
  {
    title: "Discovery documents shared with your team",
    matter: "Krishna Textiles v. CIT",
    time: "5 days ago",
    type: "document",
  },
  {
    title: "Hearing scheduled for next month",
    matter: "Reliance Retail v. QuickCart Technologies",
    time: "1 week ago",
    type: "hearing",
  },
];

const invoices = [
  { id: "INV-2026-014", amount: "₹2,450.00", status: "Due", due: "Aug 1, 2026" },
  { id: "INV-2026-013", amount: "₹1,500.00", status: "Due", due: "Jul 25, 2026" },
  { id: "INV-2026-012", amount: "₹3,200.00", status: "Paid", due: "Jul 1, 2026" },
];

const sharedDocuments = [
  { name: "Retainer Agreement.pdf", size: "248 KB", date: "Jul 12" },
  { name: "Discovery Bundle.zip", size: "12.4 MB", date: "Jul 10" },
  { name: "Case Strategy Memo.docx", size: "84 KB", date: "Jul 08" },
];

const updateType: Record<string, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  filing: { color: "text-blue-400", icon: FileText },
  document: { color: "text-emerald-400", icon: FileText },
  hearing: { color: "text-amber-400", icon: Scale },
};

export default function ClientDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Portal", href: "/client/dashboard" }, { name: "Dashboard" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 border border-indigo-500/30">
              <Shield className="w-4 h-4 text-indigo-400" />
            </span>
            <span>Client Portal</span>
          </h1>
          <p className="text-xs text-slate-400">
            Welcome back. Track your matters, review invoices, and collaborate with your counsel.
          </p>
        </div>
        <Link href="/client/messages">
          <Button variant="primary" leftIcon={<MessageSquare className="w-4 h-4" />}>
            Message Counsel
          </Button>
        </Link>
      </div>

      {/* Secure portal banner */}
      <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-r from-indigo-900/20 via-blue-900/10 to-transparent p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Secure portal session active</p>
            <p className="text-[10px] text-slate-400">All matter data is encrypted and scoped to your account.</p>
          </div>
        </div>
        <Badge label="Encrypted" variant="info" />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Active Matters" value={clientMatters.length} info="With assigned counsel" trend="neutral" />
        <MetricCard title="Outstanding Balance" value="₹3,950" trend="up" change="2 invoices due" info="Total payable" />
        <MetricCard title="Shared Documents" value={sharedDocuments.length} info="Available to view" trend="neutral" />
        <MetricCard title="Unread Messages" value="2" info="From your counsel" trend="neutral" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Matters */}
        <Card
          className="lg:col-span-2"
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-white text-xs">My Matters</span>
              </div>
              <Link href="/client/matters" className="text-[10px] text-blue-400 hover:underline flex items-center gap-0.5">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          }
        >
          <div className="space-y-3">
            {clientMatters.map((c) => (
              <div key={c.id} className="rounded-lg border border-slate-800 bg-slate-950/40 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">{c.caseNumber}</span>
                      <Badge label={c.stage} variant="info" />
                    </div>
                    <h3 className="mt-2 text-sm font-bold text-white">{c.title}</h3>
                    <p className="mt-1 text-[10px] text-slate-500">
                      {c.practiceArea} · Lead counsel: <span className="text-slate-300">{c.leadCounsel}</span>
                    </p>
                  </div>
                  <Link
                    href="/client/matters"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:gap-2 transition-all shrink-0"
                  >
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Timeline progress */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                    <span>Intake</span>
                    <span>Pleadings</span>
                    <span>Discovery</span>
                    <span>Trial</span>
                  </div>
                  <div className="relative h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                      style={{ width: "60%" }}
                    />
                  </div>
                  <p className="mt-1.5 text-[10px] text-slate-500">Currently in <span className="text-blue-400 font-bold">{c.stage}</span> stage</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Invoices */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-xs">Invoices</span>
              </div>
              <Link href="/client/billing" className="text-[10px] text-blue-400 hover:underline flex items-center gap-0.5">
                All <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          }
        >
          <div className="space-y-2">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2.5"
              >
                <div>
                  <div className="font-mono text-[10px] text-slate-400">{inv.id}</div>
                  <div className="text-xs font-bold text-white">{inv.amount}</div>
                  <div className="text-[9px] text-slate-500">Due {inv.due}</div>
                </div>
                <Badge label={inv.status} variant={inv.status === "Paid" ? "success" : "warning"} />
              </div>
            ))}
          </div>
          <Link
            href="/client/billing"
            className="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-2 text-xs font-bold text-white transition-colors"
          >
            Pay Outstanding Balance
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Card>
      </div>

      {/* Recent updates + Shared documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent updates */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white text-xs">Recent Case Updates</span>
              </div>
            </div>
          }
        >
          <ol className="relative border-l border-slate-800 ml-2 space-y-3 pl-6">
            {recentUpdates.map((u, idx) => {
              const meta = updateType[u.type];
              const Icon = meta.icon;
              return (
                <li key={idx} className="relative">
                  <span className={`absolute -left-[33px] flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 border border-slate-700 ${meta.color}`}>
                    <Icon className="w-3 h-3" />
                  </span>
                  <p className="text-xs text-slate-200 font-semibold">{u.title}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{u.matter} · {u.time}</p>
                </li>
              );
            })}
          </ol>
        </Card>

        {/* Shared documents */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white text-xs">Shared Documents</span>
              </div>
              <Link href="/client/documents" className="text-[10px] text-blue-400 hover:underline flex items-center gap-0.5">
                All <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          }
        >
          <div className="space-y-2">
            {sharedDocuments.map((d) => (
              <div
                key={d.name}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2.5 hover:border-slate-700 hover:bg-slate-900/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">{d.name}</div>
                    <div className="text-[10px] text-slate-500">{d.size} · Added {d.date}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
