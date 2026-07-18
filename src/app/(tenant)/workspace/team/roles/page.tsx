"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";

export default function TeamRolesPage() {
  const rolesList = [
    { role: "Partner", dept: "Litigation", access: "Full Control / Owner" },
    { role: "Associate Attorney", dept: "Intellectual Property", access: "Read / Edit / Write dockets" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Team", href: "/workspace/team" }, { name: "Roles" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Role Access Authorizations</h1>
        <p className="text-xs text-slate-400">Review permission tags mapped to departments.</p>
      </div>

      <DataTable
        data={rolesList}
        columns={[
          { header: "Role Designation", accessor: (r) => <span className="font-bold text-white">{r.role}</span> },
          { header: "Practice Department", accessor: (r) => <span>{r.dept}</span> },
          { header: "Access Level Authorization", accessor: (r) => <Badge label={r.access} variant="info" /> }
        ]}
      />
    </div>
  );
}
