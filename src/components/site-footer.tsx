// Copy revised by Claude Code — review before deploy
import Link from "next/link";
import { ShrouDBMark } from "@/brand/marks";
import { Wordmark } from "./wordmark";
import { engines } from "@/brand/engines";

const LINK_GROUPS = [
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
      { href: "https://github.com/shroudb", label: "GitHub" },
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

export function SiteFooter() {
  return (
    <footer className="border-t border-base-800 bg-base-black">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <ShrouDBMark size={28} />
              <Wordmark className="text-lg" />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-base-500">
              Nine security engines, one binary. Built for developers who&apos;d
              rather ship than integrate.
            </p>
          </div>

          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-base-500">
                {group.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-base-300 transition-colors hover:text-base-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-base-800 pt-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-base-500">
            Engines
          </h3>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {engines.map((engine) => (
              <li key={engine.key}>
                <Link
                  href={`/engines/${engine.key}`}
                  className="text-sm text-base-300 transition-colors hover:text-base-cream"
                >
                  {engine.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-base-800 pt-6 text-xs text-base-700 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} ShrouDB. A Skeptik Labs product.
          </span>
          <span className="font-mono">shroudb.io · shroudb.dev</span>
        </div>
      </div>
    </footer>
  );
}
