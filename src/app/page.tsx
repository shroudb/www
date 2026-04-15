// Copy revised by Claude Code — review before deploy
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { EngineCard } from "@/components/engine-card";
import { engines } from "@/brand/engines";
import { CloudMark, MoatMark, ShrouDBMark } from "@/brand/marks";
import { palette } from "@/brand/palette";

const REPLACED_TOOLS = [
  { name: "HashiCorp Vault", replaces: "Sigil + Keep" },
  { name: "AWS KMS", replaces: "Cipher" },
  { name: "Auth0", replaces: "Sigil" },
  { name: "Open Policy Agent", replaces: "Sentry" },
  { name: "Let's Encrypt + step-ca", replaces: "Forge" },
  { name: "SendGrid", replaces: "Courier" },
  { name: "Datadog", replaces: "Chronicle" },
];

const HERO_TERMINAL = `$ shroudb-moat --config moat.toml
INFO  moat::server listening on http=:8200 tcp=:8201
INFO  moat::sigil  ready — 3 keyspaces loaded
INFO  moat::cipher ready — 2 keyrings loaded
INFO  moat::keep   ready — storage encrypted

$ curl -sX POST localhost:8200/v1/sigil/issue/jwt \\
    -H "Authorization: Bearer $TOKEN" \\
    -d '{"subject":"user-42","ttl":"1h"}'
{"token":"eyJhbGciOiJFUzI1NiJ9...","expires_at":"2025-01-01T01:00:00Z"}

$ shroudb-cli --port 8201
> ENGINE cipher
OK
> ENCRYPT payments "4111-1111-1111-1111"
v1:gcm:aGVsbG8gd29ybGQ=
> DECRYPT payments v1:gcm:aGVsbG8gd29ybGQ=
4111-1111-1111-1111`;

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${palette.brand.core}22, transparent 60%)`,
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-base-800 bg-base-dark px-3 py-1 text-xs font-medium text-base-500">
              <ShrouDBMark size={16} />
              <span className="font-mono uppercase tracking-widest">
                Security infrastructure
              </span>
            </div>
            <h1 className="display text-5xl text-base-cream md:text-6xl lg:text-7xl">
              Stop stitching.
              <br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${palette.brand.core}, ${palette.brand.coreLight})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Start shipping.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-base-300">
              Replace seven security vendors with one binary. Credentials,
              encryption, search, authorization, certificates, secrets,
              notifications, and audit — wired together, ready to ship.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="https://app.shroudb.io/signup">
                  Start for free
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/moat">Self-host Moat</Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-3xl">
            <CodeBlock title="terminal">{HERO_TERMINAL}</CodeBlock>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-base-800 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="display text-3xl text-base-cream md:text-4xl">
              Delete a row from your invoices.
            </h2>
            <p className="mt-4 text-base text-base-500">
              One vendor instead of seven. One auth model. One config. One
              place to debug when something breaks at 2am.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {REPLACED_TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center justify-between rounded-lg border border-base-800 bg-base-dark px-4 py-3"
              >
                <span className="text-sm text-base-300 line-through decoration-base-700">
                  {tool.name}
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: palette.brand.coreLight }}
                >
                  → {tool.replaces}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-base text-base-300">
            <span className="font-semibold text-base-cream">
              One binary. One config. One auth model.
            </span>{" "}
            Zero inter-service network hops. Zero vendor coordination.
          </p>
        </div>
      </section>

      {/* Engines */}
      <section className="border-t border-base-800 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="display text-3xl text-base-cream md:text-4xl">
              Pick the engine. Skip the integration work.
            </h2>
            <p className="mt-4 text-base text-base-500">
              Nine focused engines that already speak the same auth, config,
              and telemetry. Compose them like libraries — without the glue.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {engines.map((engine) => (
              <EngineCard key={engine.key} engine={engine} />
            ))}
          </div>
        </div>
      </section>

      {/* Deploy */}
      <section className="border-t border-base-800 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="display text-3xl text-base-cream md:text-4xl">
              Host it yourself. Or don&apos;t.
            </h2>
            <p className="mt-4 text-base text-base-500">
              Same engines, same API, same SDKs. Switch between Cloud and Moat
              by changing one URL.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <DeployCard
              kind="cloud"
              title="ShrouDB Cloud"
              tagline="Managed platform"
              description="Skip the deploy. Get every engine running behind a URL in under a minute, with a free tier that comfortably covers side projects."
              bullets={[
                "Free tier: 10k ops/mo, all engines",
                "Instant provisioning, zero config",
                "Managed upgrades, backups, TLS",
                "SLA and audit exports on Pro",
              ]}
              cta={{ href: "https://app.shroudb.io/signup", label: "Start for free" }}
            />
            <DeployCard
              kind="moat"
              title="ShrouDB Moat"
              tagline="Self-hosted gateway"
              description="Keep your data on your infrastructure. One binary, one port, one config — every engine bundled, no service mesh required."
              bullets={[
                "Single binary, single port",
                "One config file, all nine engines",
                "Dual protocol: HTTP + TCP",
                "Runtime CONFIG commands, no restarts",
              ]}
              cta={{ href: "/docs/install", label: "Install Moat" }}
            />
          </div>
        </div>
      </section>

      {/* DX */}
      <section className="border-t border-base-800 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="display text-3xl text-base-cream md:text-4xl">
              Feels right in your terminal and your editor.
            </h2>
            <p className="mt-4 text-base text-base-500">
              Predictable commands, typed SDKs, telemetry that&apos;s already
              wired up. The boring parts are done.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <DXCard
              title="Tune it without redeploying"
              description="Change rotation intervals, CORS origins, and rate limits at runtime. Every mutation is appended to the WAL."
            >
              {`> CONFIG SET sigil.keyspaces.jwt.rotation_days 7
OK
> CONFIG LIST sigil.keyspaces
jwt.rotation_days = 7 (runtime)
jwt.default_ttl   = 1h (bootstrap)`}
            </DXCard>
            <DXCard
              title="One token, least privilege everywhere"
              description="Scope-based auth across every engine. Grant cipher:encrypt/payments without handing over keep:get/*."
            >
              {`[access]
mode = "token"

[[access.policies]]
token = "$APP_TOKEN"
scopes = [
  "cipher:encrypt/payments",
  "sigil:verify/*",
]`}
            </DXCard>
            <DXCard
              title="See what every engine is doing"
              description="Traces, audit logs, and OTEL export ship in the binary. Chronicle ingests every event from every engine, no extra agents."
            >
              {`[telemetry]
console    = true
audit_file = "/var/log/shroudb/audit.jsonl"

[telemetry.otel]
endpoint     = "http://tempo:4317"
service_name = "shroudb"`}
            </DXCard>
            <DXCard
              title="SDKs that match the protocol"
              description="Typed clients for TypeScript, Python, Ruby, and Go. Method names map 1:1 to the engine commands you read in the docs."
            >
              {`import { Cipher } from "@shroudb/sdk";

const cipher = new Cipher({ token });
const ct = await cipher.encrypt({
  keyring: "payments",
  plaintext: card,
  context: "user-42",
});`}
            </DXCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-base-800 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2">
            <ShrouDBMark size={48} />
          </div>
          <h2 className="display text-3xl text-base-cream md:text-4xl">
            Ship security infrastructure today.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-base-500">
            Start on Cloud in a minute. Move to Moat whenever you want — your
            code doesn&apos;t change.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="https://app.shroudb.io/signup">
                Start for free
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/docs">Read the docs</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function DeployCard({
  kind,
  title,
  tagline,
  description,
  bullets,
  cta,
}: {
  kind: "cloud" | "moat";
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  cta: { href: string; label: string };
}) {
  const Mark = kind === "cloud" ? CloudMark : MoatMark;
  const color =
    kind === "cloud" ? palette.brand.cloud : palette.brand.moat;
  return (
    <div
      className="rounded-2xl border border-base-800 bg-base-dark p-8"
      style={{
        background: `linear-gradient(135deg, ${palette.base.darkWarm}, ${color}08)`,
      }}
    >
      <div className="flex items-center gap-3">
        <Mark size={44} />
        <div>
          <div
            className="text-lg font-semibold"
            style={{ color }}
          >
            {title}
          </div>
          <div className="text-xs text-base-500">{tagline}</div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-base-300">
        {description}
      </p>
      <ul className="mt-5 space-y-2">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-2 text-sm text-base-300"
          >
            <span
              aria-hidden
              className="mt-1.5 inline-block h-1 w-1 rounded-full"
              style={{ background: color }}
            />
            {bullet}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Button asChild variant="secondary">
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      </div>
    </div>
  );
}

function DXCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-base-800 bg-base-dark p-6">
      <h3 className="text-lg font-semibold text-base-cream">{title}</h3>
      <p className="mt-2 text-sm text-base-500">{description}</p>
      <div className="mt-4 flex-1">
        <CodeBlock>{children}</CodeBlock>
      </div>
    </div>
  );
}
