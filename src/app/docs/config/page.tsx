import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { CmdTable } from "@/components/ui/cmd-table";
import { DocsHeader, H2, P, UL, LI } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "CONFIG commands",
  description:
    "Read, write, and list runtime configuration without restarts.",
};

export default function ConfigDocsPage() {
  return (
    <>
      <DocsHeader
        eyebrow="Reference"
        title="CONFIG commands"
        tagline="Read, write, and list runtime configuration — no restarts."
      />

      <H2>Commands</H2>
      <CmdTable
        commands={[
          ["CONFIG GET", "<key>", "Read a value with its source"],
          ["CONFIG SET", "<key> <value>", "Set at runtime, persisted to WAL"],
          ["CONFIG LIST", "[prefix]", "List keys with source and mutability"],
        ]}
      />

      <H2>Bootstrap vs runtime</H2>
      <P>
        Bootstrap values come from your TOML file and are loaded on startup.
        Runtime values come from <code className="font-mono text-base-cream">CONFIG SET</code>,
        are appended to the encrypted WAL, and survive restarts. Not every key
        is mutable — structural keys (bindings, storage layout) require a
        restart; operational keys (TTLs, rotation, rate limits, CORS) don&apos;t.
      </P>

      <H2>Per-engine mutable keys</H2>
      <UL>
        <LI>
          <code className="font-mono text-base-cream">sigil.keyspaces.*.rotation_days, default_ttl, max_ttl</code>
        </LI>
        <LI>
          <code className="font-mono text-base-cream">cipher.keyrings.*.rotation_days, convergent</code>
        </LI>
        <LI>
          <code className="font-mono text-base-cream">veil.cipher_addr</code> (remote mode only)
        </LI>
        <LI>
          <code className="font-mono text-base-cream">sentry.auto_reload, reload_interval</code>
        </LI>
        <LI>
          <code className="font-mono text-base-cream">forge.ca.*.max_cert_ttl, default_cert_ttl</code>
        </LI>
        <LI>
          <code className="font-mono text-base-cream">keep.max_versions, default_ttl</code>
        </LI>
        <LI>
          <code className="font-mono text-base-cream">courier.auto_reload, channels.*.timeout, retry_count</code>
        </LI>
        <LI>
          <code className="font-mono text-base-cream">chronicle.retention_days, max_batch_size</code>
        </LI>
      </UL>

      <H2>Examples</H2>
      <CodeBlock title="terminal">
        {`> CONFIG SET sigil.keyspaces.jwt.rotation_days 7
OK
> CONFIG GET sigil.keyspaces.jwt.rotation_days
7 (runtime)
> CONFIG LIST cipher.keyrings.payments
algorithm     = "aes-256-gcm" (bootstrap)
rotation_days = 30            (bootstrap)`}
      </CodeBlock>
      <CodeBlock title="HTTP">
        {`$ curl -sX POST http://localhost:8200/v1/config/set \\
    -H "Authorization: Bearer $TOKEN" \\
    -d '{"key":"sigil.keyspaces.jwt.rotation_days","value":"7"}'
{"ok":true,"source":"runtime"}`}
      </CodeBlock>
    </>
  );
}
