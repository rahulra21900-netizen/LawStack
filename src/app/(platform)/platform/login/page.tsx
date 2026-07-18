"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { Input } from "@/components/forms";
import { AuthShell } from "@/components/auth/AuthShell";
import { Eye, EyeOff, Shield, Lock, Mail } from "lucide-react";

export default function PlatformLoginPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [email, setEmail] = useState("admin@lawstack.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast("Platform Authorization", "Authenticated successfully as Administrator.", "success");
      router.push("/platform/dashboard");
    }, 700);
  };

  return (
    <AuthShell
      badge="SaaS Control Plane"
      accent="blue"
      title="Platform Administrator Login"
      subtitle="Restricted access. Authorized platform administrators only — all sessions are audited."
      footer={
        <>
          Need admin credentials?{" "}
          <Link href="/platform/signup" className="text-blue-400 hover:underline font-semibold">
            Request internal provisioning
          </Link>
        </>
      }
      sidePanel={{
        heading: "What this portal gives you",
        points: [
          "Provision and suspend isolated legal firm tenant namespaces",
          "Monitor platform-wide service health, MRR, and seat utilization",
          "Audit every administrative action with an immutable compliance trail",
          "Manage platform-level security keys, regions, and retention policies",
        ],
      }}
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-[10px] uppercase font-bold text-slate-400">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@lawstack.com"
              className="block w-full pl-9 pr-3 py-2.5 bg-slate-950/50 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-slate-700 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-[10px] uppercase font-bold text-slate-400">Password</label>
            <Link href="/platform/forgot-password" className="text-[10px] text-blue-400 hover:underline">
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="block w-full pl-9 pr-9 py-2.5 bg-slate-950/50 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-slate-700 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 text-[11px] text-slate-400 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500/50"
          />
          Remember this device for 30 days
        </label>

        <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
          {loading ? "Authenticating..." : "Sign in to Control Plane"}
        </Button>

        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 p-3">
          <Shield className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <p className="text-[10px] text-slate-400 leading-relaxed">
            MFA required for all admin sessions. You'll be prompted to verify after login.
          </p>
        </div>
      </form>
    </AuthShell>
  );
}
