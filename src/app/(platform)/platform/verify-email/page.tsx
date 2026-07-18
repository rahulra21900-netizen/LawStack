"use client";

import React from "react";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { MailCheck, ArrowRight } from "lucide-react";

export default function PlatformVerifyEmailPage() {
  return (
    <AuthShell
      badge="Email Verified"
      accent="blue"
      title="Email address confirmed"
      subtitle="Your platform administrator email has been verified. You can now complete MFA enrollment and sign in."
      footer={
        <Link href="/platform/login" className="text-blue-400 hover:underline font-semibold">
          Continue to Login
        </Link>
      }
      sidePanel={{
        heading: "What happens next",
        points: [
          "Sign in with your newly verified admin credentials",
          "Complete mandatory MFA enrollment on first sign-in",
          "Optionally register a FIDO2 security key from platform settings",
          "All future email changes will require re-verification",
        ],
      }}
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-3">
            <MailCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-sm font-bold text-white">Verification successful</p>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            Your email is now associated with your platform admin account and ready for MFA enrollment.
          </p>
        </div>

        <Link
          href="/platform/login"
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-bold text-white transition-colors"
        >
          Continue to Login
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </AuthShell>
  );
}
