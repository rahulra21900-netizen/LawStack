"use client";

import React from "react";
import { Breadcrumb, Button, Badge, Avatar } from "@/components/ui";
import { MetricCard, Card } from "@/components/cards";
import { MOCK_TENANTS } from "@/mocks/tenants";
import { Shield, Users, Terminal, Layers, Building2, Activity, Server, Cpu, HardDrive, Network, ArrowUpRight, CircleCheck as CheckCircle2, TriangleAlert as AlertTriangle, Clock, Plus, ChevronRight, Zap, Database, Globe, TrendingUp } from "lucide-react";
import Link from "next/link";

const recentAudits = [
  {
    actor: "Platform Admin",
    action: "Updated namespace retention policy",
    target: "oakwood-llp",
    time: "Just now",
    type: "config",
  },
  {
    actor: "System",
    action: "Global sublicense template synced",
    target: "all tenants",
    time: "1h ago",
    type: "sync",
  },
  {
    actor: "Platform Admin",
    action: "Suspended tenant namespace",
    target: "nova-law-group",
    time: "3h ago",
    type: "suspend",
  },
  {
    actor: "System",
    action: "Provisioned new tenant workspace",
    target: "justice-associates",
    time: "5h ago",
    type: "provision",
  },
  {
    actor: "Platform Admin",
    action: "Rotated platform service keys",
    target: "control-plane",
    time: "1d ago",
    type: "security",
  },
];

const systemServices = [
  { name: "API Gateway", status: "Operational", uptime: "99.99%", load: 42 },
  { name: "Auth Service", status: "Operational", uptime: "99.98%", load: 28 },
  { name: "Database Cluster", status: "Operational", uptime: "100.0%", load: 61 },
  { name: "Object Storage", status: "Operational", uptime: "99.97%", load: 34 },
  { name: "AI Pipeline", status: "Degraded", uptime: "99.21%", load: 78 },
  { name: "Notification Queue", status: "Operational", uptime: "99.95%", load: 19 },
];

const auditTypeMap: Record<string, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  config: { color: "text-blue-400", icon: Database },
  sync: { color: "text-emerald-400", icon: Activity },
  suspend: { color: "text-red-400", icon: AlertTriangle },
  provision: { color: "text-amber-400", icon: Plus },
  security: { color: "text-cyan-400", icon: Shield },
};

export default function PlatformDashboardPage() {
  const activeTenants = MOCK_TENANTS.filter((t) => t.status === "Active");
  const suspended = MOCK_TENANTS.filter((t) => t.status === "Suspended");
  const pending = MOCK_TENANTS.filter((t) => t.status === "Pending");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Platform", href: "/platform/dashboard" }, { name: "Dashboard" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/15 border border-blue-500/30">
              <Shield className="w-4 h-4 text-blue-400" />
            </span>
            <span>SaaS Control Plane</span>
          </h1>
          <p className="text-xs text-slate-400">
            Manage tenant registries, provision namespaces, and audit compliance trails.
          </p>
        </div>
        <Link href="/platform/tenant-provisioning/new">
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Provision Tenant
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Tenants" value={MOCK_TENANTS.length} info="Subscribed SaaS accounts" trend="up" change="+1 this week" />
        <MetricCard title="Active Firms" value={activeTenants.length} info="Clear namespaces" trend="up" change={`${activeTenants.length}/${MOCK_TENANTS.length} live`} />
        <MetricCard title="Suspended" value={suspended.length} info="Access revoked" trend="down" change="Manual hold" />
        <MetricCard title="Pending Review" value={pending.length} info="Awaiting provisioning" trend="neutral" change="In queue" />
      </div>

      {/* System health + tenant registry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System services health */}
        <Card
          className="lg:col-span-2"
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-xs">System Service Health</span>
              </div>
              <Badge label="Live" variant="success" />
            </div>
          }
        >
          <div className="space-y-2.5">
            {systemServices.map((s) => {
              const isDegraded = s.status !== "Operational";
              return (
                <div
                  key={s.name}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2.5"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isDegraded ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
                      }`}
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{s.name}</div>
                      <div className="text-[10px] text-slate-500">Uptime {s.uptime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:block w-28">
                      <div className="flex items-center justify-between text-[9px] text-slate-500 mb-1">
                        <span>Load</span>
                        <span className={s.load > 70 ? "text-amber-400" : "text-slate-400"}>{s.load}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            s.load > 70 ? "bg-amber-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${s.load}%` }}
                        />
                      </div>
                    </div>
                    <Badge label={isDegraded ? "Degraded" : "Operational"} variant={isDegraded ? "warning" : "success"} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500">
                <Cpu className="w-3 h-3" /> CPU
              </div>
              <div className="mt-1 text-lg font-bold text-white">38%</div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500">
                <HardDrive className="w-3 h-3" /> Storage
              </div>
              <div className="mt-1 text-lg font-bold text-white">54%</div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500">
                <Network className="w-3 h-3" /> Net I/O
              </div>
              <div className="mt-1 text-lg font-bold text-white">22%</div>
            </div>
          </div>
        </Card>

        {/* Tenant registry snapshot */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-white text-xs">Tenant Registry</span>
              </div>
              <Link href="/platform/tenant-administration" className="text-[10px] text-blue-400 hover:underline flex items-center gap-0.5">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          }
        >
          <div className="space-y-2">
            {MOCK_TENANTS.map((t) => (
              <Link
                key={t.id}
                href={`/platform/tenant-administration/${t.id}`}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2.5 hover:border-slate-700 hover:bg-slate-900/60 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-[10px] font-bold text-white">
                    {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">{t.name}</div>
                    <div className="text-[10px] text-slate-500 truncate font-mono">{t.subdomain}.lawstack.com</div>
                  </div>
                </div>
                <Badge
                  label={t.status}
                  variant={t.status === "Active" ? "success" : t.status === "Suspended" ? "error" : "warning"}
                />
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* Audit feed + quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          className="lg:col-span-2"
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white text-xs">Recent Platform Audit Trail</span>
              </div>
              <Link href="/platform/audit" className="text-[10px] text-blue-400 hover:underline flex items-center gap-0.5">
                Full audit center <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          }
        >
          <ol className="relative border-l border-slate-800 ml-2 space-y-4 pl-6">
            {recentAudits.map((a, idx) => {
              const meta = auditTypeMap[a.type];
              const Icon = meta.icon;
              return (
                <li key={idx} className="relative">
                  <span className={`absolute -left-[33px] flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 border border-slate-700 ${meta.color}`}>
                    <Icon className="w-3 h-3" />
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <p className="text-xs text-slate-200">
                        <span className="font-bold text-white">{a.actor}</span> {a.action}{" "}
                        <span className={`font-mono ${meta.color}`}>{a.target}</span>
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Card>

        {/* Quick actions */}
        <Card
          header={
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white text-xs">Platform Quick Actions</span>
            </div>
          }
        >
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Plus, label: "Provision Tenant", href: "/platform/tenant-provisioning/new", color: "text-blue-400" },
              { icon: Building2, label: "Manage Tenants", href: "/platform/tenant-administration", color: "text-emerald-400" },
              { icon: Activity, label: "Audit Center", href: "/platform/audit", color: "text-cyan-400" },
              { icon: Shield, label: "Security Settings", href: "/platform/settings", color: "text-amber-400" },
            ].map((a) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.label}
                  href={a.href}
                  className="group flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-950/40 p-3 hover:border-slate-700 hover:bg-slate-900/60 transition-all"
                >
                  <Icon className={`w-4 h-4 ${a.color}`} />
                  <span className="text-[11px] font-semibold text-white">{a.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/40 p-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Platform Region</span>
              <Globe className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="mt-1 text-xs font-bold text-white">us-east-1 · eu-west-1</div>
            <div className="mt-0.5 text-[10px] text-slate-500">Multi-region replication active</div>
          </div>
        </Card>
      </div>

      {/* Platform-wide metrics row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Platform MRR" value="$184,200" trend="up" change="+12.4% MoM" info="Across all tenants" />
        <MetricCard title="Total Seats" value="1,840" trend="up" change="+86 this week" info="Licensed users" />
        <MetricCard title="API Requests (24h)" value="2.4M" trend="up" change="+8.1%" info="Avg 27.8k/min" />
      </div>
    </div>
  );
}
