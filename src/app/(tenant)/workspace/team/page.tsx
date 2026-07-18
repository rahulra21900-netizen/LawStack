"use client";

import React from "react";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { MetricCard } from "@/components/cards";
import { DataTable } from "@/components/tables";
import { MOCK_USERS } from "@/mocks/users";
import { Users, Calendar, BarChart2 } from "lucide-react";
import Link from "next/link";

export default function TeamDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Team" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-500" />
            <span>Team Workspace</span>
          </h1>
          <p className="text-xs text-slate-400">View corporate departments, workload quotas, and availability calendars.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/workspace/team/members">
            <Button variant="secondary">Members Directory</Button>
          </Link>
          <Link href="/workspace/team/workload">
            <Button variant="secondary">Workload Yields</Button>
          </Link>
        </div>
      </div>

      {/* Team KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Active Attorneys" value="8 Associates" info="Oakwood LLP roster" />
        <MetricCard title="Capacity Quota" value="84% Utilized" info="Case matters distribution" />
        <MetricCard title="Upcoming Leave" value="1 Associate" change="Leaves roster clear" trend="neutral" />
      </div>

      {/* Directory snippet */}
      <DataTable
        title="Personnel Roster Snippet"
        data={MOCK_USERS.slice(0, 4)}
        columns={[
          { header: "Name", accessor: (u) => <span className="font-bold text-white">{u.name}</span> },
          { header: "Email Address", accessor: (u) => <span className="font-mono text-[10px] text-slate-400">{u.email}</span> },
          { header: "Role", accessor: (u) => <Badge label={u.role} variant="info" /> }
        ]}
      />
    </div>
  );
}
