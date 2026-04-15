import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ShrouDBMark } from "@/brand/marks";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the ShrouDB team — sales, security, support.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="text-center">
        <ShrouDBMark size={48} />
        <h1 className="display mt-6 text-4xl text-base-cream md:text-5xl">
          Talk to us
        </h1>
        <p className="mt-3 text-base text-base-500">
          Procurement, security review, or just a question about the engines.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Card
          title="Sales & Enterprise"
          description="Pricing, DPA, dedicated tenancy, BYO KMS."
          href="mailto:sales@shroudb.io"
          cta="sales@shroudb.io"
        />
        <Card
          title="Security"
          description="Coordinated disclosure. PGP key on request."
          href="mailto:security@shroudb.io"
          cta="security@shroudb.io"
        />
        <Card
          title="Support"
          description="Cloud users — reachable in-app. Open source — GitHub issues."
          href="https://github.com/shroudb"
          cta="GitHub"
        />
        <Card
          title="General"
          description="Anything else."
          href="mailto:hello@shroudb.io"
          cta="hello@shroudb.io"
        />
      </div>

      <div className="mt-12 flex justify-center">
        <Button asChild variant="secondary">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}

function Card({
  title,
  description,
  href,
  cta,
}: {
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-base-800 bg-base-dark p-5 transition-colors hover:border-base-700"
    >
      <div className="text-sm font-semibold text-base-cream">{title}</div>
      <div className="mt-1 text-xs text-base-500">{description}</div>
      <div className="mt-4 font-mono text-sm text-brand-core-light">{cta}</div>
    </Link>
  );
}
