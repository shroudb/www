// Copy revised by Claude Code — review before deploy
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { engines, getEngine } from "@/brand/engines";
import { engineContent } from "@/brand/engine-content";
import type { EngineKey } from "@/brand/palette";
import { getProductColor } from "@/brand/marks";
import { ProductMark } from "@/brand/ProductMark";
import { CodeBlock } from "@/components/ui/code-block";
import { CmdTable } from "@/components/ui/cmd-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const VALID_KEYS = new Set<EngineKey>(engines.map((e) => e.key));

function isEngineKey(key: string): key is EngineKey {
  return VALID_KEYS.has(key as EngineKey);
}

export function generateStaticParams() {
  return engines.map((engine) => ({ key: engine.key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<Metadata> {
  const { key } = await params;
  if (!isEngineKey(key)) return {};
  const engine = getEngine(key);
  return {
    title: engine.name,
    description: engine.description,
  };
}

export default async function EnginePage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  if (!isEngineKey(key)) notFound();

  const engine = getEngine(key);
  const content = engineContent[key];
  const { primary, light } = getProductColor(key);

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <header className="flex items-start gap-5">
        <ProductMark kind={key} size={72} color={primary} lightColor={light} />
        <div>
          <div
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: primary }}
          >
            ShrouDB Engine
          </div>
          <h1
            className="display mt-2 text-4xl md:text-5xl"
            style={{ color: primary }}
          >
            {engine.name}
          </h1>
          <p className="mt-2 text-lg text-base-300">{engine.tagline}</p>
        </div>
      </header>

      <p className="mt-8 text-base leading-relaxed text-base-300">
        {engine.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {engine.commands.map((cmd) => (
          <Badge key={cmd} color={primary}>
            {cmd}
          </Badge>
        ))}
      </div>

      {/* Features */}
      <section className="mt-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-base-500">
          Features
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {content.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 rounded-lg border border-base-800 bg-base-dark p-4 text-sm text-base-300"
            >
              <span
                aria-hidden
                className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: primary }}
              />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {/* Quickstart */}
      <section className="mt-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-base-500">
          Quickstart (standalone)
        </h2>
        <div className="mt-4 space-y-4">
          <CodeBlock title={content.quickstart.configTitle}>
            {content.quickstart.config}
          </CodeBlock>
          <CodeBlock title="terminal">
            {`$ ${content.quickstart.runCommand}`}
          </CodeBlock>
        </div>
      </section>

      {/* Commands */}
      <section className="mt-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-base-500">
          Command reference
        </h2>
        <div className="mt-4">
          <CmdTable commands={content.cmdTable} />
        </div>
      </section>

      {/* In Moat */}
      <section className="mt-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-base-500">
          Bundle into Moat
        </h2>
        <p className="mt-3 text-sm text-base-300">
          Drop {engine.name} into a unified Moat process and it inherits the
          shared auth layer, storage, and telemetry — no extra wiring.
        </p>
        <div className="mt-4">
          <CodeBlock title="moat.toml">{content.moatSnippet}</CodeBlock>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-base-800 bg-base-dark p-6">
        <div>
          <div className="text-sm font-semibold text-base-cream">
            Run {engine.name} in production today
          </div>
          <div className="mt-1 text-sm text-base-500">
            Free on ShrouDB Cloud up to 10k ops/month — no card required.
          </div>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="https://app.shroudb.io/signup">Start for free</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href={`/docs/${key}`}>Read the docs</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
