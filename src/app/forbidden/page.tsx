"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="max-w-md mx-auto mt-32 p-8 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-4 text-xs">
      <ShieldAlert className="w-12 h-12 text-red-500 mx-auto animate-bounce" />
      <h1 className="text-lg font-bold text-white">403 - Permission Denied</h1>
      <p className="text-slate-400 leading-relaxed">
        Access forbidden. Your administrative clearance level is insufficient to write to this namespace.
      </p>
      <Link href="/workspace/dashboard" className="text-blue-400 hover:underline block font-bold">
        Back to Dashboard
      </Link>
    </div>
  );
}
