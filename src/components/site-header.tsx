import Link from "next/link";
import { ShrouDBMark } from "@/brand/marks";
import { Wordmark } from "./wordmark";

const NAV = [
  { href: "/engines", label: "Engines" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/cloud", label: "Cloud" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-base-800 bg-base-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="ShrouDB home">
          <ShrouDBMark size={28} />
          <Wordmark className="text-lg" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-base-300 transition-colors hover:bg-base-800/60 hover:text-base-cream"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="https://github.com/shroudb"
            className="hidden rounded-md px-3 py-1.5 text-sm text-base-300 transition-colors hover:bg-base-800/60 hover:text-base-cream sm:inline-block"
          >
            GitHub
          </Link>
          <Link
            href="https://app.shroudb.io/signup"
            className="rounded-md bg-brand-core px-3 py-1.5 text-sm font-medium text-base-cream transition-colors hover:bg-brand-core-light"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
