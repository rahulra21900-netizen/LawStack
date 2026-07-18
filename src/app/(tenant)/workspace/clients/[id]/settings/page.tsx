"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { Input, Switch } from "@/components/forms";

export default function SettingsTab() {
  const { addToast } = useNotifications();
  const [allowPortal, setAllowPortal] = useState(true);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 max-w-xl">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-850 pb-2.5">
          Portal access & clearances
        </h2>
        <div className="space-y-4">
          <Switch
            checked={allowPortal}
            onChange={(val) => {
              setAllowPortal(val);
              addToast("Security Updated", "Secure client portal lock status updated.", "warning");
            }}
            label="Grant client security clearance to view files in shared Client Workspace portal"
          />
          <div className="pt-2">
            <Button variant="primary" onClick={() => addToast("Save Preferences", "Settings saved successfully.")}>
              Save Client Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
