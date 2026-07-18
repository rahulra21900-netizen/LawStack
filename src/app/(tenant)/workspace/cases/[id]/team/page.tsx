"use client";

import React from "react";
import { MOCK_USERS } from "@/mocks/users";
import { DataTable } from "@/components/tables";
import { Badge } from "@/components/ui";

export default function TeamTab({ params }: { params: Promise<{ id: string }> }) {
  // Case assigned legal staff
  const assignedTeam = MOCK_USERS.slice(3, 7); // Harvey, Mike, Rachel, Donna

  return (
    <div className="space-y-6">
      <DataTable
        title="Legal Counsel Team Assigned"
        data={assignedTeam}
        columns={[
          { header: "Attorney Name", accessor: (u) => <span className="font-bold text-white">{u.name}</span> },
          { header: "Email Address", accessor: (u) => <span className="font-mono text-slate-400">{u.email}</span> },
          { header: "Cleared Role", accessor: (u) => <Badge label={u.role} variant="info" /> }
        ]}
      />
    </div>
  );
}
