"use client";

import React from "react";
import { Breadcrumb, Button } from "@/components/ui";
import { Shield } from "lucide-react";
import Link from "next/link";

export default function ProvisioningPage() {
  return (
    <div className="space-y-6 text-center max-w-md mx-auto pt-12 text-xs">
      <Shield className="w-12 h-12 text-blue-500 mx-auto animate-pulse" />
      <h1 className="text-lg font-bold text-white">Tenant Provisioning Portal</h1>
      <p className="text-slate-400 leading-relaxed">
        SaaS administrators can initialize new clear databases namespaces, assign roles permissions schemas, and designate admin credentials.
      </p>
      <Link href="/platform/tenant-provisioning/new">
        <Button variant="primary" className="w-full">Launch Provisioning Wizard</Button>
      </Link>
    </div>
  );
}
