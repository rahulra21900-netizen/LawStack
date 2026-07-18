"use client";

import React from "react";
import Link from "next/link";
import { Card, MetricCard } from "@/components/cards";
import { Badge, Button } from "@/components/ui";
import { MOCK_TENANTS } from "@/mocks/tenants";
import { Building2, Users, Database, DollarSign, Globe, Shield, Activity, TrendingUp, Calendar, Server, Lock, CircleCheck as CheckCircle2, TriangleAlert as AlertTriangle } from "lucide-react";

export default function OverviewTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const tenantData = MOCK_TENANTS.find((t) => t.id === id);

  if (!tenantData) return null;

  const quotaLimit = tenantData.tier === "Enterprise" ? "100 GB" : tenantData.tier === "Professional" ? "50 GB" : "10 GB";
  const seatLimit = tenantData.tier === "Enterprise" ? "Unlimited" : tenantData.tier === "Professional" ? "10" : "3";

  return (
    <div className="space-y-6">
      {/* Top metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Billing Status" value={tenantData.status} info="Ledger status" trend={tenantData.status === "Active" ? "up" : "neutral"} />
        <MetricCard title="Namespace" value="Active" info="Isolation healthy" trend="up" />
        <MetricCard title="Storage Quota" value={quotaLimit} info={`${tenantData.tier} tier`} trend="neutral" />
        <MetricCard title="Seat Limit" value={seatLimit} info="Licensed users" trend="neutral" />
      </div>

      {/* Tenant identity + namespace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          header={
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-white text-xs">Tenant Identity</span>
            </div>
          }
        >
          <div className="space-y-3">
            {[
              { label: "Firm Name", value: tenantData.name },
              { label: "Tenant ID", value: tenantData.id, mono: true },
              { label: "Workspace URL", value: `${tenantData.subdomain}.lawstack.com`, mono: true, link: true },
              { label: "Tier", value: tenantData.tier },
              { label: "Joined Date", value: new Date(tenantData.joinedDate).toLocaleDateString() },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between border-b border-slate-800 last:border-0 pb-2 last:pb-0">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{r.label}</span>
                <span className={`text-xs font-semibold ${r.mono ? "font-mono text-blue-400" : "text-white"}`}>{r.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          header={
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white text-xs">Namespace Health</span>
            </div>
          }
        >
          <div className="space-y-2.5">
            {[
              { name: "Database Isolation", status: "Active", icon: Database },
              { name: "Row-Level Security", status: "Enforced", icon: Lock },
              { name: "Auth Service", status: "Operational", icon: Shield },
              { name: "Object Storage", status: "Mounted", icon: Server },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.name} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs text-white font-semibold">{s.name}</span>
                  </div>
                  <Badge label={s.status} variant="success" />
                </div>
              );
            })}
          </div>
        </Card>

        <Card
          header={
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white text-xs">Subscription</span>
            </div>
          }
        >
          <div className="space-y-3">
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Current Plan</div>
              <div className="mt-1 text-lg font-bold text-white">{tenantData.tier}</div>
              <div className="mt-0.5 text-[10px] text-slate-500">
                {tenantData.tier === "Enterprise" ? "$499/mo" : tenantData.tier === "Professional" ? "$149/mo" : "$49/mo"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">MRR</div>
                <div className="mt-1 text-sm font-bold text-emerald-400">
                  {tenantData.tier === "Enterprise" ? "$499" : tenantData.tier === "Professional" ? "$149" : "$49"}
                </div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Seats Used</div>
                <div className="mt-1 text-sm font-bold text-white">{tenantData.tier === "Enterprise" ? "24" : "6"}</div>
              </div>
            </div>
            <Button variant="secondary" className="w-full">Modify Subscription</Button>
          </div>
        </Card>
      </div>

      {/* Activity feed */}
      <Card
        header={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white text-xs">Tenant Activity</span>
            </div>
            <Link href={`/platform/tenant-administration/${id}/activity`} className="text-[10px] text-blue-400 hover:underline">
              View full
            </Link>
          </div>
        }
      >
        <ol className="relative border-l border-slate-800 ml-2 space-y-3 pl-6">
          {[
            { who: "Harvey Specter", what: "created new matter", target: "C-218", time: "2h ago" },
            { who: "System", what: "rotated tenant API keys", target: "auth-service", time: "1d ago" },
            { who: "Eleanor Vance", what: "invited a new associate", target: "mike@oakwood.com", time: "2d ago" },
            { who: "Platform Admin", what: "upgraded subscription to", target: tenantData.tier, time: "1w ago" },
          ].map((a, idx) => (
            <li key={idx} className="relative">
              <span className="absolute -left-[33px] flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 border border-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              </span>
              <p className="text-xs text-slate-300">
                <span className="font-bold text-white">{a.who}</span> {a.what}{" "}
                <span className="font-mono text-blue-400">{a.target}</span>
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">{a.time}</p>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
