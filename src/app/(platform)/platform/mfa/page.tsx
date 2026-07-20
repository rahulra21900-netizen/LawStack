"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { AuthShell } from "@/components/auth/AuthShell";
import { Smartphone, KeyRound, ShieldCheck, BookOpen, X } from "lucide-react";
import { setAuthSession } from "@/lib/auth";

export default function PlatformMfaPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

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
    const entered = code.join("");
    if (entered.length < 6) {
      addToast("MFA required", "Enter the full 6-digit verification code.", "error");
      return;
    }

    setAuthSession({ mfaVerified: true });
    addToast("MFA Verified", "Multi-factor authentication successful. Session secured.", "success");
    router.push("/platform/dashboard");
  };

  return (
    <>
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

      <div className="fixed bottom-4 right-4 z-40">
      <button
        onClick={() => setShowDeveloperGuide(true)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-300 backdrop-blur transition-colors hover:bg-slate-800 hover:text-white"
      >
        <BookOpen className="h-3.5 w-3.5" />
        Developer Guide
      </button>
    </div>

      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Developer Guide</p>
                <h2 className="text-lg font-bold text-white">MFA Handoff Notes</h2>
              </div>
              <button
                onClick={() => setShowDeveloperGuide(false)}
                className="rounded-lg border border-slate-700 p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                aria-label="Close developer guide"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-6 p-5 text-sm text-slate-300">
              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">What this page is for</h3>
                <p>
                  This page verifies that a platform administrator is really who they claim to be before they can enter the protected control plane. It should support the standard authenticator flow while also offering a fallback path for backup codes. The latest implementation should be treated as the second verification step in the auth provisioning stack, with clear logging and a predictable recovery experience for admins.
                </p>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">What each action should do</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-1 font-semibold text-white">6-digit verification code</p>
                    <p className="text-xs leading-5 text-slate-400">
                      Collect the current code from the authenticator app, validate it, and only proceed when the full 6-digit value is complete.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-1 font-semibold text-white">Use backup code</p>
                    <p className="text-xs leading-5 text-slate-400">
                      Provide a recovery path when the authenticator is unavailable. The backend should validate a one-time backup code, mark it as consumed, and allow the session to continue only once.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-1 font-semibold text-white">Resend notification</p>
                    <p className="text-xs leading-5 text-slate-400">
                      Trigger a new MFA challenge and show a short cooldown timer so the user does not spam the flow.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-1 font-semibold text-white">Verify and continue</p>
                    <p className="text-xs leading-5 text-slate-400">
                      Confirm the code, persist the MFA success state, and redirect the user into the platform dashboard only after verification succeeds.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Implementation logic for the developer</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Backup code flow:</span> show a fallback input or recovery screen, validate the one-time code server-side, mark it as used, and block reuse even if the user tries again.</li>
                  <li><span className="font-semibold text-white">Resend flow:</span> call the MFA challenge endpoint again, apply rate limiting, and disable the resend control for a short countdown to prevent abuse.</li>
                  <li><span className="font-semibold text-white">Session handling:</span> only update the session to verified after the second factor is confirmed; do not allow entry into the platform before that state is set.</li>
                  <li><span className="font-semibold text-white">Security expectations:</span> log every challenge, backup-code use, and verification result to the audit trail and show clear errors for expired or invalid attempts.</li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Simple handoff summary</h3>
                <p className="text-xs leading-6 text-slate-400">
                  If a developer is reading this page quickly, the key idea is: the MFA page is the gatekeeper for platform access. The code input is the main path, backup codes are the recovery path, and resend notification is the recovery helper after a missed or delayed challenge.
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
