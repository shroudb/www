import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocsHeader, H2, H3, P, UL, LI } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Telemetry",
  description:
    "Observability, audit logging, and OpenTelemetry integration.",
};

export default function TelemetryDocsPage() {
  return (
    <>
      <DocsHeader
        eyebrow="Reference"
        title="Telemetry"
        tagline="Observability, audit logging, and OpenTelemetry integration."
      />

      <P>
        Every engine emits through a unified{" "}
        <code className="font-mono text-base-cream">shroudb-telemetry</code>{" "}
        layer with four fan-outs: console, audit file, OpenTelemetry, and
        Chronicle.
      </P>

      <H2>Audit event format</H2>
      <CodeBlock title="rust">
        {`tracing::info!(
    op = "cipher.encrypt",
    resource = "payments",
    result = "ok",
    duration_ms = 12,
    actor = %token_fingerprint,
);`}
      </CodeBlock>
      <CodeBlock title="audit.jsonl">
        {`{"ts":"2025-01-01T12:00:00Z","op":"cipher.encrypt","resource":"payments","result":"ok","duration_ms":12,"actor":"tok_abc"}
{"ts":"2025-01-01T12:00:01Z","op":"sigil.issue","resource":"jwt","result":"ok","duration_ms":8,"actor":"tok_abc"}`}
      </CodeBlock>

      <H2>Configuration</H2>
      <CodeBlock title="moat.toml">
        {`[telemetry]
console    = true
audit_file = "/var/log/shroudb/audit.jsonl"

[telemetry.otel]
endpoint     = "http://tempo:4317"
service_name = "shroudb"
environment  = "prod"
sample_rate  = 1.0`}
      </CodeBlock>

      <H2>Chronicle integration</H2>
      <P>
        When Chronicle is enabled in Moat, audit events are routed to the
        Chronicle engine for queryable storage. You get{" "}
        <code className="font-mono text-base-cream">QUERY</code>,{" "}
        <code className="font-mono text-base-cream">HOTSPOTS</code>,{" "}
        <code className="font-mono text-base-cream">ERRORS</code>, and{" "}
        <code className="font-mono text-base-cream">ACTORS</code> over the
        same stream the audit file captures.
      </P>

      <H2>OpenTelemetry targets</H2>
      <UL>
        <LI>Jaeger — point endpoint at the Jaeger OTLP collector.</LI>
        <LI>Grafana Tempo — point at the Tempo OTLP receiver.</LI>
        <LI>Datadog — use the Datadog OTLP ingest endpoint.</LI>
      </UL>

      <H3>Jaeger example</H3>
      <CodeBlock title="docker-compose.yml">
        {`services:
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686"   # UI
      - "4317:4317"     # OTLP gRPC

  shroudb:
    image: ghcr.io/shroudb/moat:latest
    depends_on: [jaeger]
    environment:
      SHROUDB_MASTER_KEY: \${SHROUDB_MASTER_KEY}
    volumes:
      - ./moat.toml:/etc/shroudb/moat.toml`}
      </CodeBlock>
    </>
  );
}
