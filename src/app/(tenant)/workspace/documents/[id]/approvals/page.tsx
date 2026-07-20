"use client";

import React from "react";
import { Card } from "@/components/cards";
import { Badge } from "@/components/ui";

export default function ApprovalsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card header={<div className="font-bold text-white text-[11px]">Primary Approvals Pipeline</div>}>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-slate-400">Review Status</span>
              <Badge label="Approved" variant="success" />
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Assigned Reviewer</span>
              <span className="text-white font-semibold">Priya Chandra</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
