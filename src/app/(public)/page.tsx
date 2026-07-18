"use client";

import React from "react";
import Link from "next/link";
import { Shield, Building2, Users, ArrowRight, CircleCheck as CheckCircle2, Sparkles, Briefcase, FileText, Scale, Bell, Lock, Database, Zap, Star, TrendingUp, Clock } from "lucide-react";

const stats = [
  { value: "2,400+", label: "Active matters managed" },
  { value: "180+", label: "Firm tenants onboarded" },
  { value: "99.98%", label: "Platform uptime SLA" },
  { value: "12.4M", label: "Billable hours tracked" },
];

const modules = [
  {
    icon: Shield,
    name: "Platform Control Plane",
    accent: "blue",
    description:
      "SaaS administration portal for provisioning legal tenants, auditing activity logs, and managing firm subscriptions.",
    href: "/platform/login",
    cta: "Platform Administration",
    points: ["Tenant provisioning wizard", "Global audit trail", "Subscription tiering"],
  },
  {
    icon: Building2,
    name: "Tenant Practice Room",
    accent: "emerald",
    description:
      "Isolated workspace environments where firm attorneys manage cases, draft documents, schedule hearings, and audit bills.",
    href: "/tenant/login",
    cta: "Tenant Login Portal",
    points: ["Case & matter dockets", "Hearings calendar", "Billing ledgers"],
  },
  {
    icon: Users,
    name: "Client Portal Access",
    accent: "indigo",
    description:
      "Private secure portals for firm clients to view matter timelines, collaborate on shared pleadings, and clear outstanding retainers.",
    href: "/client/dashboard",
    cta: "Invitation-Only Portal",
    points: ["Matter visibility", "Invoice clearance", "Counsel messaging"],
  },
];

const features = [
  {
    icon: Database,
    title: "Multi-Tenant Database Isolation",
    desc: "Row-level security and namespace isolation per firm tenant with strict data partitioning.",
  },
  {
    icon: Shield,
    title: "Security Audit Trail Logs",
    desc: "Immutable activity logs capturing every document access, edit, and permission elevation.",
  },
  {
    icon: Briefcase,
    title: "Litigation Practice Dashboards",
    desc: "Real-time matter workload, stage pipelines, and counsel capacity at a glance.",
  },
  {
    icon: Sparkles,
    title: "AI Legal Copilot Actions",
    desc: "Draft motions, extract clauses, and summarize briefs with context-aware AI pipelines.",
  },
  {
    icon: FileText,
    title: "Document Management",
    desc: "Versioned pleadings, contracts, and briefs with approval workflows and retention locks.",
  },
  {
    icon: Lock,
    title: "Secure Client Invites",
    desc: "Invitation-only client portals with scoped access to matters, invoices, and messages.",
  },
  {
    icon: Scale,
    title: "Hearings & Court Dockets",
    desc: "Schedule appearances, track judges, and link courtroom events to matters.",
  },
  {
    icon: TrendingUp,
    title: "Billing & Invoicing",
    desc: "Time entries, expenses, invoices, payments, and write-offs in one compliant ledger.",
  },
];

const steps = [
  {
    n: "01",
    title: "Provision a tenant",
    desc: "SaaS admins launch an isolated firm namespace with the provisioning wizard.",
    icon: Database,
  },
  {
    n: "02",
    title: "Onboard your firm",
    desc: "Tenant owners invite attorneys, assign roles, and configure practice modules.",
    icon: Users,
  },
  {
    n: "03",
    title: "Run your practice",
    desc: "Attorneys manage cases, documents, hearings, billing, and AI-assisted drafting.",
    icon: Briefcase,
  },
  {
    n: "04",
    title: "Collaborate with clients",
    desc: "Clients receive secure portal access to track matters and clear invoices.",
    icon: Bell,
  },
];

const testimonials = [
  {
    quote:
      "LawStack consolidated our case management, billing, and client portal into one secure workspace. Our attorneys finally have a single source of truth.",
    name: "Eleanor Vance",
    role: "Managing Partner, Oakwood LLP",
    initials: "EV",
  },
  {
    quote:
      "The tenant isolation model gave each of our practice groups a private workspace while keeping billing centralized. Onboarding took an afternoon.",
    name: "Louis Litt",
    role: "Tenant Owner, LexBridge Partners",
    initials: "LL",
  },
  {
    quote:
      "AI clause extraction and precedent search cut our brief drafting time in half. The audit trail keeps compliance happy.",
    name: "Harvey Specter",
    role: "Senior Partner, Oakwood LLP",
    initials: "HS",
  },
];

const accentMap: Record<string, { ring: string; text: string; bg: string; dot: string }> = {
  blue: {
    ring: "group-hover:border-blue-500/40",
    text: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    dot: "bg-blue-500",
  },
  emerald: {
    ring: "group-hover:border-emerald-500/40",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  indigo: {
    ring: "group-hover:border-indigo-500/40",
    text: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    dot: "bg-indigo-500",
  },
};

export default function PublicHomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[1200px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute right-0 top-[400px] h-[400px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute left-0 top-[700px] h-[400px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-[11px] font-semibold text-slate-300 backdrop-blur">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Enterprise multi-tenant legal SaaS
            <span className="text-slate-600">·</span>
            <span className="text-blue-400">Sprint 1 prototype</span>
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-white">
            The operating system for{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-emerald-300 bg-clip-text text-transparent">
              modern legal workspaces
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-400">
            LawStack V2 is a secure, high-performance legal SaaS platform built for enterprise firm operations,
            billing compliance, and client collaboration — with strict tenant isolation and an AI legal copilot.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/platform/login"
              className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Platform Login
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/tenant/login"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900"
            >
              Tenant Login
            </Link>
            <Link
              href="/dev"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              Explore the simulator
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> No credit card required
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Tenant-isolated by default
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> SOC 2-aligned controls
            </span>
          </div>
        </div>

        {/* Product mockup */}
        <div className="relative mt-16">
          <div className="absolute -inset-x-8 -top-8 bottom-0 rounded-3xl bg-gradient-to-b from-blue-500/10 to-transparent blur-2xl" />
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/70 p-2 shadow-2xl shadow-slate-950/50 backdrop-blur">
            {/* window chrome */}
            <div className="flex items-center gap-2 px-3 py-2">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-amber-500/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
              <div className="ml-3 hidden sm:flex h-6 flex-1 items-center rounded-md bg-slate-950/60 px-3 text-[10px] font-mono text-slate-500">
                oakwood.lawstack.com/workspace/dashboard
              </div>
            </div>

            {/* mock app body */}
            <div className="grid grid-cols-12 gap-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
              {/* sidebar */}
              <div className="col-span-3 hidden md:flex flex-col gap-1 border-r border-slate-800 bg-slate-900/60 p-3">
                <div className="mb-2 flex items-center gap-2 px-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <span className="text-[11px] font-bold tracking-wider text-white">LAWSTACK</span>
                </div>
                {[
                  { i: Briefcase, l: "Dashboard", active: true },
                  { i: Briefcase, l: "Cases" },
                  { i: Users, l: "Clients" },
                  { i: FileText, l: "Documents" },
                  { i: Scale, l: "Hearings" },
                  { i: Bell, l: "Billing" },
                  { i: Sparkles, l: "AI Workspace" },
                ].map((it, idx) => {
                  const Icon = it.i;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px] ${
                        it.active ? "bg-blue-600/20 text-blue-300" : "text-slate-400"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{it.l}</span>
                    </div>
                  );
                })}
              </div>

              {/* main */}
              <div className="col-span-12 md:col-span-9 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="h-3 w-40 rounded bg-slate-800" />
                    <div className="mt-2 h-2 w-24 rounded bg-slate-800/60" />
                  </div>
                  <div className="h-7 w-24 rounded-md bg-blue-600/80" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { l: "Active cases", v: "34", c: "text-blue-400" },
                    { l: "Clients", v: "18", c: "text-emerald-400" },
                    { l: "Documents", v: "156", c: "text-cyan-400" },
                    { l: "Hearings", v: "3", c: "text-amber-400" },
                  ].map((m) => (
                    <div key={m.l} className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                      <div className="text-[9px] uppercase tracking-wider text-slate-500">{m.l}</div>
                      <div className={`mt-1 text-xl font-bold ${m.c}`}>{m.v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-3">
                  <div className="lg:col-span-2 rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                    <div className="mb-3 h-2.5 w-32 rounded bg-slate-800" />
                    <div className="space-y-2">
                      {["C-206", "C-209", "C-212"].map((id) => (
                        <div key={id} className="flex items-center justify-between rounded-md bg-slate-950/50 px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono text-slate-400">{id}</span>
                            <div className="h-2 w-28 rounded bg-slate-800" />
                          </div>
                          <span className="rounded bg-blue-500/15 px-2 py-0.5 text-[8px] font-bold uppercase text-blue-300">Discovery</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                    <div className="mb-3 h-2.5 w-24 rounded bg-slate-800" />
                    <div className="space-y-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="rounded-md bg-slate-950/50 p-2">
                          <div className="h-2 w-24 rounded bg-slate-800" />
                          <div className="mt-1.5 h-1.5 w-16 rounded bg-slate-800/60" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 border-y border-slate-900 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-slate-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Three workspaces, one platform</span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Purpose-built experiences for every role
          </h2>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            LawStack separates the SaaS control plane, firm practice rooms, and client portals — each with its own
            scoped navigation, permissions, and data isolation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            const a = accentMap[m.accent];
            return (
              <div
                key={m.name}
                className={`group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-all hover:-translate-y-1 hover:bg-slate-900/70 ${a.ring}`}
              >
                <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${a.bg} ${a.text}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white">{m.name}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{m.description}</p>

                <ul className="mt-5 space-y-2">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className={`h-3.5 w-3.5 ${a.text}`} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={m.href}
                  className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${a.text} hover:gap-2.5 transition-all`}
                >
                  {m.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features grid */}
      <section className="relative z-10 border-y border-slate-900 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Production-grade capabilities</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Everything a modern practice needs
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Enterprise compliance dockets ready to accelerate your firm's workflows — from intake to invoice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group rounded-xl border border-slate-800 bg-slate-900/40 p-5 transition-all hover:border-slate-700 hover:bg-slate-900/70"
                >
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/60 text-slate-300 group-hover:text-white transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{f.title}</h3>
                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">How it works</span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            From signup to signed brief in four steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-slate-800">{s.n}</span>
                  <Icon className="h-5 w-5 text-slate-500" />
                </div>
                <h3 className="mt-4 text-sm font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 border-y border-slate-900 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Trusted by legal teams</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Built with practicing counsel
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
              >
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-slate-300 leading-relaxed">"{t.quote}"</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-800 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 text-xs font-bold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{t.name}</div>
                    <div className="text-[11px] text-slate-500">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl" />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/50 px-3 py-1 text-[11px] font-semibold text-slate-300">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                Ready when you are
              </div>
              <h2 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Provision your firm workspace today
              </h2>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Spin up an isolated tenant namespace, invite your attorneys, and start managing matters, documents,
                and billing in minutes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/platform/tenant-provisioning/new"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:-translate-y-0.5 hover:bg-blue-500"
              >
                <Shield className="h-4 w-4" />
                Launch provisioning wizard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950/40 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-slate-600"
              >
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final reassurance row */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Lock, title: "Tenant-isolated by default", desc: "Every firm gets a private, row-level-secured workspace." },
            { icon: Clock, title: "Live in an afternoon", desc: "Provisioning wizard gets your firm running fast." },
            { icon: Shield, title: "Audit-ready", desc: "Immutable logs for every action across the platform." },
          ].map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800/60 text-slate-300">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{r.title}</div>
                  <div className="mt-1 text-xs text-slate-400 leading-relaxed">{r.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
