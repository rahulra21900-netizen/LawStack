"use client";

import React from "react";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

interface AuthShellProps {
  badge: string;
  title: string;
  subtitle: string;
  accent?: "blue" | "emerald" | "indigo";
  children: React.ReactNode;
  footer?: React.ReactNode;
  sidePanel?: {
    heading: string;
    points: string[];
  };
}

const accentMap = {
  blue: {
    ring: "border-blue-500/30",
    bg: "bg-blue-600/15",
    text: "text-blue-400",
    glow: "from-blue-600/20",
    dot: "bg-blue-500",
    panelBorder: "border-blue-500/25",
    panelGlow: "from-blue-950/60",
    panelTitle: "text-white",
    panelDivider: "border-blue-500/20",
    badge: "bg-blue-600/15 text-blue-300 border-blue-500/30",
  },
  emerald: {
    ring: "border-emerald-500/30",
    bg: "bg-emerald-600/15",
    text: "text-emerald-400",
    glow: "from-emerald-600/20",
    dot: "bg-emerald-500",
    panelBorder: "border-emerald-500/25",
    panelGlow: "from-emerald-950/60",
    panelTitle: "text-white",
    panelDivider: "border-emerald-500/20",
    badge: "bg-emerald-600/15 text-emerald-300 border-emerald-500/30",
  },
  indigo: {
    ring: "border-indigo-500/30",
    bg: "bg-indigo-600/15",
    text: "text-indigo-400",
    glow: "from-indigo-600/20",
    dot: "bg-indigo-500",
    panelBorder: "border-indigo-500/25",
    panelGlow: "from-indigo-950/60",
    panelTitle: "text-white",
    panelDivider: "border-indigo-500/20",
    badge: "bg-indigo-600/15 text-indigo-300 border-indigo-500/30",
  },
};

export function AuthShell({
  badge,
  title,
  subtitle,
  accent = "blue",
  children,
  footer,
  sidePanel,
}: AuthShellProps) {
  const a = accentMap[accent];

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10 overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className={`absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b ${a.glow} to-transparent blur-[120px]`} />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className={`relative z-10 w-full ${sidePanel ? "max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch" : "max-w-[400px] mx-auto"}`}>
        {/* Form panel */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur p-6 sm:p-8 shadow-2xl shadow-slate-950/50">
          <Link href="/" className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </Link>

          <div className="flex items-center gap-2 mb-6">
            <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${a.bg} border ${a.ring}`}>
              <Shield className={`w-4 h-4 ${a.text}`} />
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${a.badge}`}>
              {badge}
            </span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-white">{title}</h1>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">{subtitle}</p>

          <div className="mt-6">{children}</div>

          {footer && <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">{footer}</div>}
        </div>

        {/* Side panel (hidden on mobile) */}
        {sidePanel && (
          <div className={`hidden lg:flex flex-col justify-between rounded-2xl border ${a.panelBorder} bg-gradient-to-br ${a.panelGlow} via-slate-950/90 to-slate-950 p-8 shadow-2xl shadow-slate-950/60`}>
            <div>
              <h2 className={`text-lg font-bold ${a.panelTitle} tracking-tight`}>{sidePanel.heading}</h2>
              <ul className="mt-6 space-y-4">
                {sidePanel.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${a.bg} border ${a.ring}`}>
                      <span className={`text-[10px] font-bold ${a.text}`}>{i + 1}</span>
                    </span>
                    <span className="text-xs text-slate-300 leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`mt-8 pt-6 border-t ${a.panelDivider}`}>
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${a.dot} animate-pulse`} />
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">LawStack V2 · Prototype</span>
              </div>
              <p className="mt-2 text-[10px] text-slate-500 leading-relaxed">
                This is a frontend-only prototype. No real authentication occurs — submissions are simulated.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
