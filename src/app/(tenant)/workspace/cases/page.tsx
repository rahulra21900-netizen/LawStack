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
import { Briefcase, Plus, Download, Eye, ExternalLink } from "lucide-react";
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
    </div>
  );
}
