"use client";

import React from "react";
import Link from "next/link";
import { Card, MetricCard } from "@/components/cards";
import { Badge, Avatar } from "@/components/ui";
import { MOCK_CLIENTS } from "@/mocks/clients";
import { MOCK_CASES } from "@/mocks/cases";
import {
  Building2,
  Mail,
  Phone,
  Briefcase,
  DollarSign,
  Shield,
  ChevronRight,
  TrendingUp,
  FileText,
} from "lucide-react";

export default function OverviewTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const clientData = MOCK_CLIENTS.find((c) => c.id === id);

  if (!clientData) return null;

  const clientMatters = MOCK_CASES.filter((c) => c.clientId === id);

  return (
    <div className="space-y-6">
      {/* Top metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Client Status" value={clientData.status} info="Directory state" trend={clientData.status === "Active" ? "up" : "neutral"} />
        <MetricCard title="Client Type" value={clientData.companyName ? "Corporate" : "Individual"} info="Classification" trend="neutral" />
        <MetricCard title="Open Matters" value={clientMatters.length} info="Active cases" trend="up" />
        <MetricCard title="Outstanding" value="$3,950" info="Receivables" trend="neutral" />
      </div>

      {/* Profile + Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          className="lg:col-span-2"
          header={
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-white text-xs">Client Profile</span>
            </div>
          }
        >
          <div className="flex items-start gap-4 mb-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 text-white text-base font-bold">
              {clientData.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-white">{clientData.name}</h3>
              <p className="text-xs text-slate-400">{clientData.companyName || "Private Individual"}</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge label={clientData.status} variant={clientData.status === "Active" ? "success" : "warning"} />
                <Badge label="KYC Verified" variant="info" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: Mail, label: "Email", value: clientData.email, mono: true },
              { icon: Phone, label: "Phone", value: clientData.phone },
              { icon: Building2, label: "Entity", value: clientData.companyName || "Individual" },
              { icon: FileText, label: "Onboarded", value: new Date(clientData.onboardingDate).toLocaleDateString() },
            ].map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.label} className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                    <Icon className="w-3 h-3" /> {r.label}
                  </div>
                  <div className={`mt-1 text-xs font-semibold text-white ${r.mono ? "font-mono" : ""}`}>{r.value}</div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card
          header={
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white text-xs">Risk & Compliance</span>
            </div>
          }
        >
          <div className="space-y-3">
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-md bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-300">L</span>
                <span className="text-xs font-bold text-white">Low Risk Account</span>
              </div>
              <p className="mt-2 text-[10px] text-slate-400 leading-relaxed">
                No outstanding dispute dockets or compliance reviews flagged. KYC cleared by underwriting.
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Retainer Balance</div>
              <div className="mt-1 text-lg font-bold text-emerald-400">$10,000.00</div>
              <div className="text-[10px] text-slate-500">Available for new matters</div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Total Billed (YTD)</span>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="mt-1 text-lg font-bold text-white">$48,200</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Matters list */}
      <Card
        header={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-white text-xs">Client Matters</span>
            </div>
            <Badge label={`${clientMatters.length} matters`} variant="info" />
          </div>
        }
      >
          {clientMatters.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">No matters linked to this client yet.</div>
          ) : (
            <div className="space-y-2">
              {clientMatters.map((m) => (
                <Link
                  key={m.id}
                  href={`/workspace/cases/${m.id}`}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-3 hover:border-slate-700 hover:bg-slate-900/60 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">{m.caseNumber}</span>
                        <span className="text-xs font-bold text-white truncate">{m.title}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{m.practiceArea} · Lead: {m.leadCounsel}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge label={m.stage} variant="info" />
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </div>
                </Link>
              ))}
            </div>
          )}
      </Card>
    </div>
  );
}
