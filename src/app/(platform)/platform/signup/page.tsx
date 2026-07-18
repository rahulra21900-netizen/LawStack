"use client";

import React from "react";
import Link from "next/link";

export default function PlatformSignupPage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-3 text-xs">
      <h1 className="text-lg font-bold text-white">SaaS Registration Locked</h1>
      <p className="text-slate-400">Platform administrator accounts must be provisioned directly via internal credentials CLI.</p>
      <Link href="/platform/login" className="text-blue-400 hover:underline block">Back to Login</Link>
    </div>
  );
}
