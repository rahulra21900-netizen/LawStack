"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Input, Select } from "@/components/forms";
import { MOCK_CASES } from "@/mocks/cases";
import { Briefcase, Plus, Filter, Search, Download } from "lucide-react";
import Link from "next/link";

export default function CasesListPage() {
  const { addToast } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPractice, setSelectedPractice] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredCases = MOCK_CASES.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPractice = selectedPractice === "all" || c.practiceArea === selectedPractice;
    const matchesStatus = selectedStatus === "all" || c.status === selectedStatus;
    return matchesSearch && matchesPractice && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Cases" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-500" />
            <span>Matter Management</span>
          </h1>
          <p className="text-xs text-slate-400">Search, filter, and audit active client case matters.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => addToast("Export Matters", "Matters list CSV export triggered.", "success")}
          >
            Export CSV
          </Button>
          <Link href="/workspace/cases/new">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              New Case Matter
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <Input
          placeholder="Search by name or number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          options={[
            { label: "All Practice Areas", value: "all" },
            { label: "Intellectual Property", value: "Intellectual Property" },
            { label: "Tax Law", value: "Tax Law" },
            { label: "Corporate Law", value: "Corporate Law" }
          ]}
          value={selectedPractice}
          onChange={(e) => setSelectedPractice(e.target.value)}
        />
        <Select
          options={[
            { label: "All Statuses", value: "all" },
            { label: "Active", value: "Active" },
            { label: "Archived", value: "Archived" }
          ]}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        />
      </div>

      {/* Cases Data Table */}
      <DataTable
        data={filteredCases}
        columns={[
          {
            header: "Case Title",
            accessor: (c) => (
              <Link href={`/workspace/cases/${c.id}`} className="font-bold text-blue-400 hover:underline">
                {c.title}
              </Link>
            )
          },
          { header: "Case Number", accessor: (c) => <span className="font-mono text-[10px] text-slate-400">{c.caseNumber}</span> },
          { header: "Practice Area", accessor: (c) => <span>{c.practiceArea}</span> },
          { header: "Lead Attorney", accessor: (c) => <span className="font-semibold">{c.leadCounsel}</span> },
          { header: "Stage", accessor: (c) => <Badge label={c.stage} variant="info" /> },
          { header: "Status", accessor: (c) => <Badge label={c.status} variant={c.status === "Active" ? "success" : "neutral"} /> }
        ]}
      />
    </div>
  );
}
