"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { CommandBar } from "@/components/navigation/CommandBar";
import { DetailDrawer } from "@/components/dialogs/DetailDrawer";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_CLIENTS } from "@/mocks/clients";
import { Client } from "@/types";
import { Users, Eye, ExternalLink, ShieldCheck, UserCheck, BookOpen, X } from "lucide-react";
import Link from "next/link";

export default function ClientsListPage() {
  const { addToast } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [inspectClient, setInspectClient] = useState<Client | null>(null);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  const filteredClients = MOCK_CLIENTS.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.companyName && c.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || c.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Clients" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600/15 border border-emerald-500/30">
              <Users className="w-4 h-4 text-emerald-400" />
            </span>
            <span>Client Profiles & Portal Intakes</span>
          </h1>
          <p className="text-xs text-slate-400">Manage corporate entities, individual clients, DPDP 2023 consent, and closed-network invites.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge label="BCI Rule 36 Compliant" variant="success" />
          <Button
            variant="outline"
            leftIcon={<BookOpen className="w-4 h-4" />}
            onClick={() => setShowDeveloperGuide(true)}
          >
            Developer Guide
          </Button>
        </div>
      </div>

      {/* DPDP Act 2023 & BCI Rule 36 Compliance Notice */}
      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-3 text-xs text-emerald-300">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-white">DPDP Act 2023 & Bar Council of India (BCI Rule 36) Compliance Active</p>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            • <strong>DPDP Act 2023 Data Fiduciary:</strong> Consent captured upon client intake. Clear right to withdraw consent on record closure.<br />
            • <strong>BCI Rule 36 Closed-Network:</strong> No public directory or soliciting. Clients access portal strictly via direct invite from counsel.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Clients" value={MOCK_CLIENTS.length} info="In roster" trend="up" />
        <MetricCard title="Active Engagements" value={MOCK_CLIENTS.filter((c) => c.status === "Active").length} info="DPDP Verified" trend="up" />
        <MetricCard title="Prospects" value={MOCK_CLIENTS.filter((c) => c.status === "Prospect").length} info="Intake stage" trend="neutral" />
        <MetricCard title="Corporate Entities" value={MOCK_CLIENTS.filter((c) => c.companyName).length} info="Entity clients" trend="neutral" />
      </div>

      {/* CommandBar */}
      <CommandBar
        onNew={() => addToast("Client Intake", "Opening digital client intake wizard...", "info")}
        newLabel="New Client Invite"
        onRefresh={() => addToast("Refreshed", "Client directory re-synchronized.", "success")}
        onExport={() => addToast("Export", "Client list exported to CSV.", "success")}
        selectedCount={selectedIds.length}
        onDeleteSelected={() => {
          addToast("Archived", `Archived ${selectedIds.length} client records.`, "info");
          setSelectedIds([]);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        density={density}
        onDensityChange={setDensity}
      />

      {/* Clients Data Table */}
      <DataTable<Client>
        data={filteredClients}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        density={density}
        onRowClick={(item) => setInspectClient(item)}
        getRowId={(item) => item.id}
        columns={[
          {
            header: "Client Name & Entity",
            accessor: (c) => (
              <div>
                <span className="font-bold text-white block group-hover:text-blue-400 transition-colors">
                  {c.name}
                </span>
                <span className="text-[10px] text-slate-400">{c.companyName || "Individual Client"}</span>
              </div>
            ),
          },
          { header: "Email Address", accessor: (c) => <span className="font-mono text-[10px] text-slate-400">{c.email}</span> },
          { header: "Phone Line", accessor: (c) => <span className="text-slate-300">{c.phone}</span> },
          {
            header: "DPDP Consent",
            accessor: (c) => (
              <Badge variant="success" size="sm">
                Verified Consent
              </Badge>
            ),
          },
          {
            header: "Status",
            accessor: (c) => (
              <Badge variant={c.status === "Active" ? "success" : "warning"} size="sm">
                {c.status}
              </Badge>
            ),
          },
          {
            header: "Action",
            accessor: (c) => (
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => addToast("WhatsApp Dispatched", `Automated hearing update sent via WhatsApp to ${c.name} (${c.phone}).`, "success")}
                  className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 text-[10px] font-bold flex items-center gap-1 transition-colors"
                  title="Send Automated Hearing Notice over WhatsApp"
                >
                  <span>WhatsApp Notice</span>
                </button>
                <button
                  onClick={() => setInspectClient(c)}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Inspect Profile"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <Link
                  href={`/workspace/clients/${c.id}`}
                  className="p-1 rounded text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-colors"
                  title="View Client Details"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ),
          },
        ]}
      />

      {/* Inspect Drawer */}
      {inspectClient && (
        <DetailDrawer
          isOpen={!!inspectClient}
          onClose={() => setInspectClient(null)}
          title={inspectClient.name}
          subtitle={`Company: ${inspectClient.companyName || "Individual"} · Email: ${inspectClient.email}`}
          badgeText={inspectClient.status}
          badgeVariant={inspectClient.status === "Active" ? "success" : "warning"}
          actionUrl={`/workspace/clients/${inspectClient.id}`}
          actionLabel="Open Client Record"
          data={{
            id: inspectClient.id,
            name: inspectClient.name,
            companyName: inspectClient.companyName || "Individual",
            email: inspectClient.email,
            phone: inspectClient.phone,
            status: inspectClient.status,
            dpdpConsentStatus: "Verified Data Fiduciary Consent (DPDP Act 2023)",
            bciRule36Channel: "Closed Network - Invited by Attorney",
          }}
        />
      )}

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400">Developer Guide</p>
                <h2 className="text-lg font-bold text-white">Client Management & Intakes — Developer Guide</h2>
              </div>
              <button
                onClick={() => setShowDeveloperGuide(false)}
                className="rounded-lg border border-slate-700 p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                aria-label="Close developer guide modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-6 p-6 text-sm text-slate-300">
              {/* Mandatory Section 1: What it is & Why it is needed */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  1. Core Purpose & Mandatory Overview
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-3">
                  <div>
                    <strong className="text-white text-sm block mb-1">What it is:</strong>
                    <p className="text-slate-300">
                      The Client Management page is the central roster where an Indian law firm manages its client database — including individual citizens, corporate companies, client portal invites, DPDP 2023 privacy consent, and automated WhatsApp communication settings.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed:</strong>
                    <p className="text-slate-400">
                      Law firms cannot manage clients like a standard e-commerce shop due to strict legal regulations in India. Advocates need a specialized tool that keeps client records confidential, collects mandatory digital privacy consent under the DPDP Act 2023, enforces closed-network invites under BCI Rule 36, and dispatches automated hearing notices via WhatsApp.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Indian Legal Concepts Explained for Software Developers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software engineer building this app without any legal background, here is everything you need to understand:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Who is an "Advocate"?</strong>
                      <p className="text-slate-400 text-[11px]">
                        In India, a lawyer licensed to practice in court is called an <em>Advocate</em>. They represent clients in District Courts, High Courts, and the Supreme Court.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. What is a "Law Firm Tenant"?</strong>
                      <p className="text-slate-400 text-[11px]">
                        This app is multi-tenant software. Each law firm (e.g. <em>Chandra & Partners Advocates</em>) gets an isolated workspace where partners, senior advocates, associates, and clerks collaborate.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. What is DPDP Act 2023?</strong>
                      <p className="text-slate-400 text-[11px]">
                        The <em>Digital Personal Data Protection Act, 2023</em> passed by Indian Parliament. Law firms act as "Data Fiduciaries" and must store timestamped consent from clients before saving phone numbers, Aadhaar, PAN, or sending court alerts.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. What is BCI Rule 36?</strong>
                      <p className="text-slate-400 text-[11px]">
                        <em>Bar Council of India Rule 36</em> strictly forbids lawyers from advertising online or listing clients publicly. The software operates as a <strong>closed-network portal</strong>: clients cannot self-register; they log in strictly via a direct private invite from their lawyer.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 col-span-1 md:col-span-2 space-y-1">
                      <strong className="text-white font-bold block">5. What is a "WhatsApp Hearing Notice"?</strong>
                      <p className="text-slate-400 text-[11px]">
                        In India, court schedules move fast and hearing dates can change unexpectedly. Advocates use automated WhatsApp notifications to alert clients (e.g., <em>"Your Anticipatory Bail hearing is scheduled for tomorrow at 10:30 AM in Delhi High Court Courtroom 24"</em>).
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Component Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Complete Component & Feature Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      1. Compliance Notice Banner
                    </p>
                    <p className="text-slate-400">High-visibility banner outlining DPDP Act 2023 data fiduciary rules and Bar Council of India (BCI Rule 36) closed-network client portal restrictions.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      2. Top Metric Cards (4 Cards)
                    </p>
                    <p className="text-slate-400">Displays counts for <strong className="text-slate-200">Total Clients</strong>, <strong className="text-slate-200">Active Engagements</strong> (DPDP Verified), <strong className="text-slate-200">Prospects</strong> (Intake Stage), and <strong className="text-slate-200">Corporate Entities</strong>.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      3. Command Bar Controls
                    </p>
                    <p className="text-slate-400">Real-time search input (filtering by name, company, email), <strong className="text-white">+ New Client Invite</strong> button (`/workspace/clients/new`), Export CSV, Density switcher (`Comfortable` / `Compact`), and batch Archive.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      4. Client Data Table
                    </p>
                    <p className="text-slate-400">Displays Client Name, Company Entity, Email, Phone Line, Verified DPDP Consent Badge, Status Badge (<span className="text-emerald-400 font-semibold">Active</span> vs <span className="text-amber-400 font-semibold">Prospect</span>), and Action Buttons.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      5. Automated WhatsApp Notice Button
                    </p>
                    <p className="text-slate-400">One-tap button to dispatch automated court hearing notices and case timeline updates directly to the client's phone via WhatsApp Business API.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      6. Inspect Profile Drawer (`DetailDrawer`)
                    </p>
                    <p className="text-slate-400">Slide-over drawer opening on row click to view client details, contact info, and DPDP consent verification logs without leaving the page.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Navigation Map */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Button Actions & Navigation Links
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                        <th className="pb-2">UI Action</th>
                        <th className="pb-2">Behavior</th>
                        <th className="pb-2">Target Route / API</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-2 font-semibold text-white">+ New Client Invite</td>
                        <td className="py-2">Opens client intake onboarding wizard</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/clients/new</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">WhatsApp Notice</td>
                        <td className="py-2">Triggers automated WhatsApp notification</td>
                        <td className="py-2 font-mono text-emerald-400">POST /api/notifications/whatsapp</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Eye Icon (Inspect)</td>
                        <td className="py-2">Opens slide-over detail drawer</td>
                        <td className="py-2 font-mono text-emerald-400">In-page drawer</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">External Link Icon</td>
                        <td className="py-2">Opens full client profile workspace</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/clients/[id]</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  5. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• <strong className="text-white">List Clients API:</strong> <code className="text-blue-400">GET /api/clients?search=&status=</code></li>
                    <li>• <strong className="text-white">Create Intake / Portal Invite API:</strong> <code className="text-blue-400">POST /api/clients/invite</code></li>
                    <li>• <strong className="text-white">WhatsApp Notification API:</strong> <code className="text-blue-400">POST /api/notifications/whatsapp</code></li>
                    <li>• <strong className="text-white">DPDP Consent Audit API:</strong> <code className="text-blue-400">GET /api/clients/dpdp-consent</code></li>
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


