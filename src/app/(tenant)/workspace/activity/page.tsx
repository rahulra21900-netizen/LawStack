"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_ACTIVITIES } from "@/mocks/activity";
import { Activity } from "lucide-react";

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Activity" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-500" />
          <span>Active Audit Trails</span>
        </h1>
        <p className="text-xs text-slate-400">View real-time compliance logs, document dockets modifications, and access reviews.</p>
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
