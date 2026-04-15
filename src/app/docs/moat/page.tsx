import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { CmdTable } from "@/components/ui/cmd-table";
import { DocsHeader, H2, H3, P, UL, LI, A } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Moat",
  description:
    "Self-hosted ShrouDB — all nine engines in a single binary with dual-protocol access.",
};

export default function MoatDocsPage() {
  return (
    <>
      <DocsHeader
        eyebrow="Deployment"
        title="Moat"
        tagline="All nine engines in a single binary, dual protocol, one config."
      />

      <H2>Why Moat</H2>
      <UL>
        <LI>Single process hosts every engine — zero inter-service hops.</LI>
        <LI>Dual protocol: HTTP on :8200, TCP on :8201, same commands.</LI>
        <LI>Scope-based auth applies across every engine.</LI>
        <LI>Runtime CONFIG commands — no restart to change rotation or limits.</LI>
        <LI>Clustering for HA (beta).</LI>
      </UL>

      <H2>Full configuration</H2>
      <CodeBlock title="moat.toml">
        {`[server]
http_bind = ":8200"
bind      = ":8201"

[storage]
dir        = "/var/lib/shroudb"
encryption = "aes-256-gcm"

[engines.sigil]
enabled = true
[engines.sigil.keyspaces.jwt]
type        = "jwt"
algorithm   = "ES256"
default_ttl = "1h"

[engines.cipher]
enabled = true
[engines.cipher.keyrings.payments]
algorithm = "aes-256-gcm"

[engines.stash]
enabled = true
[engines.stash.storage]
backend = "s3"
bucket  = "myorg-stash"

[engines.veil]
enabled = true

[engines.keep]
enabled = true

[engines.forge]
enabled = false

[engines.sentry]
enabled = true
policy_dir = "/etc/shroudb/policies"

[engines.courier]
enabled = false

[engines.chronicle]
enabled = true
retention_days = 30

[access]
mode = "token"

[[access.policies]]
token  = "\${APP_TOKEN}"
scopes = [
  "cipher:encrypt/payments",
  "sigil:verify/*",
  "keep:get/secrets/app/*",
]

[cluster]
enabled = false
node_id = "moat-1"
peers   = []`}
      </CodeBlock>

      <H2>Meta-commands</H2>
      <CmdTable
        commands={[
          ["AUTH", "<token>", "Authenticate the connection"],
          ["ENGINE", "<name>", "Switch engine context"],
          ["PING", "", "Keepalive"],
          ["HEALTH", "", "Process health summary"],
        ]}
      />

      <H2>Scope format</H2>
      <P>
        Scopes use the pattern{" "}
        <code className="font-mono text-base-cream">
          engine:verb/resource
        </code>
        . Wildcards are supported at any segment.
      </P>
      <CodeBlock title="examples">
        {`*:*/*                           # full access
cipher:encrypt/payments         # encrypt under payments keyring only
sigil:verify/*                  # verify any credential
keep:get/secrets/app/*          # read app secrets only
chronicle:query/*               # read audit stream`}
      </CodeBlock>

      <H3>Related</H3>
      <UL>
        <LI>
          <A href="/docs/config">CONFIG commands</A> — change operational settings at runtime.
        </LI>
        <LI>
          <A href="/docs/security">Security model</A> — encryption, isolation, zeroization.
        </LI>
      </UL>
    </>
  );
}
