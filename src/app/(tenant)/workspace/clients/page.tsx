"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { CommandBar } from "@/components/navigation/CommandBar";
import { DetailDrawer } from "@/components/dialogs/DetailDrawer";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_CLIENTS } from "@/mocks/clients";
import { Client } from "@/types";
import { Users, Eye, ExternalLink, ShieldCheck, UserCheck } from "lucide-react";
import Link from "next/link";

export default function ClientsListPage() {
  const { addToast } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [inspectClient, setInspectClient] = useState<Client | null>(null);

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
        <Badge label="BCI Rule 36 Compliant" variant="success" />
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
    </div>
  );
}
