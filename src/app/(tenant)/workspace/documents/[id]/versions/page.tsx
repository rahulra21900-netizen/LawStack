"use client";

import React from "react";
import { MOCK_DOCUMENTS } from "@/mocks/documents";
import { Button, Badge } from "@/components/ui";

export default function VersionsTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const docData = MOCK_DOCUMENTS.find((d) => d.id === id);

  if (!docData) return null;

  return (
    <div className="space-y-6">
      <div className="border-l-2 border-slate-800 ml-4 pl-6 space-y-6 text-xs">
        <div className="relative">
          <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950" />
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">Current Active Version (v{docData.version})</span>
              <Badge label="Current" variant="success" />
            </div>
            <p className="text-slate-400">Modified by <strong>{docData.author}</strong> on {new Date(docData.updatedAt).toLocaleString()}</p>
            <p className="text-[10px] text-slate-500 leading-relaxed bg-slate-950/20 p-2 rounded">Initial index metadata classification check cleared.</p>
          </div>
        </div>

        <div className="relative">
          <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-950" />
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2 opacity-65">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">Previous Draft Version (v0.9)</span>
              <Button variant="secondary" className="px-2 py-0.5 text-[9px]">Restore</Button>
            </div>
            <p className="text-slate-400">Created by <strong>Associate Admin</strong> on {new Date(docData.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
