"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="max-w-md mx-auto mt-32 p-8 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-4 text-xs">
      <ShieldAlert className="w-12 h-12 text-red-500 mx-auto animate-bounce" />
      <h1 className="text-lg font-bold text-white">401 - Session Unauthorized</h1>
      <p className="text-slate-400 leading-relaxed">
        You do not have active session credentials for this namespace. Please log in again to authenticate credentials.
      </p>
      <Link href="/tenant/login" className="text-blue-400 hover:underline block font-bold">
        Back to Login
      </Link>
    </div>
  );
}
