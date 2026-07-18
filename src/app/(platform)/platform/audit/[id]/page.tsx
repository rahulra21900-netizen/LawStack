"use client";

import React from "react";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { MOCK_ACTIVITIES } from "@/mocks/activity";
import { Card } from "@/components/cards";
import Link from "next/link";

export default function AuditDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const audit = MOCK_ACTIVITIES.find((a) => a.id === id);

  if (!audit) {
    return (
      <div className="p-8 text-center text-xs text-red-400">
        Error: Audit Log ID "{id}" does not exist in compliance database.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Platform", href: "/platform/dashboard" }, { name: "Audits", href: "/platform/audit" }, { name: audit.action }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">Audit Details: {audit.action}</h1>
          <p className="text-xs text-slate-400">Actor ID: {audit.userId} • Action: {audit.action}</p>
        </div>
        <Link href="/platform/audit">
          <Button variant="secondary">Back to Audits</Button>
        </Link>
      </div>

      <Card header={<div className="font-bold text-white text-xs">Audit Payload Metadata</div>}>
        <div className="space-y-3 text-xs text-slate-350 max-w-xl">
          <div className="flex justify-between border-b border-slate-850 pb-1.5">
            <span className="text-slate-500">Triggered By</span>
            <span className="font-semibold text-white">{audit.userName}</span>
          </div>
          <div className="flex justify-between border-b border-slate-850 pb-1.5">
            <span className="text-slate-500">Linked Tenant Namespace</span>
            <span className="font-mono text-slate-300">{audit.tenantId || "SaaS Platform Admin"}</span>
          </div>
          {audit.details && (
            <div className="pt-2">
              <p className="text-slate-500 pb-1">Additional Payload Details</p>
              <p className="p-3 bg-slate-950 border border-slate-850 rounded text-slate-400">{audit.details}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
