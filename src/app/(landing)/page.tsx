import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-2xl space-y-8">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Flowspace
        </h1>
        <p className="text-xl text-muted-foreground">
          What should I focus on right now?
        </p>

        <div className="pt-8 border-t border-border">
          <p className="mb-6 text-sm">
            Your personal digital desk. Offline-first. No distractions.
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="rounded-none font-bold uppercase tracking-widest"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
