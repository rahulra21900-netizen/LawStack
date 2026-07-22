"use client";

import React, { useState } from "react";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_CASES } from "@/mocks/cases";
import { Briefcase, Scale, Calendar, TrendingUp, BookOpen, X } from "lucide-react";
import { formatDate } from "@/utils/formatDate";

export default function ClientMattersPage() {
  const matters = MOCK_CASES.slice(0, 2);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDeveloperGuide(true)}
          className="border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/10"
          leftIcon={<BookOpen className="h-4 w-4" />}
        >
          Developer Guide
        </Button>
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
                <p className="mt-1.5 text-[10px] text-slate-500">Currently in <span className="text-indigo-400 font-bold">{c.stage}</span> · Opened {formatDate(c.openDate)}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-indigo-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Client Litigation Matters Roster — Developer Guide</h2>
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
                      The Client Litigation Matters Roster is the client-facing case tracking portal rendering active court petitions, 5-stage litigation progress bars, assigned lead advocate details, and judicial hearing schedules.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Senior Advocate & Judicial Officer's Perspective):</strong>
                    <p className="text-slate-400">
                      Transparent litigation tracking reduces law firm overhead:
                      <br />
                      • <strong>Eliminating Routine Chamber Inquiries:</strong> Litigants frequently call law offices to inquire about next hearing dates and petition status. A visual 5-stage progress track (Intake ➔ Pleadings ➔ Discovery ➔ Pre-Trial ➔ Trial) provides 24/7 self-service transparency without interrupting advocate courtroom preparation.
                      <br />
                      • <strong>Lead Counsel Accountability:</strong> Clearly attributes assigned Senior Counsel / Partners leading oral arguments, giving corporate legal heads confidence in trial management.
                      <br />
                      • <strong>CNR Number Judicial Scoping:</strong> Displays official 16-digit CNR codes, allowing clients to independently verify eCourts National Judicial Data Grid (NJDG) records.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Indian Litigation Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in court litigation stages, here are the key concepts:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. 5-Stage Litigation Pipeline</strong>
                      <p className="text-slate-400 text-[11px]">
                        Sequential court progression timeline (Intake, Pleadings, Discovery, Pre-Trial, Trial) matching Indian Civil/Criminal Procedure.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Lead Counsel Assignment</strong>
                      <p className="text-slate-400 text-[11px]">
                        Designated Senior Advocate or Partner managing court appearances and oral arguments.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Practice Area Category</strong>
                      <p className="text-slate-400 text-[11px]">
                        Specialization classification (e.g. Commercial Litigation, Intellectual Property, Writ Petition, Tax Appeal).
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. CNR Judicial Tracking Code</strong>
                      <p className="text-slate-400 text-[11px]">
                        Unique 16-digit judicial tracking code allowing client cross-verification on official eCourts portals.
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
                      1. Metric Cards (4 Cards)
                    </p>
                    <p className="text-slate-400">Displays counts for <strong className="text-slate-200">Active Matters</strong>, <strong className="text-slate-200">In Discovery</strong>, <strong className="text-slate-200">Pre-Trial Stage</strong>, and <strong className="text-slate-200">Hearings (30d)</strong>.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 border border-slate-800 col-span-1 md:col-span-2">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      2. Matter Cards & 5-Stage Pipeline Progress Tracks
                    </p>
                    <p className="text-slate-400">Interactive cards rendering case numbers, titles, practice area badges, lead counsel, and 5-stage progress gradient bars.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Navigation & Button Actions Map */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Button Actions & Interactive Controls Navigation Map
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                        <th className="pb-2">UI Action</th>
                        <th className="pb-2">Behavior</th>
                        <th className="pb-2">Target Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-2 font-semibold text-white">Developer Guide Button</td>
                        <td className="py-2">Opens Senior Advocate & Judicial guidance modal</td>
                        <td className="py-2 font-mono text-indigo-400">Modal Overlay</td>
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
                    <li>• <strong className="text-white">List Client Matters:</strong> <code className="text-blue-400">GET /api/client/matters</code></li>
                    <li>• <strong className="text-white">Get Matter Details:</strong> <code className="text-blue-400">GET /api/client/matters/[id]</code></li>
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

