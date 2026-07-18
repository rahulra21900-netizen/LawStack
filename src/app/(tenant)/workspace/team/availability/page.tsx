"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";

export default function TeamAvailabilityPage() {
  const leaves = [
    { name: "Donna Paulsen", leave: "Upcoming Vacation", dates: "July 24 - July 28" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Team", href: "/workspace/team" }, { name: "Availability" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Availability & Leave Rosters</h1>
        <p className="text-xs text-slate-400">View leave calendars for associate attorneys and secretaries.</p>
      </div>

      <DataTable
        data={leaves}
        columns={[
          { header: "Employee Name", accessor: (l) => <span className="font-bold text-white">{l.name}</span> },
          { header: "Absence Category", accessor: (l) => <Badge label={l.leave} variant="warning" /> },
          { header: "Leave Period Dates", accessor: (l) => <span className="font-semibold text-slate-350">{l.dates}</span> }
        ]}
      />
    </div>
  );
}
