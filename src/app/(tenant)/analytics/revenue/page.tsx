"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { MetricCard } from "@/components/cards";

export default function RevenueAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Analytics" }, { name: "Revenue" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Revenue Analytics</h1>
        <p className="text-xs text-slate-400">Track firm invoices billing totals and net yields.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MetricCard title="Total Billed Revenue YTD" value="$256,450.00" change="+12.4% from Q1" trend="up" />
        <MetricCard title="Collected Payments" value="$242,000.00" change="94.3% collection rate" trend="up" />
      </div>
    </div>
  );
}
