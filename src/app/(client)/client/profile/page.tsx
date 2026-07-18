"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { Card } from "@/components/cards";

export default function ClientProfilePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Portal", href: "/client/dashboard" }, { name: "Profile" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Your Profile</h1>
        <p className="text-xs text-slate-400">Review your client registry contact credentials.</p>
      </div>

      <Card header={<div className="font-bold text-white text-xs">Account Credentials</div>}>
        <div className="space-y-2 text-xs text-slate-350 max-w-sm">
          <div className="flex justify-between border-b border-slate-850 pb-1.5">
            <span className="text-slate-500">Full Name</span>
            <span className="font-bold text-white">Tony Stark</span>
          </div>
          <div className="flex justify-between border-b border-slate-850 pb-1.5">
            <span className="text-slate-500">Company Entity</span>
            <span className="font-semibold text-slate-300">Stark Industries</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
