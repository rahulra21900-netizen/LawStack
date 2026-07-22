"use client";

import React, { useState } from "react";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_DOCUMENTS } from "@/mocks/documents";
import { FileText, Download, Eye, Lock, BookOpen, X } from "lucide-react";

export default function ClientDocumentsPage() {
  const docs = MOCK_DOCUMENTS.slice(0, 4);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Portal", href: "/client/dashboard" }, { name: "Documents" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 border border-indigo-500/30">
              <FileText className="w-4 h-4 text-indigo-400" />
            </span>
            <span>Shared Documents</span>
          </h1>
          <p className="text-xs text-slate-400">Access contract briefs, pleadings, and corporate filings shared by your legal team.</p>
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
        <MetricCard title="Shared Files" value={docs.length} info="Available to you" trend="neutral" />
        <MetricCard title="Pending Review" value="1" info="Awaiting sign" trend="up" />
        <MetricCard title="Recent Shares" value="2" info="Last 7 days" trend="up" />
        <MetricCard title="Locked" value="0" info="Retention hold" trend="neutral" />
      </div>

      {/* Document cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map((d) => (
          <Card key={d.id}>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-indigo-400">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white truncate">{d.title}</h3>
                  <Badge label={d.type} variant="info" />
                </div>
                <p className="mt-1 text-[10px] text-slate-500">
                  v{d.version} · {(d.fileSizeBytes / 1024).toFixed(1)} KB · Updated {new Date(d.updatedAt).toLocaleDateString()}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-[11px] font-bold text-white transition-colors">
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950/40 hover:bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-slate-300 transition-colors">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  <Badge label={d.status} variant={d.status === "Approved" ? "success" : "warning"} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Secure note */}
      <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 flex items-center gap-3">
        <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Documents shared through this portal are encrypted in transit and at rest. Access is scoped to your client account and logged for compliance.
        </p>
      </div>

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-indigo-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Client Shared Documents Vault — Developer Guide</h2>
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
                      The Client Shared Documents Vault is an end-to-end encrypted file exchange hub where law firms share court petitions, daily order sheets, retainer agreements, and evidence bundles with clients.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Senior Advocate & Judicial Officer's Perspective):</strong>
                    <p className="text-slate-400">
                      Secure file distribution protects advocate-client statutory confidentiality:
                      <br />
                      • <strong>Section 132 BSA 2023 Evidentiary Privilege:</strong> Traditional email attachments expose client trade secrets and trial strategy to public servers. The Client Vault encrypts files in transit and at rest, scoped strictly to authorized client users.
                      <br />
                      • <strong>Versioned Pleading Approvals:</strong> Enables corporate legal teams to review draft petitions (v1.0, v2.0), inspect index pages, and provide pre-filing sign-offs.
                      <br />
                      • <strong>Instant Order Copy Access:</strong> Provides clients 24/7 access to signed court orders and Vakalatnama copies without physical office visits.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Indian Document Vault Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in legal document management, here are the key concepts:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Section 132 BSA Privileged Vault</strong>
                      <p className="text-slate-400 text-[11px]">
                        Cryptographically protected file repository preserving advocate-client statutory confidentiality.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Pleading Version Control</strong>
                      <p className="text-slate-400 text-[11px]">
                        Tracking iterations (v1.0, v2.0) of petitions as revisions are made prior to High Court e-filing.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Certified Order Sheet Copy</strong>
                      <p className="text-slate-400 text-[11px]">
                        Digitally signed daily judicial order downloaded from eCourts NJDG and stored in the client vault.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. Client Approval Audit</strong>
                      <p className="text-slate-400 text-[11px]">
                        Timestamped record logging when the client reviews and approves a draft petition for court submission.
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
                    <p className="text-slate-400">Displays counts for <strong className="text-slate-200">Shared Files</strong>, <strong className="text-slate-200">Pending Review</strong>, <strong className="text-slate-200">Recent Shares</strong>, and <strong className="text-slate-200">Locked Files</strong>.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 border border-slate-800 col-span-1 md:col-span-2">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      2. Document Vault Grid & Action Buttons
                    </p>
                    <p className="text-slate-400">Cards rendering document title, category badge, version number, size, update timestamp, View button, Download button, and Status badge.</p>
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
                        <td className="py-2 font-semibold text-white">View Document Button</td>
                        <td className="py-2">Opens PDF/image document preview modal</td>
                        <td className="py-2 font-mono text-indigo-400">Document Viewer</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Download Button</td>
                        <td className="py-2">Triggers secure encrypted file download stream</td>
                        <td className="py-2 font-mono text-emerald-400">File Download API</td>
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
                    <li>• <strong className="text-white">List Client Documents:</strong> <code className="text-blue-400">GET /api/client/documents</code></li>
                    <li>• <strong className="text-white">Download Scoped File Stream:</strong> <code className="text-blue-400">GET /api/client/documents/[id]/download</code></li>
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

