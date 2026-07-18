"use client";

import React from "react";
import Link from "next/link";

export default function JoinWorkspacePage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-3 text-xs">
      <h1 className="text-lg font-bold text-white">Join Workspace Room</h1>
      <p className="text-slate-400">Redirecting to designated firm practice workspace namespace room.</p>
      <Link href="/tenant/login" className="text-blue-400 hover:underline block">Back to Login</Link>
    </div>
  );
}
