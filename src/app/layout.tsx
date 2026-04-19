import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader, SiteFooter } from "@skeptik/ui";
import { ShrouDBMark } from "@/brand/marks";
import { Wordmark } from "@/components/wordmark";
import { engines } from "@/brand/engines";
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

const logo = (
  <>
    <ShrouDBMark size={28} />
    <Wordmark className="text-lg" />
  </>
);

const nav = [
  { href: "/engines", label: "Engines" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/cloud", label: "Cloud" },
];

const footerLinkGroups = [
  {
    title: "Product",
    links: [
      { href: "/cloud", label: "Cloud" },
      { href: "/moat", label: "Moat" },
      { href: "/pricing", label: "Pricing" },
      { href: "/docs", label: "Docs" },
    ],
  },
  {
    title: "Developers",
    links: [
      { href: "/docs/quickstart", label: "Quickstart" },
      { href: "/docs/install", label: "Install" },
      { href: "/docs/architecture", label: "Architecture" },
      { href: "https://github.com/shroudb", label: "GitHub", external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/docs/security", label: "Security" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${dmSans.variable} ${jetBrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <SiteHeader
          logo={logo}
          nav={nav}
          actions={[
            { href: "https://github.com/shroudb", label: "GitHub", variant: "ghost", external: true },
            { href: "https://app.shroudb.io/signup", label: "Get started", external: true },
          ]}
        />
        <main className="flex-1">{children}</main>
        <SiteFooter
          logo={logo}
          description="Nine security engines, one binary. Built for developers who'd rather ship than integrate."
          linkGroups={footerLinkGroups}
          legal={{ holder: "ShrouDB", notice: "A Skeptik Labs product" }}
          trailingText="shroudb.io · shroudb.dev"
        >
          <div className="mt-10 border-t border-border pt-6">
            <h3 className="mono-label text-muted-foreground">Engines</h3>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {engines.map((engine) => (
                <li key={engine.key}>
                  <Link
                    href={`/engines/${engine.key}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {engine.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </SiteFooter>
        <Analytics />
      </body>
    </html>
  );
}
