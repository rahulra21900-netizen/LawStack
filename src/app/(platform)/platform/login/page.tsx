"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { Input } from "@/components/forms";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PlatformLoginPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    addToast("Platform Authorization", "Authenticated successfully as Administrator.", "success");
    router.push("/platform/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-xs">
      <div className="space-y-1 text-center">
        <h1 className="text-lg font-bold text-white">SaaS Control Plane Login</h1>
        <p className="text-slate-450">Administrative portal access only.</p>
      </div>
      <div className="space-y-3">
        <Input label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@lawstack.com" />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        <Button variant="primary" className="w-full" onClick={handleLogin}>Log In</Button>
      </div>
    </div>
  );
}
