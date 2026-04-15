import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function DocsHeader({
  eyebrow,
  title,
  tagline,
}: {
  eyebrow?: string;
  title: string;
  tagline?: string;
}) {
  return (
    <header className="mb-10">
      {eyebrow && (
        <div className="mb-2 font-mono text-xs uppercase tracking-widest text-base-500">
          {eyebrow}
        </div>
      )}
      <h1 className="display text-4xl text-base-cream md:text-5xl">{title}</h1>
      {tagline && (
        <p className="mt-3 text-lg text-base-300">{tagline}</p>
      )}
    </header>
  );
}

export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="mt-12 text-2xl font-semibold tracking-tight text-base-cream"
    >
      {children}
    </h2>
  );
}

export function H3({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3
      id={id}
      className="mt-8 text-lg font-semibold text-base-cream"
    >
      {children}
    </h3>
  );
}

export function P({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mt-4 text-base leading-relaxed text-base-300", className)}>
      {children}
    </p>
  );
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-4 space-y-2 text-base text-base-300">{children}</ul>
  );
}

export function LI({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span
        aria-hidden
        className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-brand-core-light"
      />
      <span>{children}</span>
    </li>
  );
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-brand-core-light underline-offset-4 hover:underline"
    >
      {children}
    </Link>
  );
}

export function Callout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <aside className="mt-6 rounded-lg border border-brand-core/30 bg-brand-core/5 p-4">
      {title && (
        <div className="mb-1 text-sm font-semibold text-brand-core-light">
          {title}
        </div>
      )}
      <div className="text-sm text-base-300">{children}</div>
    </aside>
  );
}
