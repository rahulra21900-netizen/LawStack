"use client";

import React from "react";
import { useSimulation } from "@/providers/SimulationProvider";
import { Briefcase, Users, FileText, Calendar, Scale, Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function TenantDashboard() {
  const { activeTenant, activeRole, activeUser, featureFlags } = useSimulation();

  const isAiEnabled = featureFlags.find((f) => f.id === "ai-copilot")?.enabled;

  return (
    <div className="space-y-6">
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeTenant.primaryColor }} />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{activeTenant.name} Workspace</h1>
          </div>
          <p className="text-xs text-slate-400">Legal operations portal for {activeUser.name} ({activeRole}).</p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {activeTenant.tier} Subscription
          </span>
        </div>
      </div>

      {/* Simulator Notice if active user role doesn't match tenant context */}
      {activeRole === "Client" && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-400 flex items-center justify-between">
          <span>
            <strong>Simulating Role Conflict:</strong> You are currently simulating a <strong>Client</strong> role inside the internal firm workspace layout. Clients should typically use the <strong>Client Portal</strong> layout.
          </span>
          <Link href="/client/dashboard" className="underline font-bold hover:text-white shrink-0">
            Switch to Client Portal
          </Link>
        </div>
      )}

      {/* AI Workspace quick notice */}
      {isAiEnabled && (
        <div className="p-4 bg-gradient-to-r from-blue-900/20 via-indigo-900/10 to-transparent border border-blue-500/20 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-4.5 h-4.5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">AI Legal Assistant Activated</p>
              <p className="text-[10px] text-slate-400">Use AI Workspace to draft motions, extract clauses, or summarize briefs.</p>
            </div>
          </div>
          <button
            className="text-[10px] bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded font-bold transition-colors"
          >
            Open AI Workspace
          </button>
        </div>
      )}

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex justify-between items-start text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Active Cases</span>
            <Briefcase className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-extrabold text-white mt-2">34</p>
          <div className="text-[10px] text-slate-500 mt-1">2 trial dates pending</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex justify-between items-start text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Total Clients</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-white mt-2">18</p>
          <div className="text-[10px] text-emerald-400 mt-1">+2 new clients this week</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex justify-between items-start text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Draft Documents</span>
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-white mt-2">156</p>
          <div className="text-[10px] text-slate-500 mt-1">12 awaiting review</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex justify-between items-start text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Docket Hearings</span>
            <Scale className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-white mt-2">3</p>
          <div className="text-[10px] text-amber-400 mt-1">Next: Monday 10:00 AM</div>
        </div>
      </div>

      {/* Main dashboard splits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Cases/Matters overview */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">Active Matter Docket</h2>
            <button className="text-[10px] text-blue-400 hover:underline">View All Matters</button>
          </div>
          <div className="space-y-3">
            {[
              { id: "C-206", name: "Acme Corp vs. Beta Inc.", type: "Commercial Litigation", stage: "Discovery", lawyer: "Harvey Specter" },
              { id: "C-209", name: "State vs. Wayne Corporation", type: "Tax Compliance Dispute", stage: "Pleadings", lawyer: "Mike Ross" },
              { id: "C-212", name: "In re Oakwood Land Development", type: "Environmental Permitting", stage: "Hearing Pending", lawyer: "Eleanor Vance" },
            ].map((m) => (
              <div key={m.id} className="p-3 bg-slate-950/40 border border-slate-800/80 rounded-lg flex items-center justify-between text-xs hover:border-slate-700 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">{m.id}</span>
                    <span className="font-bold text-white">{m.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-400">{m.type} • Assigned: {m.lawyer}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-[9px] font-bold uppercase">{m.stage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right col: Upcoming Calendar & Tasks */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">Upcoming Calendar</h2>
            <span className="text-[9px] text-slate-500 uppercase font-bold">Schedule</span>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-slate-950/35 border border-slate-800 rounded-lg text-xs space-y-1">
              <div className="flex justify-between font-semibold text-white">
                <span>Motion for Summary Judgment</span>
                <span className="text-amber-400">10:00 AM</span>
              </div>
              <p className="text-[10px] text-slate-500">Case: C-206 • Superior Court Room 4B</p>
            </div>
            <div className="p-3 bg-slate-950/35 border border-slate-800 rounded-lg text-xs space-y-1">
              <div className="flex justify-between font-semibold text-white">
                <span>Client Consultation: Bruce Wayne</span>
                <span className="text-slate-400">03:30 PM</span>
              </div>
              <p className="text-[10px] text-slate-500">Case: C-209 • Main Conference Room</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
