// Copy revised by Claude Code — review before deploy
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { palette } from "@/brand/palette";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start free. Pay per operation when you grow. Self-host for free if you'd rather run the ops yourself.",
};

type Row = {
  label: string;
  free: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
};

const ROWS: Row[] = [
  { label: "Operations / month", free: "10,000", pro: "Usage-based", enterprise: "Negotiated" },
  { label: "Engines", free: "All 9", pro: "All 9", enterprise: "All 9" },
  { label: "Audit retention", free: "7 days", pro: "90 days", enterprise: "Custom" },
  { label: "SLA", free: false, pro: "99.9%", enterprise: "99.95%+" },
  { label: "BYO KMS", free: false, pro: false, enterprise: true },
  { label: "VPC peering", free: false, pro: false, enterprise: true },
  { label: "SSO / SCIM", free: false, pro: false, enterprise: true },
  { label: "DPA", free: false, pro: true, enterprise: true },
  { label: "Support", free: "Community", pro: "Priority email", enterprise: "Dedicated" },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="display text-4xl text-base-cream md:text-5xl">
          Pay for what you use, nothing else.
        </h1>
        <p className="mt-4 text-base text-base-500">
          Start free. Move to per-operation pricing when you grow. Self-host
          Moat any time — your code stays the same.
        </p>
      </header>

      <div className="mt-12 overflow-hidden rounded-2xl border border-base-800">
        <table className="w-full text-sm">
          <thead className="bg-base-dark text-left">
            <tr>
              <th className="px-4 py-4"></th>
              <th className="px-4 py-4">
                <div className="text-xs font-mono uppercase tracking-widest text-base-500">
                  Free
                </div>
                <div className="mt-1 text-2xl font-semibold text-base-cream">$0</div>
              </th>
              <th
                className="px-4 py-4"
                style={{ background: `${palette.brand.cloud}10` }}
              >
                <div
                  className="text-xs font-mono uppercase tracking-widest"
                  style={{ color: palette.brand.cloudLight }}
                >
                  Pro
                </div>
                <div className="mt-1 text-2xl font-semibold text-base-cream">
                  Usage-based
                </div>
              </th>
              <th className="px-4 py-4">
                <div className="text-xs font-mono uppercase tracking-widest text-base-500">
                  Enterprise
                </div>
                <div className="mt-1 text-2xl font-semibold text-base-cream">
                  Contact
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label} className="border-t border-base-800">
                <td className="px-4 py-3 text-base-cream">{row.label}</td>
                <Cell value={row.free} />
                <Cell value={row.pro} featured />
                <Cell value={row.enterprise} />
              </tr>
            ))}
            <tr className="border-t border-base-800">
              <td className="px-4 py-5"></td>
              <td className="px-4 py-5">
                <Button asChild variant="secondary" className="w-full">
                  <Link href="https://app.shroudb.io/signup">Start for free</Link>
                </Button>
              </td>
              <td
                className="px-4 py-5"
                style={{ background: `${palette.brand.cloud}10` }}
              >
                <Button asChild className="w-full">
                  <Link href="https://app.shroudb.io/signup">Start Pro</Link>
                </Button>
              </td>
              <td className="px-4 py-5">
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/contact">Talk to us</Link>
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-8 text-center text-sm text-base-500">
        Want to keep your data on your hardware?{" "}
        <Link
          href="/moat"
          className="text-brand-core-light underline-offset-4 hover:underline"
        >
          Self-host Moat
        </Link>{" "}
        — same engines, no per-op pricing, you bring the ops.
      </p>
    </div>
  );
}

function Cell({
  value,
  featured = false,
}: {
  value: string | boolean;
  featured?: boolean;
}) {
  const style = featured ? { background: `${palette.brand.cloud}10` } : undefined;
  if (typeof value === "boolean") {
    return (
      <td className="px-4 py-3 text-center" style={style}>
        {value ? (
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: palette.brand.cloud }}
            aria-label="Included"
          />
        ) : (
          <span className="text-base-700" aria-label="Not included">
            —
          </span>
        )}
      </td>
    );
  }
  return (
    <td className="px-4 py-3 text-base-300" style={style}>
      {value}
    </td>
  );
}
