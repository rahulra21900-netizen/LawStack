"use client";

import React from "react";
import { Shield } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="max-w-md mx-auto mt-32 p-8 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-4 text-xs">
      <Shield className="w-12 h-12 text-blue-500 mx-auto animate-pulse" />
      <h1 className="text-lg font-bold text-white">SaaS Platform Maintenance</h1>
      <p className="text-slate-400 leading-relaxed">
        System is currently locked for database schema upgrades. Access will restore shortly.
      </p>
    </div>
  );
}
