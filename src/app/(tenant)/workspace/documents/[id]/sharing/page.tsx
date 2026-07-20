"use client";

import React from "react";
import { Card } from "@/components/cards";
import { Badge } from "@/components/ui";

export default function SharingTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card header={<div className="font-bold text-white text-[11px]">Internal sharing clearances</div>}>
          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex justify-between pb-1.5 border-b border-slate-800">
              <span className="text-white font-semibold">Priya Chandra (Lead Counsel)</span>
              <Badge label="Full Owner" variant="success" />
            </div>
            <div className="flex justify-between">
              <span className="text-white font-semibold">Associate Attorneys Group</span>
              <Badge label="Read / Edit" variant="info" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
