"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { MOCK_TENANTS } from "@/mocks/tenants";
import { PERMISSIONS } from "@/constants/permissions";
import { Building2, Search, ChevronRight, Globe, Users, TrendingUp, TriangleAlert as AlertTriangle, Shield, ListFilter as Filter, BookOpen, Plus, X } from "lucide-react";

export default function TenantAdminListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  const filtered = MOCK_TENANTS.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.subdomain.includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Platform", href: "/platform/dashboard" }, { name: "Tenant Administration" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/15 border border-blue-500/30">
              <Building2 className="w-4 h-4 text-blue-400" />
            </span>
            <span>Tenant Administration</span>
          </h1>
          <p className="text-xs text-slate-400">Manage client namespaces, subscriptions, quotas, and user seats.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" leftIcon={<BookOpen className="w-4 h-4" />} onClick={() => setShowDeveloperGuide(true)}>
            Developer Guide
          </Button>
          <Link href="/platform/tenant-provisioning/new">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              Add Tenant
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Tenants", value: MOCK_TENANTS.length, icon: Building2, color: "text-blue-400" },
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

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by firm name or subdomain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/50 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-slate-700 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          {["All", "Active", "Pending", "Suspended"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                statusFilter === s ? "bg-blue-600 text-white" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Tenant table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-slate-800 bg-slate-950/40 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
          <div className="col-span-4">Firm</div>
          <div className="col-span-2">Subdomain</div>
          <div className="col-span-2">Tier</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Action</div>
        </div>
        {filtered.length === 0 ? (
          <div className="px-4 py-10 text-center text-xs text-slate-500">No tenants match your filters.</div>
        ) : (
          filtered.map((t) => (
            <div
              key={t.id}
              className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-slate-800 last:border-0 hover:bg-slate-900/60 transition-colors items-center"
            >
              <div className="col-span-4 flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-white text-[10px] font-bold">
                  {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{t.name}</div>
                  <div className="text-[10px] text-slate-500">Joined {new Date(t.joinedDate).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="col-span-2 font-mono text-[11px] text-slate-400 truncate">{t.subdomain}.lawstack.com</div>
              <div className="col-span-2"><Badge label={t.tier} variant="neutral" /></div>
              <div className="col-span-2">
                <Badge label={t.status} variant={t.status === "Active" ? "success" : t.status === "Suspended" ? "error" : "warning"} />
              </div>
              <div className="col-span-2 flex items-center justify-end gap-2">
                <Link href={`/platform/tenant-administration/${t.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
                <Link href="/tenant/login">
                  <Button variant="secondary" size="sm">
                    Login Tenant
                  </Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Developer Guide</p>
                <h2 className="text-lg font-bold text-white">Tenant Administration Handoff Notes</h2>
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
                  This page is the main list view for managing tenants. It should help platform staff review tenant accounts, search for a specific tenant, filter by status, and open a tenant detail page.
                </p>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Why each section is needed</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    {
                      title: "Tenant count cards",
                      detail: "These cards give a quick summary of how many tenants exist and how many are active, pending, or suspended. They help the admin understand the current health of the platform at a glance."
                    },
                    {
                      title: "Search and filters",
                      detail: "These controls help the admin quickly find a tenant by name or subdomain and narrow the list by status. This is needed for faster operations and better usability."
                    },
                    {
                      title: "Tenant table",
                      detail: "This is the main working area of the page. It should show the most important tenant details and let the admin open a tenant record for deeper management."
                    },
                    {
                      title: "Add Tenant action",
                      detail: "This action is the main entry point for onboarding a new tenant from within the administration experience. It should open the tenant setup flow so a new tenant can be created."
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
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">What each row should contain</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Firm:</span> tenant name and join date.</li>
                  <li><span className="font-semibold text-white">Subdomain:</span> the tenant's unique URL slug.</li>
                  <li><span className="font-semibold text-white">Tier:</span> the current subscription tier such as Standard, Professional, or Enterprise.</li>
                  <li><span className="font-semibold text-white">Status:</span> whether the tenant is Active, Pending, or Suspended.</li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Buttons and navigation</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Developer Guide:</span> opens this guide for implementation notes.</li>
                  <li><span className="font-semibold text-white">Add Tenant:</span> opens the tenant setup flow from the administration experience.</li>
                  <li><span className="font-semibold text-white">View Details:</span> opens the tenant detail page at /platform/tenant-administration/[id].</li>
                  <li><span className="font-semibold text-white">Login Tenant:</span> opens the tenant login page at /tenant/login so the platform admin can switch into the tenant experience.</li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Simple glossary</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Tenant</p>
                    <p className="text-xs leading-5 text-slate-400">A tenant is a separate client organization using the platform.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Provisioning</p>
                    <p className="text-xs leading-5 text-slate-400">Provisioning means creating a new tenant account and setup.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Tier</p>
                    <p className="text-xs leading-5 text-slate-400">The tier is the subscription level such as Standard, Professional, or Enterprise.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Status</p>
                    <p className="text-xs leading-5 text-slate-400">Status shows if the tenant is active, pending, or suspended. Active means the tenant is fully working and can use the platform. Pending means the tenant has been created but setup, approval, or onboarding is still not complete. Suspended means access has been stopped, usually because of billing, compliance, or security reasons.</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Who can use this page</h3>
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                  <p className="mb-2 font-semibold text-white">Platform Owner / Platform Admin</p>
                  <ul className="space-y-1 text-xs text-slate-400">
                    <li>• {PERMISSIONS.PLATFORM.MANAGE_TENANTS}</li>
                    <li>• {PERMISSIONS.PLATFORM.PROVISION_TENANTS}</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
