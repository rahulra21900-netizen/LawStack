"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Input } from "@/components/forms";
import { MOCK_TENANTS } from "@/mocks/tenants";
import { Building, Plus } from "lucide-react";
import Link from "next/link";

export default function TenantAdminListPage() {
  const { addToast } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTenants = MOCK_TENANTS.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Platform", href: "/platform/dashboard" }, { name: "Tenants" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-500" />
            <span>Tenant Administration</span>
          </h1>
          <p className="text-xs text-slate-400">Manage client namespaces databases, subscriptions, and quotas.</p>
        </div>
        <Link href="/platform/tenant-provisioning/new">
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Provision Tenant
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl max-w-md">
        <Input
          placeholder="Search by firm name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tenants Table */}
      <DataTable
        data={filteredTenants}
        columns={[
          {
            header: "Firm Name",
            accessor: (t) => (
              <Link href={`/platform/tenant-administration/${t.id}`} className="font-bold text-blue-400 hover:underline">
                {t.name}
              </Link>
            )
          },
          { header: "Tenant ID", accessor: (t) => <span className="font-mono text-[10px] text-slate-400">{t.id}</span> },
          { header: "Subscription Tier", accessor: (t) => <Badge label={t.tier} variant="info" /> },
          { header: "Status", accessor: (t) => <Badge label={t.status} variant={t.status === "Active" ? "success" : "neutral"} /> }
        ]}
      />
    </div>
  );
}
