import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { CloudMark } from "@/brand/marks";
import { palette } from "@/brand/palette";

export const metadata: Metadata = {
  title: "Cloud",
  description:
    "Run every ShrouDB engine without running anything. Free tier, usage-based pricing, zero ops.",
};

export default function CloudPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${palette.brand.cloud}22, transparent 60%)`,
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2">
            <CloudMark size={56} />
          </div>
          <h1 className="display text-5xl text-base-cream md:text-6xl">
            Skip the deploy.
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, ${palette.brand.cloud}, ${palette.brand.cloudLight})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Keep the engines.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-base-300">
            Every ShrouDB engine, hosted on a URL. Generous free tier, pay only
            for what you use, no infrastructure to babysit.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" render={<Link href="https://app.shroudb.io/signup" />}>Start for free            </Button>
            <Button size="lg" variant="secondary" render={<Link href="/pricing" />}>See pricing            </Button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="border-t border-base-800 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Plan
              name="Free"
              price="$0"
              tagline="Ship a side project this weekend"
              bullets={[
                "10,000 operations / month",
                "All nine engines",
                "7-day audit retention",
                "Community support",
              ]}
              cta={{ href: "https://app.shroudb.io/signup", label: "Start for free" }}
            />
            <Plan
              name="Pro"
              price="Usage-based"
              tagline="Pay for what you actually use"
              bullets={[
                "Per-operation pricing, no per-seat",
                "90-day audit retention, exportable",
                "SLA with incident credits",
                "Priority email support",
              ]}
              cta={{ href: "https://app.shroudb.io/signup", label: "Start Pro" }}
              featured
            />
            <Plan
              name="Enterprise"
              price="Contact us"
              tagline="Pass your security review"
              bullets={[
                "Dedicated tenancy, VPC peering",
                "BYO KMS for master-key wrapping",
                "SSO, SCIM, custom retention",
                "DPA, security review, procurement",
              ]}
              cta={{ href: "/contact", label: "Talk to us" }}
            />
          </div>
        </div>
      </section>

      {/* Same API */}
      <section className="border-t border-base-800 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="display text-3xl text-base-cream">
            Migrate by changing one line.
          </h2>
          <p className="mt-3 text-base text-base-300">
            Cloud and Moat speak the identical HTTP API. Swap the base URL and
            the token — your SDK code stays exactly the same.
          </p>
          <div className="mt-6">
            <CodeBlock title="typescript">
              {`import { Cipher } from "@shroudb/sdk";

// Cloud
const cipher = new Cipher({
  baseUrl: "https://api.shroudb.io",
  token: process.env.SHROUDB_TOKEN,
});

// Moat (self-hosted) — same SDK, different baseUrl
const cipher = new Cipher({
  baseUrl: "https://moat.internal:8200",
  token: process.env.SHROUDB_TOKEN,
});

await cipher.encrypt({
  keyring: "payments",
  plaintext: card,
  context: "user-42",
});`}
            </CodeBlock>
          </div>
        </div>
      </section>
    </>
  );
}

function Plan({
  name,
  price,
  tagline,
  bullets,
  cta,
  featured = false,
}: {
  name: string;
  price: string;
  tagline: string;
  bullets: string[];
  cta: { href: string; label: string };
  featured?: boolean;
}) {
  return (
    <div
      className="flex flex-col rounded-2xl border bg-base-dark p-6"
      style={{
        borderColor: featured
          ? `${palette.brand.cloud}66`
          : palette.base.stone800,
        background: featured
          ? `linear-gradient(180deg, ${palette.brand.cloud}10, ${palette.base.darkWarm})`
          : palette.base.darkWarm,
      }}
    >
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold text-base-cream">{name}</h3>
        {featured && (
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest"
            style={{
              background: `${palette.brand.cloud}22`,
              color: palette.brand.cloudLight,
            }}
          >
            Popular
          </span>
        )}
      </div>
      <div className="mt-3 text-3xl font-semibold text-base-cream">{price}</div>
      <div className="mt-1 text-sm text-base-500">{tagline}</div>
      <ul className="mt-6 space-y-2.5">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-2 text-sm text-base-300"
          >
            <span
              aria-hidden
              className="mt-1.5 inline-block h-1 w-1 flex-shrink-0 rounded-full"
              style={{ background: palette.brand.cloud }}
            />
            {bullet}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Button
         
          variant={featured ? "default" : "secondary"}
          className="w-full"
         render={<Link href={cta.href} />}>{cta.label}        </Button>
      </div>
    </div>
  );
}
