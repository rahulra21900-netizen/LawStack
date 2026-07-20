"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { AuthShell } from "@/components/auth/AuthShell";
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight, Globe } from "lucide-react";
import { setAuthSession } from "@/lib/auth";

export default function TenantLoginPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAuthSession({
        authenticated: true,
        mfaVerified: false,
        scope: "tenant",
        role: "Tenant Owner",
        email,
        tenantId: "chandra-associates",
        tenantName: "Chandra & Associates",
      });
      addToast("Tenant Authorized", "Invite-only access confirmed. MFA is required before entering the workspace.", "success");
      router.push("/tenant/mfa");
    }, 700);
  };

  return (
    <AuthShell
      badge="Firm Practice Room"
      accent="emerald"
      title="Sign in to your firm workspace"
      subtitle="Access your practice dockets, matters, documents, billing, and AI copilot — scoped to your firm tenant."
      footer={
        <>
          Don't have a firm workspace?{" "}
          <Link href="/tenant/join-workspace" className="text-emerald-400 hover:underline font-semibold">
            Request access through an invitation
          </Link>
        </>
      }
      sidePanel={{
        heading: "What's inside your practice room",
        points: [
          "Matter dockets with CNR sync, hearing pipelines, and BNS concordance",
          "Document management with versioning, approvals, and retention locks",
          "GST-compliant billing — UPI, Razorpay, time entries, and write-offs",
          "AI legal copilot for drafting, section verification, and defect scanning",
        ],
      }}
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-[10px] uppercase font-bold text-slate-400">Firm email address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="attorney@chandra.legal"
              className="block w-full pl-9 pr-3 py-2.5 bg-slate-950/50 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-slate-700 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-[10px] uppercase font-bold text-slate-400">Password</label>
            <Link href="/tenant/login" className="text-[10px] text-emerald-400 hover:underline">
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type={show ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="block w-full pl-9 pr-9 py-2.5 bg-slate-950/50 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-slate-700 transition-all"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full bg-emerald-600 hover:bg-emerald-500" isLoading={loading}>
          {loading ? "Authenticating..." : "Sign in to workspace"}
        </Button>

        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 p-3">
          <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <p className="text-[10px] text-slate-400">
            Invite-only workspace access. Only accounts invited to the tenant namespace can log in.
          </p>
        </div>
      </form>
    </AuthShell>
  );
}
