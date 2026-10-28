import { Seo } from "@/components/seo";

/**
 * HOMEPAGE  —  placeholder for the setup step.
 * Sections are built next, after the structure is approved.
 * Metadata: config/variables.ts -> pages.home
 */
export default function HomePage() {
  return (
    <>
      <Seo page="home" />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-3xl font-semibold tracking-tight">
          Setup complete — sections next
        </h1>
        <p className="mt-3 text-muted-foreground">
          Homepage placeholder. Tokens, SEO wrapper, fonts and data shape are wired.
        </p>
      </main>
    </>
  );
}
