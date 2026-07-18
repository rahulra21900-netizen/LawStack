"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { Card } from "@/components/cards";

export default function ClientMessagesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Portal", href: "/client/dashboard" }, { name: "Messages" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Legal Discussion Thread</h1>
        <p className="text-xs text-slate-400">Conversations history with your counsel representative.</p>
      </div>

      <Card header={<div className="font-bold text-white text-xs">Harvey Specter</div>}>
        <p className="text-xs text-slate-300 leading-relaxed">
          "We have filed the sublicense briefs in Delaware. Let's arrange a prep session before the hearing next week."
        </p>
      </Card>
    </div>
  );
}
