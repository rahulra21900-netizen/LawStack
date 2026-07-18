"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { Card } from "@/components/cards";
import { MOCK_TENANTS } from "@/mocks/tenants";
import Link from "next/link";

export default function WorkspaceSelectorPage() {
  return (
    <div className="max-w-xl mx-auto mt-16 space-y-6 text-xs">
      <div className="space-y-1 text-center">
        <h1 className="text-lg font-bold text-white">Select Firm Workspace</h1>
        <p className="text-slate-400">Choose a subscribed firm practice workspace namespace to continue.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_TENANTS.map((t) => (
          <Link key={t.id} href="/workspace/dashboard" className="block">
            <Card header={<div className="font-bold text-white">{t.name}</div>} className="hover:border-blue-500 transition-colors">
              <div className="flex justify-between items-center text-slate-400">
                <span>Namespace ID: <strong className="font-mono text-slate-200">{t.id}</strong></span>
                <span className="text-blue-400 font-semibold">Enter Workspace &rarr;</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
