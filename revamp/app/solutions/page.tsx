import { Seo } from "@/components/seo";

/**
 * VIEW ALL SOLUTIONS  —  placeholder for the setup step.
 * Metadata: config/variables.ts -> pages.solutions
 * The list of items on this page is a TODO from the brief.
 */
export default function SolutionsPage() {
  return (
    <>
      <Seo page="solutions" />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-3xl font-semibold tracking-tight">All solutions</h1>
        <p className="mt-3 text-muted-foreground">
          Placeholder. The item list for this page is still pending.
        </p>
      </main>
    </>
  );
}
