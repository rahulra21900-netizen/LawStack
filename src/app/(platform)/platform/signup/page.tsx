"use client";

import React from "react";
import Link from "next/link";
import { Shield, Lock, Terminal, KeyRound, FileCheck as FileCheck2 } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";

export default function PlatformSignupPage() {
  return (
    <AuthShell
      badge="SaaS Control Plane"
      accent="blue"
      title="Platform Registration Locked"
      subtitle="Platform administrator accounts cannot self-register. They must be provisioned via internal credentials CLI by an existing lead platform engineer."
      footer={
        <Link href="/platform/login" className="text-blue-400 hover:underline font-semibold">
          Back to Login
        </Link>
      }
      sidePanel={{
        heading: "How admin provisioning works",
        points: [
          "Lead engineer runs the secure credentials CLI from an approved bastion host",
          "A scoped admin record is created with MFA enrollment enforced on first login",
          "The new admin receives a one-time enrollment link via an out-of-band channel",
          "First sign-in requires immediate MFA setup and security key registration",
        ],
      }}
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-300">Self-registration disabled</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            This is a controlled surface. To request platform admin access, open a ticket with the platform
            engineering team and include the business justification, requested scope, and approver.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: Terminal, title: "CLI Provisioning", desc: "Bastion-host credential issuance" },
            { icon: KeyRound, title: "MFA Enrollment", desc: "Required on first sign-in" },
            { icon: FileCheck2, title: "Audit Trail", desc: "Every admin action logged" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <Icon className="w-4 h-4 text-blue-400 mb-2" />
                <div className="text-[11px] font-bold text-white">{s.title}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{s.desc}</div>
              </div>
            );
          })}
        </div>

        <Link
          href="/platform/login"
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-bold text-white transition-colors"
        >
          <Shield className="w-4 h-4" />
          Return to Platform Login
        </Link>
      </div>
    </AuthShell>
  );
}
