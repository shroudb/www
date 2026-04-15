import Link from "next/link";
import type { EngineMeta } from "@/brand/engines";
import { getProductColor } from "@/brand/marks";
import { ProductMark } from "@/brand/ProductMark";
import { Badge } from "./ui/badge";

export function EngineCard({ engine }: { engine: EngineMeta }) {
  const { primary, light } = getProductColor(engine.key);

  return (
    <Link
      href={`/engines/${engine.key}`}
      className="group relative flex flex-col rounded-2xl border border-base-800 bg-base-dark p-6 transition-all duration-300 hover:-translate-y-0.5"
      style={
        {
          ["--engine-color" as string]: primary,
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, transparent, ${primary}10)`,
          borderColor: `${primary}44`,
          border: "1px solid",
        }}
        aria-hidden
      />
      <div className="relative flex items-start gap-3">
        <ProductMark kind={engine.key} size={40} color={primary} lightColor={light} />
        <div>
          <div
            className="text-sm font-semibold tracking-wide"
            style={{ color: primary }}
          >
            {engine.name}
          </div>
          <div className="mt-0.5 text-xs text-base-500">{engine.tagline}</div>
        </div>
      </div>
      <p className="relative mt-4 flex-1 text-sm leading-relaxed text-base-300">
        {engine.description}
      </p>
      {engine.commands.length > 0 && (
        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {engine.commands.slice(0, 4).map((cmd) => (
            <Badge key={cmd} color={primary}>
              {cmd}
            </Badge>
          ))}
        </div>
      )}
    </Link>
  );
}
