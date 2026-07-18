"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { AuthShell } from "@/components/auth/AuthShell";
import { Mail, LifeBuoy, TriangleAlert as AlertTriangle } from "lucide-react";

export default function PlatformForgotPasswordPage() {
  const { addToast } = useNotifications();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast("Reset Requested", "If that email exists, a reset link has been dispatched.", "info");
  };

  return (
    <AuthShell
      badge="Account Recovery"
      accent="blue"
      title="Reset platform credentials"
      subtitle="Platform admin password resets require an out-of-band verification step. Submit your email to begin."
      footer={
        <Link href="/platform/login" className="text-blue-400 hover:underline font-semibold">
          Back to Login
        </Link>
      }
      sidePanel={{
        heading: "Recovery workflow",
        points: [
          "Submit your registered admin email address",
          "A reset ticket is routed to the lead platform engineer for approval",
          "On approval, a one-time reset link is sent via an out-of-band channel",
          "Reset links expire after 15 minutes and are single-use only",
        ],
      }}
    >
      {submitted ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
            <AlertTriangle className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-white">Request received</p>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              If <span className="font-mono text-slate-300">{email || "that address"}</span> matches a platform admin
              account, a reset link has been dispatched. Contact your lead engineer if you don't receive it within 15 minutes.
            </p>
          </div>
          <Link
            href="/platform/login"
            className="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-bold text-white transition-colors"
          >
            Return to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase font-bold text-slate-400">Admin email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@lawstack.com"
                className="block w-full pl-9 pr-3 py-2.5 bg-slate-950/50 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-slate-700 transition-all"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full" leftIcon={<LifeBuoy className="w-4 h-4" />}>
            Request password reset
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
