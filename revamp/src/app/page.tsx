import { Seo } from "@/components/seo";
import { SiteHeader } from "@/components/site-header";
import { CategoryProvider } from "@/components/category-context";
import { Hero } from "@/components/hero";

/* ============================================================================
   HOMEPAGE
   ----------------------------------------------------------------------------
   The page argument, in order:

     1  hero        the visitor names their business          (dark)
     2  solutions   what already exists, as full-width banners
     3  delivery    the 15 days, made believable
     4  about       the company, once
     5  clients     logos and reviews
     6  footer      the closing call to action

   Step 1 of the rebuild ships the header and the hero; the sections below come
   in steps 2-4 so each one can be reviewed on its own.

   The chip choice lives in CategoryProvider because the hero and the solutions
   list are separate sections that both need it, and because it has to survive
   the scroll between them.
   ========================================================================== */

export default function HomePage() {
  return (
    <>
      <Seo page="home" />

      <CategoryProvider>
        <SiteHeader />
        <main>
          <Hero />
        </main>
      </CategoryProvider>
    </>
  );
}
