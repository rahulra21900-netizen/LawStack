"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button } from "@/components/ui";
import { Input, Select, Switch } from "@/components/forms";

export default function UserProfileCenterPage() {
  const { addToast } = useNotifications();
  const [theme, setTheme] = useState("Dark");

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Profile" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Profile & Preferences</h1>
        <p className="text-xs text-slate-400">Configure visual themes, language settings, and API credentials.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 max-w-xl text-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-850 pb-2.5">
          General Preferences
        </h2>
        <div className="space-y-4">
          <Select
            label="Visual Appearance Theme"
            options={[
              { label: "Dark theme (Recommended)", value: "Dark" },
              { label: "Light theme", value: "Light" }
            ]}
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />
          <div className="pt-2">
            <Button variant="primary" onClick={() => addToast("Preferences Saved", "General theme settings saved successfully.")}>
              Save Preferences
            </Button>
          </div>
        </div>

        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-850 pb-2.5 pt-4">
          Developer API Clearances
        </h2>
        <div className="space-y-2">
          <p className="text-slate-500">API Key token</p>
          <input
            type="text"
            readOnly
            value="sk_live_88402941c9dd64..."
            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-400 font-mono"
          />
        </div>
      </div>
    </div>
  );
}
