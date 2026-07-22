"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Input, Select } from "@/components/forms";
import { MOCK_HEARINGS } from "@/mocks/hearings";
import { Scale, Plus, Download, Calendar, Users, Clock, CircleCheck as CheckCircle2, BookOpen, X } from "lucide-react";
import Link from "next/link";
import { MetricCard } from "@/components/cards";

export default function HearingsListPage() {
  const { addToast } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  const filteredHearings = MOCK_HEARINGS.filter((h) => h.judgeName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Hearings" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600/15 border border-amber-500/30">
              <Scale className="w-4 h-4 text-amber-400" />
            </span>
            <span>Hearings & Trials Docket</span>
          </h1>
          <p className="text-xs text-slate-400">Track court appearances, judge assignments, and trial statuses.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeveloperGuide(true)}
            className="border-amber-500/40 text-amber-300 hover:bg-amber-500/10"
            leftIcon={<BookOpen className="h-4 w-4" />}
          >
            Developer Guide
          </Button>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => addToast("Export Hearings", "CSV hearings logs summary exported.", "success")}
          >
            Export CSV
          </Button>
          <Link href="/workspace/hearings/new">
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Add Hearing Appearance
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Scheduled" value={MOCK_HEARINGS.filter((h) => h.status === "Scheduled").length} info="Upcoming" trend="up" />
        <MetricCard title="Completed" value={MOCK_HEARINGS.filter((h) => h.status === "Completed").length} info="Concluded" trend="neutral" />
        <MetricCard title="This Week" value="3" info="Next 7 days" trend="up" />
        <MetricCard title="Courtrooms" value="4" info="Active venues" trend="neutral" />
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <Input
          placeholder="Search by judge name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          options={[
            { label: "All Hearings Statuses", value: "all" },
            { label: "Scheduled", value: "Scheduled" },
            { label: "Completed", value: "Completed" }
          ]}
          onChange={() => {}}
        />
      </div>

      {/* Hearings Data Table */}
      <DataTable
        data={filteredHearings}
        columns={[
          {
            header: "Judge Name",
            accessor: (h) => (
              <Link href={`/workspace/hearings/${h.id}`} className="font-bold text-blue-400 hover:underline">
                {h.judgeName}
              </Link>
            )
          },
          { header: "Courtroom Room", accessor: (h) => <span>{h.courtroom}</span> },
          { header: "Venue Jurisdiction", accessor: (h) => <span className="text-slate-400">{h.location}</span> },
          { header: "Scheduled Date / Time", accessor: (h) => <span className="font-semibold text-slate-350">{new Date(h.dateTime).toLocaleString()}</span> },
          { header: "Status", accessor: (h) => <Badge label={h.status} variant={h.status === "Scheduled" ? "warning" : "success"} /> }
        ]}
      />

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Hearings & Trials Docket — Developer Guide</h2>
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
                      The Hearings & Trials Docket is the official register tracking court hearing appearances, presiding judges, courtroom numbers, hearing dates/times, and appearance statuses for all firm cases.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Senior Advocate & Judicial Officer's Perspective):</strong>
                    <p className="text-slate-400">
                      In Indian litigation, managing trial court hearings requires precise coordination:
                      <br />
                      • **Daily Cause List Tracking:** Advocates must track which judge is presiding over their matter, in which courtroom (e.g. Courtroom 3C), and at what time.
                      <br />
                      • **Order Sheet Logging:** Following every hearing, the Court Master issues a Daily Order Sheet recording proceedings. Advocates must update the docket status from <strong className="text-amber-400">Scheduled</strong> to <strong className="text-emerald-400">Completed</strong> and record the Next Date of Hearing (NDOH).
                      <br />
                      • **Judicial Roster Assignment:** Tracking presiding judge names (e.g. Hon. Justice Anil Kumar) allows senior partners to inspect judicial precedents and tailor oral arguments.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Indian Court Hearing Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in Indian legal systems, here are the essential terms used in this docket:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Cause List Item Number</strong>
                      <p className="text-slate-400 text-[11px]">
                        The sequential number assigned to a case on the judge's daily roster (e.g. Item No. 14 in Courtroom 3C).
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Daily Order Sheet</strong>
                      <p className="text-slate-400 text-[11px]">
                        The official written summary issued by the Court Master detailing what transpired during the hearing and setting the next date.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Presiding Judge / Judicial Bench</strong>
                      <p className="text-slate-400 text-[11px]">
                        The judge or panel of judges presiding over the court session (e.g. High Court Single Bench vs Division Bench).
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. Courtroom Pass-Over</strong>
                      <p className="text-slate-400 text-[11px]">
                        Sliding an item down the daily cause list when counsel is temporarily tied up presenting arguments in another courtroom.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Component Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Complete Component & Feature Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      1. Top Metric Cards (4 Cards)
                    </p>
                    <p className="text-slate-400">Displays counts for <strong className="text-slate-200">Scheduled</strong> upcoming hearings, <strong className="text-slate-200">Completed</strong> concluded hearings, <strong className="text-slate-200">This Week</strong> next 7 days, and <strong className="text-slate-200">Courtrooms</strong> active venues.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      2. Filter & Search Panel
                    </p>
                    <p className="text-slate-400">Search input for filtering by Presiding Judge Name and dropdown filter for Hearing Status (<strong className="text-white">All</strong>, <strong className="text-white">Scheduled</strong>, <strong className="text-white">Completed</strong>).</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 col-span-1 md:col-span-2">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      3. Hearings Data Table
                    </p>
                    <p className="text-slate-400">Displays Judge Name (clickable link navigating to <code className="text-blue-400">/workspace/hearings/[id]</code>), Courtroom Room, Venue Jurisdiction, Scheduled Date/Time, and Status badge.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Navigation & Button Actions Map */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
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
                        <td className="py-2 font-semibold text-white">Add Hearing Appearance Button</td>
                        <td className="py-2">Opens 6-step hearing scheduler wizard</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/hearings/new</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Clicking Judge Name Link</td>
                        <td className="py-2">Opens full 6-tab Hearing Detail Workspace Hub</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/hearings/[id]</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Export CSV Button</td>
                        <td className="py-2">Exports hearings docket log summary</td>
                        <td className="py-2 font-mono text-emerald-400">CSV Download</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  5. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• <strong className="text-white">List Hearings API:</strong> <code className="text-blue-400">GET /api/hearings?judge=&status=</code></li>
                    <li>• <strong className="text-white">Create Hearing Appearance:</strong> <code className="text-blue-400">POST /api/hearings</code></li>
                    <li>• <strong className="text-white">Get Hearing Details:</strong> <code className="text-blue-400">GET /api/hearings/[id]</code></li>
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

