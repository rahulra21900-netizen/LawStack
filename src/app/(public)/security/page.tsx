import React from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center relative z-10">
      <div className="w-12 h-12 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto mb-6">
        <Sparkles className="w-6 h-6 animate-pulse" />
      </div>
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
        Security Directory
      </h1>
      <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed mb-8">
        This is a placeholder page representing the upcoming security controls documentation, showing SOC 2 Type II compliance, encryption-at-rest, and tenant workspace isolation.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}
