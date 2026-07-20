"use client";

import React from "react";
import Link from "next/link";
import { Shield, Building2, Users, ArrowRight, CircleCheck as CheckCircle2, Sparkles } from "lucide-react";

const quickAccess = [
  {
    title: "Platform Control Plane",
    description: "Provision tenants, manage settings, and monitor audit activity from one secure control plane.",
    href: "/platform/login",
    icon: Shield,
    accent: "from-blue-500 to-cyan-500",
  },
  {
    title: "Closed-Network Client Portal",
    description: "Provide clients with secure, invitation-only access to matters, invoices, and progress updates.",
    href: "/client/dashboard",
    icon: Users,
    accent: "from-indigo-500 to-violet-500",
  },
];

export default function PublicHomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[1200px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute right-0 top-[320px] h-[400px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <section className="relative z-10 mx-auto flex max-w-6xl flex-col px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-[11px] font-semibold text-slate-300 backdrop-blur">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Enterprise legal SaaS platform
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            The modern operating system for
            <span className="mt-2 block bg-gradient-to-r from-blue-400 via-blue-300 to-emerald-300 bg-clip-text text-transparent">
              legal firms and their clients
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            LawStack brings platform administration, firm workflows, and client collaboration into one secure, multi-tenant experience.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/platform/login"
              className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Platform Login
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Secure by default
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Multi-tenant ready
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Built for legal operations
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {quickAccess.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900/70"
              >
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition-all group-hover:gap-2.5">
                  Open access
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
