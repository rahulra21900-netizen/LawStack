"use client";

import React from "react";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_TENANTS } from "@/mocks/tenants";

export default function OverviewTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const tenantData = MOCK_TENANTS.find((t) => t.id === id);

  if (!tenantData) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Billing Status" value={tenantData.status} info="Ledger status" />
        <MetricCard title="Clear Namespace" value="Active" info="Namespace status" />
        <MetricCard title="Quota Limit" value={tenantData.tier === "Enterprise" ? "100 GB" : "10 GB"} info="Capacity quota" />
      </div>
    </div>
  );
}
