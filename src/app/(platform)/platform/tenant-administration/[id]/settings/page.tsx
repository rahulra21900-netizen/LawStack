"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { Switch } from "@/components/forms";

export default function SettingsTab() {
  const { addToast } = useNotifications();
  const [locked, setLocked] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 max-w-xl">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-850 pb-2.5">
          Namespace Lockdown Status
        </h2>
        <div className="space-y-4">
          <Switch
            checked={locked}
            onChange={(val) => {
              setLocked(val);
              addToast("Namespace Locked", "Namespace lockdown active.", "warning");
            }}
            label="Enable SaaS Platform admin lockdown. Restricts writing to all tenant databases."
          />
          <div className="pt-2">
            <Button variant="primary" onClick={() => addToast("Save Settings", "Settings saved successfully.")}>
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
