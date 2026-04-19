import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DocsHeader, H2, P, UL, LI, Callout } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Cloud",
  description: "Managed ShrouDB — generous free tier, zero infrastructure.",
};

export default function CloudDocsPage() {
  return (
    <>
      <DocsHeader
        eyebrow="Deployment"
        title="Cloud"
        tagline="Every engine, hosted. Free tier, zero infrastructure."
      />

      <P>
        ShrouDB Cloud runs the same engines you&apos;d self-host in Moat, on
        infrastructure we operate. You get the Moat HTTP API, SDKs, and
        scope-based auth — without the ops.
      </P>

      <H2>Free tier</H2>
      <UL>
        <LI>10,000 operations per month, all engines.</LI>
        <LI>Unlimited keyspaces, keyrings, and secrets.</LI>
        <LI>7-day audit retention via Chronicle.</LI>
        <LI>No credit card required.</LI>
      </UL>

      <H2>Pro</H2>
      <UL>
        <LI>Pay per engine operation — no per-seat pricing.</LI>
        <LI>90-day audit retention, exportable.</LI>
        <LI>SLA with incident credits.</LI>
        <LI>Priority support.</LI>
      </UL>

      <H2>Enterprise</H2>
      <UL>
        <LI>Dedicated tenancy and VPC peering.</LI>
        <LI>BYO KMS for master key wrapping.</LI>
        <LI>SSO, SCIM, custom audit retention.</LI>
        <LI>Procurement, DPA, and security review.</LI>
      </UL>

      <Callout title="Same engines, different operating model">
        Cloud and Moat expose identical APIs. You can start on Cloud and move
        to Moat later — the SDK code doesn&apos;t change.
      </Callout>

      <div className="mt-8 flex gap-3">
        <Button render={<Link href="https://app.shroudb.io/signup" />}>Start free        </Button>
        <Button variant="secondary" render={<Link href="/pricing" />}>See pricing        </Button>
      </div>
    </>
  );
}
