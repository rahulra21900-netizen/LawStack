"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { Card } from "@/components/cards";
import { Switch } from "@/components/forms";
import { Settings, Shield, Lock, Globe, KeyRound, Server, Database, Bell, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2 } from "lucide-react";

export default function PlatformSettingsPage() {
  const { addToast } = useNotifications();
  const [maintenance, setMaintenance] = useState(false);
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

      <div className="flex justify-end">
        <Button variant="primary" onClick={() => addToast("Settings Saved", "Platform settings persisted successfully.", "success")}>
          Save settings
        </Button>
      </div>
    </div>
  );
}
