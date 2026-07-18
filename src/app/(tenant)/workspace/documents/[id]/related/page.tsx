"use client";

import React from "react";
import { Card } from "@/components/cards";
import { MOCK_DOCUMENTS } from "@/mocks/documents";
import { MOCK_CASES } from "@/mocks/cases";
import { MOCK_CLIENTS } from "@/mocks/clients";
import Link from "next/link";

export default function RelatedRecordsTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const docData = MOCK_DOCUMENTS.find((d) => d.id === id);

  if (!docData) return null;

  const linkedCase = MOCK_CASES.find((c) => c.id === docData.caseId);
  const linkedClient = linkedCase ? MOCK_CLIENTS.find((c) => c.id === linkedCase.clientId) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {linkedCase && (
          <Card header={<div className="font-bold text-white text-xs">Linked Case Matter</div>}>
            <div className="space-y-3 text-xs">
              <p className="text-slate-400 font-semibold">{linkedCase.title}</p>
              <p className="text-[10px] text-slate-500">Case Number: {linkedCase.caseNumber} • Lead: {linkedCase.leadCounsel}</p>
              <Link href={`/workspace/cases/${linkedCase.id}`} className="text-[10px] text-blue-400 hover:underline block pt-2">
                Open Case Matter File →
              </Link>
            </div>
          </Card>
        )}

        {linkedClient && (
          <Card header={<div className="font-bold text-white text-xs">Linked Client Profile</div>}>
            <div className="space-y-3 text-xs">
              <p className="text-slate-400 font-semibold">{linkedClient.name}</p>
              <p className="text-[10px] text-slate-500">Company: {linkedClient.companyName || "Personal Case"} • Status: {linkedClient.status}</p>
              <Link href={`/workspace/clients/${linkedClient.id}`} className="text-[10px] text-blue-400 hover:underline block pt-2">
                Open Client Profile →
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
