import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import {
  DocsHeader,
  H2,
  H3,
  P,
  UL,
  LI,
  A,
  Callout,
} from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Quickstart",
  description: "Get ShrouDB running in under five minutes.",
};

export default function QuickstartPage() {
  return (
    <>
      <DocsHeader
        eyebrow="Getting started"
        title="Quickstart"
        tagline="Stand up ShrouDB Moat with Sigil + Cipher in about five minutes."
      />

      <H2>1. Create a config file</H2>
      <P>
        A single <code className="font-mono text-base-cream">moat.toml</code>{" "}
        wires together every engine you want to run.
      </P>
      <CodeBlock title="moat.toml">
        {`[server]
http_bind = ":8200"
bind      = ":8201"  # TCP

[storage]
dir = "/var/lib/shroudb"

[engines.sigil]
enabled = true

[engines.sigil.keyspaces.jwt]
type        = "jwt"
algorithm   = "ES256"
default_ttl = "1h"

[engines.cipher]
enabled = true

[engines.cipher.keyrings.payments]
algorithm     = "aes-256-gcm"
rotation_days = 30

[access]
mode = "token"

[[access.policies]]
token  = "\${MOAT_ADMIN_TOKEN}"
scopes = ["*:*/*"]`}
      </CodeBlock>

      <H2>2. Set the master key</H2>
      <P>
        Moat uses an AES-256 master key to encrypt its WAL and derive per-engine
        keys with HKDF. Rotate it by re-wrapping engine keys through Cipher.
      </P>
      <CodeBlock title="terminal">
        {`$ export SHROUDB_MASTER_KEY=$(openssl rand -hex 32)
$ export MOAT_ADMIN_TOKEN=$(openssl rand -hex 32)`}
      </CodeBlock>

      <H2>3. Start Moat</H2>
      <CodeBlock title="terminal">
        {`$ shroudb-moat --config moat.toml
INFO  moat::server listening on http=:8200 tcp=:8201
INFO  moat::sigil  ready — 1 keyspace loaded
INFO  moat::cipher ready — 1 keyring loaded
INFO  moat::storage wal=encrypted master_key=hkdf`}
      </CodeBlock>

      <H2>4. Issue a JWT over HTTP</H2>
      <CodeBlock title="terminal">
        {`$ curl -sX POST http://localhost:8200/v1/sigil/issue/jwt \\
    -H "Authorization: Bearer $MOAT_ADMIN_TOKEN" \\
    -d '{"subject":"user-42","ttl":"1h"}'

{"token":"eyJhbGciOiJFUzI1NiJ9...","expires_at":"2025-01-01T01:00:00Z"}`}
      </CodeBlock>

      <H2>5. Encrypt a field over TCP</H2>
      <CodeBlock title="terminal">
        {`$ shroudb-cli --port 8201
> AUTH $MOAT_ADMIN_TOKEN
OK
> ENGINE cipher
OK
> ENCRYPT payments "4111-1111-1111-1111"
v1:gcm:aGVsbG8gd29ybGQ=
> DECRYPT payments v1:gcm:aGVsbG8gd29ybGQ=
4111-1111-1111-1111`}
      </CodeBlock>

      <H2>6. Runtime CONFIG</H2>
      <P>
        Change rotation, CORS, rate limits, and more without restarting. Every
        mutation is appended to the WAL and survives restarts.
      </P>
      <CodeBlock title="terminal">
        {`> CONFIG SET sigil.keyspaces.jwt.rotation_days 7
OK
> CONFIG GET sigil.keyspaces.jwt.rotation_days
7 (runtime)
> CONFIG LIST sigil.keyspaces.jwt
type          = "jwt"          (bootstrap)
algorithm     = "ES256"        (bootstrap)
default_ttl   = "1h"           (bootstrap)
rotation_days = 7              (runtime)`}
      </CodeBlock>

      <Callout title="You&apos;re running">
        A single Moat process exposing Sigil (credentials) and Cipher
        (encryption) on HTTP and TCP, with shared auth and encrypted WAL.
      </Callout>

      <H3>Next steps</H3>
      <UL>
        <LI>
          Read the <A href="/docs/architecture">Architecture</A> overview.
        </LI>
        <LI>
          Explore the <A href="/engines">Engines</A> and pick the ones you need.
        </LI>
        <LI>
          Tighten up with the <A href="/docs/security">Security model</A>.
        </LI>
      </UL>
    </>
  );
}
