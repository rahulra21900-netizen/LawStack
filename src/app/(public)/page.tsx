"use client";

import React from "react";
import Link from "next/link";
import { Shield, Sparkles, Building2, Terminal, ArrowRight, CheckCircle2, Users } from "lucide-react";

export default function PublicHomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-blue-900/10 via-transparent to-transparent pointer-events-none blur-3xl z-0" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 max-w-4xl mx-auto leading-tight">
          The Enterprise Operating System for Modern Legal Workspaces
        </h1>

        <p className="mt-6 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          LawStack is a secure, high-performance legal SaaS operating system designed for enterprise firm operations, billing compliance, and client collaboration.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/platform/login"
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 bg-blue-500 hover:bg-blue-400 px-6 py-3 rounded-lg shadow-xl shadow-blue-900/10 transition-all hover:-translate-y-0.5"
          >
            <span>Platform Login</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/platform/signup"
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5"
          >
            <span>Get Started</span>
          </Link>
        </div>
      </section>

      {/* Interface Modules Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-900 relative z-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500 text-center mb-10">
          Enterprise SaaS Workspace Experiences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Platform Administration */}
          <div className="bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 p-6 rounded-xl transition-all hover:bg-slate-900/60 group">
            <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Platform Control Plane</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              SaaS administration portal for provisioning legal tenants, auditing activity logs, and managing firm subscriptions.
            </p>
            <Link href="/platform/login" className="text-xs text-blue-400 font-bold inline-flex items-center gap-1 hover:underline">
              Platform Administration <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Card 2: Legal Workspace */}
          <div className="bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 p-6 rounded-xl transition-all hover:bg-slate-900/60 group">
            <div className="w-10 h-10 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Tenant Practice Room</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Isolated workspace environments where firm attorneys manage cases, draft documents, schedule hearings, and audit bills.
            </p>
            <Link href="/tenant/login" className="text-xs text-emerald-400 font-bold inline-flex items-center gap-1 hover:underline">
              Tenant Login Portal <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Card 3: Client Access */}
          <div className="bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 p-6 rounded-xl transition-all hover:bg-slate-900/60 group">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Client Portal Access</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Private secure portals for firm clients to view matter timelines, collaborate on shared pleadings, and clear outstanding retainers.
            </p>
            <span className="text-xs text-indigo-400 font-bold block">
              Invitation-Only Portal
            </span>
          </div>
        </div>
      </section>

      {/* Feature checklist */}
      <section className="bg-slate-900/20 border-t border-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-xl font-bold text-white">Production-Grade Capabilities</h2>
            <p className="text-xs text-slate-500 mt-2">Enterprise compliance dockets ready to accelerate your practice workflows.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Multi-Tenant Database Isolation",
              "SaaS Provisioning Workflows",
              "Security Audit Trial Logs",
              "Litigation Practice Dashboards",
              "Indian Bar Registry Validation",
              "Secure Client Invites",
              "AI Legal Copilot Actions",
              "SharePoint Document Management",
            ].map((f) => (
              <div key={f} className="flex items-center gap-3 p-3 bg-slate-900/30 border border-slate-900 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs text-slate-300 font-semibold">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
