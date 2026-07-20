"use client";

import React from "react";
import { Card } from "@/components/cards";
import { Badge } from "@/components/ui";

export default function ParticipantsTab() {
  const participants = [
    { name: "Hon. Justice Anil Kumar", role: "Presiding Judge", status: "Present" },
    { name: "Priya Chandra", role: "Lead Case Counsel", status: "Present" },
    { name: "Robert Zane", role: "Opposing Lead Counsel", status: "Present" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {participants.map((p, idx) => (
          <Card key={idx} header={<div className="font-bold text-white text-xs">{p.role}</div>}>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">{p.name}</span>
              <Badge label={p.status} variant="success" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
