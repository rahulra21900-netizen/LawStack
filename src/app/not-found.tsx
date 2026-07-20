import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 py-16 bg-slate-950 overflow-hidden">
      {/* Ambient glow limited to bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[240px] z-0">
        <div className="absolute left-1/2 top-1/2 h-[220px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-xl text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/15 border border-blue-500/30 text-blue-300 mb-6">
          <Compass className="w-6 h-6" />
        </div>

        <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-slate-500 mb-3">Error 404</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          This chamber is out of the docket
        </h1>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          The page you requested is not registered in this tenant&apos;s namespace. It may have been archived,
          restricted by an access rule, or never existed.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/25 border border-blue-400/30 transition-all hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            Return to home
          </Link>
          <Link
            href="/workspace/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 px-5 py-2.5 text-xs font-bold text-slate-300 hover:text-white transition-all"
          >
            Open workspace
          </Link>
        </div>
      </div>
    </div>
  );
}
