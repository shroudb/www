import Link from "next/link";
import type { Metadata } from "next";
import { engines } from "@/brand/engines";
import { getProductColor } from "@/brand/marks";
import { DocsHeader, H2, P } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "ShrouDB documentation — install, quickstart, architecture, and engine references.",
};

export default function DocsIndex() {
  return (
    <>
      <DocsHeader
        eyebrow="Documentation"
        title="ShrouDB docs"
        tagline="Security infrastructure that just works. Nine engines, one binary, unified."
      />

      <P>
        ShrouDB is a Rust-built platform with nine engines, each focused on one
        security primitive. Engines can run independently, or bundled into a
        single Moat process with dual-protocol access (HTTP + TCP).
      </P>

      <H2>Start here</H2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <StartCard
          href="/docs/install"
          title="Install"
          description="Homebrew, Docker, binary, or source."
        />
        <StartCard
          href="/docs/quickstart"
          title="Quickstart"
          description="Running in under five minutes."
        />
        <StartCard
          href="/docs/architecture"
          title="Architecture"
          description="Engines, storage, protocols, telemetry."
        />
        <StartCard
          href="/docs/moat"
          title="Moat"
          description="Single binary, all engines, dual protocol."
        />
      </div>

      <H2>The nine engines</H2>
      <div className="mt-4 overflow-hidden rounded-lg border border-base-800">
        <table className="w-full text-sm">
          <thead className="bg-base-dark text-left">
            <tr>
              <th className="px-4 py-2.5 font-medium text-base-cream">
                Engine
              </th>
              <th className="px-4 py-2.5 font-medium text-base-cream">
                Purpose
              </th>
              <th className="px-4 py-2.5 font-medium text-base-cream">Docs</th>
            </tr>
          </thead>
          <tbody>
            {engines.map((engine) => {
              const color = getProductColor(engine.key).primary;
              return (
                <tr
                  key={engine.key}
                  className="border-t border-base-800 align-top"
                >
                  <td
                    className="px-4 py-2.5 font-mono font-medium"
                    style={{ color }}
                  >
                    {engine.name}
                  </td>
                  <td className="px-4 py-2.5 text-base-300">
                    {engine.tagline}
                  </td>
                  <td className="px-4 py-2.5">
                    <Link
                      href={`/engines/${engine.key}`}
                      className="text-brand-core-light hover:underline"
                    >
                      Read →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <H2>Deployment paths</H2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-base-800 bg-base-dark p-5">
          <div className="text-sm font-semibold text-base-cream">
            ShrouDB Cloud
          </div>
          <div className="mt-1 text-xs text-base-500">
            Managed platform · free tier
          </div>
          <p className="mt-3 text-sm text-base-300">
            Zero infrastructure. Every engine, hosted. Start free in under a
            minute.
          </p>
        </div>
        <div className="rounded-lg border border-base-800 bg-base-dark p-5">
          <div className="text-sm font-semibold text-base-cream">
            ShrouDB Moat
          </div>
          <div className="mt-1 text-xs text-base-500">
            Self-hosted · single binary
          </div>
          <p className="mt-3 text-sm text-base-300">
            All nine engines in one process with shared auth, storage, and
            telemetry. One config file.
          </p>
        </div>
      </div>
    </>
  );
}

function StartCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col rounded-lg border border-base-800 bg-base-dark p-5 transition-colors hover:border-base-700"
    >
      <div className="text-sm font-semibold text-base-cream">{title}</div>
      <div className="mt-1 text-xs text-base-500">{description}</div>
    </Link>
  );
}
