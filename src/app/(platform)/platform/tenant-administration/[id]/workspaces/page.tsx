"use client";

import React from "react";
import { Card } from "@/components/cards";
import { Badge } from "@/components/ui";

export default function WorkspacesTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card header={<div className="font-bold text-white text-xs">Primary Workspace Room</div>}>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center pb-1.5 border-b border-slate-800 text-slate-400">
              <span>Workspace Name</span>
              <span className="text-white font-semibold">Oakwood Master Workspace</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Status</span>
              <Badge label="Provisioned" variant="success" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
