"use client";

import React from "react";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { MetricCard } from "@/components/cards";
import { DataTable } from "@/components/tables";
import { MOCK_USERS } from "@/mocks/users";
import { Users, Calendar, ChartBar as BarChart2, UserCheck, TrendingUp, Clock, Plus } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/cards";

export default function TeamDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Team" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 border border-indigo-500/30">
              <Users className="w-4 h-4 text-indigo-400" />
            </span>
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Active Attorneys" value="8" info="Chandra & Associates roster" trend="up" />
        <MetricCard title="Capacity" value="84%" info="Matter distribution" trend="up" change="Utilized" />
        <MetricCard title="Upcoming Leave" value="1" info="Roster clear" trend="neutral" />
        <MetricCard title="Avg Hours/Wk" value="26h" info="Billable per attorney" trend="up" change="+2.4h" />
      </div>

      {/* Workload bars */}
      <Card
        header={<div className="flex items-center gap-2"><BarChart2 className="w-4 h-4 text-indigo-400" /><span className="font-bold text-white text-xs">Weekly Billable Workload</span></div>}
      >
        <div className="space-y-3">
          {[
            { name: "Priya Chandra", hours: 32, color: "from-blue-500 to-cyan-500" },
            { name: "Arjun Mehta", hours: 28, color: "from-emerald-500 to-teal-500" },
            { name: "Meera Verma", hours: 24, color: "from-amber-500 to-orange-500" },
            { name: "Rohan Deshpande", hours: 19, color: "from-indigo-500 to-blue-500" },
          ].map((m) => (
            <div key={m.name} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-white w-28 truncate shrink-0">{m.name}</span>
              <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${m.color}`} style={{ width: `${(m.hours / 40) * 100}%` }} />
              </div>
              <span className="text-[10px] text-slate-500 w-12 text-right shrink-0">{m.hours}h</span>
            </div>
          ))}
        </div>
      </Card>

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
