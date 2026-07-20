"use client";

import React from "react";
import Link from "next/link";
import { Shield, Building2, Users, ArrowRight, CheckCircle2, Sparkles, Scale, Lock, ShieldCheck, Cpu } from "lucide-react";

export default function PublicHomePage() {
  return (
    <div className="relative h-full w-full flex flex-col justify-between p-6 md:p-10 max-w-6xl mx-auto overflow-hidden">
      {/* Ambient Gradient Background Glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-600/15 to-emerald-500/5 blur-[120px]" />
        <div className="absolute right-0 top-1/4 h-[300px] w-[350px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      {/* Hero Content Section */}
      <div className="relative z-10 space-y-5 max-w-3xl pt-2">
        {/* Sleek Pill Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-500/30 bg-blue-950/40 px-4 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-md shadow-inner shadow-blue-500/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span className="tracking-wide">LawStack Enterprise · Built for Indian Advocates & Law Firms</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-white leading-tight">
          The Enterprise Operating System for{" "}
          <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
            Indian Legal Practice
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal">
          LawStack replaces paper diaries and fragmented sheets with an integrated, multi-tenant workspace for matter dockets, eCourts/NJDG status feeds, IPC→BNS criminal code concordance, BCI Rule 36 closed-network client access, and DPDP Act 2023 compliance.
        </p>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href="/platform/login"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-6 py-3 text-xs font-bold text-white shadow-xl shadow-blue-600/25 border border-blue-400/30 transition-all hover:-translate-y-0.5"
          >
            <span>Launch Platform Control Plane</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Microsoft SaaS 2-Card Launchpad Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
        <Link
          href="/platform/login"
          className="group rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900/90 shadow-2xl shadow-slate-950/40 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3.5 group-hover:bg-blue-600/25 transition-colors">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
              <span>Platform Control Plane</span>
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              9-step tenant provisioning wizard, bar credential checks, dual-approval emergency break-glass audit trail, and subscription tiers.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-2 text-[10px] font-mono text-slate-500">
            <Lock className="w-3 h-3 text-blue-400" />
            <span>Multi-Tenant Control Plane</span>
          </div>
        </Link>

        <Link
          href="/client/dashboard"
          className="group rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-slate-900/90 shadow-2xl shadow-slate-950/40 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3.5 group-hover:bg-emerald-600/25 transition-colors">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Closed-Network Client Portal</span>
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              BCI Rule 36 compliant private client space. No public directory or soliciting. Direct invitation access for case status and UPI billing.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-2 text-[10px] font-mono text-slate-500">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>BCI Rule 36 & DPDP Act 2023</span>
          </div>
        </Link>
      </div>

      {/* Bottom Compliance Status Bar */}
      <div className="relative z-10 rounded-xl border border-slate-800/80 bg-slate-950/90 p-3.5 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <span className="inline-flex items-center gap-1.5 text-slate-300 font-semibold">
            <Lock className="w-3.5 h-3.5 text-blue-400" /> Per-Firm Vault Encryption (No Standing Access)
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-300 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Mandatory TOTP MFA
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-300 font-semibold">
            <Scale className="w-3.5 h-3.5 text-amber-400" /> BCI Rule 36 & DPDP 2023 Compliant
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          Mumbai Region AWS/GCP Data Sovereignty
        </span>
      </div>
    </div>
  );
}
