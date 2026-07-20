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
import { FileText, Eye, ExternalLink } from "lucide-react";
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
          { header: "Version", accessor: (d) => <span className="font-mono text-[10px] text-slate-400">v{d.version}</span> },
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

      {/* Inspect Slide-Over Drawer */}
      {inspectDoc && (
        <DetailDrawer
          isOpen={!!inspectDoc}
          onClose={() => setInspectDoc(null)}
          title={inspectDoc.title}
          subtitle={`Category: ${inspectDoc.type} · Version ${inspectDoc.version}`}
          badgeText={inspectDoc.status}
          badgeVariant={inspectDoc.status === "Approved" ? "success" : "warning"}
          actionUrl={`/workspace/documents/${inspectDoc.id}`}
          actionLabel="Open Document Preview"
          data={{
            id: inspectDoc.id,
            title: inspectDoc.title,
            type: inspectDoc.type,
            version: `v${inspectDoc.version}`,
            fileSizeBytes: `${(inspectDoc.fileSizeBytes / 1024 / 1024).toFixed(2)} MB`,
            status: inspectDoc.status,
            caseId: inspectDoc.caseId || "N/A",
            createdAt: formatDate(inspectDoc.createdAt),
            updatedAt: formatDate(inspectDoc.updatedAt),
          }}
        />
      )}
    </div>
  );
}
