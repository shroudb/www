import type { MarkProps } from "./marks";
import { productMarks } from "./marks";
import type { ProductKey } from "./palette";

export function ProductMark({
  kind,
  ...props
}: { kind: ProductKey } & MarkProps) {
  const Render = productMarks[kind];
  return <Render {...props} />;
}
