"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, Menu, X, Globe, ArrowRight, Scale } from "lucide-react";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Solutions", href: "/solutions" },
    { name: "Pricing", href: "/pricing" },
    { name: "Security", href: "/security" },
    { name: "Resources", href: "/resources" },
    { name: "Documentation", href: "/documentation" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
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
        { name: "Tenant Login", href: "/tenant/login" },
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

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      {/* Skip Link for Accessibility */}
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

            {/* Desktop Navigation Links */}
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

          {/* Right side: CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/tenant/login"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-md transition-colors"
            >
              Tenant Login
            </Link>
            <Link
              href="/platform/login"
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg shadow-lg shadow-blue-900/30 transition-all hover:-translate-y-0.5"
            >
              Platform Login
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-900 bg-slate-950 px-4 pt-3 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-900 flex flex-col gap-2">
              <Link
                href="/tenant/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-sm font-semibold text-slate-200 border border-slate-800 py-2 rounded-lg"
              >
                Tenant Login
              </Link>
              <Link
                href="/platform/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-sm font-bold bg-blue-600 text-white py-2 rounded-lg"
              >
                Platform Login
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main content slot */}
      <main id="main-content" className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 font-bold tracking-wider text-blue-400">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/15 border border-blue-500/30">
                  <Scale className="h-4 w-4 text-blue-400" />
                </span>
                <span className="text-base">LAWSTACK <span className="text-white text-[10px] font-semibold px-1.5 py-0.5 bg-blue-600 rounded">V2</span></span>
              </Link>
              <p className="mt-4 text-xs text-slate-500 leading-relaxed max-w-xs">
                The enterprise operating system for modern legal workspaces. Secure, multi-tenant, and AI-assisted.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/60 px-2 py-1 text-[10px] font-semibold text-slate-400">
                <Globe className="h-3 w-3 text-blue-500" />
                <span>FRONTEND ONLY PROTOTYPE</span>
              </div>
            </div>

            {/* Link columns */}
            {footerCols.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-300">{col.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.name}>
                      <Link
                        href={l.href}
                        className="text-xs text-slate-500 hover:text-white transition-colors"
                      >
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
              © 2026 LawStack Technologies Inc. All rights reserved. For developer evaluation purposes only.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-slate-500">
              <Link href="/security" className="hover:text-white transition-colors">Security</Link>
              <Link href="/documentation" className="hover:text-white transition-colors">Docs</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
