"use client";

import React from "react";
import Link from "next/link";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { MOCK_TENANTS } from "@/mocks/tenants";
import { Shield, Building2, Plus, Search, ArrowRight, ChevronRight, Globe, Users, Calendar, TrendingUp, TriangleAlert as AlertTriangle } from "lucide-react";

export default function ProvisioningPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Platform", href: "/platform/dashboard" }, { name: "Tenant Provisioning" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/15 border border-blue-500/30">
              <Shield className="w-4 h-4 text-blue-400" />
            </span>
            <span>Tenant Provisioning</span>
          </h1>
          <p className="text-xs text-slate-400">Launch new firm tenant namespaces and track provisioning status.</p>
        </div>
        <Link href="/platform/tenant-provisioning/new">
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Launch Wizard
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Provisioned", value: MOCK_TENANTS.length, icon: Building2, color: "text-blue-400" },
          { label: "Active", value: MOCK_TENANTS.filter((t) => t.status === "Active").length, icon: TrendingUp, color: "text-emerald-400" },
          { label: "Pending", value: MOCK_TENANTS.filter((t) => t.status === "Pending").length, icon: AlertTriangle, color: "text-amber-400" },
          { label: "Suspended", value: MOCK_TENANTS.filter((t) => t.status === "Suspended").length, icon: Shield, color: "text-red-400" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{s.label}</span>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className="mt-1 text-2xl font-extrabold text-white">{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search tenants by name or subdomain..."
          className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/50 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-slate-700 transition-all"
        />
      </div>

      {/* Tenant table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-slate-800 bg-slate-950/40 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
          <div className="col-span-5">Tenant</div>
          <div className="col-span-3">Subdomain</div>
          <div className="col-span-2">Tier</div>
          <div className="col-span-2 text-right">Status</div>
        </div>
        {MOCK_TENANTS.map((t) => (
          <Link
            key={t.id}
            href={`/platform/tenant-administration/${t.id}`}
            className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-slate-800 last:border-0 hover:bg-slate-900/60 transition-colors items-center"
          >
            <div className="col-span-5 flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-white text-[10px] font-bold">
                {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{t.name}</div>
                <div className="text-[10px] text-slate-500">Joined {new Date(t.joinedDate).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="col-span-3 font-mono text-[11px] text-slate-400 truncate">{t.subdomain}.lawstack.com</div>
            <div className="col-span-2">
              <Badge label={t.tier} variant="neutral" />
            </div>
            <div className="col-span-2 flex items-center justify-end gap-1">
              <Badge
                label={t.status}
                variant={t.status === "Active" ? "success" : t.status === "Suspended" ? "error" : "warning"}
              />
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-900/20 to-transparent p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center">
            <Plus className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Provision a new firm tenant</p>
            <p className="text-[11px] text-slate-400">Run the 9-step wizard to launch an isolated practice namespace.</p>
          </div>
        </div>
        <Link href="/platform/tenant-provisioning/new" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-300 hover:gap-2.5 transition-all">
          Start <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
