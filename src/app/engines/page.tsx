// Copy revised by Claude Code — review before deploy
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EngineCard } from "@/components/engine-card";
import { engines } from "@/brand/engines";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engines",
  description:
    "Nine focused security engines that already speak the same auth, config, and telemetry. Use one or compose them all.",
};

export default function EnginesIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="display text-4xl text-base-cream md:text-5xl">
          Pick the engine. Keep the integration.
        </h1>
        <p className="mt-4 text-base text-base-500">
          Nine focused engines that already share one auth model, one config
          format, and one telemetry pipeline. Use one in isolation or bundle
          them all into a single Moat process.
        </p>
      </header>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {engines.map((engine) => (
          <EngineCard key={engine.key} engine={engine} />
        ))}
      </div>
      <div className="mt-14 flex justify-center">
        <Button asChild size="lg">
          <Link href="https://app.shroudb.io/signup">Start for free</Link>
        </Button>
      </div>
    </div>
  );
}
