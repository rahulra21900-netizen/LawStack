"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { Building2, ArrowRight, CircleCheck as CheckCircle2, Sparkles } from "lucide-react";

export default function TenantSignupPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/tenant/join-workspace");
  }, [router]);
  return (
    <AuthShell
      badge="Firm Practice Room"
      accent="emerald"
      title="Register your law firm"
      subtitle="New firm tenant namespaces are provisioned through the platform control plane. Start your registration request below."
      footer={
        <Link href="/tenant/login" className="text-emerald-400 hover:underline font-semibold">
          Already registered? Sign in
        </Link>
      }
      sidePanel={{
        heading: "What you get with a new tenant",
        points: [
          "An isolated, row-level-secured namespace for your firm's data",
          "Custom workspace URL: yourfirm.lawstack.com",
          "Role-based access for partners, associates, paralegals, and staff",
          "Optional AI legal copilot and client portal add-ons",
        ],
      }}
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-300">Provisioning via platform admin</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            To launch a new firm tenant, a platform administrator runs the provisioning wizard from the SaaS control
            plane. You can request access below — your request will route to the platform team for review.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: Building2, title: "Firm namespace", desc: "Isolated data partition" },
            { icon: CheckCircle2, title: "Roles & seats", desc: "Partner, associate, paralegal" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <Icon className="w-4 h-4 text-emerald-400 mb-2" />
                <div className="text-[11px] font-bold text-white">{s.title}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{s.desc}</div>
              </div>
            );
          })}
        </div>

        <Link
          href="/platform/tenant-provisioning/new"
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white transition-colors"
        >
          Launch provisioning wizard
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </AuthShell>
  );
}
