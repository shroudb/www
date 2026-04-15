import { cn } from "@/lib/cn";
import { palette } from "@/brand/palette";

type WordmarkProps = {
  product?: string;
  color?: string;
  className?: string;
};

export function Wordmark({
  product,
  color = palette.brand.core,
  className,
}: WordmarkProps) {
  return (
    <span className={cn("tracking-tight font-semibold", className)}>
      <span style={{ color: palette.base.cream }}>Shrou</span>
      <span style={{ color }}>DB</span>
      {product && (
        <span
          className="ml-1.5 font-normal opacity-90"
          style={{ color }}
        >
          {product}
        </span>
      )}
    </span>
  );
}
