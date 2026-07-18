"use client";

import React from "react";
import { MOCK_USERS } from "@/mocks/users";
import { DataTable } from "@/components/tables";
import { Badge } from "@/components/ui";

export default function UsersTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const tenantUsers = MOCK_USERS.filter((u) => u.tenantId === id);

  return (
    <div className="space-y-6">
      <DataTable
        title="Provisioned User Accounts"
        data={tenantUsers}
        columns={[
          { header: "Name", accessor: (u) => <span className="font-bold text-white">{u.name}</span> },
          { header: "Email", accessor: (u) => <span className="font-mono text-slate-400">{u.email}</span> },
          { header: "Designated Role", accessor: (u) => <Badge label={u.role} variant="info" /> }
        ]}
      />
    </div>
  );
}
