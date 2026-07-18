"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Input, Select } from "@/components/forms";
import { MOCK_HEARINGS } from "@/mocks/hearings";
import { Scale, Plus, Download, Calendar, Users, Clock, CircleCheck as CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { MetricCard } from "@/components/cards";

export default function HearingsListPage() {
  const { addToast } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHearings = MOCK_HEARINGS.filter((h) => h.judgeName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Hearings" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600/15 border border-amber-500/30">
              <Scale className="w-4 h-4 text-amber-400" />
            </span>
            <span>Hearings & Trials Docket</span>
          </h1>
          <p className="text-xs text-slate-400">Track court appearances, judge assignments, and trial statuses.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => addToast("Export Hearings", "CSV hearings logs summary exported.", "success")}
          >
            Export CSV
          </Button>
          <Link href="/workspace/hearings/new">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              Add Hearing Appearance
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Scheduled" value={MOCK_HEARINGS.filter((h) => h.status === "Scheduled").length} info="Upcoming" trend="up" />
        <MetricCard title="Completed" value={MOCK_HEARINGS.filter((h) => h.status === "Completed").length} info="Concluded" trend="neutral" />
        <MetricCard title="This Week" value="3" info="Next 7 days" trend="up" />
        <MetricCard title="Courtrooms" value="4" info="Active venues" trend="neutral" />
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <Input
          placeholder="Search by judge name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          options={[
            { label: "All Hearings Statuses", value: "all" },
            { label: "Scheduled", value: "Scheduled" },
            { label: "Completed", value: "Completed" }
          ]}
          onChange={() => {}}
        />
      </div>

      {/* Hearings Data Table */}
      <DataTable
        data={filteredHearings}
        columns={[
          {
            header: "Judge Name",
            accessor: (h) => (
              <Link href={`/workspace/hearings/${h.id}`} className="font-bold text-blue-400 hover:underline">
                {h.judgeName}
              </Link>
            )
          },
          { header: "Courtroom Room", accessor: (h) => <span>{h.courtroom}</span> },
          { header: "Venue Jurisdiction", accessor: (h) => <span className="text-slate-400">{h.location}</span> },
          { header: "Scheduled Date / Time", accessor: (h) => <span className="font-semibold text-slate-350">{new Date(h.dateTime).toLocaleString()}</span> },
          { header: "Status", accessor: (h) => <Badge label={h.status} variant={h.status === "Scheduled" ? "warning" : "success"} /> }
        ]}
      />
    </div>
  );
}
