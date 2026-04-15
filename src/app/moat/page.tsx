import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { MoatMark } from "@/brand/marks";
import { palette } from "@/brand/palette";

export const metadata: Metadata = {
  title: "Moat",
  description:
    "Self-hosted ShrouDB. Single binary, single port, all nine engines.",
};

const QUICKSTART = `$ docker run --rm -it \\
    -p 8200:8200 -p 8201:8201 \\
    -v $(pwd)/moat.toml:/etc/shroudb/moat.toml \\
    -e SHROUDB_MASTER_KEY \\
    ghcr.io/shroudb/moat:latest

INFO  moat::server listening on http=:8200 tcp=:8201
INFO  moat::sigil  ready
INFO  moat::cipher ready
INFO  moat::keep   ready`;

export default function MoatPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${palette.brand.moat}22, transparent 60%)`,
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2">
            <MoatMark size={56} />
          </div>
          <h1 className="display text-5xl text-base-cream md:text-6xl">
            <span
              style={{
                background: `linear-gradient(135deg, ${palette.brand.moat}, ${palette.brand.moatLight})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ShrouDB Moat
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-base-300">
            Self-hosted. Single binary, single port. Every engine in one
            process. One config file. Zero inter-service hops.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/docs/install">Install Moat</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/docs/architecture">Read the architecture</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quickstart */}
      <section className="border-t border-base-800 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="display text-3xl text-base-cream">
            One container. All nine engines.
          </h2>
          <p className="mt-3 text-base text-base-300">
            Point Moat at a master key and a config file. It&apos;s running.
          </p>
          <div className="mt-6">
            <CodeBlock title="terminal">{QUICKSTART}</CodeBlock>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-t border-base-800 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Prop
              title="Single binary, single port"
              description="Every engine core compiled into one process. No sidecars, no mesh, no service discovery."
            />
            <Prop
              title="Dual protocol"
              description="HTTP on :8200, TCP on :8201. Same commands, same auth. Use whichever fits the call site."
            />
            <Prop
              title="One config file"
              description="moat.toml wires every engine, storage, auth, telemetry. No per-engine config files to coordinate."
            />
            <Prop
              title="Encrypted WAL"
              description="Every mutation AES-256-GCM encrypted before hitting disk. Per-engine HKDF derivation from a single master key."
            />
            <Prop
              title="Runtime CONFIG"
              description="Change TTLs, rotation, CORS, rate limits without restarts. Every mutation persists to the WAL."
            />
            <Prop
              title="Scope-based auth"
              description="One token model across every engine. cipher:encrypt/payments without keep:get/* — least privilege by default."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-base-800 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="display text-3xl text-base-cream">
            Prefer not to run it?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-base-500">
            ShrouDB Cloud runs the identical engines on our infrastructure,
            with a free tier.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/cloud">See ShrouDB Cloud</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="https://github.com/shroudb/moat">Moat on GitHub</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function Prop({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-base-800 bg-base-dark p-6">
      <h3 className="text-base font-semibold text-base-cream">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-base-300">
        {description}
      </p>
    </div>
  );
}
