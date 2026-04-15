import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocsHeader, H2, H3, P, UL, LI } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Security model",
  description:
    "Defense in depth — encryption at rest, zeroization, isolation, and access control.",
};

export default function SecurityDocsPage() {
  return (
    <>
      <DocsHeader
        eyebrow="Reference"
        title="Security model"
        tagline="Defense in depth — encryption at rest, zeroization, isolation, and access control."
      />

      <H2>Encryption at rest</H2>

      <H3>WAL encryption</H3>
      <P>
        Every mutation is AES-256-GCM encrypted before it&apos;s appended to
        the write-ahead log. Nonces are deterministic per record, keys come
        from HKDF.
      </P>

      <H3>Master key</H3>
      <P>
        Moat requires a 256-bit master key from{" "}
        <code className="font-mono text-base-cream">SHROUDB_MASTER_KEY</code>.
        Per-engine keys are derived via HKDF. In production, store the master
        key in an HSM or cloud KMS and inject at process start.
      </P>

      <H3>Per-tenant isolation</H3>
      <P>
        Multi-tenant deployments derive separate engine master keys per tenant,
        again via HKDF. Process-level access does not imply data access across
        tenants.
      </P>

      <H2>Zeroization</H2>
      <UL>
        <LI>
          <code className="font-mono text-base-cream">SecretBytes</code>{" "}
          containers zero their backing memory on drop.
        </LI>
        <LI>Veil plaintext is zeroized after match completion.</LI>
        <LI>Courier payloads are zeroized after delivery.</LI>
        <LI>Cipher plaintext is never persisted, only processed in memory.</LI>
      </UL>

      <H2>Core dumps</H2>
      <P>
        Moat disables core dumps at startup on Linux and macOS. Reduces the
        risk of keys ending up on disk after a crash.
      </P>

      <H2>TLS / mTLS</H2>
      <CodeBlock title="moat.toml">
        {`[server.tls]
cert_file = "/etc/shroudb/tls/server.crt"
key_file  = "/etc/shroudb/tls/server.key"
client_ca = "/etc/shroudb/tls/clients.crt"  # optional mTLS`}
      </CodeBlock>
      <P>
        Use Forge to issue short-lived service certificates for mTLS between
        your apps and Moat.
      </P>

      <H2>Scope-based auth</H2>
      <P>
        Every token carries a set of scopes in{" "}
        <code className="font-mono text-base-cream">engine:verb/resource</code>{" "}
        form. Gate checks happen before any engine command executes.
      </P>
      <CodeBlock title="examples">
        {`*:*/*                     # full access
cipher:encrypt/payments   # encrypt under payments keyring only
sigil:verify/*            # verify any credential
keep:get/secrets/app/*    # read app secrets only
chronicle:query/*         # read audit stream`}
      </CodeBlock>

      <H2>Security checklist</H2>
      <UL>
        <LI>Generate a strong master key (256-bit, 64 hex chars).</LI>
        <LI>Store the master key in an HSM or cloud KMS.</LI>
        <LI>Enable TLS in production; prefer mTLS for service-to-service.</LI>
        <LI>Grant least-privilege scopes — never ship <code className="font-mono text-base-cream">*:*/*</code> to apps.</LI>
        <LI>Enable Chronicle for persistent audit and alerting.</LI>
        <LI>Rotate Cipher keyrings and Sigil keyspaces on a schedule.</LI>
        <LI>Enforce a short default TTL on credentials.</LI>
        <LI>Write audit logs off-host for tamper-evident retention.</LI>
      </UL>
    </>
  );
}
