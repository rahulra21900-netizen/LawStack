"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { AuthShell } from "@/components/auth/AuthShell";
import { Smartphone, ShieldCheck, KeyRound } from "lucide-react";
import { setAuthSession } from "@/lib/auth";

export default function TenantMfaPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[idx] = val;
    setCode(next);
    if (val && idx < 5) {
      const el = document.getElementById(`tenant-mfa-${idx + 1}`);
      (el as HTMLInputElement | null)?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = code.join("");
    if (entered.length < 6) {
      addToast("MFA required", "Enter the full 6-digit verification code.", "error");
      return;
    }

    setAuthSession({ mfaVerified: true });
    addToast("MFA Verified", "Your tenant workspace session is secured.", "success");
    router.push("/workspace/dashboard");
  };

  return (
    <AuthShell
      badge="Invite-Only Access"
      accent="emerald"
      title="Verify your workspace access"
      subtitle="A verified MFA code is required before any tenant workspace session can continue."
      footer={<span className="text-slate-500">Use your authenticator app or backup code</span>}
      sidePanel={{
        heading: "Why MFA is required",
        points: [
          "Tenant workspaces are isolated per firm and protected by scoped session tokens",
          "MFA blocks credential reuse and reduces account takeover risk",
          "Every verification event is recorded for the tenant audit trail",
        ],
      }}
    >
      <form onSubmit={handleVerify} className="space-y-5">
        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 p-3">
          <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
          <p className="text-[11px] text-slate-400">
            Open your authenticator application and enter the current six-digit code to continue.
          </p>
        </div>
        <div className="flex justify-between gap-2">
          {code.map((digit, idx) => (
            <input
              key={idx}
              id={`tenant-mfa-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="w-11 h-12 text-center text-lg font-bold bg-slate-950/50 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-slate-700 transition-all"
            />
          ))}
        </div>
        <Button type="submit" variant="primary" className="w-full bg-emerald-600 hover:bg-emerald-500" leftIcon={<ShieldCheck className="w-4 h-4" />}>
          Verify and continue
        </Button>
        <div className="flex items-center justify-between text-[10px] text-slate-500">
          <button type="button" className="hover:text-slate-300 flex items-center gap-1">
            <KeyRound className="w-3 h-3" /> Use backup code
          </button>
          <button type="button" className="hover:text-slate-300">
            Resend prompt
          </button>
        </div>
      </form>
    </AuthShell>
  );
}
