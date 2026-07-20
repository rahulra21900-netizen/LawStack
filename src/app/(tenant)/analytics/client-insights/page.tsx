"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { MetricCard } from "@/components/cards";

export default function ClientInsightsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Analytics" }, { name: "Client Insights" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Client Portfolio Insights</h1>
        <p className="text-xs text-slate-400">View client retainers distribution and dispute risk indicators.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MetricCard title="Reliance Retail" value="₹156,000.00" change="Primary Account" trend="up" />
        <MetricCard title="Krishna Textiles Pvt. Ltd." value="₹124,000.00" change="Secondary Account" trend="up" />
      </div>
    </div>
  );
}
