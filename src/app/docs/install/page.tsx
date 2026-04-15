import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocsHeader, H2, H3, P, UL, LI, A } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Installation",
  description: "Install ShrouDB Moat or individual engines.",
};

export default function InstallPage() {
  return (
    <>
      <DocsHeader
        eyebrow="Getting started"
        title="Installation"
        tagline="Install ShrouDB Moat (all engines in one binary) or individual engines."
      />

      <H2>Homebrew</H2>
      <P>The quickest way to get Moat on macOS or Linux.</P>
      <CodeBlock title="terminal">
        {`$ brew install shroudb/tap/shroudb-moat

# or install individual engines
$ brew install shroudb/tap/shroudb-sigil
$ brew install shroudb/tap/shroudb-cipher
$ brew install shroudb/tap/shroudb-keep`}
      </CodeBlock>

      <H2>Docker</H2>
      <P>Official images are published on Docker Hub and ghcr.io.</P>
      <CodeBlock title="terminal">
        {`$ docker run --rm -it \\
    -p 8200:8200 -p 8201:8201 \\
    -v $(pwd)/moat.toml:/etc/shroudb/moat.toml \\
    -e SHROUDB_MASTER_KEY \\
    ghcr.io/shroudb/moat:latest`}
      </CodeBlock>
      <CodeBlock title="docker-compose.yml">
        {`services:
  moat:
    image: ghcr.io/shroudb/moat:latest
    ports:
      - "8200:8200"
      - "8201:8201"
    volumes:
      - ./moat.toml:/etc/shroudb/moat.toml
      - moat-data:/var/lib/shroudb
    environment:
      SHROUDB_MASTER_KEY: \${SHROUDB_MASTER_KEY}

volumes:
  moat-data:`}
      </CodeBlock>

      <H2>Binary download</H2>
      <P>Pre-built binaries are published on each GitHub release.</P>
      <CodeBlock title="terminal">
        {`$ curl -fsSL \\
    https://github.com/shroudb/moat/releases/latest/download/shroudb-moat-$(uname -s)-$(uname -m).tar.gz \\
    | tar xz
$ sudo mv shroudb-moat /usr/local/bin/
$ shroudb-moat --version`}
      </CodeBlock>

      <H2>Cargo (from source)</H2>
      <P>Requires Rust 1.75 or later.</P>
      <CodeBlock title="terminal">
        {`$ cargo install shroudb-moat

# or individual engines
$ cargo install shroudb-sigil
$ cargo install shroudb-cipher`}
      </CodeBlock>

      <H2>Verify</H2>
      <CodeBlock title="terminal">
        {`$ shroudb-moat --version
shroudb-moat 1.0.0`}
      </CodeBlock>

      <H3>What&apos;s next</H3>
      <UL>
        <LI>
          Follow the <A href="/docs/quickstart">Quickstart</A> to have Moat running with two engines in under five minutes.
        </LI>
        <LI>
          Read the <A href="/docs/architecture">Architecture</A> overview to see how engines, storage, and protocols fit together.
        </LI>
      </UL>
    </>
  );
}
