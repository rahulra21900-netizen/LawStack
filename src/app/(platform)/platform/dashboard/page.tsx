"use client";

import React from "react";
import { Breadcrumb, Button } from "@/components/ui";
import { MetricCard, Card } from "@/components/cards";
import { MOCK_TENANTS } from "@/mocks/tenants";
import { Shield, Users, Terminal, Layers } from "lucide-react";
import Link from "next/link";

export default function PlatformDashboardPage() {
  const activeTenants = MOCK_TENANTS.filter((t) => t.status === "Active");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Platform", href: "/platform/dashboard" }, { name: "Dashboard" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500 animate-pulse" />
            <span>SaaS Control Plane</span>
          </h1>
          <p className="text-xs text-slate-400">Manage tenant registries, provision namespaces, and audit compliance trails.</p>
        </div>
        <Link href="/platform/tenant-provisioning/new">
          <Button variant="primary" leftIcon={<Shield className="w-4 h-4" />}>
            Provision Tenant
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Total Tenant Firms" value={MOCK_TENANTS.length} info="Subscribed SaaS accounts" />
        <MetricCard title="Active Firms" value={activeTenants.length} info="Clear namespaces" />
        <MetricCard title="System Load Yield" value="98.4%" change="Clear performance" trend="neutral" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card header={<div className="font-bold text-white text-xs">Recent Platform Audits</div>}>
          <div className="space-y-3 text-xs text-slate-400">
            <p>• Namespace <strong>oakwood-llp</strong> settings updated by Platform Admin (Just now)</p>
            <p>• Sublicense retention policy template synced globally (1h ago)</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
