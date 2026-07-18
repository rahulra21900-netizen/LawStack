"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Input, Select } from "@/components/forms";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_CASES } from "@/mocks/cases";
import { Briefcase, Plus, ListFilter as Filter, Search, Download, Scale, Users, FileText, TrendingUp, ChevronRight } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Cases" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/15 border border-blue-500/30">
              <Briefcase className="w-4 h-4 text-blue-400" />
            </span>
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
              New Matter
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Active Matters" value={MOCK_CASES.filter((c) => c.status === "Active").length} info="In docket" trend="up" />
        <MetricCard title="In Discovery" value={MOCK_CASES.filter((c) => c.stage === "Discovery").length} info="Discovery stage" trend="neutral" />
        <MetricCard title="Pre-Trial" value={MOCK_CASES.filter((c) => c.stage === "Pre-Trial").length} info="Approaching trial" trend="neutral" />
        <MetricCard title="Hearings (30d)" value="3" info="Scheduled" trend="up" change="+1" />
      </div>

      {/* Filter Bar */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              placeholder="Search by name or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 bg-slate-950/50 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-slate-700 transition-all"
            />
          </div>
          <Select
            options={[
              { label: "All Practice Areas", value: "all" },
              { label: "Intellectual Property", value: "Intellectual Property" },
              { label: "Tax Law", value: "Tax Law" },
              { label: "Corporate Law", value: "Corporate Law" },
            ]}
            value={selectedPractice}
            onChange={(e) => setSelectedPractice(e.target.value)}
          />
          <Select
            options={[
              { label: "All Statuses", value: "all" },
              { label: "Active", value: "Active" },
              { label: "Archived", value: "Archived" },
            ]}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          />
        </div>
      </Card>

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
            ),
          },
          { header: "Case Number", accessor: (c) => <span className="font-mono text-[10px] text-slate-400">{c.caseNumber}</span> },
          { header: "Practice Area", accessor: (c) => <span>{c.practiceArea}</span> },
          { header: "Lead Attorney", accessor: (c) => <span className="font-semibold">{c.leadCounsel}</span> },
          { header: "Stage", accessor: (c) => <Badge label={c.stage} variant="info" /> },
          { header: "Status", accessor: (c) => <Badge label={c.status} variant={c.status === "Active" ? "success" : "neutral"} /> },
        ]}
      />
    </div>
  );
}
