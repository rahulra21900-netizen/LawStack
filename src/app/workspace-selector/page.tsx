"use client";

import React from "react";
import Link from "next/link";
import { MOCK_TENANTS } from "@/mocks/tenants";
import { Shield, Building2, ArrowRight, ChevronRight, Globe, Server, Lock } from "lucide-react";

export default function WorkspaceSelectorPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        <div className="text-center mb-10">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/30 mb-4">
            <Shield className="w-5 h-5 text-blue-400" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Select a firm workspace</h1>
          <p className="mt-2 text-xs text-slate-400 max-w-md mx-auto">
            Choose a subscribed firm practice namespace to enter. Each workspace is fully isolated with row-level security.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MOCK_TENANTS.map((t) => (
            <Link
              key={t.id}
              href="/workspace/dashboard"
              className="group rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-blue-500/40 hover:bg-slate-900 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-white text-[11px] font-bold">
                    {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{t.subdomain}.lawstack.com</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
              </div>

              <div className="mt-4 flex items-center gap-2 text-[10px]">
                <span className={`px-1.5 py-0.5 rounded font-bold uppercase ${
                  t.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : t.status === "Suspended" ? "bg-red-500/10 text-red-400" : "bg-amber-500/10 text-amber-400"
                }`}>
                  {t.status}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-bold uppercase">{t.tier}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-500">Joined {new Date(t.joinedDate).getFullYear()}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { icon: Lock, label: "Row-level isolation" },
            { icon: Globe, label: "Custom workspace URL" },
            { icon: Server, label: "Dedicated namespace" },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.label} className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/40 p-3">
                <Icon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="text-[10px] text-slate-400 font-semibold">{f.label}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-[11px] text-slate-500 hover:text-white inline-flex items-center gap-1">
            <ArrowRight className="w-3 h-3 rotate-180" /> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
