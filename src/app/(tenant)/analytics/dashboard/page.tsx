"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { MetricCard } from "@/components/cards";

export default function AnalyticsDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Analytics" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Practice Performance Analytics</h1>
        <p className="text-xs text-slate-400">Review yields metrics, caseload distributions, and revenue stats.</p>
      </div>

      {/* Analytics KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Billable Hours Yield" value="342.5 hrs" change="+14% this month" trend="up" />
        <MetricCard title="Average Case duration" value="184 Days" change="No modifications" trend="neutral" />
        <MetricCard title="Net Profit Margin" value="74.2%" change="+2.5% this quarter" trend="up" />
      </div>
    </div>
  );
}
