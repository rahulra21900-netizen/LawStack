"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";
import { Shield, Menu, X, Globe, ArrowRight, Scale, Sun, Moon } from "lucide-react";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomePage = pathname === "/";

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Solutions", href: "/solutions" },
    { name: "Pricing", href: "/pricing" },
    { name: "Security", href: "/security" },
    { name: "Documentation", href: "/documentation" },
  ];

  const footerCols = [
    {
      title: "Platform",
      links: [
        { name: "Features", href: "/features" },
        { name: "Solutions", href: "/solutions" },
        { name: "Pricing", href: "/pricing" },
        { name: "Security", href: "/security" },
      ],
    },
    {
      title: "Workspaces",
      links: [
        { name: "Platform Login", href: "/platform/login" },
        { name: "Client Portal", href: "/client/dashboard" },
        { name: "Developer Simulator", href: "/dev" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/documentation" },
        { name: "Resources", href: "/resources" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ];

  if (isHomePage) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-slate-950 text-white flex flex-col font-sans justify-between">
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 border-b border-slate-900 bg-slate-950/90 backdrop-blur-md shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 font-bold tracking-wider text-blue-400 group">
                <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/15 border border-blue-500/30 transition-colors group-hover:bg-blue-600/25">
                  <Scale className="h-4 w-4 text-blue-400" />
                </span>
                <span className="text-base">
                  LAWSTACK{" "}
                  <span className="text-white text-[10px] font-semibold px-1.5 py-0.5 bg-blue-600 rounded ml-0.5">
                    V2
                  </span>
                </span>
              </Link>

              <nav className="hidden lg:flex items-center gap-1" aria-label="Global Public Navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900/60 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Invite-Only Enterprise Platform
              </span>

              {/* Theme Switcher */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white transition-colors focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle color theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
              </button>

              <Link
                href="/platform/login"
                className="group inline-flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg shadow-lg shadow-blue-900/30 transition-all hover:-translate-y-0.5"
              >
                <span>Platform Login</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Main 100vh viewport content */}
        <main className="flex-1 overflow-hidden flex flex-col justify-center">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded z-50">
        Skip to main content
      </a>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold tracking-wider text-blue-400 group">
              <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/15 border border-blue-500/30 transition-colors group-hover:bg-blue-600/25">
                <Scale className="h-4 w-4 text-blue-400" />
              </span>
              <span className="text-base">
                LAWSTACK{" "}
                <span className="text-white text-[10px] font-semibold px-1.5 py-0.5 bg-blue-600 rounded ml-0.5">
                  V2
                </span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Global Public Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900/60 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/platform/login"
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg shadow-lg shadow-blue-900/30 transition-all hover:-translate-y-0.5"
            >
              Platform Login
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 font-bold tracking-wider text-blue-400">
                <Shield className="h-5 w-5 text-blue-500" />
                <span className="text-base">LAWSTACK V2</span>
              </Link>
              <p className="mt-4 text-xs text-slate-500 leading-relaxed max-w-xs">
                The enterprise operating system for modern legal workspaces. Secure, multi-tenant, and AI-assisted.
              </p>
            </div>

            {footerCols.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-300">{col.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.name}>
                      <Link href={l.href} className="text-xs text-slate-500 hover:text-white transition-colors">
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">
              © 2026 LawStack Technologies Inc. All rights reserved. Developer prototype.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
