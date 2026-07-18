"use client";

import React from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button } from "@/components/ui";
import { MetricCard } from "@/components/cards";
import { PieChart, RefreshCw } from "lucide-react";

export default function AnalyticsPage() {
  const { addToast } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Analytics" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <PieChart className="w-5 h-5 text-cyan-400" />
            <span>Practice Analytics</span>
          </h1>
          <p className="text-xs text-slate-400">Review billable yields, caseload averages, and task velocity indicators.</p>
        </div>
        <Button
          variant="secondary"
          leftIcon={<RefreshCw className="w-4 h-4" />}
          onClick={() => addToast("Sync Analytics", "Re-indexed data indicators from Delaware namespaces.", "success")}
        >
          Recalculate Yields
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Billable Hours Yield" value="342.5 hrs" change="+14% this month" trend="up" />
        <MetricCard title="Task Closure Rate" value="94.2%" change="No modifications" trend="neutral" />
        <MetricCard title="Client Retainer Values" value="$156,000.00" change="+8.9% Year-Over-Year" trend="up" />
      </div>
    </div>
  );
}
