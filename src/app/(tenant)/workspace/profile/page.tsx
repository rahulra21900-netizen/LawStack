"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { Card } from "@/components/cards";
import { Input, Select, Switch } from "@/components/forms";
import { User, Shield, KeyRound, Mail, Phone, Building2, Lock } from "lucide-react";

export default function UserProfileCenterPage() {
  const { addToast } = useNotifications();
  const [theme, setTheme] = useState("Dark");
  const [twoFactor, setTwoFactor] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Profile" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 border border-indigo-500/30">
            <User className="w-4 h-4 text-indigo-400" />
          </span>
          <span>Profile & Preferences</span>
        </h1>
        <p className="text-xs text-slate-400">Manage your identity, security, and workspace preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <Card
          header={<div className="flex items-center gap-2"><User className="w-4 h-4 text-indigo-400" /><span className="font-bold text-white text-xs">Identity</span></div>}
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white text-lg font-bold">
              HS
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Priya Chandra</h3>
              <p className="text-xs text-slate-400">Senior Partner · Chandra & Associates</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge label="Active" variant="success" />
                <Badge label="MFA On" variant="info" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500 font-bold"><Mail className="w-3 h-3" /> Email</div>
              <div className="mt-1 text-xs font-mono text-white">harvey@chandra.legal</div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500 font-bold"><Phone className="w-3 h-3" /> Phone</div>
              <div className="mt-1 text-xs text-white">+1 555-0199</div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500 font-bold"><Building2 className="w-3 h-3" /> Firm</div>
              <div className="mt-1 text-xs text-white">Chandra & Associates · Enterprise</div>
            </div>
          </div>
        </Card>

        {/* Preferences + security */}
        <div className="lg:col-span-2 space-y-6">
          <Card
            header={<div className="flex items-center gap-2"><User className="w-4 h-4 text-blue-400" /><span className="font-bold text-white text-xs">General Preferences</span></div>}
          >
            <div className="space-y-4">
              <Select
                label="Visual Appearance Theme"
                options={[
                  { label: "Dark theme (Recommended)", value: "Dark" },
                  { label: "Light theme", value: "Light" },
                ]}
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
              <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue-400 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Email notifications</div>
                    <div className="text-[10px] text-slate-500">Receive matter and billing alerts via email</div>
                  </div>
                </div>
                <Switch checked={emailAlerts} onChange={setEmailAlerts} />
              </div>
              <Button variant="primary" onClick={() => addToast("Preferences Saved", "General preferences saved successfully.", "success")}>
                Save Preferences
              </Button>
            </div>
          </Card>

          <Card
            header={<div className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-400" /><span className="font-bold text-white text-xs">Security & API</span></div>}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                <div className="flex items-start gap-3">
                  <Lock className="w-4 h-4 text-emerald-400 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Two-factor authentication</div>
                    <div className="text-[10px] text-slate-500">Require MFA on every workspace sign-in</div>
                  </div>
                </div>
                <Switch checked={twoFactor} onChange={setTwoFactor} />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                  <KeyRound className="w-3 h-3" /> API Key Token
                </div>
                <input
                  type="text"
                  readOnly
                  value="sk_live_88402941c9dd64..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-400 font-mono text-xs"
                />
                <p className="mt-1.5 text-[10px] text-slate-500">Keep this token secret. Rotating it will invalidate existing integrations.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
