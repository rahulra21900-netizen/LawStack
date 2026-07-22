"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_TEMPLATES } from "@/mocks/templates";
import { FileCode, Plus, FileText, Download, Star, Clock, BookOpen, X } from "lucide-react";
import { MetricCard } from "@/components/cards";

export default function TemplatesPage() {
  const { addToast } = useNotifications();
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Templates" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 border border-indigo-500/30">
              <FileCode className="w-4 h-4 text-indigo-400" />
            </span>
            <span>Document Templates</span>
          </h1>
          <p className="text-xs text-slate-400">Access pre-approved templates for NDAs, Sub-licensing agreements, and court motions.</p>
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
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => addToast("New Template Schema", "Template creator panel loaded.", "info")}
          >
            Add Template
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Templates" value={MOCK_TEMPLATES.length} info="Approved" trend="up" />
        <MetricCard title="Practice Areas" value="6" info="Covered" trend="neutral" />
        <MetricCard title="Avg Version" value="2.4" info="Lifecycle" trend="neutral" />
        <MetricCard title="Uses (30d)" value="128" info="Drafted from" trend="up" change="+18" />
      </div>

      <DataTable
        title="Approved Templates Grid"
        data={MOCK_TEMPLATES}
        columns={[
          { header: "Template Name", accessor: (t) => <span className="font-bold text-white">{t.name}</span> },
          { header: "Jurisdiction Practice Area", accessor: (t) => <span className="font-semibold">{t.practiceArea}</span> },
          { header: "Template Version", accessor: (t) => <span className="font-mono text-[10px] text-slate-400">v{t.version}</span> },
          { header: "Description Details", accessor: (t) => <p className="text-slate-400 truncate max-w-sm">{t.description}</p> },
          { header: "Last Modified", accessor: (t) => <span className="text-slate-500 text-[10px] font-mono">{t.lastUpdated}</span> }
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
                <h2 className="text-lg font-bold text-white">Document Templates & Court Filings — Developer Guide</h2>
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
                      The Document Templates module is a centralized library of pre-approved court pleading formats, vakalatnama authorizations, anticipatory bail applications under BNSS 482, writ petitions, and corporate contracts.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Senior Advocate & Judicial Officer's Perspective):</strong>
                    <p className="text-slate-400">
                      Standardizing legal court documents is essential for law practice efficiency:
                      <br />
                      • <strong>High Court & District Court Pleading Standardization:</strong> Drafting petitions from scratch leads to formatting errors, wrong statutory citations, and registry rejections. Standardized templates ensure all advocates and Munshis use BCI-compliant formats.
                      <br />
                      • <strong>BNS/BNSS Statutory Alignment & Version Control:</strong> When statutory codes change (e.g. 2023 criminal law enactments), central template updates guarantee every member of the firm cites current laws automatically.
                      <br />
                      • <strong>Automated Field Injection:</strong> Merges client details, CNR numbers, and presiding judge names into standardized document templates in seconds.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Indian Legal Template Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in legal document templates, here are the key concepts:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Vakalatnama Template</strong>
                      <p className="text-slate-400 text-[11px]">
                        Standardized authorization document filed by an advocate to represent a client before an Indian court forum.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Bilingual Petition Template</strong>
                      <p className="text-slate-400 text-[11px]">
                        Dual-language court pleading format (English + Hindi/Vernacular) commonly required in District Courts.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. High Court Formatting Preset</strong>
                      <p className="text-slate-400 text-[11px]">
                        Pre-configured margin, font, line-spacing, and index presets matching specific High Court registry manuals.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. Dynamic Placeholder Tag</strong>
                      <p className="text-slate-400 text-[11px]">
                        Merge fields (e.g. client name, CNR number, court bench) replaced automatically during document generation.
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
                    <p className="text-slate-400">Displays counts for <strong className="text-slate-200">Total Templates</strong>, <strong className="text-slate-200">Practice Areas Covered</strong>, <strong className="text-slate-200">Avg Version</strong>, and <strong className="text-slate-200">30d Uses</strong>.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      2. Add Template Button
                    </p>
                    <p className="text-slate-400">Launches template schema builder for creating new document definitions with placeholder tags.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 col-span-1 md:col-span-2">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      3. Approved Templates Grid Data Table
                    </p>
                    <p className="text-slate-400">DataTable displaying Template Name, Jurisdiction Practice Area, Version Number, Description Details, and Last Modified Timestamp.</p>
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
                        <th className="pb-2">Target Action / Route</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-2 font-semibold text-white">Add Template Button</td>
                        <td className="py-2">Opens template schema creator panel</td>
                        <td className="py-2 font-mono text-indigo-400">Template Builder</td>
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
                    <li>• <strong className="text-white">List Templates API:</strong> <code className="text-blue-400">GET /api/templates</code></li>
                    <li>• <strong className="text-white">Create Template API:</strong> <code className="text-blue-400">POST /api/templates</code></li>
                    <li>• <strong className="text-white">Merge Document Fields API:</strong> <code className="text-blue-400">POST /api/templates/merge</code></li>
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

