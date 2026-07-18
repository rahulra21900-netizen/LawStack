"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { AuthShell } from "@/components/auth/AuthShell";
import { Lock, Eye, EyeOff, ShieldCheck, CircleCheck as CheckCircle2 } from "lucide-react";

export default function PlatformResetPasswordPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);

  const rules = [
    { label: "At least 12 characters", ok: pw.length >= 12 },
    { label: "One uppercase letter", ok: /[A-Z]/.test(pw) },
    { label: "One number", ok: /\d/.test(pw) },
    { label: "One symbol", ok: /[^A-Za-z0-9]/.test(pw) },
  ];

  const allOk = rules.every((r) => r.ok) && pw === confirm && pw.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allOk) return;
    addToast("Password Reset", "Your platform credentials have been rotated.", "success");
    router.push("/platform/login");
  };

  return (
    <AuthShell
      badge="Account Recovery"
      accent="blue"
      title="Set a new platform password"
      subtitle="Choose a strong password. This will invalidate all existing admin sessions for your account."
      footer={
        <Link href="/platform/login" className="text-blue-400 hover:underline font-semibold">
          Back to Login
        </Link>
      }
      sidePanel={{
        heading: "Password requirements",
        points: [
          "Minimum 12 characters with mixed character classes",
          "Cannot reuse any of your last 8 platform passwords",
          "Stored as a salted hash — LawStack never sees your plaintext",
          "All credential rotations are recorded in the audit trail",
        ],
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-[10px] uppercase font-bold text-slate-400">New password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="••••••••••••"
              className="block w-full pl-9 pr-9 py-2.5 bg-slate-950/50 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-slate-700 transition-all"
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

        <div className="space-y-1.5">
          <label className="block text-[10px] uppercase font-bold text-slate-400">Confirm password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type={show ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••••••"
              className="block w-full pl-9 pr-3 py-2.5 bg-slate-950/50 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-slate-700 transition-all"
            />
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-1.5">
          {rules.map((r) => (
            <li key={r.label} className="flex items-center gap-1.5 text-[10px]">
              <CheckCircle2 className={`w-3 h-3 ${r.ok ? "text-emerald-400" : "text-slate-600"}`} />
              <span className={r.ok ? "text-slate-300" : "text-slate-500"}>{r.label}</span>
            </li>
          ))}
        </ul>

        <Button type="submit" variant="primary" className="w-full" disabled={!allOk} leftIcon={<ShieldCheck className="w-4 h-4" />}>
          Rotate credentials
        </Button>
      </form>
    </AuthShell>
  );
}
