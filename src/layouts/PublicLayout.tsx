"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, Menu, X, Globe } from "lucide-react";

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
            <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-wider text-blue-400">
              <Shield className="w-6 h-6 text-blue-500" />
              <span>LAWSTACK <span className="text-white text-xs font-semibold px-1.5 py-0.5 bg-blue-600 rounded">V2</span></span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Global Public Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side: Platform Login CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/platform/login"
              className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded-lg shadow-lg shadow-blue-900/35 transition-colors"
            >
              Platform Login
            </Link>
          </div>
 
          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
 
        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-900 bg-slate-950 px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-900 flex flex-col gap-2">
              <Link
                href="/platform/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-sm font-semibold bg-blue-600 text-white py-2 rounded-lg"
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
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 text-slate-500 text-xs mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-500" />
            <span className="font-semibold text-slate-400">LawStack V2 Prototype</span>
            <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">FRONTEND ONLY</span>
          </div>
          <p>© 2026 LawStack Technologies Inc. All rights reserved. For developer evaluation purposes only.</p>
        </div>
      </footer>
    </div>
  );
}
