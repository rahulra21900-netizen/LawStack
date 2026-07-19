"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { Eye, EyeOff, Shield, Lock, Mail, Sparkles, CheckCircle2, ArrowRight, BookOpen, X } from "lucide-react";
import { setAuthSession } from "@/lib/auth";

export default function PlatformLoginPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [email, setEmail] = useState("admin@lawstack.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_32%),linear-gradient(135deg,_#020617_0%,_#0f172a_50%,_#111827_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-200">
              <Sparkles className="h-3.5 w-3.5" />
              SaaS Control Plane
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Secure legal operations, simplified for platform administrators.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">
              Provision tenants, monitor compliance, audit every action, and manage secure access from a single invitation-only control plane.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Mandatory MFA
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Immutable audit trail
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Invite-only access
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-800/90 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur xl:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Platform login</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Welcome back</h2>
              </div>
              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-3 text-blue-300">
                <Shield className="h-5 w-5" />
              </div>
            </div>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Email address</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@lawstack.com"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 py-3 pl-10 pr-4 text-sm text-slate-100 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-300">Password</label>
                  <Link href="/platform/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 py-3 pl-10 pr-12 text-sm text-slate-100 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-400">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-blue-500 focus:ring-blue-500/40"
                />
                Keep me signed in for 30 days
              </label>

              <Button type="submit" variant="primary" className="w-full justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500" isLoading={loading}>
                {loading ? "Authenticating..." : "Continue to secure workspace"}
              </Button>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-400">
                Invite-only access and mandatory MFA are enforced for every administrator session.
              </div>
            </form>

            <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
              <span>Need provisioning help?</span>
              <Link href="/platform/signup" className="font-medium text-blue-400 hover:text-blue-300">
                Request access
              </Link>
            </div>
          </div>
        </div>
      </div>

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
                <h2 className="text-lg font-bold text-white">Platform Login Handoff Notes</h2>
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
                  This is the platform administrator sign-in experience. It should authenticate the operator, enforce secure access controls, and route them to the MFA flow before they can enter the platform control plane.
                </p>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">What each section should do</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    {
                      title: "Email and password fields",
                      detail: "Collect the admin credentials and validate that the email format and password are present before submit.",
                    },
                    {
                      title: "Forgot password",
                      detail: "Route the user to the password recovery flow for platform administrators and preserve the secure context.",
                    },
                    {
                      title: "Remember me",
                      detail: "Persist a long-lived session only if the security policy allows it; otherwise the default should be short-lived and re-authenticated on expiry.",
                    },
                    {
                      title: "Continue button",
                      detail: "Trigger authentication, show loading state, and move the user to the MFA stage after initial identity verification.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                      <p className="mb-1 font-semibold text-white">{item.title}</p>
                      <p className="text-xs leading-5 text-slate-400">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">MFA and access flow</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Step 1:</span> validate the email and password against the authentication service.</li>
                  <li><span className="font-semibold text-white">Step 2:</span> if the credentials are valid, create an authentication session with the user role and scope.</li>
                  <li><span className="font-semibold text-white">Step 3:</span> redirect the user to the MFA page before granting access to platform controls.</li>
                  <li><span className="font-semibold text-white">Step 4:</span> if MFA is not completed, deny access and show an explicit error or retry experience.</li>
                  <li><span className="font-semibold text-white">Role note:</span> this page is for platform administrators only, so it should enforce admin-only policies and not allow tenant or client roles to proceed here.</li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Implementation logic</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Auth service:</span> call an authentication endpoint to verify the login request and return a session token or temporary auth challenge.</li>
                  <li><span className="font-semibold text-white">MFA challenge:</span> if MFA is required, the service should return a challenge for TOTP, SMS, or email verification; the UI should then route to the MFA page.</li>
                  <li><span className="font-semibold text-white">Session state:</span> store auth state in a secure client-side session object only after the identity check succeeds, and never expose sensitive secrets.</li>
                  <li><span className="font-semibold text-white">Error handling:</span> show clear messages for invalid credentials, locked accounts, unverified MFA, or disabled admin access.</li>
                  <li><span className="font-semibold text-white">Remember me:</span> this should only persist a trusted session when the backend allows it; otherwise prefer a shorter duration.</li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">What the developer should build</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Credential validation</p>
                    <p className="text-xs leading-5 text-slate-400">Validate the input on submit and block empty or malformed credentials before the request is sent.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">MFA enforcement</p>
                    <p className="text-xs leading-5 text-slate-400">Require MFA after the password step and only allow access to the platform dashboard once the second factor is verified.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Audit logging</p>
                    <p className="text-xs leading-5 text-slate-400">Every login attempt should be logged so admins and compliance teams can review suspicious or repeated access attempts.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Security posture</p>
                    <p className="text-xs leading-5 text-slate-400">Enforce invitation-only access, reject unknown accounts, and require secure password handling and rate limiting.</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Future backend hooks</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Auth endpoint:</span> connect this page to a real identity provider or internal auth service.</li>
                  <li><span className="font-semibold text-white">MFA provider:</span> wire in an authenticator app, email or SMS verification, or an enterprise SSO provider.</li>
                  <li><span className="font-semibold text-white">Audit service:</span> emit login attempts, MFA outcomes, and access denials into the platform audit stream.</li>
                  <li><span className="font-semibold text-white">Session store:</span> replace the current mock session helper with a secure backend-issued session and refresh token model.</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
