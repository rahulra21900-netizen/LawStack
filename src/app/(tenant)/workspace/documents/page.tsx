"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Input, Select } from "@/components/forms";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_DOCUMENTS } from "@/mocks/documents";
import { FileText, Plus, Download, LayoutGrid, List } from "lucide-react";
import Link from "next/link";

export default function DocumentsListPage() {
  const { addToast } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const filteredDocs = MOCK_DOCUMENTS.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || d.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Documents" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            <span>Document Workspace</span>
          </h1>
          <p className="text-xs text-slate-400">Manage pleadings, brief motions, contracts, and retention locks.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => addToast("Export Documents", "CSV file index summary exported.", "success")}
          >
            Export CSV
          </Button>
          <Link href="/workspace/documents/new">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              Add Document
            </Button>
          </Link>
        </div>
      </div>

      {/* Storage KPIs row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Total Storage Used" value="142.5 MB" info="Standard Tenant Quota: 10 GB" />
        <MetricCard title="Registered Files" value={MOCK_DOCUMENTS.length} info="Active index count" />
        <MetricCard title="Under Review Queue" value="3 pending" change="Awaiting supervisor sign" trend="neutral" />
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <Input
          placeholder="Search by file title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          options={[
            { label: "All Document Types", value: "all" },
            { label: "Contract", value: "Contract" },
            { label: "Pleading", value: "Pleading" },
            { label: "Motion", value: "Motion" },
            { label: "Brief", value: "Brief" }
          ]}
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        />
      </div>

      {/* Documents Data Table */}
      <DataTable
        data={filteredDocs}
        columns={[
          {
            header: "Document Title",
            accessor: (d) => (
              <Link href={`/workspace/documents/${d.id}`} className="font-bold text-blue-400 hover:underline">
                {d.title}
              </Link>
            )
          },
          { header: "Type Category", accessor: (d) => <span className="font-semibold text-slate-400">{d.type}</span> },
          { header: "Version", accessor: (d) => <span className="font-mono text-[10px] text-slate-400">v{d.version}</span> },
          { header: "Size (Bytes)", accessor: (d) => <span>{(d.fileSizeBytes / 1024 / 1024).toFixed(2)} MB</span> },
          { header: "Last Modified", accessor: (d) => <span className="text-slate-400">{new Date(d.updatedAt).toLocaleDateString()}</span> },
          { header: "Status", accessor: (d) => <Badge label={d.status} variant={d.status === "Approved" ? "success" : "warning"} /> }
        ]}
      />
    </div>
  );
}
