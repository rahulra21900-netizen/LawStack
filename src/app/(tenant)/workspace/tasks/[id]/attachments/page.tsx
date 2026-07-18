"use client";

import React from "react";
import { Card } from "@/components/cards";
import { FileText } from "lucide-react";

export default function AttachmentsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card header={<div className="font-bold text-white text-[11px]">Linked Contract Brief</div>}>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Wayne_Sublicense_Agreement.pdf</span>
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
