import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocsHeader, H2, H3, P, UL, LI } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "How ShrouDB engines, storage, and protocols fit together.",
};

export default function ArchitecturePage() {
  return (
    <>
      <DocsHeader
        eyebrow="Getting started"
        title="Architecture"
        tagline="How engines, storage, and protocols fit together."
      />

      <H2>Platform overview</H2>
      <P>
        Moat is a single process that hosts every engine core. Two listeners,
        one shared storage and telemetry plane, one auth model.
      </P>
      <CodeBlock title="architecture">
        {`                    ┌────────────────────────────────┐
                    │         ShrouDB Moat           │
  HTTP :8200  ──▶   │  ┌──────────────────────────┐  │
                    │  │     Auth / Scope gate    │  │
  TCP  :8201  ──▶   │  └──────────────────────────┘  │
                    │  ┌────────┬────────┬────────┐  │
                    │  │ Sigil  │ Cipher │ Stash  │  │
                    │  ├────────┼────────┼────────┤  │
                    │  │ Keep   │  Veil  │ Forge  │  │
                    │  ├────────┼────────┼────────┤  │
                    │  │ Sentry │Courier │Chronicle│  │
                    │  └────────┴────────┴────────┘  │
                    │  ┌──────────────────────────┐  │
                    │  │  Encrypted WAL + Config  │  │
                    │  └──────────────────────────┘  │
                    └────────────────────────────────┘`}
      </CodeBlock>

      <H2>Engine dependencies</H2>
      <UL>
        <LI>Veil uses Cipher (embedded or remote) for key operations.</LI>
        <LI>Stash uses Cipher for envelope encryption.</LI>
        <LI>Courier optionally uses Cipher for payload encryption.</LI>
        <LI>Chronicle receives audit events from every engine via the tracing layer.</LI>
        <LI>Sigil, Forge, Sentry, and Keep are independent.</LI>
      </UL>

      <H2>Storage model</H2>

      <H3>Write-ahead log</H3>
      <P>
        Every mutation is appended to an encrypted WAL. AES-256-GCM, per-engine
        HKDF derivation. Reads come from in-memory state hydrated from WAL on
        start.
      </P>

      <H3>ConfigStore</H3>
      <P>
        Bootstrap config comes from your TOML file at startup. Runtime
        mutations from CONFIG SET are persisted to the WAL so they survive
        restarts. Structural keys are immutable; operational keys (TTLs,
        rotation, rate limits) are runtime-mutable.
      </P>

      <H3>Per-tenant isolation</H3>
      <P>
        Multi-tenant deployments derive separate engine master keys per tenant
        via HKDF. Tenants cannot decrypt each other&apos;s data even with
        process access.
      </P>

      <H2>Protocol layer</H2>

      <H3>TCP wire protocol</H3>
      <P>
        High-performance binary protocol. Connections authenticate with AUTH,
        switch context with <code className="font-mono text-base-cream">ENGINE &lt;name&gt;</code>,
        then issue engine-specific commands.
      </P>

      <H3>HTTP REST</H3>
      <P>
        Routes follow{" "}
        <code className="font-mono text-base-cream">
          /v1/&#123;engine&#125;/&#123;action&#125;/&#123;resource&#125;
        </code>
        . Auth is Bearer token with the same scope syntax as TCP.
      </P>

      <H2>Telemetry flow</H2>
      <P>All engines emit via a unified tracing layer. Four fan-outs:</P>
      <UL>
        <LI>Console — human-readable logs to stdout.</LI>
        <LI>Audit file — JSON-line events to disk.</LI>
        <LI>OpenTelemetry — OTLP export to Jaeger, Tempo, Datadog.</LI>
        <LI>Chronicle — routes events to the Chronicle engine for query.</LI>
      </UL>
    </>
  );
}
