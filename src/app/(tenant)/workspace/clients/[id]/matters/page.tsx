"use client";

import React from "react";
import { MOCK_CASES } from "@/mocks/cases";
import { DataTable } from "@/components/tables";
import { Badge } from "@/components/ui";
import Link from "next/link";

export default function MattersTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const clientMatters = MOCK_CASES.filter((c) => c.clientId === id);

  return (
    <div className="space-y-6">
      <DataTable
        title="Associated Legal Matters"
        data={clientMatters}
        columns={[
          {
            header: "Case Title",
            accessor: (c) => (
              <Link href={`/workspace/cases/${c.id}`} className="font-bold text-blue-400 hover:underline">
                {c.title}
              </Link>
            )
          },
          { header: "Case Number", accessor: (c) => <span className="font-mono text-[10px] text-slate-400">{c.caseNumber}</span> },
          { header: "Practice Area", accessor: (c) => <span>{c.practiceArea}</span> },
          { header: "Status", accessor: (c) => <Badge label={c.status} variant={c.status === "Active" ? "success" : "neutral"} /> }
        ]}
      />
    </div>
  );
}
