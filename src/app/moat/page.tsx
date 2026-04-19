import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { MoatMark } from "@/brand/marks";
import { palette } from "@/brand/palette";

export const metadata: Metadata = {
  title: "Moat",
  description:
    "Run every ShrouDB engine on your own infrastructure. One binary, one port, one config file.",
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
            Your security stack,
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, ${palette.brand.moat}, ${palette.brand.moatLight})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              in one process.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-base-300">
            Keep your data on your hardware. Moat bundles every ShrouDB engine
            into a single binary — no sidecars, no service mesh, nothing
            crossing the network just to encrypt a string.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" render={<Link href="/docs/install" />}>Install Moat            </Button>
            <Button size="lg" variant="secondary" render={<Link href="/docs/architecture" />}>Read the architecture            </Button>
          </div>
        </div>
      </section>

      {/* Quickstart */}
      <section className="border-t border-base-800 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="display text-3xl text-base-cream">
            From zero to running in one command.
          </h2>
          <p className="mt-3 text-base text-base-300">
            Point Moat at a master key and a config file. That&apos;s the whole
            install.
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
              title="Run it as one process"
              description="Every engine core compiled into a single binary. No sidecars to deploy, no mesh to configure, no service discovery to wire up."
            />
            <Prop
              title="Hit it however you want"
              description="HTTP on :8200, TCP on :8201. Same commands, same auth — pick whichever protocol suits the call site."
            />
            <Prop
              title="One config to rule them all"
              description="moat.toml wires every engine, storage backend, auth policy, and telemetry sink. Nothing to coordinate across files."
            />
            <Prop
              title="Encrypted on disk by default"
              description="Every mutation is AES-256-GCM encrypted before it touches storage. Per-engine HKDF derivation from a single master key — you manage one secret."
            />
            <Prop
              title="Reconfigure without restarts"
              description="Change TTLs, rotation cadence, CORS, and rate limits at runtime. Every mutation persists to the encrypted WAL."
            />
            <Prop
              title="Least privilege out of the box"
              description="One token model across every engine. Grant cipher:encrypt/payments without exposing keep:get/*."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-base-800 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="display text-3xl text-base-cream">
            Don&apos;t want to run it yourself?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-base-500">
            ShrouDB Cloud runs the identical engines for you, free up to 10k
            ops/month.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" render={<Link href="/cloud" />}>Try ShrouDB Cloud            </Button>
            <Button size="lg" variant="secondary" render={<Link href="https://github.com/shroudb/moat" />}>Moat on GitHub            </Button>
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
