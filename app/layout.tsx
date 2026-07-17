import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://lrinfosec.com",
  ),
  title: { default: "LR InfoSec Lab — AI Security & Incident Response", template: "%s · LR InfoSec Lab" },
  description: "Open field notes, tested playbooks, and technical analysis for AI security and incident response practitioners.",
  icons: { icon: "/favicon.svg" },
  openGraph: { type: "website", title: "LR InfoSec Lab", description: "Incident response and AI security, from the field.", images: [{ url: "/og-blue.png", width: 1200, height: 630, alt: "LR InfoSec Lab — Incident response and AI security, from the field" }] },
  twitter: { card: "summary_large_image", title: "LR InfoSec Lab", description: "Incident response and AI security, from the field.", images: ["/og-blue.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
