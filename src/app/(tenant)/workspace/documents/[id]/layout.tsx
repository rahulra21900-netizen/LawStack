"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/ui";
import { MOCK_DOCUMENTS } from "@/mocks/documents";
import { FileText, ArrowLeft, BookOpen, X } from "lucide-react";

export default function DocumentDetailsLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const pathname = usePathname();
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  const docData = MOCK_DOCUMENTS.find((d) => d.id === id);

  if (!docData) {
    return (
      <div className="p-8 text-center text-xs text-red-400">
        Error: Document registry ID "{id}" does not exist in file database.
      </div>
    );
  }

  const tabs = [
    { name: "Overview", path: "overview" },
    { name: "Visual Preview", path: "preview" },
    { name: "Version Timeline", path: "versions" },
    { name: "Activity Trail", path: "activity" },
    { name: "Approvals Queue", path: "approvals" },
    { name: "Access Permissions", path: "sharing" },
    { name: "Related Records", path: "related" },
    { name: "AI Panel", path: "ai" },
    { name: "Settings", path: "settings" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Info Panel */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Documents", href: "/workspace/documents" }, { name: docData.title }]} />
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{docData.title}</h1>
            </div>
            <p className="text-xs text-slate-400">Category: <strong className="text-slate-200">{docData.type}</strong> • Version: v{docData.version} • Author: {docData.author}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeveloperGuide(true)}
              className="flex items-center gap-1.5 text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg font-semibold transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Developer Guide</span>
            </button>
            <Link href="/workspace/documents">
              <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg font-semibold">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Documents Directory</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Tab Links Row */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-2">
          {tabs.map((tab) => {
            const isSelected = pathname.endsWith(`/workspace/documents/${id}/${tab.path}`) || (tab.path === "overview" && pathname.endsWith(`/workspace/documents/${id}`));
            return (
              <Link
                key={tab.path}
                href={`/workspace/documents/${id}/${tab.path}`}
                className={`px-4 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  isSelected ? "border-indigo-500 text-indigo-400 bg-indigo-500/5 font-bold" : "border-transparent text-slate-400 hover:text-white"
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
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-indigo-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Document Action Workspace — Developer Guide ({docData.title})</h2>
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
                      This is the deep 360-degree Document Action Workspace Hub opened when an Advocate or Paralegal clicks the **Action button** ("Open Document Preview" / External Link icon) on any document row in the Document Vault. It provides 9 specialized sub-tabs to manage, preview, version-track, approve, and analyze <strong className="text-white">{docData.title}</strong> (ID: <code className="text-indigo-400">{id}</code>).
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Senior Advocate & Judicial Officer's Perspective):</strong>
                    <p className="text-slate-400">
                      In High Courts and the Supreme Court of India, a legal filing is not merely a digital PDF — it is a sworn legal instrument subject to statutory evidence laws:
                      <br />
                      • **Bharatiya Sakshya Adhiniyam (BSA) 2023 Sec 61 & 63 Certification:** Any electronic document produced as evidence must have a verifiable cryptographic hash (SHA-256) and a complete audit trail proving it was not modified after filing.
                      <br />
                      • **Senior Partner Sign-off & Clearance:** Before an associate advocate files a Special Leave Petition (SLP) or Writ Petition in court, the Senior Advocate or Managing Partner must review the draft and click **Approve** in the Approvals Queue (`/approvals`).
                      <br />
                      • **Version Control & Redline Comparison (`/versions`):** Advocates frequently revise petitions through 10+ draft iterations. They must compare earlier drafts against opposing counsel's replies to identify factual discrepancies.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Indian Courtroom Document Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in Indian legal systems, here are the core legal terms used across these 9 sub-tabs:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. BSA 2023 Sec 63 Digital Certificate</strong>
                      <p className="text-slate-400 text-[11px]">
                        A statutory certificate accompanying electronic records in Indian courts confirming that the computer system, server hash, and file integrity remained uncorrupted.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Advocate-Client Privilege (Sec 132)</strong>
                      <p className="text-slate-400 text-[11px]">
                        Under Section 132 of the Evidence Act / BSA 2023, communications between advocates and clients are legally confidential and protected from subpoena.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Pleadings & Exhibits</strong>
                      <p className="text-slate-400 text-[11px]">
                        <strong className="text-slate-200">Plaint / Petition:</strong> The official statement of claim.<br />
                        <strong className="text-slate-200">Written Statement:</strong> Opposing party's formal reply.<br />
                        <strong className="text-slate-200">Exhibits (Annexures):</strong> Supporting documentary evidence marked as Exh A, Exh B, etc.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. Redline Diffing (v1.0 vs v2.1)</strong>
                      <p className="text-slate-400 text-[11px]">
                        Comparing two document versions to highlight added text (green), deleted text (red strikethrough), and modified clauses before court submission.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Deep Breakdown of all 9 Sub-Tabs */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Deep Feature Breakdown of All 9 Document Sub-Tabs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-400" />
                      1. Overview (`/overview`)
                    </p>
                    <p className="text-slate-400">
                      Primary metadata dashboard: File Title, Category (Contract/Pleading/Motion/Brief), Version tag (<code className="text-amber-300">v{docData.version}</code>), Author, File Size, BSA 2023 Certificate status, and linked Case Matter ID.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      2. Visual Preview (`/preview`)
                    </p>
                    <p className="text-slate-400">
                      High-fidelity, in-browser PDF/DOCX renderer with multi-page scrolling, zoom controls, full-screen mode, and page thumbnail navigation bar.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      3. Version Timeline (`/versions`)
                    </p>
                    <p className="text-slate-400">
                      Chronological history of file revisions (`v1.0`, `v1.1`, `v2.0`) showing editor identity, commit notes, side-by-side redline diff viewer, and 1-click version restore controls.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      4. Activity Trail (`/activity`)
                    </p>
                    <p className="text-slate-400">
                      Immutable, tamper-evident audit log recording every event: file view, download, permission edit, client portal share, or digital signature attachment.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      5. Approvals Queue (`/approvals`)
                    </p>
                    <p className="text-slate-400">
                      Senior Partner sign-off workflow: submit draft for review, add review comments, approve for court filing, or request revisions.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      6. Access Permissions (`/sharing`)
                    </p>
                    <p className="text-slate-400">
                      Granular role-based access matrix: restrict document visibility to specific advocates, set client portal view-only privileges, or lock down privileged strategy briefs.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-teal-400" />
                      7. Related Records (`/related`)
                    </p>
                    <p className="text-slate-400">
                      Cross-referenced court documents: link supporting affidavits, evidence annexures, counter-affidavits, and cited High Court judgments to this primary file.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-400" />
                      8. AI Panel (`/ai`)
                    </p>
                    <p className="text-slate-400">
                      AI Legal Copilot for documents: automatically extract key indemnity clauses, flag missing statutory disclosures, generate executive summaries, and search precedent case law.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1 md:col-span-2">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-slate-400" />
                      9. Settings (`/settings`)
                    </p>
                    <p className="text-slate-400">
                      Administrative file controls: edit document title/type, lock file against further edits, configure retention policies, or initiate permanent archive/deletion.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4: Action Button Navigation & Workflow */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Action Button Navigation & Workflow Matrix
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                        <th className="pb-2">Action Triggered</th>
                        <th className="pb-2">UI Component / Route</th>
                        <th className="pb-2">Primary Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-2 font-semibold text-white">Clicking Row / Eye Icon</td>
                        <td className="py-2 font-mono text-emerald-400">DetailDrawer (Slide-Over)</td>
                        <td className="py-2">Quickly inspect document metadata, version, and file size without leaving the list view</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Clicking Action Button</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/documents/[id]/overview</td>
                        <td className="py-2">Opens full 9-tab Document Action Workspace Hub</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Clicking "Visual Preview" Tab</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/documents/[id]/preview</td>
                        <td className="py-2">Renders in-browser PDF reader for trial preparation</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Clicking "Approvals" Tab</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/documents/[id]/approvals</td>
                        <td className="py-2">Submits draft for Senior Partner clearance before court filing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  5. Backend Developer API Checklist for Document Action Workspace
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• <strong className="text-white">Get Document Details:</strong> <code className="text-blue-400">GET /api/documents/[id]</code></li>
                    <li>• <strong className="text-white">Stream File PDF Content:</strong> <code className="text-blue-400">GET /api/documents/[id]/stream</code></li>
                    <li>• <strong className="text-white">Get Version History:</strong> <code className="text-blue-400">GET /api/documents/[id]/versions</code></li>
                    <li>• <strong className="text-white">Submit Partner Approval:</strong> <code className="text-blue-400">POST /api/documents/[id]/approvals</code></li>
                    <li>• <strong className="text-white">Generate BSA 2023 Sec 63 Hash:</strong> <code className="text-blue-400">GET /api/documents/[id]/bsa-certificate</code></li>
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


