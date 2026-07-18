"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button } from "@/components/ui";
import { Input, Switch } from "@/components/forms";

export default function AiSettingsPage() {
  const { addToast } = useNotifications();
  const [temperature, setTemperature] = useState("0.2");
  const [allowAi, setAllowAi] = useState(true);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "AI Workspace", href: "/workspace/ai-workspace/dashboard" }, { name: "Settings" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">AI Assistant Parameters Settings</h1>
        <p className="text-xs text-slate-400">Configure LLM temperature, security clearance scopes, and model references.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 max-w-xl">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-850 pb-2.5">LLM parameters</h2>
        <div className="space-y-4">
          <Input label="Model Temperature (0.0 to 1.0 for creative drafts)" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
          <Switch
            checked={allowAi}
            onChange={(val) => {
              setAllowAi(val);
              addToast("Preferences Updated", "Model locks toggled.");
            }}
            label="Allow AI model to analyze uploaded PDF contract briefs (simulated)"
          />
          <Button variant="primary" onClick={() => addToast("Save Settings", "Parameters saved successfully.")}>
            Save AI Parameters
          </Button>
        </div>
      </div>
    </div>
  );
}
