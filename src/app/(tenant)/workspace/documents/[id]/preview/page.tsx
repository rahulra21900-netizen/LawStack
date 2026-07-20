"use client";

import React from "react";
import { MOCK_DOCUMENTS } from "@/mocks/documents";

export default function PreviewTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const docData = MOCK_DOCUMENTS.find((d) => d.id === id);

  if (!docData) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Bookmarks / Outline outline */}
        <div className="md:col-span-1 bg-slate-950/40 border border-slate-800 p-4 rounded-xl space-y-3 text-xs">
          <h3 className="font-bold text-white uppercase tracking-wider text-[10px]">Outline Outline</h3>
          <div className="space-y-2 text-slate-400">
            <div className="p-1 hover:text-white cursor-pointer font-semibold border-l border-blue-500 pl-2">I. Recitals & Parties</div>
            <div className="p-1 hover:text-white cursor-pointer pl-3">II. Sublicense clearances</div>
            <div className="p-1 hover:text-white cursor-pointer pl-3">III. Governing Jurisdiction</div>
            <div className="p-1 hover:text-white cursor-pointer pl-2">IV. Execution & Signatures</div>
          </div>
        </div>

        {/* Visual page sheet preview layout */}
        <div className="md:col-span-3 bg-slate-950 border border-slate-800 p-8 rounded-xl min-h-[400px] flex flex-col justify-between text-xs text-slate-400 relative">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <span className="font-bold uppercase tracking-wider text-white">Cover Sheet Contract Outline</span>
              <span className="font-mono text-[10px]">Page 1 of 4</span>
            </div>
            <h2 className="text-sm font-bold text-white text-center pt-8">{docData.title}</h2>
            <p className="text-center text-[10px] text-slate-500">Draft version: v{docData.version} • Author owner: {docData.author}</p>
            
            <p className="pt-8 leading-relaxed max-w-lg mx-auto">
              This sub-licensing agreement (the "Contract") is entered into this date by and between Chandra & Associates associates and key primary corporate clients, establishing rules of litigation discovery filings and patents retention periods.
            </p>
          </div>
          <div className="border-t border-slate-900 pt-3 text-center text-[10px] text-slate-500">
            Confidential Document - Shared legal practice scope
          </div>
        </div>
      </div>
    </div>
  );
}
