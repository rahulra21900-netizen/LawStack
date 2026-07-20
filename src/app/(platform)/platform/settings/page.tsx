"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { Card } from "@/components/cards";
import { Switch } from "@/components/forms";
import { Settings, Shield, Lock, Globe, KeyRound, Server, Database, Bell, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, BookOpen, X } from "lucide-react";

export default function PlatformSettingsPage() {
  const { addToast } = useNotifications();
  const [maintenance, setMaintenance] = useState(false);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);
  const [enforceMfa, setEnforceMfa] = useState(true);
  const [auditExport, setAuditExport] = useState(true);
  const [allowSignup, setAllowSignup] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Platform", href: "/platform/dashboard" }, { name: "Settings" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/15 border border-blue-500/30">
            <Settings className="w-4 h-4 text-blue-400" />
          </span>
          <span>Platform Control Settings</span>
        </h1>
        <p className="text-xs text-slate-400">Configure global SaaS security, maintenance overrides, and compliance controls.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security controls */}
        <Card
          header={
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-white text-xs">Security Controls</span>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-start gap-3">
                <Lock className="w-4 h-4 text-blue-400 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Enforce MFA for all admins</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Require multi-factor on every platform admin session</div>
                </div>
              </div>
              <Switch checked={enforceMfa} onChange={setEnforceMfa} />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-start gap-3">
                <Database className="w-4 h-4 text-emerald-400 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Auto-export audit trail</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Daily encrypted export to compliance bucket</div>
                </div>
              </div>
              <Switch checked={auditExport} onChange={setAuditExport} />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-start gap-3">
                <KeyRound className="w-4 h-4 text-amber-400 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Allow admin self-signup</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Disabled by default — use CLI provisioning instead</div>
                </div>
              </div>
              <Switch checked={allowSignup} onChange={setAllowSignup} />
            </div>
          </div>
        </Card>

        {/* Maintenance + region */}
        <Card
          header={
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white text-xs">Operations & Maintenance</span>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Global maintenance mode</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Locks out non-admin platform logins</div>
                </div>
              </div>
              <Switch
                checked={maintenance}
                onChange={(val) => {
                  setMaintenance(val);
                  addToast("Maintenance Lock Updated", "Global SaaS maintenance mode toggled.", "warning");
                }}
              />
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Active Regions</span>
                </div>
                <Badge label="Multi-region" variant="success" />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["us-east-1", "us-west-2", "eu-west-1", "ap-south-1"].map((r) => (
                  <span key={r} className="font-mono text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-300">{r}</span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Platform Alerts</span>
                </div>
                <Badge label="3 channels" variant="info" />
              </div>
              <div className="mt-2 space-y-1.5">
                {["Email (ops@lawstack.com)", "Slack (#platform-alerts)", "PagerDuty (P1 only)"].map((c) => (
                  <div key={c} className="flex items-center gap-2 text-[10px] text-slate-400">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" leftIcon={<BookOpen className="w-4 h-4" />} onClick={() => setShowDeveloperGuide(true)}>
          Developer Guide
        </Button>
        <Button variant="primary" onClick={() => addToast("Settings Saved", "Platform settings persisted successfully.", "success")}>
          Save settings
        </Button>
      </div>

      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Developer Guide</p>
                <h2 className="text-lg font-bold text-white">Platform Settings Handoff Notes</h2>
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
                  This page is the control center for platform-wide operational settings. It should let administrators change security posture, maintenance state, notification channels, and region visibility for the SaaS platform. The latest implementation should also reflect auth provisioning policy, self-service restrictions, and the operational defaults used during tenant onboarding.
                </p>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">What each section should do</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    {
                      title: "Security Controls",
                      detail: "Manage MFA enforcement, audit export behavior, and self-signup rules. These settings directly affect platform security posture and compliance posture."
                    },
                    {
                      title: "Operations & Maintenance",
                      detail: "Handle maintenance mode, region visibility, and platform alert channels. These controls are used during incidents and platform-wide changes."
                    },
                    {
                      title: "Save settings",
                      detail: "Persist all current toggles to a settings store and show a success or failure toast to the user."
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
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Implementation logic</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">State model:</span> keep each toggle in local component state first, then map it to a settings object that can be sent to the backend later.</li>
                  <li><span className="font-semibold text-white">Save action:</span> when the user clicks Save settings, the page should validate the current values and persist them through a settings service.</li>
                  <li><span className="font-semibold text-white">Auth provisioning:</span> the settings here should control whether onboarding and admin provisioning flows remain restricted or can be reopened for new tenant creation.</li>
                  <li><span className="font-semibold text-white">Toast feedback:</span> show success, error, or warning feedback depending on whether the save succeeds or a dependency fails.</li>
                  <li><span className="font-semibold text-white">Persistence:</span> in production, this page should pull from a platform settings API and write back through a secure admin endpoint.</li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">How each toggle should work</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Enforce MFA for all admins</p>
                    <p className="text-xs leading-5 text-slate-400">
                      This means every platform admin must complete a second verification step after entering their password. The logic should check the user role, then trigger a TOTP or OTP challenge during sign-in. If the admin has not enrolled MFA yet, the flow should guide them to set it up before access is granted.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Auto-export audit trail</p>
                    <p className="text-xs leading-5 text-slate-400">
                      This enables scheduled export of immutable audit logs to a secure compliance destination. It is useful for legal, regulatory, and incident-response workflows because it preserves a backup trail even if the primary platform instance is unavailable.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Allow admin self-signup</p>
                    <p className="text-xs leading-5 text-slate-400">
                      This controls whether a new admin can register themselves through a public or self-service signup route. In most enterprise SaaS setups, this should stay disabled by default so only approved internal operators or controlled provisioning flows can create admin accounts.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Global maintenance mode</p>
                    <p className="text-xs leading-5 text-slate-400">
                      This is a platform-wide safety switch used during deployments, incidents, or upgrades. When enabled, non-admin users should see the maintenance experience and be blocked from normal access, while admins can still enter to manage the incident or restore service.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Operational alert routing</h3>
                <p className="text-xs leading-5 text-slate-400">
                  The three alert channels below are meant to cover different levels of incident response. Email is for operational visibility, Slack is for team coordination, and PagerDuty is reserved for critical priority incidents so the right on-call people are notified immediately.
                </p>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {[
                    { title: "Email", detail: "ops@lawstack.com — used for operational notices and incident summaries." },
                    { title: "Slack", detail: "#platform-alerts — used for real-time team coordination and updates." },
                    { title: "PagerDuty", detail: "P1 only — used for urgent production incidents that need immediate escalation." },
                  ].map((channel) => (
                    <div key={channel.title} className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                      <p className="mb-1 font-semibold text-white">{channel.title}</p>
                      <p className="text-xs leading-5 text-slate-400">{channel.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Future backend hooks</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Settings service:</span> create a dedicated settings service for reading and writing platform-wide configuration.</li>
                  <li><span className="font-semibold text-white">Security policies:</span> apply the values to authentication, audit export, and maintenance middleware in the backend.</li>
                  <li><span className="font-semibold text-white">Audit trail:</span> every change made from this page should emit an audit event so the platform retains an immutable record of admin actions.</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
