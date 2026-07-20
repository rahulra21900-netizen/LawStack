import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  weight: ["300", "400", "600", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LawStack — Practice OS for Indian Advocates & Law Firms",
  description:
    "LawStack is the invite-only practice operating system for Indian advocates and law firms — matter dockets, CNR/eCourts sync, IPC → BNS concordance, GST-compliant billing, and a closed-network client portal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${plexSans.variable} ${sourceSerif.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans"
        style={{ background: "var(--lawstack-bg)", color: "var(--lawstack-fg)" }}
      >
        <Providers>
          <ProtectedRoute>{children}</ProtectedRoute>
        </Providers>
      </body>
    </html>
  );
}
