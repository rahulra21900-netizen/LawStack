"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { Card } from "@/components/cards";
import { Input, Switch } from "@/components/forms";
import { User, Mail, Phone, Building2, Shield, Lock, KeyRound, Bell, BookOpen } from "lucide-react";
import { DeveloperGuideModal } from "./DeveloperGuideModal";

export default function ClientProfilePage() {
  const { addToast } = useNotifications();
  const [twoFactor, setTwoFactor] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
        <Breadcrumb items={[{ name: "Portal", href: "/client/dashboard" }, { name: "Profile" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 border border-indigo-500/30">
            <User className="w-4 h-4 text-indigo-400" />
          </span>
          <span>Profile & Security</span>
        </h1>
        <p className="text-xs text-slate-400">Manage your client identity, contact details, and portal security.</p>
        </div>
        <Button variant="outline" size="sm" leftIcon={<BookOpen className="w-3.5 h-3.5" />} onClick={() => setShowGuide(true)} data-testid="open-profile-dev-guide-btn" aria-label="Open developer guide for the profile page" className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/10 hover:text-white">
          Developer Guide
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Identity card */}
        <Card
          header={<div className="flex items-center gap-2"><User className="w-4 h-4 text-indigo-400" /><span className="font-bold text-white text-xs">Client Identity</span></div>}
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white text-lg font-bold">
              TS
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Suresh Krishnan</h3>
              <p className="text-xs text-slate-400">Reliance Retail · Enterprise client</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge label="Active" variant="success" />
                <Badge label="KYC Verified" variant="info" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500 font-bold"><Mail className="w-3 h-3" /> Email</div>
              <div className="mt-1 text-xs font-mono text-white">tony@ril.com</div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500 font-bold"><Phone className="w-3 h-3" /> Phone</div>
              <div className="mt-1 text-xs text-white">+1 555-0248</div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500 font-bold"><Building2 className="w-3 h-3" /> Entity</div>
              <div className="mt-1 text-xs text-white">Reliance Retail</div>
            </div>
          </div>
        </Card>

        {/* Preferences + security */}
        <div className="lg:col-span-2 space-y-6">
          <Card
            header={<div className="flex items-center gap-2"><Bell className="w-4 h-4 text-blue-400" /><span className="font-bold text-white text-xs">Notification Preferences</span></div>}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue-400 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Email alerts</div>
                    <div className="text-[10px] text-slate-500">Case updates, invoices, and hearing reminders</div>
                  </div>
                </div>
                <Switch checked={emailAlerts} onChange={setEmailAlerts} />
              </div>
              <Button variant="primary" onClick={() => addToast("Preferences Saved", "Notification preferences updated.", "success")}>
                Save Preferences
              </Button>
            </div>
          </Card>

          <Card
            header={<div className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-400" /><span className="font-bold text-white text-xs">Security</span></div>}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                <div className="flex items-start gap-3">
                  <Lock className="w-4 h-4 text-emerald-400 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Two-factor authentication</div>
                    <div className="text-[10px] text-slate-500">Protect your portal account with MFA</div>
                  </div>
                </div>
                <Switch checked={twoFactor} onChange={setTwoFactor} />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                  <KeyRound className="w-3 h-3" /> Change Password
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input type="password" placeholder="New password" />
                  <Input type="password" placeholder="Confirm password" />
                </div>
                <Button
                  variant="secondary"
                  className="mt-3"
                  onClick={() => addToast("Password Updated", "Your portal password has been rotated.", "success")}
                >
                  Update password
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <DeveloperGuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
}
