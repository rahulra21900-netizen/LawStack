"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { Card } from "@/components/cards";
import { Accordion } from "@/components/ui";
import { Circle as HelpCircle, BookOpen, Keyboard, LifeBuoy, Mail, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HelpCenterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Help Center" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 border border-indigo-500/30">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
          </span>
          <span>Help & Documentation</span>
        </h1>
        <p className="text-xs text-slate-400">Search FAQs, view keyboard shortcuts, and review documentation updates.</p>
      </div>

      {/* Quick tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: BookOpen, label: "Documentation", desc: "Guides & tutorials", color: "text-blue-400" },
          { icon: Keyboard, label: "Shortcuts", desc: "Keyboard reference", color: "text-emerald-400" },
          { icon: LifeBuoy, label: "Support", desc: "Contact the team", color: "text-amber-400" },
          { icon: Sparkles, label: "AI Copilot", desc: "Legal assistant help", color: "text-cyan-400" },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <div key={t.label} className="group flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/40 p-4 hover:border-slate-700 hover:bg-slate-900/60 transition-all cursor-pointer">
              <Icon className={`w-5 h-5 ${t.color}`} />
              <div>
                <div className="text-xs font-bold text-white">{t.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{t.desc}</div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 ml-auto group-hover:text-slate-400 transition-colors" />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          header={<div className="flex items-center gap-2"><Keyboard className="w-4 h-4 text-emerald-400" /><span className="font-bold text-white text-xs">Keyboard Shortcuts</span></div>}
        >
          <div className="space-y-3 text-xs text-slate-300 font-mono">
            {[
              { action: "Open global search overlay", key: "Ctrl + K" },
              { action: "Back to main dashboard", key: "Esc" },
              { action: "Toggle sidebar navigation", key: "Ctrl + B" },
              { action: "Open AI Copilot chat", key: "Ctrl + J" },
              { action: "Create new matter", key: "Ctrl + N" },
            ].map((s) => (
              <div key={s.action} className="flex justify-between border-b border-slate-800 last:border-0 pb-2 last:pb-0">
                <span className="font-sans text-slate-400">{s.action}</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-white text-[10px]">{s.key}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          header={<div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-400" /><span className="font-bold text-white text-xs">FAQs Quick Reference</span></div>}
        >
          <Accordion
            items={[
              {
                title: "How do I provision a new tenant namespace?",
                content: <p className="text-[11px] text-slate-400 leading-relaxed">Navigate to the SaaS Platform Control Plane and select 'Provision Tenant' to initialize database schemas and generate admin client certificates.</p>,
              },
              {
                title: "How do I invite a new associate to my firm?",
                content: <p className="text-[11px] text-slate-400 leading-relaxed">From the Team workspace, open Members Directory and click 'Invite Member'. The invitee receives a scoped invitation link valid for 7 days.</p>,
              },
              {
                title: "Can I customize my workspace URL?",
                content: <p className="text-[11px] text-slate-400 leading-relaxed">Workspace subdomains are set during provisioning. Enterprise tier tenants can request a custom domain via platform admin.</p>,
              },
              {
                title: "How does the AI legal copilot work?",
                content: <p className="text-[11px] text-slate-400 leading-relaxed">The AI Copilot uses context-aware pipelines scoped to your tenant namespace. All prompts and outputs are logged to the audit trail.</p>,
              },
            ]}
          />
        </Card>
      </div>

      {/* Contact strip */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-600/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Still need help?</p>
            <p className="text-[11px] text-slate-400">Reach the platform team for tenant-specific support.</p>
          </div>
        </div>
        <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:gap-2.5 transition-all">
          Contact support <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
