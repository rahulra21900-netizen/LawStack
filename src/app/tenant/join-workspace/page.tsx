"use client";

import React from "react";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { Building2, ArrowRight, Search } from "lucide-react";

export default function JoinWorkspacePage() {
  return (
    <AuthShell
      badge="Find Your Firm"
      accent="emerald"
      title="Join your firm workspace"
      subtitle="Search for your firm's tenant namespace by name or URL to request access or sign in."
      footer={
        <Link href="/tenant/login" className="text-emerald-400 hover:underline font-semibold">
          Back to Login
        </Link>
      }
      sidePanel={{
        heading: "How joining works",
        points: [
          "Search for your firm by name or workspace URL",
          "If your firm is provisioned, sign in with your firm email",
          "If you don't have credentials, request an invitation from a partner",
          "Invitations are scoped to the firm's isolated tenant namespace",
        ],
      }}
    >
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search firms, e.g. Oakwood LLP or oakwood.lawstack.com"
            className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/50 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-slate-700 transition-all"
          />
        </div>

        <div className="space-y-2">
          {[
            { name: "Oakwood LLP", url: "oakwood.lawstack.com", tier: "Enterprise" },
            { name: "LexBridge Partners", url: "lexbridge.lawstack.com", tier: "Enterprise" },
            { name: "ABC Legal", url: "abc-legal.lawstack.com", tier: "Standard" },
          ].map((f) => (
            <Link
              key={f.url}
              href="/tenant/login"
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-3 hover:border-slate-700 hover:bg-slate-900/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-emerald-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{f.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{f.url}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-bold uppercase">{f.tier}</span>
                <ArrowRight className="w-4 h-4 text-slate-600" />
              </div>
            </Link>
          ))}
        </div>

        <p className="text-[10px] text-slate-500 text-center">
          Don't see your firm? Ask a partner to send you an invitation link.
        </p>
      </div>
    </AuthShell>
  );
}
