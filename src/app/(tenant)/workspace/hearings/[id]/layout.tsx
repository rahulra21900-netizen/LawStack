"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/ui";
import { MOCK_HEARINGS } from "@/mocks/hearings";
import { Scale, ArrowLeft, BookOpen, X } from "lucide-react";

export default function HearingDetailsLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const pathname = usePathname();
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  const hearingData = MOCK_HEARINGS.find((h) => h.id === id);

  if (!hearingData) {
    return (
      <div className="p-8 text-center text-xs text-red-400">
        Error: Hearing registry ID "{id}" does not exist in court calendar.
      </div>
    );
  }

  const tabs = [
    { name: "Overview", path: "overview" },
    { name: "Participants", path: "participants" },
    { name: "Documents", path: "documents" },
    { name: "Hearing Timeline", path: "timeline" },
    { name: "Activity Trail", path: "activity" },
    { name: "AI Panel", path: "ai" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Info Panel */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Hearings", href: "/workspace/hearings" }, { name: hearingData.judgeName }]} />
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Hearing: {hearingData.judgeName}</h1>
            </div>
            <p className="text-xs text-slate-400">Venue: <strong className="text-slate-200">{hearingData.location}</strong> • Courtroom: {hearingData.courtroom} • Time: {new Date(hearingData.dateTime).toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeveloperGuide(true)}
              className="flex items-center gap-1.5 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg font-semibold transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Developer Guide</span>
            </button>
            <Link href="/workspace/hearings">
              <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg font-semibold">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Hearings List</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Tab Links Row */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-2">
          {tabs.map((tab) => {
            const isSelected = pathname.endsWith(`/workspace/hearings/${id}/${tab.path}`) || (tab.path === "overview" && pathname.endsWith(`/workspace/hearings/${id}`));
            return (
              <Link
                key={tab.path}
                href={`/workspace/hearings/${id}/${tab.path}`}
                className={`px-4 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  isSelected ? "border-amber-500 text-amber-400 bg-amber-500/5 font-bold" : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tab Panels Contents */}
      <div className="bg-slate-900/30 border border-slate-800/80 rounded-xl p-5 md:p-6 min-h-[300px]">
        {children}
      </div>

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Hearing Detail Workspace — Developer Guide ({hearingData.judgeName})</h2>
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
                      This is the dedicated 360-degree Hearing Detail Workspace Hub for a specific court session (ID: <code className="text-amber-400">{id}</code>). It provides 6 sub-tabs to manage court participants, evidence briefs, order sheet logs, and AI argument summaries.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Advocate's Perspective):</strong>
                    <p className="text-slate-400">
                      Before appearing in court, Advocates need a single hub to review presiding judge profiles, inspect assigned senior & associate counsel, verify evidence exhibits attached to the hearing brief, and log the Daily Order Sheet after court rises.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Hearing Workspace Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in Indian legal systems, here are the essential terms:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Hearing Participants</strong>
                      <p className="text-slate-400 text-[11px]">
                        The Lead Advocate, Senior Counsel, Junior Associates, Court Clerk/Munshi, Opposing Counsel, and Court Stenographer.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Hearing Brief Documents</strong>
                      <p className="text-slate-400 text-[11px]">
                        The compiled binder of pleadings, affidavits, evidence annexures, and case law precedents prepared specifically for today's hearing.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Hearing Timeline & Bench Orders</strong>
                      <p className="text-slate-400 text-[11px]">
                        Chronological log of interim orders, pass-over requests, witness cross-examinations, and next date of hearing (NDOH) settings.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. AI Legal Argument Assistant</strong>
                      <p className="text-slate-400 text-[11px]">
                        AI tool that analyzes the judge's historical ruling patterns, summarizes key points from opposing counsel's filings, and suggests rebuttal arguments.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: 6 Sub-Tabs Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Complete Hearing Workspace Sub-Tabs Breakdown (6 Sub-Tabs)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">1. Overview (`/overview`)</p>
                    <p className="text-slate-400">Hearing status, judge name, courtroom location, venue jurisdiction, and scheduled date/time.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">2. Participants (`/participants`)</p>
                    <p className="text-slate-400">Roster of assigned lead advocate, associates, clerk/munshi, opposing counsel, and judicial bench.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">3. Documents (`/documents`)</p>
                    <p className="text-slate-400">Attached trial briefs, petitions, evidence exhibits, and supporting case law authorities.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">4. Hearing Timeline (`/timeline`)</p>
                    <p className="text-slate-400">Minute-by-minute courtroom progress notes, witness testimonies, and order sheet entries.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">5. Activity Trail (`/activity`)</p>
                    <p className="text-slate-400">Tamper-evident audit log of hearing updates, document access, and status changes.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">6. AI Panel (`/ai`)</p>
                    <p className="text-slate-400">AI argument generator, judicial ruling predictor, and real-time speech-to-text dictation notes summary.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1 text-slate-300">
                    <li>• <strong className="text-white">Get Hearing Profile:</strong> <code className="text-blue-400">GET /api/hearings/[id]</code></li>
                    <li>• <strong className="text-white">Get Hearing Participants:</strong> <code className="text-blue-400">GET /api/hearings/[id]/participants</code></li>
                    <li>• <strong className="text-white">Get Hearing Brief Docs:</strong> <code className="text-blue-400">GET /api/hearings/[id]/documents</code></li>
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

