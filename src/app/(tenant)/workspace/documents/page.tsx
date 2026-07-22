"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { CommandBar } from "@/components/navigation/CommandBar";
import { DetailDrawer } from "@/components/dialogs/DetailDrawer";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_DOCUMENTS } from "@/mocks/documents";
import { Document } from "@/types";
import { FileText, Eye, ExternalLink, BookOpen, X } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";

export default function DocumentsListPage() {
  const { addToast } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [inspectDoc, setInspectDoc] = useState<Document | null>(null);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  const filteredDocs = MOCK_DOCUMENTS.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || d.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleDeleteSelected = () => {
    addToast("Selected Files", `Simulated archiving of ${selectedIds.length} legal documents.`, "info");
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Documents" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 border border-indigo-500/30">
              <FileText className="w-4 h-4 text-indigo-400" />
            </span>
            <span>Document Vault</span>
          </h1>
          <p className="text-xs text-slate-400">SharePoint-grade document vault, briefs, contracts, and version control.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDeveloperGuide(true)}
            className="flex items-center gap-1.5 text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg font-semibold transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span>Developer Guide</span>
          </button>
          <Link href="/workspace/documents/new">
            <span className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-blue-500 transition-colors">
              + Upload File
            </span>
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Total Storage Used" value="142.5 MB" info="Standard Quota: 10 GB" trend="neutral" />
        <MetricCard title="Registered Files" value={MOCK_DOCUMENTS.length} info="Indexed documents" trend="up" />
        <MetricCard title="Under Review" value="3 pending" info="Awaiting partner approval" trend="neutral" />
      </div>

      {/* Microsoft Command Bar */}
      <CommandBar
        onNew={() => addToast("Upload Document", "Opening file upload dialog...", "info")}
        newLabel="Upload File"
        onRefresh={() => addToast("Refreshed", "Document vault re-indexed.", "success")}
        onExport={() => addToast("Export", "Document summary exported to CSV.", "success")}
        selectedCount={selectedIds.length}
        onDeleteSelected={handleDeleteSelected}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterCount={selectedType !== "all" ? 1 : 0}
        onToggleFilter={() => setShowFilterBar(!showFilterBar)}
        density={density}
        onDensityChange={setDensity}
      />

      {/* Filter Bar Panel */}
      {showFilterBar && (
        <Card className="animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="text-xs">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Document Category Filter
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full md:w-64 bg-slate-950/60 border border-slate-800 rounded-lg p-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Document Types</option>
              <option value="Contract">Contract</option>
              <option value="Pleading">Pleading</option>
              <option value="Motion">Motion</option>
              <option value="Brief">Brief</option>
            </select>
          </div>
        </Card>
      )}

      {/* DataTable */}
      <DataTable<Document>
        data={filteredDocs}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        density={density}
        onRowClick={(item) => setInspectDoc(item)}
        getRowId={(item) => item.id}
        columns={[
          {
            header: "Document Title",
            accessor: (d) => (
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="font-bold text-white group-hover:text-blue-400 transition-colors">
                  {d.title}
                </span>
              </div>
            ),
          },
          { header: "Type", accessor: (d) => <span className="font-semibold text-slate-300">{d.type}</span> },
          {
            header: "Version & Status",
            accessor: (d) => (
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-amber-400 font-bold">v{d.version}</span>
                {d.status === "Approved" ? (
                  <Badge label="Official Filed Version" variant="success" size="sm" />
                ) : d.status === "Draft" ? (
                  <Badge label="Draft (In Review)" variant="warning" size="sm" />
                ) : (
                  <Badge label="Client Shared" variant="info" size="sm" />
                )}
              </div>
            ),
          },
          {
            header: "OCR Indexing",
            accessor: (d) => (
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                ✓ OCR Searchable PDF
              </span>
            ),
          },
          {
            header: "Size",
            accessor: (d) => (
              <span className="font-mono text-[11px] text-slate-400">
                {(d.fileSizeBytes / 1024 / 1024).toFixed(2)} MB
              </span>
            ),
          },
          { header: "Last Modified", accessor: (d) => <span className="text-slate-400">{formatDate(d.updatedAt)}</span> },
          {
            header: "Status",
            accessor: (d) => (
              <Badge variant={d.status === "Approved" ? "success" : "warning"} size="sm">
                {d.status}
              </Badge>
            ),
          },
          {
            header: "Action",
            accessor: (d) => (
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setInspectDoc(d)}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Inspect Details"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <Link
                  href={`/workspace/documents/${d.id}`}
                  className="p-1 rounded text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-colors"
                  title="View Document Details"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ),
          },
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
                <h2 className="text-lg font-bold text-white">Document Vault & Repository — Developer Guide</h2>
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
                      The Document Vault is the law firm's central digital repository where petitions, affidavits, evidence exhibits, contracts, Vakalatnama forms, and court order copies are stored, indexed, and version-tracked.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Advocate's Perspective):</strong>
                    <p className="text-slate-400">
                      In Indian legal practice, handling physical paper files creates severe risks:
                      <br />
                      • **Bharatiya Sakshya Adhiniyam (BSA) 2023 Compliance:** Electronic evidence filed in court must meet strict admissibility standards under BSA Sec 61 & 63 (including digital signatures and tamper-proof audit trails).
                      <br />
                      • **Section 132 Attorney-Client Privilege:** Client briefs must be encrypted at rest so confidential case strategy is never exposed.
                      <br />
                      • **OCR Full-Text Searchability:** Advocates need to search text inside scanned court order copies (e.g. searching "Ad-Interim Stay") across thousands of scanned PDFs.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Indian Legal Document Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in Indian legal systems, here are the essential concepts:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Bharatiya Sakshya Adhiniyam (BSA) 2023</strong>
                      <p className="text-slate-400 text-[11px]">
                        The criminal evidence statute replacing the Indian Evidence Act, 1872. Governs electronic evidence admissibility and digital record certification (Sec 61 & 63).
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Pleading vs Brief vs Contract</strong>
                      <p className="text-slate-400 text-[11px]">
                        <strong className="text-slate-200">Pleading</strong> = Formal petition/reply submitted to the judge.<br />
                        <strong className="text-slate-200">Brief</strong> = Internal advocate outline.<br />
                        <strong className="text-slate-200">Contract</strong> = Agreement between parties.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. OCR Searchable PDF</strong>
                      <p className="text-slate-400 text-[11px]">
                        Optical Character Recognition technology converting scanned image PDFs of paper court papers into searchable digital text.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. Version Control (v1.0 ➔ v2.1)</strong>
                      <p className="text-slate-400 text-[11px]">
                        Tracking draft revisions made by associates before the Senior Partner approves the final official filed version.
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
                      1. Top Metric Cards (3 Cards)
                    </p>
                    <p className="text-slate-400">Displays counts for <strong className="text-slate-200">Total Storage Used</strong>, <strong className="text-slate-200">Registered Files</strong>, and <strong className="text-slate-200">Under Review</strong> (drafts awaiting partner approval).</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      2. Microsoft Command Bar Controls
                    </p>
                    <p className="text-slate-400">Includes real-time search input, <strong className="text-white">+ Upload File</strong> button (`/workspace/documents/new`), Refresh, Filter panel toggle, Density switcher (`Comfortable` / `Compact`), Export CSV, and batch Delete selected items.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      3. Category Filter Panel
                    </p>
                    <p className="text-slate-400">Toggles open to allow filtering documents by category: <strong className="text-slate-200">Contract</strong>, <strong className="text-slate-200">Pleading</strong>, <strong className="text-slate-200">Motion</strong>, or <strong className="text-slate-200">Brief</strong>.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      4. Selectable Data Table
                    </p>
                    <p className="text-slate-400">Displays Document Title, Type, Version badge (<code className="text-amber-300">v1.0</code>), Status Badge (<span className="text-emerald-400 font-semibold">Official Filed</span> vs <span className="text-amber-400 font-semibold">Draft</span>), OCR Searchable badge, File Size in MB, Last Modified date, and action icons.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 md:col-span-2">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      5. Inspect Slide-Over Drawer (`DetailDrawer`)
                    </p>
                    <p className="text-slate-400">Tapping any document row or the <strong className="text-white">Eye icon</strong> opens a slide-over panel displaying metadata without leaving the list view. Includes an <strong className="text-white">Open Document Preview</strong> button navigating to <code className="text-blue-400">/workspace/documents/[id]</code>.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Navigation Map */}
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
                        <td className="py-2 font-semibold text-white">+ Upload File Button</td>
                        <td className="py-2">Opens 5-step document upload & classification wizard</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/documents/new</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Eye Icon (Inspect)</td>
                        <td className="py-2">Opens slide-over detail drawer</td>
                        <td className="py-2 font-mono text-emerald-400">In-page drawer</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">External Link Icon</td>
                        <td className="py-2">Opens full document workspace hub</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/documents/[id]</td>
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
                    <li>• <strong className="text-white">List Documents API:</strong> <code className="text-blue-400">GET /api/documents?type=&search=</code></li>
                    <li>• <strong className="text-white">Upload File API:</strong> <code className="text-blue-400">POST /api/documents/upload</code></li>
                    <li>• <strong className="text-white">OCR Full-Text Search API:</strong> <code className="text-blue-400">GET /api/documents/search-ocr?query=</code></li>
                    <li>• <strong className="text-white">BSA 2023 Digital Certificate API:</strong> <code className="text-blue-400">GET /api/documents/[id]/bsa-certificate</code></li>
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
