"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button } from "@/components/ui";
import { Input, Switch } from "@/components/forms";
import { Settings, Save } from "lucide-react";

export default function WorkspaceSettingsPage() {
  const { addToast } = useNotifications();
  const [firmName, setFirmName] = useState("Chandra & Associates");
  const [allowAI, setAllowAI] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Settings" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700/40 border border-slate-600/40">
              <Settings className="w-4 h-4 text-slate-300" />
            </span>
            <span>Workspace Preferences</span>
          </h1>
          <p className="text-xs text-slate-400">Configure firm profile details, theme settings, and module locks.</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Save className="w-4 h-4" />}
          onClick={() => addToast("Save Preferences", "Settings saved successfully (simulated).", "success")}
        >
          Save Workspace Settings
        </Button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 max-w-xl">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-850 pb-2.5">
          General Preferences
        </h2>
        <div className="space-y-4">
          <Input
            label="Simulated Law Firm Name"
            value={firmName}
            onChange={(e) => setFirmName(e.target.value)}
          />
          <div className="pt-2">
            <Switch
              checked={allowAI}
              onChange={(val) => {
                setAllowAI(val);
                addToast("Setting Toggled", "AI services clearance updated.", "warning");
              }}
              label="Clear Attorney Clearance to leverage AI Assistants"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
