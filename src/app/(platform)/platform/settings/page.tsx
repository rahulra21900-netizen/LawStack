"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button } from "@/components/ui";
import { Input, Switch } from "@/components/forms";

export default function PlatformSettingsPage() {
  const { addToast } = useNotifications();
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Platform", href: "/platform/dashboard" }, { name: "Settings" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Platform Control settings</h1>
        <p className="text-xs text-slate-400">Configure global SaaS security settings and maintenance overrides.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 max-w-xl">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-850 pb-2.5">
          Global Maintenance Locks
        </h2>
        <div className="space-y-4">
          <Switch
            checked={maintenance}
            onChange={(val) => {
              setMaintenance(val);
              addToast("Maintenance Lock Updated", "Global SaaS maintenance mode lock state toggled.", "warning");
            }}
            label="Enable global maintenance mode. Locks out non-admin platform logins."
          />
          <div className="pt-2">
            <Button variant="primary" onClick={() => addToast("Save Settings", "Settings saved successfully.")}>
              Save settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
