"use client";

import React from "react";
import { ShieldAlert, AlertCircle, Compass, WifiOff, RefreshCw, Lock, Terminal, Hourglass } from "lucide-react";
import Link from "next/link";

interface ErrorScreenProps {
  title?: string;
  description?: string;
  onActionClick?: () => void;
  actionText?: string;
}

export function GlobalError({ title = "Application Error", description = "An unexpected error occurred in this module dashboard.", onActionClick, actionText = "Reload Window" }: ErrorScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 py-16 text-center max-w-md mx-auto space-y-4">
      <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 animate-bounce">
        <ShieldAlert className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h2>
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
      </div>
      <button
        onClick={onActionClick || (() => window.location.reload())}
        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-bold text-white transition-all flex items-center gap-2"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>{actionText}</span>
      </button>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-8 py-16 text-center max-w-md mx-auto space-y-4">
      <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
        <Compass className="w-6 h-6 animate-pulse" />
      </div>
      <div className="space-y-1">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Page Not Found</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          The jurisdiction docket or route you are looking for does not exist in our active routing table.
        </p>
      </div>
      <Link href="/" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold text-white transition-all">
        Return Home
      </Link>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center p-8 py-16 text-center space-y-3">
      <Hourglass className="w-8 h-8 text-blue-500 animate-spin" />
      <p className="text-xs font-semibold text-slate-300">Synchronizing Ledger Data...</p>
      <p className="text-[9px] text-slate-500 font-mono">Simulating network handshake</p>
    </div>
  );
}

export function Maintenance() {
  return (
    <div className="flex flex-col items-center justify-center p-8 py-16 text-center max-w-md mx-auto space-y-4">
      <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
        <Terminal className="w-6 h-6 animate-pulse" />
      </div>
      <div className="space-y-1">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Under Maintenance</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          This system partition is undergoing a scheduled database snapshot migration. Please try again shortly.
        </p>
      </div>
    </div>
  );
}

export function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center p-8 py-16 text-center max-w-md mx-auto space-y-4">
      <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
        <Lock className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Authentication Required</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Your current session signature is missing or invalid. Please check your simulated login persona credentials.
        </p>
      </div>
      <Link href="/dev" className="px-4 py-2 bg-amber-500 text-slate-950 hover:bg-amber-400 rounded-lg text-xs font-bold transition-all">
        Open Simulator Switcher
      </Link>
    </div>
  );
}

export function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center p-8 py-16 text-center max-w-md mx-auto space-y-4">
      <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
        <ShieldAlert className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Access Forbidden</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Your active simulated role does not possess the correct clearance scope permissions to read this document database.
        </p>
      </div>
    </div>
  );
}

export function Offline() {
  return (
    <div className="flex flex-col items-center justify-center p-8 py-16 text-center max-w-md mx-auto space-y-4">
      <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
        <WifiOff className="w-6 h-6 animate-pulse" />
      </div>
      <div className="space-y-1">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Network Connection Lost</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Verify your physical network hardware link interface or retry handshake operations.
        </p>
      </div>
    </div>
  );
}

export function SessionExpired() {
  return (
    <div className="flex flex-col items-center justify-center p-8 py-16 text-center max-w-md mx-auto space-y-4">
      <div className="w-12 h-12 rounded-full bg-slate-850 border border-slate-700 flex items-center justify-center text-slate-500">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Session Signature Expired</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          For security policy compliance, inactive browser sessions are automatically invalidated after 15 minutes.
        </p>
      </div>
      <Link href="/dev" className="px-4 py-2 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-bold text-white transition-all">
        Re-authenticate Persona
      </Link>
    </div>
  );
}
