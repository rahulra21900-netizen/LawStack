"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { MetricCard } from "@/components/cards";

export default function TeamWorkloadPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Team", href: "/workspace/team" }, { name: "Workload" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Team Workload Yields</h1>
        <p className="text-xs text-slate-400">Track task capacity allocations across legal representatives.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Harvey Specter" value="6 Active Matters" info="85% capacity allocation" />
        <MetricCard title="Mike Ross" value="4 Active Matters" info="60% capacity allocation" />
        <MetricCard title="Louis Litt" value="8 Active Matters" info="95% capacity allocation" />
      </div>
    </div>
  );
}
