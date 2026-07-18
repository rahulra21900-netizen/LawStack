"use client";

import React from "react";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_USERS } from "@/mocks/users";
import { Users } from "lucide-react";

export default function TeamMembersPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Team", href: "/workspace/team" }, { name: "Members" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-500" />
          <span>Members Directory</span>
        </h1>
        <p className="text-xs text-slate-400">View Oakwood LLP associate clearances and permissions.</p>
      </div>

      <DataTable
        title="Complete Employee Roster"
        data={MOCK_USERS}
        columns={[
          { header: "Associate Name", accessor: (u) => <span className="font-bold text-white">{u.name}</span> },
          { header: "Email Address", accessor: (u) => <span className="font-mono text-slate-400">{u.email}</span> },
          { header: "Administrative Role", accessor: (u) => <Badge label={u.role} variant="info" /> }
        ]}
      />
    </div>
  );
}
