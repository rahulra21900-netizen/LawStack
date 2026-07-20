"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { AuthShell } from "@/components/auth/AuthShell";
import { Shield, Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import { setAuthSession } from "@/lib/auth";

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
      setAuthSession({
        authenticated: true,
        mfaVerified: false,
        scope: "platform",
        role: "Platform Admin",
        email,
        tenantId: null,
        tenantName: null,
      });
      addToast("Platform Authorization", "Identity confirmed. MFA is required before continuing.", "success");
      router.push("/platform/mfa");
    }, 700);
  };

  return (
    <AuthShell
      badge="Platform Operator"
      accent="blue"
      title="Platform Sign In"
      subtitle="Enter your platform administrator credentials to access the control plane."
      footer={
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Need platform access?</span>
          <Link href="/platform/signup" className="font-semibold text-blue-400 hover:underline">
            Request access
          </Link>
        </div>
      }
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-[10px] uppercase font-bold text-slate-400">Administrator Email</label>
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

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-[10px] uppercase font-bold text-slate-400">Password</label>
            <Link href="/platform/forgot-password" className="text-[10px] text-blue-400 hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type={showPassword ? "text" : "password"}
              required
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

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded border-slate-800 bg-slate-950 text-blue-500 focus:ring-blue-500/40"
            />
            Keep me signed in for 30 days
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full bg-blue-600 hover:bg-blue-500 py-2.5 text-xs font-semibold rounded-lg shadow-lg shadow-blue-900/30 transition-all"
          isLoading={loading}
        >
          {loading ? "Authenticating..." : "Continue to Platform Control Plane"}
        </Button>
      </form>
    </AuthShell>
  );
}
