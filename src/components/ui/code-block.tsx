import { cn } from "@/lib/cn";

type CodeBlockProps = {
  title?: string;
  children: string;
  className?: string;
};

export function CodeBlock({ title, children, className }: CodeBlockProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-base-800 bg-base-dark",
        className,
      )}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-base-800 bg-base-black/40 px-4 py-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#FF5F56]" />
            <span className="h-2 w-2 rounded-full bg-[#FFBD2E]" />
            <span className="h-2 w-2 rounded-full bg-[#27C93F]" />
            <span className="ml-2 font-mono text-base-500">{title}</span>
          </div>
        </div>
      )}
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-base-300">
        <code>{children}</code>
      </pre>
    </div>
  );
}
