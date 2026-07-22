"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb, Button } from "@/components/ui";
import { MOCK_CASES } from "@/mocks/cases";
import { Briefcase, ArrowLeft, BookOpen, X } from "lucide-react";

export default function MatterDetailsLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const pathname = usePathname();
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  const caseData = MOCK_CASES.find((c) => c.id === id);

  if (!caseData) {
    return (
      <div className="p-8 text-center text-xs text-red-400">
        Error: Case Matter ID "{id}" does not exist in registry database.
      </div>
    );
  }

  const tabs = [
    { name: "Overview", path: "overview" },
    { name: "Timeline", path: "timeline" },
    { name: "Tasks", path: "tasks" },
    { name: "Documents", path: "documents" },
    { name: "Hearings", path: "hearings" },
    { name: "Billing", path: "billing" },
    { name: "Team", path: "team" },
    { name: "Activity", path: "activity" },
    { name: "AI Panel", path: "ai" },
    { name: "Notes", path: "notes" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Info Panel */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Cases", href: "/workspace/cases" }, { name: caseData.title }]} />
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{caseData.title}</h1>
            </div>
            <p className="text-xs text-slate-400">Case Number: <strong className="font-mono text-slate-200">{caseData.caseNumber}</strong> • Lead: {caseData.leadCounsel}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              leftIcon={<BookOpen className="w-4 h-4" />}
              onClick={() => setShowDeveloperGuide(true)}
            >
              Developer Guide
            </Button>
            <Link href="/workspace/cases">
              <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg font-semibold">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Matters List</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Tab Links Row */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-2">
          {tabs.map((tab) => {
            const isSelected = pathname.endsWith(`/workspace/cases/${id}/${tab.path}`) || (tab.path === "overview" && pathname.endsWith(`/workspace/cases/${id}`));
            return (
              <Link
                key={tab.path}
                href={`/workspace/cases/${id}/${tab.path}`}
                className={`px-4 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  isSelected ? "border-blue-500 text-blue-400 bg-blue-500/5 font-bold" : "border-transparent text-slate-400 hover:text-white"
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
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Case File Workspace — Developer Guide ({caseData.caseNumber})</h2>
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
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  1. Core Purpose & Mandatory Overview
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-3">
                  <div>
                    <strong className="text-white text-sm block mb-1">What it is:</strong>
                    <p className="text-slate-300">
                      This is the 360-degree Case File Workspace opened when an Advocate clicks the **Action button** ("Open Case File") on any case row. It provides 10 specialized sub-tabs covering everything related to this specific legal matter (Case ID: <code className="text-blue-300">{id}</code>).
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Advocate's Perspective):</strong>
                    <p className="text-slate-400">
                      When an Advocate enters a courtroom to argue a case before a Bench of judges, they need immediate access to every aspect of the lawsuit:
                      <br />
                      • They must check the **Overview** to identify the presiding Judge and Opposing Counsel.
                      <br />
                      • They must inspect **Documents** to retrieve signed Vakalatnama forms, petitions, and evidence filings.
                      <br />
                      • They must review **Hearings** to see daily order sheets from prior court dates.
                      <br />
                      • Having all 10 sub-tabs in one unified hub prevents lost papers during active court proceedings.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Case File Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in Indian legal systems, here are the essential terms used in this Case Workspace:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Vakalatnama Form</strong>
                      <p className="text-slate-400 text-[11px]">
                        The official authorization document signed by the client empowering the Advocate to appear and file papers in court on their behalf.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Opposing Counsel</strong>
                      <p className="text-slate-400 text-[11px]">
                        The Advocate representing the adversary (respondent or defendant) in the court case.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Interim / Stay Order</strong>
                      <p className="text-slate-400 text-[11px]">
                        A temporary court order issued by the Judge protecting the client's rights until final judgment is delivered.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. Daily Order Sheet</strong>
                      <p className="text-slate-400 text-[11px]">
                        The official written summary issued by the court reader recording what transpired during the hearing and setting the next court date.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: 10 Sub-Tabs Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Complete Case Workspace Sub-Tabs Breakdown (10 Sub-Tabs)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      1. Overview (`/overview`)
                    </p>
                    <p className="text-slate-400">Main case summary: Case title, docket number, practice area, lead advocate, court name, judge, opposing counsel, and client profile.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      2. Timeline (`/timeline`)
                    </p>
                    <p className="text-slate-400">Procedural case history: chronological timeline of court filings, hearing outcomes, interim orders, and future trial dates.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      3. Tasks (`/tasks`)
                    </p>
                    <p className="text-slate-400">Matter-specific action items assigned to lawyers, paralegals, and office staff with due dates and priority tags.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      4. Documents (`/documents`)
                    </p>
                    <p className="text-slate-400">Case document repository: petitions, affidavits, evidence files, discovery records, Vakalatnama, and court orders.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-400" />
                      5. Hearings (`/hearings`)
                    </p>
                    <p className="text-slate-400">List of past and future court hearings with bench numbers, judge observations, and daily order sheets.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-teal-400" />
                      6. Billing (`/billing`)
                    </p>
                    <p className="text-slate-400">Financial ledger for this case: logged billable hours, fee retainer balance, court fee expenses, and generated invoices.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      7. Team (`/team`)
                    </p>
                    <p className="text-slate-400">Lawyers, senior counsel, associates, and paralegals assigned to handle this specific case file.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-400" />
                      8. Activity (`/activity`)
                    </p>
                    <p className="text-slate-400">Real-time audit log of file uploads, status changes, and edits made to this specific case file.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      9. AI Panel (`/ai`)
                    </p>
                    <p className="text-slate-400">AI Legal Copilot assistant for drafting petitions, extracting clause summaries, and finding precedents for this case.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      10. Notes (`/notes`)
                    </p>
                    <p className="text-slate-400">Confidential advocate scratchpad notes, trial strategies, and courtroom argument observations.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Backend Developer API Checklist for Case Detail Workspace
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• <strong className="text-white">Get Case Details:</strong> <code className="text-blue-400">GET /api/cases/{id}</code></li>
                    <li>• <strong className="text-white">Get Case Documents:</strong> <code className="text-blue-400">GET /api/cases/{id}/documents</code></li>
                    <li>• <strong className="text-white">Get Case Hearings:</strong> <code className="text-blue-400">GET /api/cases/{id}/hearings</code></li>
                    <li>• <strong className="text-white">Get Case Timeline:</strong> <code className="text-blue-400">GET /api/cases/{id}/timeline</code></li>
                    <li>• <strong className="text-white">Get Case Billing:</strong> <code className="text-blue-400">GET /api/cases/{id}/billing</code></li>
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


