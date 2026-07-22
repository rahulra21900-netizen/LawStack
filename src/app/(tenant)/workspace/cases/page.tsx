"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { CommandBar } from "@/components/navigation/CommandBar";
import { DetailDrawer } from "@/components/dialogs/DetailDrawer";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_CASES } from "@/mocks/cases";
import { Case } from "@/types";
import { Briefcase, Plus, Download, Eye, ExternalLink, BookOpen, X } from "lucide-react";
import Link from "next/link";

export default function CasesListPage() {
  const { addToast } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPractice, setSelectedPractice] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [inspectCase, setInspectCase] = useState<Case | null>(null);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  const filteredCases = MOCK_CASES.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.leadCounsel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPractice = selectedPractice === "all" || c.practiceArea === selectedPractice;
    const matchesStatus = selectedStatus === "all" || c.status === selectedStatus;
    return matchesSearch && matchesPractice && matchesStatus;
  });

  const handleDeleteSelected = () => {
    addToast("Selected Items", `Simulated removal of ${selectedIds.length} case matters.`, "info");
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Cases" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/15 border border-blue-500/30">
              <Briefcase className="w-4 h-4 text-blue-400" />
            </span>
            <span>Matter Management</span>
          </h1>
          <p className="text-xs text-slate-400">Search, filter, and inspect active legal firm matters.</p>
        </div>
        <Button
          variant="outline"
          leftIcon={<BookOpen className="w-4 h-4" />}
          onClick={() => setShowDeveloperGuide(true)}
        >
          Developer Guide
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Active Matters" value={MOCK_CASES.filter((c) => c.status === "Active").length} info="In docket" trend="up" />
        <MetricCard title="In Discovery" value={MOCK_CASES.filter((c) => c.stage === "Discovery").length} info="Discovery stage" trend="neutral" />
        <MetricCard title="Pre-Trial" value={MOCK_CASES.filter((c) => c.stage === "Pre-Trial").length} info="Approaching trial" trend="neutral" />
        <MetricCard title="Hearings Scheduled" value="3" info="Next 30 days" trend="up" change="+1" />
      </div>

      {/* Microsoft Fluent Command Bar */}
      <CommandBar
        onNew={() => addToast("New Matter", "Navigating to matter creation wizard...", "info")}
        newLabel="New Matter"
        onRefresh={() => addToast("Refreshed", "Case docket synchronized.", "success")}
        onExport={() => addToast("Export", "Case docket exported to CSV.", "success")}
        selectedCount={selectedIds.length}
        onDeleteSelected={handleDeleteSelected}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterCount={(selectedPractice !== "all" ? 1 : 0) + (selectedStatus !== "all" ? 1 : 0)}
        onToggleFilter={() => setShowFilterBar(!showFilterBar)}
        density={density}
        onDensityChange={setDensity}
      />

      {/* Filter Bar Panel */}
      {showFilterBar && (
        <Card className="animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Practice Area Filter
              </label>
              <select
                value={selectedPractice}
                onChange={(e) => setSelectedPractice(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-lg p-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Practice Areas</option>
                <option value="Intellectual Property">Intellectual Property</option>
                <option value="Tax Law">Tax Law</option>
                <option value="Corporate Law">Corporate Law</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Matter Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-lg p-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>
        </Card>
      )}

      {/* DataTable */}
      <DataTable<Case>
        data={filteredCases}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        density={density}
        onRowClick={(item) => setInspectCase(item)}
        getRowId={(item) => item.id}
        columns={[
          {
            header: "Case Title & Docket Number",
            accessor: (c) => (
              <div>
                <span className="font-bold text-white block group-hover:text-blue-400 transition-colors">
                  {c.title}
                </span>
                <span className="font-mono text-[10px] text-slate-400">{c.caseNumber}</span>
                {c.cnr && (
                  <span className="font-mono text-[10px] text-slate-500 block">
                    CNR: {c.cnr}
                  </span>
                )}
              </div>
            ),
          },
          { header: "Court", accessor: (c) => <span className="text-slate-300 text-[11px]">{c.court || "—"}</span> },
          { header: "Practice Area", accessor: (c) => <span className="text-slate-300">{c.practiceArea}</span> },
          { header: "Lead Counsel", accessor: (c) => <span className="font-semibold text-slate-200">{c.leadCounsel}</span> },
          {
            header: "Stage",
            accessor: (c) => (
              <Badge variant="info" size="sm">
                {c.stage}
              </Badge>
            ),
          },
          {
            header: "Status",
            accessor: (c) => (
              <Badge variant={c.status === "Active" ? "success" : "neutral"} size="sm">
                {c.status}
              </Badge>
            ),
          },
          {
            header: "Next Hearing & Alerts",
            accessor: (c) => (
              <div>
                {c.nextHearingDate ? (
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs text-slate-200">{c.nextHearingDate}</span>
                    {c.urgencyLevel === "Critical" ? (
                      <Badge label="Tomorrow / Critical" variant="error" size="sm" />
                    ) : c.urgencyLevel === "Urgent" ? (
                      <Badge label="Urgent" variant="warning" size="sm" />
                    ) : (
                      <Badge label="Normal" variant="neutral" size="sm" />
                    )}
                  </div>
                ) : (
                  <span className="text-slate-500 text-xs">Not Scheduled</span>
                )}
              </div>
            ),
          },
          {
            header: "Action",
            accessor: (c) => (
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setInspectCase(c)}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Inspect Details"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <Link
                  href={`/workspace/cases/${c.id}`}
                  className="p-1 rounded text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-colors"
                  title="Open Matter Overview"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ),
          },
        ]}
      />

      {/* Inspect Slide-Over Drawer */}
      {inspectCase && (
        <DetailDrawer
          isOpen={!!inspectCase}
          onClose={() => setInspectCase(null)}
          title={inspectCase.title}
          subtitle={`Case Number: ${inspectCase.caseNumber}`}
          badgeText={inspectCase.status}
          badgeVariant={inspectCase.status === "Active" ? "success" : "neutral"}
          actionUrl={`/workspace/cases/${inspectCase.id}`}
          actionLabel="Open Case File"
          data={{
            id: inspectCase.id,
            title: inspectCase.title,
            caseNumber: inspectCase.caseNumber,
            practiceArea: inspectCase.practiceArea,
            leadCounsel: inspectCase.leadCounsel,
            stage: inspectCase.stage,
            status: inspectCase.status,
            tenantId: inspectCase.tenantId,
            openedDate: inspectCase.openDate || "2026-01-15",
          }}
        />
      )}

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Cases & Matter Management — Developer Guide</h2>
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
                      The Cases & Matter Management page is the central court registry for a law firm. It indexes every active lawsuit, criminal bail petition, tax dispute, intellectual property case, and corporate contract handled by the firm.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Advocate's Perspective):</strong>
                    <p className="text-slate-400">
                      In Indian litigation, a law firm might manage 200+ ongoing cases across Supreme Court, High Courts, District Courts, and Tribunals. Advocates need a master docket to:
                      <br />
                      • Instantly search cases by title, docket code, or 16-digit eCourts **CNR number**.
                      <br />
                      • Track litigation progress across stages (Intake ➔ Pleadings ➔ Discovery ➔ Trial).
                      <br />
                      • Flag **Urgent & Critical Alerts** for court hearings scheduled for tomorrow so Advocates prepare oral arguments in time.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Indian Court & Litigation Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in Indian legal systems, here are the essential concepts you need to know to build this page:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. What is a "Matter"?</strong>
                      <p className="text-slate-400 text-[11px]">
                        In legal practice, a "Matter" is any specific legal assignment, lawsuit, dispute, or advisory retainer managed for a client by the law firm.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. What is a "CNR Code"?</strong>
                      <p className="text-slate-400 text-[11px]">
                        The 16-digit alphanumeric **Case Number Record** assigned by eCourts India. It acts as the unique passport number for any court case in India across all court registries.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Lead Counsel</strong>
                      <p className="text-slate-400 text-[11px]">
                        The primary Advocate responsible for steering the case strategy and presenting oral arguments before the Bench of judges.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. Urgency Levels</strong>
                      <p className="text-slate-400 text-[11px]">
                        <span className="text-red-400 font-semibold">Critical</span> = Hearing scheduled tomorrow / Urgent stay order pending.<br />
                        <span className="text-amber-400 font-semibold">Urgent</span> = Hearing within 7 days.<br />
                        <span className="text-slate-400 font-semibold">Normal</span> = Routine filing date.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Component Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Complete Component & Feature Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      1. Top Metric Cards (4 Cards)
                    </p>
                    <p className="text-slate-400">Displays counts for <strong className="text-slate-200">Active Matters</strong>, <strong className="text-slate-200">In Discovery Stage</strong>, <strong className="text-slate-200">Pre-Trial Stage</strong>, and <strong className="text-slate-200">Hearings Scheduled (Next 30 Days)</strong>.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      2. Microsoft Fluent Command Bar
                    </p>
                    <p className="text-slate-400">Includes real-time search input, <strong className="text-white">+ New Matter</strong> button (`/workspace/cases/new`), Refresh, Filter panel toggle, Density switcher (`Comfortable` / `Compact`), Export CSV, and batch Delete selected items.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      3. Expandable Filter Panel
                    </p>
                    <p className="text-slate-400">Toggles open to allow multi-parameter filtering by <strong className="text-slate-200">Practice Area</strong> (Intellectual Property, Tax Law, Corporate Law) and <strong className="text-slate-200">Matter Status</strong> (Active vs Archived).</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      4. Selectable Data Table
                    </p>
                    <p className="text-slate-400">Renders case rows with checkboxes, Title, Docket Code, CNR number, Court Name, Practice Area, Lead Advocate, Stage Badge, Status Badge, Next Hearing date with Urgency Badges (<span className="text-red-400 font-semibold">Critical</span>, <span className="text-amber-400 font-semibold">Urgent</span>, <span className="text-slate-400 font-semibold">Normal</span>), and action icons.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 md:col-span-2">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      5. Inspect Slide-Over Drawer (`DetailDrawer`)
                    </p>
                    <p className="text-slate-400">Tapping any case row or the <strong className="text-white">Eye icon</strong> opens a slide-over panel displaying case details without leaving the table view. Includes an <strong className="text-white">Open Case File</strong> button navigating to <code className="text-blue-400">/workspace/cases/[id]</code>.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Navigation Map */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Button Actions & Navigation Links
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                        <th className="pb-2">UI Button / Action</th>
                        <th className="pb-2">Behavior</th>
                        <th className="pb-2">Target Route</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-2 font-semibold text-white">+ New Matter Button</td>
                        <td className="py-2">Opens 5-step case creation wizard</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/cases/new</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Eye Icon (Inspect)</td>
                        <td className="py-2">Opens slide-over detail drawer</td>
                        <td className="py-2 font-mono text-emerald-400">In-page drawer</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">External Link Icon</td>
                        <td className="py-2">Opens full case overview page</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/cases/[id]</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Filter Toggle Button</td>
                        <td className="py-2">Expands / collapses the filter panel</td>
                        <td className="py-2 font-mono text-emerald-400">In-page state</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Density Switcher</td>
                        <td className="py-2">Toggles row spacing between Comfortable & Compact</td>
                        <td className="py-2 font-mono text-emerald-400">In-page state</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  5. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• <strong className="text-white">List Cases API:</strong> <code className="text-blue-400">GET /api/cases?search=&practice=&status=</code></li>
                    <li>• <strong className="text-white">Case Stats API:</strong> <code className="text-blue-400">GET /api/cases/stats</code></li>
                    <li>• <strong className="text-white">Batch Delete API:</strong> <code className="text-blue-400">DELETE /api/cases/batch</code></li>
                    <li>• <strong className="text-white">Export CSV API:</strong> <code className="text-blue-400">GET /api/cases/export</code></li>
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


