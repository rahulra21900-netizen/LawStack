"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { AuthShell } from "@/components/auth/AuthShell";
import { Smartphone, KeyRound, ShieldCheck } from "lucide-react";

export default function PlatformMfaPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[idx] = val;
    setCode(next);
    if (val && idx < 5) {
      const el = document.getElementById(`mfa-${idx + 1}`);
      (el as HTMLInputElement)?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    addToast("MFA Verified", "Multi-factor authentication successful. Session secured.", "success");
    router.push("/platform/dashboard");
  };

  return (
    <AuthShell
      badge="MFA Required"
      accent="blue"
      title="Verify your identity"
      subtitle="Enter the 6-digit code from your authenticator app to complete this admin session."
      footer={<span className="text-slate-500">Code expires in 04:58</span>}
      sidePanel={{
        heading: "Why we enforce MFA",
        points: [
          "Platform admin sessions can provision, suspend, and audit tenant namespaces",
          "MFA blocks credential reuse even if a password is compromised",
          "All MFA challenges are logged to the immutable audit trail",
          "Security keys (FIDO2) can be enrolled from platform settings",
        ],
      }}
    >
      <form onSubmit={handleVerify} className="space-y-5">
        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 p-3">
          <Smartphone className="w-4 h-4 text-blue-400 shrink-0" />
          <p className="text-[11px] text-slate-400">
            Open your authenticator app (Authy, 1Password, Google Authenticator) and enter the current 6-digit code.
          </p>
        </div>

        <div className="flex justify-between gap-2">
          {code.map((digit, idx) => (
            <input
              key={idx}
              id={`mfa-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="w-11 h-12 text-center text-lg font-bold bg-slate-950/50 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-slate-700 transition-all"
            />
          ))}
        </div>

        <Button type="submit" variant="primary" className="w-full" leftIcon={<ShieldCheck className="w-4 h-4" />}>
          Verify and continue
        </Button>

        <div className="flex items-center justify-between text-[10px] text-slate-500">
          <button type="button" className="hover:text-slate-300 flex items-center gap-1">
            <KeyRound className="w-3 h-3" /> Use backup code
          </button>
          <button type="button" className="hover:text-slate-300">
            Resend notification
          </button>
        </div>
      </form>
    </AuthShell>
  );
}
