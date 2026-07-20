"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { MetricCard } from "@/components/cards";

export default function UtilizationAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Analytics" }, { name: "Utilization" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Lawyer Utilization Yields</h1>
        <p className="text-xs text-slate-400">Track associate attorney billable vs non-billable ratios.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Priya Chandra" value="84% utilization" info="caseload: 6 matters" />
        <MetricCard title="Arjun Mehta" value="62% utilization" info="caseload: 4 matters" />
        <MetricCard title="Rohan Deshpande" value="92% utilization" info="caseload: 8 matters" />
      </div>
    </div>
  );
}
