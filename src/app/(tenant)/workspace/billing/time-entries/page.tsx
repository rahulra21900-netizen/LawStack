"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";

interface TimeEntry {
  id: string;
  userId: string;
  hours: number;
  billable: boolean;
  description: string;
}

const MOCK_TIME_ENTRIES: TimeEntry[] = [
  { id: "te-1", userId: "attorney-specter", hours: 4.5, billable: true, description: "Draft sub-licensing defense briefs." },
  { id: "te-2", userId: "attorney-ross", hours: 2.0, billable: true, description: "Patents registry archive analysis." }
];

export default function TimeEntriesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Billing", href: "/workspace/billing" }, { name: "Time Entries" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Billable Time Ledger</h1>
        <p className="text-xs text-slate-400">View hourly logs and billable work yields.</p>
      </div>

      <DataTable
        title="Time Entries Log"
        data={MOCK_TIME_ENTRIES}
        columns={[
          { header: "Attorney Owner", accessor: (t) => <span className="font-bold text-white">{t.userId}</span> },
          { header: "Hours Billed", accessor: (t) => <span className="font-semibold">{t.hours} hrs</span> },
          { header: "Billable Status", accessor: (t) => <Badge label={t.billable ? "Billable" : "Non-billable"} variant={t.billable ? "success" : "neutral"} /> },
          { header: "Description Details", accessor: (t) => <span className="text-slate-400">{t.description}</span> }
        ]}
      />
    </div>
  );
}
