import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShrouDBMark } from "@/brand/marks";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      <ShrouDBMark size={64} />
      <h1 className="display mt-6 text-4xl text-base-cream">Not found</h1>
      <p className="mt-3 text-base text-base-500">
        Nothing at this path. Maybe you were looking for the docs or the
        engines index.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/docs">Docs</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/engines">Engines</Link>
        </Button>
      </div>
    </div>
  );
}
