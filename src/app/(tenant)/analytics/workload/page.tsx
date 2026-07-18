"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { MetricCard } from "@/components/cards";

export default function WorkloadAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Analytics" }, { name: "Workload" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Case Workload Analytics</h1>
        <p className="text-xs text-slate-400">Track litigation matters distribution across practice categories.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Intellectual Property" value="12 Active cases" info="45% of total practice" />
        <MetricCard title="Corporate mergers" value="8 Active cases" info="30% of total practice" />
        <MetricCard title="Tax Litigation" value="6 Active cases" info="25% of total practice" />
      </div>
    </div>
  );
}
