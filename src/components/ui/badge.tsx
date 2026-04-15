import { cn } from "@/lib/cn";

type BadgeProps = {
  children: React.ReactNode;
  color?: string;
  className?: string;
};

export function Badge({ children, color, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs",
        className,
      )}
      style={
        color
          ? {
              borderColor: `${color}44`,
              background: `${color}15`,
              color: `${color}DD`,
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}
