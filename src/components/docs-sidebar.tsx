"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { engines } from "@/brand/engines";
import { getProductColor } from "@/brand/marks";

type NavSection = {
  title: string;
  links: Array<{ href: string; label: string; color?: string }>;
};

const DOCS_NAV: NavSection[] = [
  {
    title: "Getting Started",
    links: [
      { href: "/docs", label: "Overview" },
      { href: "/docs/install", label: "Installation" },
      { href: "/docs/quickstart", label: "Quickstart" },
      { href: "/docs/architecture", label: "Architecture" },
    ],
  },
  {
    title: "Deployment",
    links: [
      { href: "/docs/moat", label: "Moat" },
      { href: "/docs/cloud", label: "Cloud" },
    ],
  },
  {
    title: "Engines",
    links: engines.map((engine) => ({
      href: `/engines/${engine.key}`,
      label: engine.name,
      color: getProductColor(engine.key).primary,
    })),
  },
  {
    title: "Reference",
    links: [
      { href: "/docs/config", label: "CONFIG commands" },
      { href: "/docs/telemetry", label: "Telemetry" },
      { href: "/docs/security", label: "Security model" },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs" className="text-sm">
      {DOCS_NAV.map((section) => (
        <div key={section.title} className="mb-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-base-500">
            {section.title}
          </h2>
          <ul className="space-y-0.5">
            {section.links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-md border-l-2 px-3 py-1.5 transition-colors",
                      active
                        ? "border-brand-core bg-base-dark text-base-cream"
                        : "border-transparent text-base-300 hover:bg-base-800/50 hover:text-base-cream",
                    )}
                    style={
                      active && link.color
                        ? {
                            borderLeftColor: link.color,
                            color: link.color,
                          }
                        : undefined
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
