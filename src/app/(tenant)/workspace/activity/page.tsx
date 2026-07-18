"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_ACTIVITIES } from "@/mocks/activity";
import { Activity, Clock, Users, FileText, Shield } from "lucide-react";
import { MetricCard } from "@/components/cards";

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Activity" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600/15 border border-cyan-500/30">
            <Activity className="w-4 h-4 text-cyan-400" />
          </span>
          <span>Active Audit Trails</span>
        </h1>
        <p className="text-xs text-slate-400">View real-time compliance logs, document dockets modifications, and access reviews.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Events (24h)" value={MOCK_ACTIVITIES.length} info="Logged" trend="up" />
        <MetricCard title="Document Edits" value="2" info="Tracked" trend="neutral" />
        <MetricCard title="User Actions" value="4" info="Recorded" trend="up" />
        <MetricCard title="Security" value="0" info="No alerts" trend="neutral" />
      </div>

      <DataTable
        title="Audit Logs Trail"
        data={MOCK_ACTIVITIES}
        columns={[
          { header: "Activity Action", accessor: (a) => <span className="font-bold text-white">{a.action}</span> },
          { header: "Triggered By", accessor: (a) => <span className="text-slate-300 font-semibold">{a.userName}</span> },
          { header: "Entity Target", accessor: (a) => <Badge label={a.entityType} variant="info" /> },
          { header: "Details Summary", accessor: (a) => <p className="text-slate-400 max-w-sm truncate">{a.details}</p> },
          { header: "Timestamp", accessor: (a) => <span className="text-[10px] text-slate-500 font-mono">{new Date(a.createdAt).toLocaleString()}</span> }
        ]}
      />
    </div>
  );
}
