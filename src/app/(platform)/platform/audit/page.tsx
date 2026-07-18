"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_ACTIVITIES } from "@/mocks/activity";
import Link from "next/link";

export default function AuditCenterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Platform", href: "/platform/dashboard" }, { name: "Audit logs" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Audit Console</h1>
        <p className="text-xs text-slate-400">Search system modifications, workspace setups, and permission elevations.</p>
      </div>

      <DataTable
        title="System Audit Trail logs"
        data={MOCK_ACTIVITIES}
        columns={[
          {
            header: "Action Item",
            accessor: (a) => (
              <Link href={`/platform/audit/${a.id}`} className="font-bold text-blue-450 hover:underline">
                {a.action}
              </Link>
            )
          },
          { header: "Triggered By", accessor: (a) => <span className="font-semibold">{a.userName}</span> },
          { header: "Linked Tenant", accessor: (a) => <span className="font-mono text-[10px] text-slate-500">{a.tenantId || "SaaS Admin"}</span> },
          { header: "Timestamp Log", accessor: (a) => <span className="text-slate-450 text-[10px] font-mono">{new Date(a.createdAt).toLocaleString()}</span> }
        ]}
      />
    </div>
  );
}
