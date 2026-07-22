"use client";

import React, { useState } from "react";
import { Breadcrumb, Button, Badge, Avatar } from "@/components/ui";
import { MetricCard, Card } from "@/components/cards";
import { MOCK_TENANTS } from "@/mocks/tenants";
import { PERMISSIONS } from "@/constants/permissions";
import { ROLES_LIST } from "@/constants/roles";
import { Shield, Users, Terminal, Layers, Building2, Activity, Server, Cpu, HardDrive, Network, ArrowUpRight, CircleCheck as CheckCircle2, TriangleAlert as AlertTriangle, Clock, Plus, ChevronRight, Zap, Database, Globe, TrendingUp, BookOpen, X, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";

const recentAudits = [
  {
    actor: "Platform Admin",
    action: "Updated namespace retention policy",
    target: "chandra-associates",
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
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);
  const [showProductDoc, setShowProductDoc] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Platform", href: "/platform/dashboard" }, { name: "Dashboard" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Platform Control Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Manage tenant registries and audit compliance trails.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" leftIcon={<FileText className="w-4 h-4" />} onClick={() => setShowProductDoc(true)}>
            Product Document
          </Button>
          <Button variant="outline" leftIcon={<BookOpen className="w-4 h-4" />} onClick={() => setShowDeveloperGuide(true)}>
            Developer Guide
          </Button>
          <Link href="/tenant/login">
            <Button variant="secondary" leftIcon={<Building2 className="w-4 h-4" />}>
              Tenant Login
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Tenants" value={MOCK_TENANTS.length} info="Firms and Individuals" trend="up" change="+1 this week" />
        <MetricCard title="Active Tenants" value={activeTenants.length} info="Clear namespaces" trend="up" change={`${activeTenants.length}/${MOCK_TENANTS.length} live`} />
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

        {/* Platform quick actions */}
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

      {/* Audit feed + tenant registry */}
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

      {/* Platform-wide metrics row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Platform MRR" value="₹184,200" trend="up" change="+12.4% MoM" info="Across all tenants" />
        <MetricCard title="Total Seats" value="1,840" trend="up" change="+86 this week" info="Licensed users" />
        <MetricCard title="API Requests (24h)" value="2.4M" trend="up" change="+8.1%" info="Avg 27.8k/min" />
      </div>

      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Developer Guide</p>
                <h2 className="text-lg font-bold text-white">Platform Dashboard Handoff Notes</h2>
              </div>
              <button
                onClick={() => setShowDeveloperGuide(false)}
                className="rounded-lg border border-slate-700 p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                aria-label="Close developer guide"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-6 p-5 text-sm text-slate-300">
              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">What this page is for</h3>
                <p>
                  This page is the main control screen for platform staff. It should show the health of the platform, the active tenant registry, recent activity, and the primary actions a platform admin can take while onboarding, reviewing, and supporting tenants. The latest implementation should also surface pending provisioning work and link directly into the new auth and provisioning flows.
                </p>
              </section>

              <section className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400 flex items-center gap-2">
                  <span>Detailed System Service Health Implementation Guide</span>
                </h3>
                <div className="space-y-4 text-xs">
                  {/* 1. System Status */}
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3.5 space-y-1.5">
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <span>🟢 1. System Status</span>
                    </div>
                    <p><span className="font-semibold text-slate-300">What it is:</span> The overall operational status badge of the entire platform.</p>
                    <p><span className="font-semibold text-slate-300">Why it’s needed:</span> Admins need an instant visual indicator to see if all core services (Database, Authentication, Storage, AI Services, APIs) are operational.</p>
                    <div className="text-slate-400 space-y-1 pt-1">
                      <p className="font-semibold text-slate-300">Developer Implementation:</p>
                      <p className="pl-2">• Aggregate status based on health check endpoints (<code className="text-blue-400">/api/health</code>).</p>
                      <p className="font-semibold text-slate-300 pl-2">Status Levels:</p>
                      <p className="pl-4">• <span className="text-emerald-400 font-semibold">Operational (Green):</span> All health checks return 200 OK.</p>
                      <p className="pl-4">• <span className="text-amber-400 font-semibold">Degraded Performance (Yellow):</span> High latency (&gt;1000ms) or 1 non-critical subservice failing.</p>
                      <p className="pl-4">• <span className="text-red-400 font-semibold">Partial / Major Outage (Red):</span> Database or Core Auth service unresponsive.</p>
                    </div>
                  </div>

                  {/* 2. Uptime Percentage */}
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3.5 space-y-1.5">
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <span>⏱️ 2. Uptime Percentage</span>
                    </div>
                    <p><span className="font-semibold text-slate-300">What it is:</span> The availability score of the platform measured over a period of time (e.g., 99.98% over the trailing 30 days).</p>
                    <p><span className="font-semibold text-slate-300">Why it’s needed:</span> Tracks Service Level Agreements (SLAs) promised to legal enterprise clients.</p>
                    <div className="text-slate-400 space-y-1 pt-1">
                      <p className="font-semibold text-slate-300">Developer Implementation:</p>
                      <p className="pl-2 font-mono bg-slate-900 p-2 rounded border border-slate-800 text-blue-300">
                        Uptime % = ((Total Operational Minutes - Downtime Minutes) / Total Minutes) * 100
                      </p>
                      <p className="pl-2">• Updated automatically by synthetic ping monitors running every 60 seconds.</p>
                    </div>
                  </div>

                  {/* 3. CPU Usage */}
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3.5 space-y-1.5">
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <span>⚡ 3. CPU Usage</span>
                    </div>
                    <p><span className="font-semibold text-slate-300">What it is:</span> The average processor utilization across application server nodes.</p>
                    <p><span className="font-semibold text-slate-300">Why it’s needed:</span> Alerts developers if background workloads or high user traffic are consuming excessive processing power.</p>
                    <div className="text-slate-400 space-y-1 pt-1">
                      <p className="font-semibold text-slate-300">Developer Implementation:</p>
                      <p className="pl-2">• Monitored via server metrics agent (e.g., OS CPU load average).</p>
                      <p className="font-semibold text-slate-300 pl-2">Threshold Rules:</p>
                      <p className="pl-4">• <span className="text-emerald-400 font-semibold">&lt; 70%:</span> Normal (Green)</p>
                      <p className="pl-4">• <span className="text-amber-400 font-semibold">70% – 85%:</span> Warning (Amber) — trigger auto-scaling / pod expansion</p>
                      <p className="pl-4">• <span className="text-red-400 font-semibold">&gt; 85%:</span> Critical (Red) — trigger immediate alert notification</p>
                    </div>
                  </div>

                  {/* 4. Storage Usage */}
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3.5 space-y-1.5">
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <span>💾 4. Storage Usage</span>
                    </div>
                    <p><span className="font-semibold text-slate-300">What it is:</span> Total disk space utilized for primary databases and file attachments (e.g., legal PDFs, case evidence, generated documents).</p>
                    <p><span className="font-semibold text-slate-300">Why it’s needed:</span> Prevents database write locks or upload failures due to disk space exhaustion.</p>
                    <div className="text-slate-400 space-y-1 pt-1">
                      <p className="font-semibold text-slate-300">Developer Implementation:</p>
                      <p className="pl-2">• Displays used volume vs max capacity (e.g., 4.2 TB / 10 TB used (42%)).</p>
                      <p className="pl-2">• Triggers an alert when storage capacity exceeds 85%.</p>
                    </div>
                  </div>

                  {/* 5. Network Load & Throughput */}
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3.5 space-y-1.5">
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <span>🌐 5. Network Load & Throughput</span>
                    </div>
                    <p><span className="font-semibold text-slate-300">What it is:</span> Real-time incoming and outgoing network traffic, bandwidth usage, and active HTTP requests per minute.</p>
                    <p><span className="font-semibold text-slate-300">Why it’s needed:</span> Helps diagnose network bottlenecks, sudden traffic spikes, or potential DDoS attacks.</p>
                    <div className="text-slate-400 space-y-1 pt-1">
                      <p className="font-semibold text-slate-300">Developer Implementation:</p>
                      <p className="pl-2 font-semibold text-slate-300">Tracks:</p>
                      <p className="pl-4">• <span className="font-semibold text-slate-200">Throughput:</span> Current bandwidth (e.g., 450 MB/s)</p>
                      <p className="pl-4">• <span className="font-semibold text-slate-200">Request Rate:</span> Requests per minute (e.g., 27.8k req/min)</p>
                      <p className="pl-4">• <span className="font-semibold text-slate-200">Latency:</span> Average response time (e.g., 42 ms)</p>
                    </div>
                  </div>

                  {/* 6. Notification Queue */}
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3.5 space-y-1.5">
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <span>📬 6. Notification Queue</span>
                    </div>
                    <p><span className="font-semibold text-slate-300">What it is:</span> The status of background message queues (e.g., Redis / BullMQ / AWS SQS / RabbitMQ) responsible for sending emails, SMS alerts, system push notifications, and Webhooks.</p>
                    <p><span className="font-semibold text-slate-300">Why it’s needed:</span> Ensures operational messages and security alerts are being delivered promptly to users and not getting stuck in a worker queue.</p>
                    <div className="text-slate-400 space-y-1 pt-1">
                      <p className="font-semibold text-slate-300">Developer Implementation:</p>
                      <p className="pl-2 font-semibold text-slate-300">Metrics to Display:</p>
                      <p className="pl-4">• <span className="font-semibold text-slate-200">Pending in Queue:</span> Count of messages waiting to be sent (e.g., 14 messages).</p>
                      <p className="pl-4">• <span className="font-semibold text-slate-200">Processing Rate:</span> Messages processed per minute (e.g., 350 msg/min).</p>
                      <p className="pl-4">• <span className="font-semibold text-slate-200">Failed / Dead Letter Queue (DLQ):</span> Number of failed delivery retries requiring manual review.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Why each section is needed and what it should do</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    {
                      title: "System Service Health",
                      detail: "Monitors real-time infrastructure and message delivery metrics. Developer Breakdown:\n• System Status: Overall health badge (Operational / Degraded / Outage) based on active health checks.\n• Uptime: SLA tracking percentage (e.g. 99.98% over last 30 days) measuring system availability.\n• CPU Usage: Processor utilization percentage (warn if >80%, alert if >90%).\n• Storage: Disk usage for database & document uploads (e.g. 4.2 TB / 10 TB used).\n• Network Load: Incoming/outgoing bandwidth throughput and active connections per second.\n• Notification Queue: Background message queue depth, worker processing speed, and failed delivery retry counts."
                    },
                    {
                      title: "Platform Quick Actions",
                      detail: "This section exists to give fast access to the most common tasks. It should help admins move quickly to tenant setup, tenant management, audit review, and security settings without searching through the whole app."
                    },
                    {
                      title: "Notifications and Alerts",
                      detail: "This is the delivery layer for operational updates, incident notices, tenant events, and security warnings. In implementation, it should route messages through a notification service, support retries and priority levels, and ensure the right users receive the right alert at the right time."
                    },
                    {
                      title: "Recent Platform Audit Trail",
                      detail: "This section is needed for visibility and accountability. It should show the latest important platform events such as tenant changes, policy updates, suspensions, and provisioning actions. It helps admins understand what happened recently and why."
                    },
                    {
                      title: "Tenant Registry",
                      detail: "This section is the main list of tenants. It should show tenant names, domains, and status so admins can quickly review who is active, pending, or suspended. It is the core list for platform operations."
                    },
                    {
                      title: "Platform MRR",
                      detail: "This metric is needed for business visibility. It should show recurring monthly revenue from all tenants so the platform team can track growth and subscription health."
                    },
                    {
                      title: "Total Seats",
                      detail: "This metric shows how many users are currently licensed or active across the platform. It matters for capacity planning, onboarding, and license management."
                    },
                    {
                      title: "API Requests (24h)",
                      detail: "This metric shows platform usage volume. It helps the team understand traffic, performance pressure, and whether the platform is growing or becoming overloaded."
                    },
                    {
                      title: "Tenant count cards",
                      detail: "These cards give a quick summary of tenant health. The logic should count tenants by status so the admin can see how many are active, suspended, or waiting for review."
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                      <p className="mb-1 font-semibold text-white">{item.title}</p>
                      <p className="text-xs leading-5 text-slate-400">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Buttons, search, and navigation</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Developer Guide:</span> opens this pop-up guide so the team can review the page purpose and implementation notes.</li>
                  <li><span className="font-semibold text-white">Tenant Login:</span> this button is for switching to the tenant-facing login experience. It helps test or access the tenant side from the platform area.</li>
                  <li><span className="font-semibold text-white">Provision Tenant:</span> this is the main action for onboarding a new tenant. It should open the tenant setup flow at /platform/tenant-provisioning/new.</li>
                  <li><span className="font-semibold text-white">Manage Tenants:</span> this should open the tenant management page at /platform/tenant-administration.</li>
                  <li><span className="font-semibold text-white">Audit Center:</span> this should open /platform/audit.</li>
                  <li><span className="font-semibold text-white">Security Settings:</span> this should open /platform/settings.</li>
                  <li><span className="font-semibold text-white">Tenant Registry rows:</span> these should open the tenant detail page at /platform/tenant-administration/[id].</li>
                  <li><span className="font-semibold text-white">Search bar:</span> this should allow platform staff to quickly find a tenant, user, or relevant record without manually browsing the full list.</li>
                  <li><span className="font-semibold text-white">Sidebar:</span> the sidebar is the main navigation structure. It should guide the platform admin to the main areas of the product such as dashboard, tenant management, audit, settings, and provisioning.</li>
                </ul>
              </section>

              {/* Indian Legal & Compliance Pre-Development Blueprint */}
              <section className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400 flex items-center gap-2">
                  <span>Indian Legal Compliance Pre-Development Guide (What, Why, Where & How)</span>
                </h3>
                <div className="space-y-4 text-xs">
                  {/* Law 1: DPDP Act 2023 */}
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-2">
                    <p className="font-bold text-amber-300 text-sm">1. 🛡️ Digital Personal Data Protection (DPDP) Act, 2023</p>
                    <p><strong className="text-slate-200">WHAT:</strong> India's law regulating how personal client data must be collected, processed, stored, and protected.</p>
                    <p><strong className="text-slate-200">WHY:</strong> Legal compliance mandate. Violations carry severe penalties of up to ₹250 crore by the Data Protection Board.</p>
                    <p><strong className="text-slate-200">WHERE in Codebase:</strong> Infrastructure config (<code className="text-blue-400">ap-south-1 Mumbai</code>), <code className="text-blue-400">src/components/forms/</code>, <code className="text-blue-400">src/services/data-privacy.service.ts</code>.</p>
                    <div className="text-slate-400 space-y-1 pl-2 border-l-2 border-amber-500/40">
                      <p className="font-semibold text-white">HOW to Implement:</p>
                      <p>• Host all databases & file storage strictly in India (<code className="text-blue-400">AWS/GCP Mumbai region</code>).</p>
                      <p>• Build affirmative client consent dialogs (no pre-checked boxes) before storing client contact info.</p>
                      <p>• Implement data deletion/archival workflows for closed cases and breach notification logging.</p>
                    </div>
                  </div>

                  {/* Law 2: BCI Rule 36 & Advocates Act 1961 */}
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-2">
                    <p className="font-bold text-amber-300 text-sm">2. ⚖️ Bar Council of India (BCI) Rule 36 & Advocates Act, 1961</p>
                    <p><strong className="text-slate-200">WHAT:</strong> BCI Rule 36 strictly bans advocates from advertising, soliciting clients, or being listed on public directories.</p>
                    <p><strong className="text-slate-200">WHY:</strong> Court precedent (<code className="text-blue-400">P.N. Vignesh case</code>). Directory platforms face legal action and advocates risk disbarment if soliciting is allowed.</p>
                    <p><strong className="text-slate-200">WHERE in Codebase:</strong> <code className="text-blue-400">src/app/(public)/</code>, <code className="text-blue-400">src/layouts/PublicLayout.tsx</code>, <code className="text-blue-400">src/app/(client)/</code>.</p>
                    <div className="text-slate-400 space-y-1 pl-2 border-l-2 border-amber-500/40">
                      <p className="font-semibold text-white">HOW to Implement:</p>
                      <p>• DO NOT build public lawyer search, directory, rating, or client-matching features.</p>
                      <p>• Make ALL client access strictly <strong className="text-amber-300">Invite-Only</strong> via direct links sent by their representing advocate.</p>
                    </div>
                  </div>

                  {/* Law 3: Attorney-Client Privilege */}
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-2">
                    <p className="font-bold text-amber-300 text-sm">3. 🔐 Attorney-Client Privilege (BSA 2023 Sec 132 / IEA Sec 126)</p>
                    <p><strong className="text-slate-200">WHAT:</strong> Indian law protecting confidential advocate-client communications and case documents from disclosure.</p>
                    <p><strong className="text-slate-200">WHY:</strong> Lawyers will not adopt a cloud platform if system engineers can inspect their confidential case files.</p>
                    <p><strong className="text-slate-200">WHERE in Codebase:</strong> <code className="text-blue-400">src/lib/encryption.ts</code>, <code className="text-blue-400">src/middleware.ts</code>, <code className="text-blue-400">src/app/(platform)/platform/audit/</code>.</p>
                    <div className="text-slate-400 space-y-1 pl-2 border-l-2 border-amber-500/40">
                      <p className="font-semibold text-white">HOW to Implement:</p>
                      <p>• Build <strong className="text-amber-300">Per-Firm Encryption (Option 2)</strong>: Unique encryption key generated per tenant workspace.</p>
                      <p>• Ensure platform owners have <strong className="text-white">zero standing access</strong> to tenant case files.</p>
                      <p>• Build a 2-person approval break-glass protocol (CTO + Security) for emergency maintenance.</p>
                    </div>
                  </div>

                  {/* Law 4: BNS, BNSS & BSA 2023 */}
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-2">
                    <p className="font-bold text-amber-300 text-sm">4. 📚 New Criminal Laws (BNS, BNSS & BSA 2023 Concordance Tool)</p>
                    <p><strong className="text-slate-200">WHAT:</strong> India replaced IPC, CrPC, and IEA with BNS, BNSS, and BSA. Courts run cases under both old & new codes.</p>
                    <p><strong className="text-slate-200">WHY:</strong> Advocates make frequent errors mapping legacy sections to new codes in court filings, causing rejection defects.</p>
                    <p><strong className="text-slate-200">WHERE in Codebase:</strong> <code className="text-blue-400">src/features/legal-lookup/</code>, <code className="text-blue-400">src/constants/concordance-table.json</code>.</p>
                    <div className="text-slate-400 space-y-1 pl-2 border-l-2 border-amber-500/40">
                      <p className="font-semibold text-white">HOW to Implement:</p>
                      <p>• Create a JSON concordance lookup table matching legacy IPC/CrPC sections to BNS/BNSS provisions.</p>
                      <p>• Show instant section translation suggestions and High Court footnote formatting as advocates type drafts.</p>
                    </div>
                  </div>

                  {/* Law 5: IT Act 2000 & CERT-In */}
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-2">
                    <p className="font-bold text-amber-300 text-sm">5. 💻 IT Act, 2000 & CERT-In Guidelines (Authentication & Audit)</p>
                    <p><strong className="text-slate-200">WHAT:</strong> Information technology regulations governing digital access controls, MFA, and system incident logging.</p>
                    <p><strong className="text-slate-200">WHY:</strong> Protects law firms against account hijacking, credential theft, and SIM-swap fraud.</p>
                    <p><strong className="text-slate-200">WHERE in Codebase:</strong> <code className="text-blue-400">src/app/(platform)/platform/mfa/</code>, <code className="text-blue-400">src/providers/AuthProvider.tsx</code>.</p>
                    <div className="text-slate-400 space-y-1 pl-2 border-l-2 border-amber-500/40">
                      <p className="font-semibold text-white">HOW to Implement:</p>
                      <p>• Force mandatory <strong className="text-amber-300">App-Based TOTP MFA</strong> for all users accessing case or billing data.</p>
                      <p>• Maintain immutable, time-stamped system logs of all login and document access events for 1+ years.</p>
                    </div>
                  </div>

                  {/* Law 6: GST Act 2017 */}
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-2">
                    <p className="font-bold text-amber-300 text-sm">6. 💳 GST Act, 2017 & Payment Gateway Regulations</p>
                    <p><strong className="text-slate-200">WHAT:</strong> Indian tax laws governing legal service billing, SAC codes, and digital payment collections.</p>
                    <p><strong className="text-slate-200">WHY:</strong> Ensures law firms generate compliant tax invoices and collect client retainers legally.</p>
                    <p><strong className="text-slate-200">WHERE in Codebase:</strong> <code className="text-blue-400">src/app/(tenant)/workspace/billing/</code>, <code className="text-blue-400">src/components/tables/InvoicesTable.tsx</code>.</p>
                    <div className="text-slate-400 space-y-1 pl-2 border-l-2 border-amber-500/40">
                      <p className="font-semibold text-white">HOW to Implement:</p>
                      <p>• Add support for SAC Code <strong className="text-white">9982</strong> (Legal Services) and Reverse Charge Mechanism (RCM) flags on invoices.</p>
                      <p>• Integrate RBI-approved payment gateways (Razorpay, UPI QR) for retainer billing.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Simple glossary for developers</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Tenant</p>
                    <p className="text-xs leading-5 text-slate-400">A tenant is a separate client organization using the platform. Each tenant may have its own users, workspace, settings, and data.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Provisioning</p>
                    <p className="text-xs leading-5 text-slate-400">Provisioning means creating a new tenant setup, including its workspace, access, and initial configuration.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Audit Trail</p>
                    <p className="text-xs leading-5 text-slate-400">An audit trail is a history of important actions such as changes, suspensions, updates, and security events.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Platform Admin</p>
                    <p className="text-xs leading-5 text-slate-400">A platform admin is the person who manages the whole system, including tenants, platform settings, and operational health.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Sidebar</p>
                    <p className="text-xs leading-5 text-slate-400">The sidebar is the main navigation panel. It helps users move between the main areas of the product.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Platform MRR</p>
                    <p className="text-xs leading-5 text-slate-400">MRR means monthly recurring revenue. It shows the predictable income coming from subscriptions.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Tenant status lifecycle</p>
                    <p className="text-xs leading-5 text-slate-400">Active means the tenant is fully onboarded and can use the platform normally. Pending means the tenant exists but setup, approval, or onboarding is still not complete. Suspended means the tenant has been blocked from using the platform, usually because of billing, compliance, or security issues.</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Who can use this page</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Platform Owner / Platform Admin</p>
                    <ul className="space-y-1 text-xs text-slate-400">
                      <li>• {PERMISSIONS.PLATFORM.MANAGE_TENANTS}</li>
                      <li>• {PERMISSIONS.PLATFORM.PROVISION_TENANTS}</li>
                      <li>• {PERMISSIONS.PLATFORM.VIEW_AUDIT_LOGS}</li>
                      <li>• {PERMISSIONS.PLATFORM.MANAGE_SETTINGS}</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Who should not use it</p>
                    <ul className="space-y-1 text-xs text-slate-400">
                      <li>• Tenant users should use the tenant workspace, not this platform dashboard.</li>
                      <li>• Regular firm users should not access this page unless they are given platform-level permissions.</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Product Document Modal */}
      {showProductDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-400">Product Concept Document</p>
                <h2 className="text-lg font-bold text-white">LawStack — Practice Management Platform for Indian Advocates</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="/docs/LawStack_Product_Concept_English.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>English PDF</span>
                </a>
                <a
                  href="/docs/LawStack_Product_Concept_Hindi.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>हिंदी PDF (Hindi)</span>
                </a>
                <button
                  onClick={() => setShowProductDoc(false)}
                  className="rounded-lg border border-slate-700 p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white ml-1"
                  aria-label="Close document modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="space-y-6 p-6 text-sm text-slate-300">
              {/* Dual Language Quick Link Notice */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-bold text-amber-300 text-xs uppercase tracking-wider">Product Concept Documents (Dual Language Available)</p>
                  <p className="text-xs text-slate-300">
                    <span className="font-mono text-amber-400">/docs/LawStack_Product_Concept_English.pdf</span><br />
                    <span className="font-mono text-emerald-400">/docs/LawStack_Product_Concept_Hindi.pdf</span>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <a
                    href="/docs/LawStack_Product_Concept_English.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Open English PDF</span>
                  </a>
                  <a
                    href="/docs/LawStack_Product_Concept_Hindi.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>हिंदी PDF खोलें (Hindi)</span>
                  </a>
                </div>
              </div>

              {/* 1. Core Idea & Audience */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">1. Executive Summary & Target Audience</h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2 text-xs leading-relaxed">
                  <p className="text-slate-200">
                    <strong className="text-white">Core Vision:</strong> Indian advocates and small law firms currently rely on WhatsApp groups, paper diaries, and Excel sheets. LawStack replaces them with a single secure workspace for cases, hearings, documents, clients, billing, and team management built specifically around Indian legal practice.
                  </p>
                  <p className="text-slate-400">
                    <strong className="text-slate-300">The Trust Promise:</strong> Built around the fundamental promise that <span className="text-amber-300 font-semibold">no one — not even the platform owner — can casually look into a firm's case files</span>.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                    <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                      <p className="font-bold text-white">1st Priority: Solo Advocates</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Independent lawyers — biggest user segment needing simplicity.</p>
                    </div>
                    <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                      <p className="font-bold text-white">1st Priority: Small/Mid Law Firms</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Multi-lawyer teams needing role & permission management.</p>
                    </div>
                    <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                      <p className="font-bold text-white">2nd Priority: Judges Module</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Separate government track for court docket management.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. Access & Encryption Architecture */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">2. Security & Encryption Architecture (Core Foundation)</h3>
                <div className="space-y-3 text-xs">
                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                    <p className="font-bold text-white">Downward Access Flow (No Public Sign-Up)</p>
                    <p className="text-slate-400 font-mono text-[11px] bg-slate-900 p-2 rounded border border-slate-800 text-blue-300">
                      Public Website ➔ Login ➔ Platform Control Plane (Owner) ➔ Tenant Provisioning ➔ Tenant Workspace (Owner) ➔ Firm Team Invites
                    </p>
                    <p className="text-slate-400">There is no public sign-up link. Access flows strictly downward from authorized owners.</p>
                  </div>

                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                    <p className="font-bold text-white">Per-Firm Encryption (Option 2 Recommended)</p>
                    <ul className="space-y-1.5 text-slate-400">
                      <li>• Every firm receives a <strong className="text-slate-200">unique encryption key</strong> created upon setup and stored wrapped.</li>
                      <li>• Platform owner has <strong className="text-slate-200">no standing access</strong> to tenant case files.</li>
                      <li>• <strong className="text-amber-300">Break-Glass Protocol:</strong> Emergency access requires dual approval (CTO + Compliance Lead), triggers automatic firm notification, and writes to an uneditable audit log.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                    <p className="font-bold text-white">Internal Firm Conflict Walls & Role Scoping</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                        <p className="font-bold text-slate-200">Firm Owner</p>
                        <p className="text-[10px] text-slate-400">Full firm control, staff invites, case visibility rules, billing.</p>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                        <p className="font-bold text-slate-200">Partner / Senior Advocate</p>
                        <p className="text-[10px] text-slate-400">Broad visibility across assigned and firm-wide matters.</p>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                        <p className="font-bold text-slate-200">Associate / Junior Lawyer</p>
                        <p className="text-[10px] text-slate-400">Default visibility restricted strictly to assigned cases.</p>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                        <p className="font-bold text-slate-200">Clerk / Admin Staff</p>
                        <p className="text-[10px] text-slate-400">Narrowest access: calendar, tasks, and document filing only.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Core Feature Matrix */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">3. Product Feature Matrix</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white">Case & Matter Management</p>
                    <p className="text-slate-400">CNR tracking, court, case type, laws/sections, filing date, and status pipeline:</p>
                    <p className="font-mono text-[10px] text-emerald-400 bg-slate-900 p-1.5 rounded">
                      Filed ➔ Admitted ➔ Hearing ➔ Reserved ➔ Judgment ➔ Disposed ➔ Appeal
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white">Calendar & Cause-List Reminders</p>
                    <p className="text-slate-400">Master cause-list calendar, automatic clash detection, WhatsApp/SMS/Email notifications, and Google/Outlook calendar sync.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white">Document Management & OCR</p>
                    <p className="text-slate-400">Per-case document uploads with searchable OCR text extraction, Vakalatnama templates, and expiring share links.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white">Client Portal & BCI Rule 36</p>
                    <p className="text-slate-400">Strictly invite-only client access. No public directory or ratings to strictly comply with Bar Council of India Rule 36.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white">GST Billing & Payments</p>
                    <p className="text-slate-400">Fixed, hourly, per-hearing, or retainer fee structures with GST-compliant invoicing and UPI / Razorpay integration.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white">eCourts & NJDG Data Sync</p>
                    <p className="text-slate-400">Automated case status sync via CNR lookup starting with MP, Delhi, and Bombay High Courts.</p>
                  </div>
                </div>
              </section>

              {/* 4. Special Indian Legal Features */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">4. Key Differentiating Features for India (2026)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 bg-slate-950/60 rounded-xl border border-blue-500/30 space-y-2">
                    <p className="font-bold text-blue-300">IPC/CrPC/IEA ➔ BNS/BNSS/BSA Lookup Tool</p>
                    <p className="text-slate-400 leading-relaxed">
                      As advocates draft filings, the system automatically suggests corresponding modern sections under the 2024 criminal codes, flags multi-provision ambiguities, and formats High Court footnotes.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950/60 rounded-xl border border-blue-500/30 space-y-2">
                    <p className="font-bold text-blue-300">Automatic Filing Defect Checker</p>
                    <p className="text-slate-400 leading-relaxed">
                      Pre-submission scanner checking draft petitions against specific High Court filing manuals (missing signatures, page indexing, margin formatting) to eliminate registry rejections.
                    </p>
                  </div>
                </div>
              </section>

              {/* 5. Indian Legal & Regulatory Compliance */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">5. Regulatory & Compliance Safeguards</h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <p className="text-slate-300">
                    <strong className="text-white">Digital Personal Data Protection (DPDP) Act 2023:</strong> Full compliance workflow ahead of May 2027 enforcement. Includes explicit client consent capture, breach reporting protocols, and <strong className="text-amber-300">Mumbai AWS/GCP data residency</strong> so data never leaves India.
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-white">BCI Rule 36 & P.N. Vignesh Precedent:</strong> Avoids directory-style solicitation bans by completely omitting public lawyer listings, search, or rating systems.
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-white">Attorney-Client Privilege:</strong> Protected by cryptographic per-firm keys and zero platform-owner standing access.
                  </p>
                </div>
              </section>

              {/* 6. Phased Roadmap & Decisions */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">6. Phased Build Roadmap & Governance Decisions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                    <p className="font-bold text-amber-400">Phase 1: MVP</p>
                    <p className="text-[10px] text-slate-400 mt-1">Security foundation, firm encryption, cases, calendar, basic law lookup.</p>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                    <p className="font-bold text-amber-400">Phase 2: Firm-Grade</p>
                    <p className="text-[10px] text-slate-400 mt-1">Restricted cases, GST billing, DPDP consent workflows, precedent lookup.</p>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                    <p className="font-bold text-amber-400">Phase 3: Automation</p>
                    <p className="text-[10px] text-slate-400 mt-1">eCourts auto-sync, filing defect checker pilot, dedicated DB option.</p>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                    <p className="font-bold text-amber-400">Phase 4: Ecosystem</p>
                    <p className="text-[10px] text-slate-400 mt-1">Client mobile app, regional languages, AI context drafting.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <p className="font-bold text-white">Key Product Governance Decisions:</p>
                  <ul className="space-y-1 text-slate-400">
                    <li>• <strong className="text-slate-200">Mandatory TOTP MFA:</strong> Required for all roles accessing case or billing data.</li>
                    <li>• <strong className="text-slate-200">Account Recovery:</strong> Firm owner lockout recovery requires identity re-verification + 72-hour cooling-off period.</li>
                    <li>• <strong className="text-slate-200">Target Launch Courts:</strong> Initial court sync pilot targeting MP High Court, Delhi High Court, and Bombay High Court.</li>
                  </ul>
                </div>
              </section>

              {/* Bottom PDF Link Buttons */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4">
                <div>
                  <p className="font-bold text-white text-xs">Need to review the full 11-page original concept document?</p>
                  <p className="text-[11px] text-slate-400">Hosted in your web app in English and Hindi for instant viewing or downloading.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <a
                    href="/docs/LawStack_Product_Concept_English.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>English PDF</span>
                  </a>
                  <a
                    href="/docs/LawStack_Product_Concept_Hindi.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>हिंदी PDF (Hindi)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

