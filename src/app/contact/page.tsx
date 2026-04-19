import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ShrouDBMark } from "@/brand/marks";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the right inbox: sales, security, support, or general.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="text-center">
        <ShrouDBMark size={48} />
        <h1 className="display mt-6 text-4xl text-base-cream md:text-5xl">
          Get a real human, fast.
        </h1>
        <p className="mt-3 text-base text-base-500">
          Pick the inbox that fits — we read all of them.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Card
          title="Sales & Enterprise"
          description="Custom pricing, DPAs, dedicated tenancy, BYO KMS."
          href="mailto:sales@shroudb.io"
          cta="sales@shroudb.io"
        />
        <Card
          title="Security"
          description="Report a vulnerability — coordinated disclosure, PGP key on request."
          href="mailto:security@shroudb.io"
          cta="security@shroudb.io"
        />
        <Card
          title="Support"
          description="Cloud users get in-app chat. Open source lives on GitHub issues."
          href="https://github.com/shroudb"
          cta="GitHub"
        />
        <Card
          title="General"
          description="Everything else."
          href="mailto:hello@shroudb.io"
          cta="hello@shroudb.io"
        />
      </div>

      <div className="mt-12 flex justify-center">
        <Button variant="secondary" render={<Link href="/" />}>Back to home        </Button>
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
