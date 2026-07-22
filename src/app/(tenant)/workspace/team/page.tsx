"use client";

import React, { useState } from "react";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { MetricCard } from "@/components/cards";
import { DataTable } from "@/components/tables";
import { MOCK_USERS } from "@/mocks/users";
import { Users, Calendar, ChartBar as BarChart2, UserCheck, TrendingUp, Clock, Plus, BookOpen, X } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/cards";

export default function TeamDashboardPage() {
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Team" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 border border-indigo-500/30">
              <Users className="w-4 h-4 text-indigo-400" />
            </span>
            <span>Team Workspace</span>
          </h1>
          <p className="text-xs text-slate-400">View corporate departments, workload quotas, and availability calendars.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeveloperGuide(true)}
            className="border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/10"
            leftIcon={<BookOpen className="h-4 w-4" />}
          >
            Developer Guide
          </Button>
          <Link href="/workspace/team/members">
            <Button variant="secondary" size="sm">Members Directory</Button>
          </Link>
          <Link href="/workspace/team/workload">
            <Button variant="secondary" size="sm">Workload Yields</Button>
          </Link>
        </div>
      </div>

      {/* Team KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Active Attorneys" value="8" info="Chandra & Associates roster" trend="up" />
        <MetricCard title="Capacity" value="84%" info="Matter distribution" trend="up" change="Utilized" />
        <MetricCard title="Upcoming Leave" value="1" info="Roster clear" trend="neutral" />
        <MetricCard title="Avg Hours/Wk" value="26h" info="Billable per attorney" trend="up" change="+2.4h" />
      </div>

      {/* Workload bars */}
      <Card
        header={<div className="flex items-center gap-2"><BarChart2 className="w-4 h-4 text-indigo-400" /><span className="font-bold text-white text-xs">Weekly Billable Workload</span></div>}
      >
        <div className="space-y-3">
          {[
            { name: "Priya Chandra", hours: 32, color: "from-blue-500 to-cyan-500" },
            { name: "Arjun Mehta", hours: 28, color: "from-emerald-500 to-teal-500" },
            { name: "Meera Verma", hours: 24, color: "from-amber-500 to-orange-500" },
            { name: "Rohan Deshpande", hours: 19, color: "from-indigo-500 to-blue-500" },
          ].map((m) => (
            <div key={m.name} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-white w-28 truncate shrink-0">{m.name}</span>
              <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${m.color}`} style={{ width: `${(m.hours / 40) * 100}%` }} />
              </div>
              <span className="text-[10px] text-slate-500 w-12 text-right shrink-0">{m.hours}h</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Directory snippet */}
      <DataTable
        title="Personnel Roster Snippet"
        data={MOCK_USERS.slice(0, 4)}
        columns={[
          { header: "Name", accessor: (u) => <span className="font-bold text-white">{u.name}</span> },
          { header: "Email Address", accessor: (u) => <span className="font-mono text-[10px] text-slate-400">{u.email}</span> },
          { header: "Role", accessor: (u) => <Badge label={u.role} variant="info" /> }
        ]}
      />

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-indigo-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Team & Personnel Workspace — Developer Guide</h2>
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
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  1. Core Purpose & Mandatory Overview
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-3">
                  <div>
                    <strong className="text-white text-sm block mb-1">What it is:</strong>
                    <p className="text-slate-300">
                      The Team & Personnel Workspace is the law firm's human resources and attorney capacity management center. It tracks legal advocate rosters, billable hour quotas, court availability, and department allocations.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Senior Advocate & Judicial Officer's Perspective):</strong>
                    <p className="text-slate-400">
                      Running an effective Indian law practice requires managing multiple tiers of legal personnel:
                      <br />
                      • **Advocate Role Delegation:** Managing partners must balance caseloads between Senior Advocates, Associate Advocates, and Court Munshis (clerks).
                      <br />
                      • **Capacity & Workload Quotas:** Tracking weekly billable hours prevents associate burnout and ensures that high-stake High Court matters have sufficient lead counsel backing.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Indian Law Firm Personnel Roles Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in Indian legal practice, here are the core roles:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Designated Senior Advocate</strong>
                      <p className="text-slate-400 text-[11px]">
                        Senior counsel designated under Sec 16 Advocates Act 1961 who lead oral arguments before High Courts and Supreme Court.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Partner / Advocate-on-Record (AoR)</strong>
                      <p className="text-slate-400 text-[11px]">
                        Managing advocate entitled to file Vakalatnamas and represent clients directly in court.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Associate Advocate</strong>
                      <p className="text-slate-400 text-[11px]">
                        Junior lawyer handling legal research, client communications, and preliminary petition drafting.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. Court Munshi (Legal Clerk)</strong>
                      <p className="text-slate-400 text-[11px]">
                        Essential administrative staff managing physical filing counters, paper book binding, and certified copy pickups.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Component Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Complete Component & Feature Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-400" />
                      1. Top Metric Cards (4 Cards)
                    </p>
                    <p className="text-slate-400">Displays counts for <strong className="text-slate-200">Active Attorneys</strong>, firm <strong className="text-slate-200">Capacity Allocation %</strong>, <strong className="text-slate-200">Upcoming Leave</strong>, and <strong className="text-slate-200">Avg Weekly Billable Hours</strong>.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      2. Weekly Billable Workload Bar Chart
                    </p>
                    <p className="text-slate-400">Visual progress bars tracking individual attorney billable hours against a 40-hour weekly target.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 col-span-1 md:col-span-2">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      3. Personnel Roster Snippet Table
                    </p>
                    <p className="text-slate-400">Displays Associate Name, Email Address, and Administrative Role badge.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Navigation & Button Actions Map */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Button Actions & Navigation Links
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
                        <td className="py-2 font-semibold text-white">Members Directory Button</td>
                        <td className="py-2">Opens complete employee roster table</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/team/members</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Workload Yields Button</td>
                        <td className="py-2">Opens matter capacity breakdown by advocate</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/team/workload</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  5. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• <strong className="text-white">List Team Members:</strong> <code className="text-blue-400">GET /api/team/members</code></li>
                    <li>• <strong className="text-white">Get Workload Capacity:</strong> <code className="text-blue-400">GET /api/team/workload</code></li>
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

