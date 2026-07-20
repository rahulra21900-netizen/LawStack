"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_ACTIVITIES } from "@/mocks/activity";
import { ShieldAlert, Search, ListFilter as Filter, Download, Activity, FileText, Users, Settings, Lock, ChevronRight, Calendar, BookOpen, X } from "lucide-react";

const typeIcon: Record<string, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  Document: { color: "text-blue-400", icon: FileText },
  User: { color: "text-emerald-400", icon: Users },
  Settings: { color: "text-amber-400", icon: Settings },
  Security: { color: "text-red-400", icon: Lock },
};

export default function AuditCenterPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  const filtered = MOCK_ACTIVITIES.filter((a) => {
    const matchesSearch = a.action.toLowerCase().includes(search.toLowerCase()) || a.userName.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "All" || a.entityType === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Platform", href: "/platform/dashboard" }, { name: "Audit Center" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/15 border border-blue-500/30">
              <ShieldAlert className="w-4 h-4 text-blue-400" />
            </span>
            <span>Platform Audit Center</span>
          </h1>
          <p className="text-xs text-slate-400">Immutable record of every administrative and tenant-scoped action across the platform.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/platform/break-glass">
            <Button
              variant="destructive"
              leftIcon={<Lock className="w-4 h-4" />}
              className="bg-red-600 hover:bg-red-500 text-white font-bold shadow-lg shadow-red-600/20"
            >
              Emergency Break-Glass
            </Button>
          </Link>
          <Button variant="outline" leftIcon={<BookOpen className="w-4 h-4" />} onClick={() => setShowDeveloperGuide(true)}>
            Developer Guide
          </Button>
          <Button variant="secondary" leftIcon={<Download className="w-4 h-4" />}>
            Export Trail
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Events (24h)" value="1,284" info="Across all tenants" trend="up" change="+12%" />
        <MetricCard title="Security Events" value="3" info="Requires review" trend="neutral" change="2 MFA enrollments" />
        <MetricCard title="Admin Actions" value="42" info="Platform-level" trend="neutral" />
        <MetricCard title="Failed Auth" value="7" info="Blocked attempts" trend="down" change="-3" />
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by action, user, or entity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/50 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-slate-700 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          {["All", "Document", "User", "Settings", "Security"].map((s) => (
            <button
              key={s}
              onClick={() => setTypeFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                typeFilter === s ? "bg-blue-600 text-white" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <Card
          className="lg:col-span-1"
          header={
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white text-xs">Event Timeline</span>
            </div>
          }
        >
          <ol className="relative border-l border-slate-800 ml-2 space-y-3 pl-6">
            {filtered.slice(0, 6).map((a) => {
              const meta = typeIcon[a.entityType] || typeIcon.Document;
              const Icon = meta.icon;
              return (
                <li key={a.id} className="relative">
                  <span className={`absolute -left-[33px] flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 border border-slate-700 ${meta.color}`}>
                    <Icon className="w-3 h-3" />
                  </span>
                  <p className="text-xs text-slate-200 font-semibold">{a.action}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{a.userName} · {new Date(a.createdAt).toLocaleTimeString()}</p>
                </li>
              );
            })}
          </ol>
        </Card>

        {/* Table */}
        <Card
          className="lg:col-span-2"
          header={
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs">Audit Records</span>
              <Badge label={`${filtered.length} events`} variant="info" />
            </div>
          }
        >
          <div className="overflow-x-auto -mx-5">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 uppercase text-[9px] font-bold border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3">Action</th>
                  <th className="px-5 py-3">Actor</th>
                  <th className="px-5 py-3">Tenant</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-slate-500">No events match your filters.</td></tr>
                ) : (
                  filtered.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="px-5 py-3">
                        <Link href={`/platform/audit/${a.id}`} className="font-bold text-blue-400 hover:underline">
                          {a.action}
                        </Link>
                      </td>
                      <td className="px-5 py-3 font-semibold text-white">{a.userName}</td>
                      <td className="px-5 py-3 font-mono text-[10px] text-slate-500">{a.tenantId || "SaaS Admin"}</td>
                      <td className="px-5 py-3"><Badge label={a.entityType} variant="neutral" /></td>
                      <td className="px-5 py-3 text-right text-[10px] font-mono text-slate-500">
                        {new Date(a.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Developer Guide</p>
                <h2 className="text-lg font-bold text-white">Platform Audit Center Handoff Notes</h2>
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
                  This page is the platform-wide audit console. It should show a searchable, filterable history of actions performed by platform admins, tenant admins, and other system actors so security teams can review what happened and when. The latest implementation should treat the audit stream as a service-backed view that can be filtered by tenant, action, and event type during provisioning and auth workflows.
                </p>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">What each section should do</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    {
                      title: "Header and summary",
                      detail: "Present the page title, a short description, and primary actions such as Export Trail and Developer Guide. This is the entry point for the audit experience."
                    },
                    {
                      title: "Metric cards",
                      detail: "Show a quick snapshot of the most important audit health indicators such as recent events, failed auth, admin actions, and security-related incidents."
                    },
                    {
                      title: "Search and filters",
                      detail: "Allow the user to find events by action, actor, entity, or event type. Filters should narrow the visible list without reloading the page."
                    },
                    {
                      title: "Timeline and records table",
                      detail: "Show a visual event stream on the left and a full audit table on the right. The table is the primary working surface for reviewing individual events."
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
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Implementation logic</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Data source:</span> the page should read from an audit event list provided by the platform service layer. Each event should include action, actor, tenant, entity type, timestamp, and an ID.</li>
                  <li><span className="font-semibold text-white">Filtering:</span> keep filter state locally in the component and derive the visible list from the full event set. This makes the page fast and easy to refine.</li>
                  <li><span className="font-semibold text-white">Detail navigation:</span> clicking an audit row should route to /platform/audit/[id] where the developer can show a detailed event view.</li>
                  <li><span className="font-semibold text-white">Export:</span> the Export Trail button should call a service that prepares a CSV or JSON export of the currently filtered audit events.</li>
                  <li><span className="font-semibold text-white">Break-glass workflow:</span> the Emergency Break-Glass action should open a controlled modal that requires dual approval from the CTO and compliance officer, records the event permanently, and triggers an in-app alert to the target firm.</li>
                  <li><span className="font-semibold text-white">Simple meaning:</span> this is a special emergency path for urgent cases like a security incident, tenant lockout, or legal emergency. It is not a normal admin action and should always be tightly controlled.</li>
                  <li><span className="font-semibold text-white">Real-time behavior:</span> in a production system, this page should subscribe to a stream or polling endpoint so new events appear without manual refresh.</li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">What each event should contain</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Action</p>
                    <p className="text-xs leading-5 text-slate-400">A short text label such as “User invited”, “Document downloaded”, or “Security policy changed”.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Actor</p>
                    <p className="text-xs leading-5 text-slate-400">The user or system identity that triggered the event.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Tenant</p>
                    <p className="text-xs leading-5 text-slate-400">The target tenant or workspace associated with the activity. If the action is platform-wide, this can be blank or set to SaaS Admin.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Entity Type</p>
                    <p className="text-xs leading-5 text-slate-400">Used to categorize the event: Document, User, Settings, or Security.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Timestamp</p>
                    <p className="text-xs leading-5 text-slate-400">The exact time the event occurred. This should be stored in UTC and displayed in the local timezone if desired.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Metadata</p>
                    <p className="text-xs leading-5 text-slate-400">Optional fields such as IP address, device, change summary, and previous/new values for compliance or investigations.</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Future backend hooks</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Audit service:</span> create an audit service that reads and writes events to an immutable store or log pipeline.</li>
                  <li><span className="font-semibold text-white">Event ingestion:</span> every create/update/delete operation across the platform should emit an event to the audit stream.</li>
                  <li><span className="font-semibold text-white">Security alerts:</span> flag suspicious patterns such as repeated failed logins or high-risk admin changes.</li>
                  <li><span className="font-semibold text-white">Break-glass approvals:</span> the backend should enforce dual approval for emergency access, record the full request in an immutable audit trail, and enforce a cooling-period policy after activation.</li>
                  <li><span className="font-semibold text-white">Retention:</span> the backend should enforce audit retention and access control so only authorized users can view sensitive logs.</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
