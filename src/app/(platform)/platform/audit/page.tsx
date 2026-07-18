"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_ACTIVITIES } from "@/mocks/activity";
import { ShieldAlert, Search, ListFilter as Filter, Download, Activity, FileText, Users, Settings, Lock, ChevronRight, Calendar } from "lucide-react";

const typeIcon: Record<string, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  Document: { color: "text-blue-400", icon: FileText },
  User: { color: "text-emerald-400", icon: Users },
  Settings: { color: "text-amber-400", icon: Settings },
  Security: { color: "text-red-400", icon: Lock },
};

export default function AuditCenterPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

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
        <Button variant="secondary" leftIcon={<Download className="w-4 h-4" />}>
          Export Trail
        </Button>
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
    </div>
  );
}
