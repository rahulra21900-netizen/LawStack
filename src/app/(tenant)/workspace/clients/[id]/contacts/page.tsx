"use client";

import React from "react";
import { DataTable } from "@/components/tables";
import { Badge } from "@/components/ui";

export default function ContactsTab() {
  const contactsList = [
    { name: "John Stark", title: "VP Finance", email: "jstark@corporate.com", role: "Primary Contact" },
    { name: "Pepper Potts", title: "General Counsel", email: "potts@corporate.com", role: "Legal Associate" }
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Key Corporate Contacts"
        data={contactsList}
        columns={[
          { header: "Representative Name", accessor: (c) => <span className="font-bold text-white">{c.name}</span> },
          { header: "Title", accessor: (c) => <span className="text-slate-300 font-semibold">{c.title}</span> },
          { header: "Email Address", accessor: (c) => <span className="font-mono text-slate-400">{c.email}</span> },
          { header: "Assigned Role", accessor: (c) => <Badge label={c.role} variant="info" /> }
        ]}
      />
    </div>
  );
}
