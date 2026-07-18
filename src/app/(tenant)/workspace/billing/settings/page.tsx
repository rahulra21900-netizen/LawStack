"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button } from "@/components/ui";
import { Input } from "@/components/forms";

export default function BillingSettingsPage() {
  const { addToast } = useNotifications();
  const [partnerRate, setPartnerRate] = useState("450");

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Billing", href: "/workspace/billing" }, { name: "Settings" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Billing Terms Settings</h1>
        <p className="text-xs text-slate-400">Configure default hourly rates and invoice automation parameters.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 max-w-xl">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-850 pb-2.5">Hourly Rates</h2>
        <div className="space-y-4">
          <Input label="Default Partner Hourly Rate ($/hr)" value={partnerRate} onChange={(e) => setPartnerRate(e.target.value)} />
          <Button variant="primary" onClick={() => addToast("Save Billing Settings", "Rates configured successfully.")}>
            Save Billing Rates
          </Button>
        </div>
      </div>
    </div>
  );
}
