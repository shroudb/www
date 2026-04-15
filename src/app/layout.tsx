// Copy revised by Claude Code — review before deploy
import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ShrouDB — Security infrastructure that just works",
    template: "%s · ShrouDB",
  },
  description:
    "Replace seven security vendors with one binary. Credentials, encryption, search, authz, certificates, secrets, notifications, and audit — wired up and ready to ship.",
  metadataBase: new URL("https://shroudb.io"),
  openGraph: {
    type: "website",
    url: "https://shroudb.io",
    title: "ShrouDB — Security infrastructure that just works",
    description:
      "Replace seven security vendors with one binary. Nine engines, one auth model, one config — wired up and ready to ship.",
    siteName: "ShrouDB",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShrouDB — Security infrastructure that just works",
    description:
      "Replace seven security vendors with one binary. Nine engines, one auth model, one config — wired up and ready to ship.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetBrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
