"use client";

import React from "react";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-slate-800/60 rounded-lg ${className}`} />
  );
}

export function SkeletonTable() {
  return (
    <div className="space-y-4 w-full">
      <Skeleton className="h-8 w-1/4" />
      <div className="space-y-2 border border-slate-800 p-4 rounded-xl">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-28 w-full" />
      ))}
    </div>
  );
}
