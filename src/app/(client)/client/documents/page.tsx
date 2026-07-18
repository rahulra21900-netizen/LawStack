"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_DOCUMENTS } from "@/mocks/documents";
import { FileText, Download, Eye, Lock } from "lucide-react";

export default function ClientDocumentsPage() {
  const docs = MOCK_DOCUMENTS.slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Portal", href: "/client/dashboard" }, { name: "Documents" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 border border-indigo-500/30">
            <FileText className="w-4 h-4 text-indigo-400" />
          </span>
          <span>Shared Documents</span>
        </h1>
        <p className="text-xs text-slate-400">Access contract briefs, pleadings, and corporate filings shared by your legal team.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Shared Files" value={docs.length} info="Available to you" trend="neutral" />
        <MetricCard title="Pending Review" value="1" info="Awaiting sign" trend="up" />
        <MetricCard title="Recent Shares" value="2" info="Last 7 days" trend="up" />
        <MetricCard title="Locked" value="0" info="Retention hold" trend="neutral" />
      </div>

      {/* Document cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map((d) => (
          <Card key={d.id}>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-indigo-400">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white truncate">{d.title}</h3>
                  <Badge label={d.type} variant="info" />
                </div>
                <p className="mt-1 text-[10px] text-slate-500">
                  v{d.version} · {(d.fileSizeBytes / 1024).toFixed(1)} KB · Updated {new Date(d.updatedAt).toLocaleDateString()}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-[11px] font-bold text-white transition-colors">
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950/40 hover:bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-slate-300 transition-colors">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  <Badge label={d.status} variant={d.status === "Approved" ? "success" : "warning"} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Secure note */}
      <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 flex items-center gap-3">
        <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Documents shared through this portal are encrypted in transit and at rest. Access is scoped to your client account and logged for compliance.
        </p>
      </div>
    </div>
  );
}
