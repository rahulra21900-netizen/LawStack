"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { MetricCard, Card } from "@/components/cards";
import { MOCK_CASES } from "@/mocks/cases";
import { DollarSign, Shield } from "lucide-react";

export default function ClientDashboardPage() {
  const clientCases = MOCK_CASES.slice(0, 2);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Portal", href: "/client/dashboard" }, { name: "Dashboard" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-400" />
          <span>Client Portal Dashboard</span>
        </h1>
        <p className="text-xs text-slate-400">Review your ongoing litigation matters, invoice totals, and briefs.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MetricCard title="Active litigation Matters" value={clientCases.length} info="Ongoing practice matters" />
        <MetricCard title="Outstanding Balance" value="$3,950.00" info="Unpaid invoices" trend="up" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card header={<div className="font-bold text-white text-xs">Active Litigations Summary</div>}>
          <div className="space-y-3 text-xs text-slate-350">
            {clientCases.map((c) => (
              <div key={c.id} className="p-2 bg-slate-950/30 rounded border border-slate-850">
                <p className="font-semibold text-white">{c.title}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Practice Area: {c.practiceArea} • Attorney: {c.leadCounsel}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
