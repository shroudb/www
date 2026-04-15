import { EngineCard } from "@/components/engine-card";
import { engines } from "@/brand/engines";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engines",
  description:
    "Nine engines — each does one thing well. All share one auth model, one config format, one telemetry pipeline.",
};

export default function EnginesIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="display text-4xl text-base-cream md:text-5xl">Engines</h1>
        <p className="mt-4 text-base text-base-500">
          Nine engines, one storage layer. Run them independently or bundle them
          into a single Moat process.
        </p>
      </header>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {engines.map((engine) => (
          <EngineCard key={engine.key} engine={engine} />
        ))}
      </div>
    </div>
  );
}
