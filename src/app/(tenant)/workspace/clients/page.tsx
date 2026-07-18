"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Input, Select } from "@/components/forms";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_CLIENTS } from "@/mocks/clients";
import { Users, Plus, Download, Search, TrendingUp, UserCheck, Building2 } from "lucide-react";
import Link from "next/link";

export default function ClientsListPage() {
  const { addToast } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredClients = MOCK_CLIENTS.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || (c.companyName && c.companyName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = selectedStatus === "all" || c.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Clients" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600/15 border border-emerald-500/30">
              <Users className="w-4 h-4 text-emerald-400" />
            </span>
            <span>Client Management</span>
          </h1>
          <p className="text-xs text-slate-400">Search, filter, and audit active corporate and personal client profiles.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => addToast("Export Clients", "Clients directory CSV export triggered.", "success")}
          >
            Export CSV
          </Button>
          <Link href="/workspace/clients/new">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              Add Client
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Clients" value={MOCK_CLIENTS.length} info="In roster" trend="up" />
        <MetricCard title="Active" value={MOCK_CLIENTS.filter((c) => c.status === "Active").length} info="Engaged" trend="up" />
        <MetricCard title="Prospects" value={MOCK_CLIENTS.filter((c) => c.status === "Prospect").length} info="In pipeline" trend="neutral" />
        <MetricCard title="Corporate" value={MOCK_CLIENTS.filter((c) => c.companyName).length} info="Entity clients" trend="neutral" />
      </div>

      {/* Filter Bar */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              placeholder="Search by client name or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 bg-slate-950/50 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-slate-700 transition-all"
            />
          </div>
          <Select
            options={[
              { label: "All Statuses", value: "all" },
              { label: "Active", value: "Active" },
              { label: "Prospect", value: "Prospect" },
              { label: "Inactive", value: "Inactive" },
            ]}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          />
        </div>
      </Card>

      {/* Clients Data Table */}
      <DataTable
        data={filteredClients}
        columns={[
          {
            header: "Client Name",
            accessor: (c) => (
              <Link href={`/workspace/clients/${c.id}`} className="font-bold text-blue-400 hover:underline">
                {c.name}
              </Link>
            ),
          },
          { header: "Company Entity", accessor: (c) => <span>{c.companyName || "Individual Client"}</span> },
          { header: "Email Address", accessor: (c) => <span className="font-mono text-[10px] text-slate-400">{c.email}</span> },
          { header: "Phone Line", accessor: (c) => <span>{c.phone}</span> },
          { header: "Onboard Date", accessor: (c) => <span className="text-slate-400">{c.onboardingDate}</span> },
          { header: "Status", accessor: (c) => <Badge label={c.status} variant={c.status === "Active" ? "success" : c.status === "Prospect" ? "warning" : "neutral"} /> },
        ]}
      />
    </div>
  );
}
