"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { Input } from "@/components/forms";
import { useRouter } from "next/navigation";

export default function TenantLoginPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    addToast("Tenant Authorized", "Welcome to practice room master workspace.", "success");
    router.push("/workspace-selector");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-xs">
      <div className="space-y-1 text-center">
        <h1 className="text-lg font-bold text-white">LawStack Tenant Login</h1>
        <p className="text-slate-450">Access your firm practice dockets.</p>
      </div>
      <div className="space-y-3">
        <Input label="Firm Email address" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="attorney@oakwood.com" />
        <Button variant="primary" className="w-full" onClick={handleLogin}>Log In</Button>
      </div>
    </div>
  );
}
