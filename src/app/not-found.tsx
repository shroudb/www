import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShrouDBMark } from "@/brand/marks";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      <ShrouDBMark size={64} />
      <h1 className="display mt-6 text-4xl text-base-cream">
        Nothing lives here.
      </h1>
      <p className="mt-3 text-base text-base-500">
        Try the docs or the engines index — that&apos;s probably what you
        wanted.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button render={<Link href="/docs" />}>Read the docs        </Button>
        <Button variant="secondary" render={<Link href="/engines" />}>Browse engines        </Button>
      </div>
    </div>
  );
}
