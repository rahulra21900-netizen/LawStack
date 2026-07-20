"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { Card, MetricCard } from "@/components/cards";
import {
  ShieldAlert,
  Lock,
  KeyRound,
  UserCheck,
  Clock3,
  FileWarning,
  CheckCircle2,
  XCircle,
  Timer,
  ScrollText,
  AlertTriangle,
  Search,
  BookOpen,
  X,
} from "lucide-react";

import { MOCK_TENANTS } from "@/mocks/tenants";

interface BreakGlassRequest {
  id: string;
  tenantId: string;
  tenantName: string;
  requestedBy: string;
  requestedByRole: string;
  requestedAt: string;
  reason: string;
  scope: "Read-only" | "Read + Write" | "Full Admin";
  ttlHours: number;
  status: "Pending" | "Approved" | "Denied" | "Revoked" | "Expired";
  approvals: { name: string; role: string; at?: string; decision?: "approve" | "deny" }[];
  requiredApprovers: number;
  ticket: string;
}

const seedRequests: BreakGlassRequest[] = [
  {
    id: "bg-2026-041",
    tenantId: "chandra-associates",
    tenantName: "Chandra & Associates",
    requestedBy: "Aditya Menon",
    requestedByRole: "Platform Owner",
    requestedAt: "2026-01-20T09:12:00Z",
    reason:
      "Firm-locked owner MFA — Meera Verma is hospitalised. Firm has raised written incident #FRM-2026-889 requesting Platform Support to seed a temporary owner override for 24 hours to sign a NCLT vakalatnama filing deadline.",
    scope: "Read + Write",
    ttlHours: 24,
    status: "Pending",
    requiredApprovers: 2,
    approvals: [
      { name: "Aditya Menon", role: "Platform Owner", at: "2026-01-20T09:12:00Z", decision: "approve" },
    ],
    ticket: "FRM-2026-889",
  },
  {
    id: "bg-2026-039",
    tenantId: "verma-partners",
    tenantName: "Verma & Partners LLP",
    requestedBy: "Shruti Kapoor",
    requestedByRole: "Platform Admin",
    requestedAt: "2026-01-19T14:03:00Z",
    reason:
      "DPDP Act complaint received. Read-only forensic access requested to satisfy compliance officer's request within 72 hours.",
    scope: "Read-only",
    ttlHours: 12,
    status: "Approved",
    requiredApprovers: 2,
    approvals: [
      { name: "Shruti Kapoor", role: "Platform Admin", at: "2026-01-19T14:03:00Z", decision: "approve" },
      { name: "Aditya Menon", role: "Platform Owner", at: "2026-01-19T14:18:00Z", decision: "approve" },
    ],
    ticket: "DPDP-INQ-2026-14",
  },
  {
    id: "bg-2026-036",
    tenantId: "iyer-legal",
    tenantName: "Iyer Legal Chambers",
    requestedBy: "Shruti Kapoor",
    requestedByRole: "Platform Admin",
    requestedAt: "2026-01-18T11:44:00Z",
    reason: "Data restore request after tenant-side accidental case archive.",
    scope: "Read + Write",
    ttlHours: 4,
    status: "Denied",
    requiredApprovers: 2,
    approvals: [
      { name: "Shruti Kapoor", role: "Platform Admin", at: "2026-01-18T11:44:00Z", decision: "approve" },
      { name: "Aditya Menon", role: "Platform Owner", at: "2026-01-18T12:02:00Z", decision: "deny" },
    ],
    ticket: "SUP-2026-2211",
  },
  {
    id: "bg-2026-032",
    tenantId: "chandra-associates",
    tenantName: "Chandra & Associates",
    requestedBy: "Aditya Menon",
    requestedByRole: "Platform Owner",
    requestedAt: "2026-01-15T08:20:00Z",
    reason: "Bar Council inspection notice — release audit trail for 3 named matters.",
    scope: "Read-only",
    ttlHours: 6,
    status: "Expired",
    requiredApprovers: 2,
    approvals: [
      { name: "Aditya Menon", role: "Platform Owner", at: "2026-01-15T08:20:00Z", decision: "approve" },
      { name: "Shruti Kapoor", role: "Platform Admin", at: "2026-01-15T08:35:00Z", decision: "approve" },
    ],
    ticket: "BCI-INSP-2026-77",
  },
];

const scopeColor: Record<string, "success" | "warning" | "error" | "info" | "neutral"> = {
  "Read-only": "info",
  "Read + Write": "warning",
  "Full Admin": "error",
};

const statusColor: Record<string, "success" | "warning" | "error" | "info" | "neutral"> = {
  Pending: "warning",
  Approved: "success",
  Denied: "error",
  Revoked: "neutral",
  Expired: "neutral",
};

export default function BreakGlassPage() {
  const { addToast } = useNotifications();
  const [requests, setRequests] = useState<BreakGlassRequest[]>(seedRequests);
  const [selectedId, setSelectedId] = useState<string>(seedRequests[0].id);
  const [showNewSheet, setShowNewSheet] = useState(false);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "denied">("all");
  const [query, setQuery] = useState("");

  // New Request Form State
  const [newTenantId, setNewTenantId] = useState("chandra-associates");
  const [newScope, setNewScope] = useState<"Read-only" | "Read + Write" | "Full Admin">("Read-only");
  const [newTtlHours, setNewTtlHours] = useState(6);
  const [newJustification, setNewJustification] = useState("Emergency override requested for compliance review.");

  const selected = requests.find((r) => r.id === selectedId) || requests[0];

  const filtered = requests
    .filter((r) => {
      if (filter === "pending") return r.status === "Pending";
      if (filter === "approved") return r.status === "Approved";
      if (filter === "denied") return r.status === "Denied" || r.status === "Expired" || r.status === "Revoked";
      return true;
    })
    .filter(
      (r) =>
        r.tenantName.toLowerCase().includes(query.toLowerCase()) ||
        r.id.toLowerCase().includes(query.toLowerCase()) ||
        r.ticket.toLowerCase().includes(query.toLowerCase())
    );

  const canApproveThis = selected.status === "Pending" && selected.approvals.length < selected.requiredApprovers;
  const pendingApprover = selected.approvals[0]?.name === "Aditya Menon" ? "Shruti Kapoor" : "Aditya Menon";

  const handleDecision = (decision: "approve" | "deny") => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== selected.id) return r;
        const newApprovals = [
          ...r.approvals,
          { name: pendingApprover, role: "Platform Admin", at: new Date().toISOString(), decision },
        ];
        const approvals = newApprovals.filter((a) => a.decision === "approve").length;
        let status: BreakGlassRequest["status"] = "Pending";
        if (decision === "deny") status = "Denied";
        else if (approvals >= r.requiredApprovers) status = "Approved";
        return { ...r, approvals: newApprovals, status };
      })
    );
    addToast(
      decision === "approve" ? "Break-glass approved" : "Break-glass denied",
      `${pendingApprover} recorded a ${decision} on ${selected.id}. Immutable audit line appended.`,
      decision === "approve" ? "success" : "warning"
    );
  };

  const handleRevoke = () => {
    setRequests((prev) => prev.map((r) => (r.id === selected.id ? { ...r, status: "Revoked" } : r)));
    addToast("Access revoked", `${selected.id} session terminated. Tenant vault re-sealed.`, "warning");
  };

  const submitNew = () => {
    const selectedTenant = MOCK_TENANTS.find((t) => t.id === newTenantId);
    const tenantName = selectedTenant ? selectedTenant.name : "Chandra & Associates";

    const newReq: BreakGlassRequest = {
      id: `bg-2026-${String(Math.floor(Math.random() * 900) + 100)}`,
      tenantId: newTenantId,
      tenantName,
      requestedBy: "Aditya Menon",
      requestedByRole: "Platform Owner",
      requestedAt: new Date().toISOString(),
      reason: newJustification || "Emergency override requested.",
      scope: newScope,
      ttlHours: newTtlHours,
      status: "Pending",
      requiredApprovers: 2,
      approvals: [{ name: "Aditya Menon", role: "Platform Owner", at: new Date().toISOString(), decision: "approve" }],
      ticket: `SUP-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    };
    setRequests((prev) => [newReq, ...prev]);
    setSelectedId(newReq.id);
    setShowNewSheet(false);
    addToast("Break-glass request filed", `Awaiting co-approval from ${pendingApprover}. Timer started.`, "info");
  };

  const pending = requests.filter((r) => r.status === "Pending").length;
  const active = requests.filter((r) => r.status === "Approved").length;

  return (
    <div className="space-y-6" data-testid="break-glass-page">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
        <div>
          <Breadcrumb items={[{ name: "Platform", href: "/platform/dashboard" }, { name: "Break-Glass Access" }]} />
          <h1 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-600/15 border border-red-500/30">
              <ShieldAlert className="w-4 h-4 text-red-400" />
            </span>
            <span>Break-Glass Emergency Access</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Dual-approval, time-bound override into tenant vaults. Every request requires two named Platform officers,
            leaves an immutable audit line, and auto-expires at the TTL boundary. Platform staff never gain standing access.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="Dual-approval enforced" variant="success" />
          <Button
            variant="outline"
            leftIcon={<BookOpen className="w-4 h-4" />}
            onClick={() => setShowDeveloperGuide(true)}
            data-testid="bg-dev-guide-btn"
          >
            Developer Guide
          </Button>
          <Button
            variant="destructive"
            leftIcon={<KeyRound className="w-4 h-4" />}
            onClick={() => setShowNewSheet(true)}
            data-testid="bg-new-request-btn"
          >
            New emergency request
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Pending approval" value={pending} info="Awaiting 2nd approver" trend={pending > 0 ? "down" : "neutral"} change={pending > 0 ? "Action needed" : "Clear"} />
        <MetricCard title="Active sessions" value={active} info="Under TTL" trend="up" />
        <MetricCard title="Denied (30d)" value="4" info="Governance" trend="up" change="+1 WoW" />
        <MetricCard title="Median TTL" value="6h" info="Approved requests" trend="neutral" />
      </div>

      {/* Main split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* List column */}
        <Card
          className="xl:col-span-1"
          header={
            <div className="flex items-center justify-between w-full gap-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ScrollText className="w-4 h-4 text-red-400" /> Request Queue
              </span>
              <span className="text-[10px] font-mono text-slate-500">{filtered.length} shown</span>
            </div>
          }
        >
          <div className="space-y-3">
            {/* Filter tabs */}
            <div className="flex gap-1 border border-slate-800 rounded-lg p-0.5 bg-slate-950/60">
              {(["all", "pending", "approved", "denied"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 text-[10px] px-2 py-1.5 rounded font-bold uppercase tracking-wider transition-colors ${
                    filter === f ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"
                  }`}
                  data-testid={`bg-filter-${f}`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tenant, request ID, or ticket…"
                className="w-full rounded-lg border border-slate-800 bg-slate-950/60 py-2 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-red-500/40"
                data-testid="bg-search"
              />
            </div>

            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {filtered.map((r) => {
                const active = r.id === selected.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedId(r.id)}
                    className={`w-full text-left rounded-xl border px-3 py-3 transition-colors ${
                      active
                        ? "border-red-500/40 bg-red-500/5"
                        : "border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/60"
                    }`}
                    data-testid={`bg-request-${r.id}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white truncate">{r.tenantName}</span>
                      <Badge label={r.status} variant={statusColor[r.status]} size="sm" />
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                      <span>{r.id}</span>
                      <span>·</span>
                      <span>{r.ticket}</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2 text-[10px]">
                      <Badge label={r.scope} variant={scopeColor[r.scope]} size="sm" />
                      <span className="text-slate-500 inline-flex items-center gap-1">
                        <Timer className="w-3 h-3" /> {r.ttlHours}h TTL
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1 text-[10px] text-slate-400">
                      <UserCheck className="w-3 h-3" />
                      <span>
                        {r.approvals.filter((a) => a.decision === "approve").length}/{r.requiredApprovers} approvers
                      </span>
                    </div>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <div className="text-center py-8 text-[11px] text-slate-500 italic">
                  No requests matched your filters.
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Detail column */}
        <Card
          className="xl:col-span-2"
          header={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-red-400" />
                <span className="text-xs font-bold text-white">{selected.id}</span>
                <Badge label={selected.status} variant={statusColor[selected.status]} size="sm" />
              </div>
              <span className="text-[10px] font-mono text-slate-500">Ticket {selected.ticket}</span>
            </div>
          }
        >
          <div className="space-y-4">
            {/* Meta grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Tenant</div>
                <div className="mt-1 text-white font-semibold truncate">{selected.tenantName}</div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Requested By</div>
                <div className="mt-1 text-white font-semibold truncate">{selected.requestedBy}</div>
                <div className="text-[10px] text-slate-500">{selected.requestedByRole}</div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Scope</div>
                <div className="mt-1"><Badge label={selected.scope} variant={scopeColor[selected.scope]} size="sm" /></div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">TTL</div>
                <div className="mt-1 text-white font-semibold flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5 text-amber-400" /> {selected.ttlHours} hours
                </div>
              </div>
            </div>

            {/* Reason */}
            <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                <FileWarning className="w-3.5 h-3.5" /> Justification (immutable)
              </div>
              <p className="text-[12px] text-slate-200 leading-relaxed">{selected.reason}</p>
            </div>

            {/* Approval trail */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Approval trail</span>
                <span className="text-[10px] text-slate-500">
                  {selected.approvals.filter((a) => a.decision === "approve").length}/{selected.requiredApprovers} required
                </span>
              </div>

              <ol className="space-y-3">
                {selected.approvals.map((a, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                        a.decision === "approve"
                          ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                          : "bg-red-500/15 border-red-500/40 text-red-300"
                      }`}
                    >
                      {a.decision === "approve" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    </span>
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">{a.name}</span>
                        <span className="text-[10px] font-mono text-slate-500">{a.at ? new Date(a.at).toUTCString().slice(5, 22) : "—"}</span>
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {a.role} · {a.decision === "approve" ? "Approved" : "Denied"} the request
                      </div>
                    </div>
                  </li>
                ))}

                {selected.status === "Pending" && (
                  <li className="flex items-start gap-3 opacity-60">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-dashed border-slate-700 text-slate-500">
                      <Clock3 className="w-3.5 h-3.5" />
                    </span>
                    <div className="flex-1 text-xs">
                      <div className="text-slate-300 font-semibold">Awaiting {pendingApprover}</div>
                      <div className="text-[10px] text-slate-500">Second approver required to grant access</div>
                    </div>
                  </li>
                )}
              </ol>
            </div>

            {/* Decision area */}
            {canApproveThis && (
              <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 space-y-3" data-testid="bg-decision-panel">
                <div className="flex items-center gap-2 text-red-300 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  You are recorded as {pendingApprover}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Approving grants a <strong>{selected.scope}</strong> session into <strong>{selected.tenantName}</strong>&apos;s vault for {selected.ttlHours} hours.
                  A tamper-evident audit line will be written and the tenant owner will be notified within 60 seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="destructive"
                    leftIcon={<XCircle className="w-4 h-4" />}
                    onClick={() => handleDecision("deny")}
                    data-testid="bg-deny-btn"
                    className="flex-1"
                  >
                    Deny request
                  </Button>
                  <Button
                    variant="primary"
                    leftIcon={<CheckCircle2 className="w-4 h-4" />}
                    onClick={() => handleDecision("approve")}
                    data-testid="bg-approve-btn"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500"
                  >
                    Approve &amp; open TTL session
                  </Button>
                </div>
              </div>
            )}

            {selected.status === "Approved" && (
              <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4 flex items-center justify-between gap-3" data-testid="bg-active-session">
                <div>
                  <div className="text-emerald-300 font-bold text-sm">Session active</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Auto-expires at TTL boundary. You may revoke immediately below.
                  </p>
                </div>
                <Button variant="outline" onClick={handleRevoke} data-testid="bg-revoke-btn">
                  Revoke now
                </Button>
              </div>
            )}

            {/* Footer meta */}
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Requested {new Date(selected.requestedAt).toUTCString()}. This transcript is written to the immutable
              <Link href="/platform/audit" className="text-blue-400 hover:underline mx-1">Audit Center</Link>
              under key <span className="font-mono">audit://break-glass/{selected.id}</span>.
            </p>
          </div>
        </Card>
      </div>

      {/* New request bottom sheet */}
      {showNewSheet && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm px-4"
          onClick={() => setShowNewSheet(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            data-testid="bg-new-sheet"
          >
            <div className="flex items-center gap-2 text-red-300 mb-3">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">New Break-Glass Request</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Filing this creates a queued request. It is not active until the second Platform officer co-approves.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                  Tenant
                </label>
                <select
                  value={newTenantId}
                  onChange={(e) => setNewTenantId(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-white focus:ring-2 focus:ring-red-500/40 outline-none"
                  data-testid="bg-new-tenant-select"
                >
                  {MOCK_TENANTS.map((t) => (
                    <option key={t.id} value={t.id} className="bg-slate-950 text-white">
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                    Scope
                  </label>
                  <select
                    value={newScope}
                    onChange={(e) => setNewScope(e.target.value as "Read-only" | "Read + Write" | "Full Admin")}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-white focus:ring-2 focus:ring-red-500/40 outline-none"
                    data-testid="bg-new-scope-select"
                  >
                    <option value="Read-only" className="bg-slate-950 text-white">Read-only</option>
                    <option value="Read + Write" className="bg-slate-950 text-white">Read + Write</option>
                    <option value="Full Admin" className="bg-slate-950 text-white">Full Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                    TTL Duration
                  </label>
                  <select
                    value={newTtlHours}
                    onChange={(e) => setNewTtlHours(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-white focus:ring-2 focus:ring-red-500/40 outline-none"
                    data-testid="bg-new-ttl-select"
                  >
                    <option value={2} className="bg-slate-950 text-white">2 hours</option>
                    <option value={6} className="bg-slate-950 text-white">6 hours</option>
                    <option value={12} className="bg-slate-950 text-white">12 hours</option>
                    <option value={24} className="bg-slate-950 text-white">24 hours</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                  Justification / Incident Ticket
                </label>
                <textarea
                  rows={4}
                  value={newJustification}
                  onChange={(e) => setNewJustification(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/80 p-3 text-slate-200 focus:ring-2 focus:ring-red-500/40 outline-none"
                  placeholder="Describe the incident, ticket ID, and why standing access is insufficient…"
                  data-testid="bg-new-justification"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setShowNewSheet(false)}>Cancel</Button>
              <Button variant="destructive" onClick={submitNew} data-testid="bg-new-submit">
                File for co-approval
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Developer Implementation Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div
            className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl"
            data-testid="bg-dev-guide-modal"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-6 py-4 backdrop-blur-md">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-red-400">Developer Handoff Guide</p>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-red-400" />
                  Break-Glass Emergency Access Architecture &amp; Implementation Specs
                </h2>
              </div>
              <button
                onClick={() => setShowDeveloperGuide(false)}
                className="rounded-lg border border-slate-800 p-2 text-slate-400 transition-colors hover:bg-slate-900 hover:text-white"
                aria-label="Close developer guide"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-6 p-6 text-xs text-slate-300">
              {/* Section 1: Overview */}
              <section>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" /> 1. Core Security Architecture (Zero Standing Privileges)
                </h3>
                <p className="leading-relaxed text-slate-400">
                  Break-Glass emergency access implements a <strong className="text-white">Zero Standing Privilege (ZSP)</strong> model for SaaS platform operators.
                  Platform support staff and platform owners carry <em>no standing administrative read or write permissions</em> into isolated tenant databases or document vaults.
                  When an emergency occurs (e.g. firm owner MFA lockout, Bar Council compliance inspection, or DPDP regulatory audit), access can only be granted via a dual-sign-off time-bound workflow.
                </p>
              </section>

              {/* Section 2: Data Model Schema */}
              <section>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <ScrollText className="w-3.5 h-3.5" /> 2. Data Model Schema (`BreakGlassRequest`)
                </h3>
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 font-mono text-[11px] leading-relaxed text-slate-300 space-y-1">
                  <div><span className="text-purple-400">interface</span> <span className="text-yellow-300">BreakGlassRequest</span> &#123;</div>
                  <div className="pl-4"><span className="text-blue-300">id</span>: <span className="text-emerald-300">string</span>; <span className="text-slate-500">// e.g. "bg-2026-041"</span></div>
                  <div className="pl-4"><span className="text-blue-300">tenantId</span>: <span className="text-emerald-300">string</span>; <span className="text-slate-500">// Target tenant namespace</span></div>
                  <div className="pl-4"><span className="text-blue-300">tenantName</span>: <span className="text-emerald-300">string</span>;</div>
                  <div className="pl-4"><span className="text-blue-300">requestedBy</span>: <span className="text-emerald-300">string</span>; <span className="text-slate-500">// Initiator Platform Officer</span></div>
                  <div className="pl-4"><span className="text-blue-300">requestedByRole</span>: <span className="text-emerald-300">string</span>; <span className="text-slate-500">// "Platform Owner" | "Platform Admin"</span></div>
                  <div className="pl-4"><span className="text-blue-300">requestedAt</span>: <span className="text-emerald-300">string</span>; <span className="text-slate-500">// ISO 8601 UTC timestamp</span></div>
                  <div className="pl-4"><span className="text-blue-300">reason</span>: <span className="text-emerald-300">string</span>; <span className="text-slate-500">// Mandatory legal justification</span></div>
                  <div className="pl-4"><span className="text-blue-300">scope</span>: <span className="text-emerald-300">&quot;Read-only&quot; | &quot;Read + Write&quot; | &quot;Full Admin&quot;</span>;</div>
                  <div className="pl-4"><span className="text-blue-300">ttlHours</span>: <span className="text-emerald-300">number</span>; <span className="text-slate-500">// 2, 4, 6, 12, or 24 hours</span></div>
                  <div className="pl-4"><span className="text-blue-300">status</span>: <span className="text-emerald-300">&quot;Pending&quot; | &quot;Approved&quot; | &quot;Denied&quot; | &quot;Revoked&quot; | &quot;Expired&quot;</span>;</div>
                  <div className="pl-4"><span className="text-blue-300">approvals</span>: &#123; <span className="text-blue-300">name</span>: <span className="text-emerald-300">string</span>; <span className="text-blue-300">role</span>: <span className="text-emerald-300">string</span>; <span className="text-blue-300">at</span>?: <span className="text-emerald-300">string</span>; <span className="text-blue-300">decision</span>?: <span className="text-emerald-300">&quot;approve&quot; | &quot;deny&quot;</span> &#125;[];</div>
                  <div className="pl-4"><span className="text-blue-300">requiredApprovers</span>: <span className="text-emerald-300">number</span>; <span className="text-slate-500">// Enforced strictly at 2</span></div>
                  <div className="pl-4"><span className="text-blue-300">ticket</span>: <span className="text-emerald-300">string</span>; <span className="text-slate-500">// Linked support / incident ticket</span></div>
                  <div>&#125;</div>
                </div>
              </section>

              {/* Section 3: Execution Workflow & State Machine */}
              <section>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <Clock3 className="w-3.5 h-3.5" /> 3. State Machine &amp; Dual-Approval Workflow
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
                    <p className="font-semibold text-white mb-1">Step 1: Request filing (`Pending` state)</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Officer 1 files request with tenant ID, scope, TTL, and ticket justification.
                      System records approval 1/2 from Officer 1 automatically and sets status to <span className="text-amber-400 font-semibold">Pending</span>.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
                    <p className="font-semibold text-white mb-1">Step 2: Dual sign-off (`Approved` state)</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Officer 2 (must be distinct named Platform Officer) reviews narrative.
                      If Officer 2 clicks <span className="text-emerald-400 font-semibold">Approve</span>, status updates to <span className="text-emerald-400 font-semibold">Approved</span>, TTL countdown starts, and vault KMS grants un-seal.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
                    <p className="font-semibold text-white mb-1">Step 3: Rejection (`Denied` state)</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      If Officer 2 rejects the request, status immediately transitions to <span className="text-red-400 font-semibold">Denied</span>.
                      No encryption keys are unsealed, and denial is logged permanently in the Audit Center.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
                    <p className="font-semibold text-white mb-1">Step 4: Expiry &amp; Revocation (`Expired` / `Revoked` state)</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Session auto-expires at `requestedAt + ttlHours` boundary.
                      Clicking <span className="text-slate-300 font-semibold">Revoke now</span> instantly invalidates JWT session token and re-seals vault keys.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4: Legal & Regulatory Compliance */}
              <section>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <FileWarning className="w-3.5 h-3.5" /> 4. Regulatory &amp; Statutory Compliance Rules
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <div>
                      <strong className="text-white">DPDP Act 2023 (Digital Personal Data Protection):</strong>
                      <span className="text-slate-400 font-normal ml-1">
                        Mandatory compliance audit requests require forensic Read-only scope limited to 12 hours. Tenant Data Fiduciary receives automated notification within 60 seconds.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <div>
                      <strong className="text-white">Bar Council of India &amp; NCLT Deadlines:</strong>
                      <span className="text-slate-400 font-normal ml-1">
                        In cases of sole advocate hospitalization or firm owner MFA lockout, Read + Write scope allows emergency vakalatnama filing submission with mandatory incident ticket reference.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <div>
                      <strong className="text-white">Section 3.4 Data Isolation Policy:</strong>
                      <span className="text-slate-400 font-normal ml-1">
                        Tenant KMS data keys are wrapped with envelope encryption. Break-glass grants temporary AWS KMS / GCP KMS decryption permissions scoped strictly to the approved TTL session token.
                      </span>
                    </div>
                  </li>
                </ul>
              </section>

              {/* Section 5: API Endpoint Contracts */}
              <section>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" /> 5. Backend API Endpoints &amp; Integration Handlers
                </h3>
                <div className="space-y-2">
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 font-mono text-[11px]">
                    <span className="text-emerald-400 font-bold">POST</span> <span className="text-white">/api/v1/platform/break-glass/request</span>
                    <p className="text-[10px] text-slate-500 font-sans mt-0.5">Payload: &#123; tenantId, scope, ttlHours, reason, ticket &#125; — Initiates request &amp; records 1st approval.</p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 font-mono text-[11px]">
                    <span className="text-blue-400 font-bold">POST</span> <span className="text-white">/api/v1/platform/break-glass/:id/decision</span>
                    <p className="text-[10px] text-slate-500 font-sans mt-0.5">Payload: &#123; decision: &quot;approve&quot; | &quot;deny&quot; &#125; — Records 2nd approval, issues short-lived JWT, writes audit log.</p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 font-mono text-[11px]">
                    <span className="text-red-400 font-bold">POST</span> <span className="text-white">/api/v1/platform/break-glass/:id/revoke</span>
                    <p className="text-[10px] text-slate-500 font-sans mt-0.5">Payload: &#123;&#125; — Immediate kill switch terminating active break-glass session token.</p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 font-mono text-[11px]">
                    <span className="text-purple-400 font-bold">GET</span> <span className="text-white">/api/v1/platform/break-glass/audit-stream</span>
                    <p className="text-[10px] text-slate-500 font-sans mt-0.5">Returns immutable audit stream connected directly to <Link href="/platform/audit" className="text-blue-400 underline">Audit Center</Link>.</p>
                  </div>
                </div>
              </section>

              {/* Section 6: Testing & Test IDs */}
              <section>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" /> 6. QA Automation &amp; Test Identifiers
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 font-mono text-[10px]">
                  <div className="rounded bg-slate-900 border border-slate-800 p-2 text-slate-300">`bg-dev-guide-btn`</div>
                  <div className="rounded bg-slate-900 border border-slate-800 p-2 text-slate-300">`bg-dev-guide-modal`</div>
                  <div className="rounded bg-slate-900 border border-slate-800 p-2 text-slate-300">`bg-new-request-btn`</div>
                  <div className="rounded bg-slate-900 border border-slate-800 p-2 text-slate-300">`bg-approve-btn`</div>
                  <div className="rounded bg-slate-900 border border-slate-800 p-2 text-slate-300">`bg-deny-btn`</div>
                  <div className="rounded bg-slate-900 border border-slate-800 p-2 text-slate-300">`bg-revoke-btn`</div>
                </div>
              </section>
            </div>

            <div className="sticky bottom-0 border-t border-slate-800 bg-slate-950/90 px-6 py-3 backdrop-blur-md flex justify-end">
              <Button variant="secondary" onClick={() => setShowDeveloperGuide(false)}>
                Close Handoff Guide
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
