import { Seo } from "@/components/seo";
import { SiteHeader } from "@/components/site-header";
import { CategoryProvider } from "@/components/category-context";
import { Hero } from "@/components/hero";
import { Solutions } from "@/components/solutions";
import { Delivery } from "@/components/sections/delivery";
import { About } from "@/components/sections/about";
import { Clients } from "@/components/sections/clients";
import { SiteFooter } from "@/components/site-footer";

/* ============================================================================
   HOMEPAGE
   ----------------------------------------------------------------------------
   The page argument, in order. Nothing else belongs on it.

     1  hero        the visitor names their business
     2  solutions   what already exists, as full-width banners
     3  delivery    the 15 days, made believable
     4  about       the company, once
     5  clients     logos and reviews
     6  footer      the closing call to action

   Enquiries are a modal, not a section, so there is no contact section and no
   "get in touch" band competing with the footer.

   The chip choice lives in CategoryProvider because the hero, the solutions
   list and the modal all read it, and it has to survive the scroll between them.
   ========================================================================== */

export default function HomePage() {
  return (
    <>
      <Seo page="home" />

      <CategoryProvider>
        <SiteHeader />
        <main>
          <Hero />
          <Solutions />
          <Delivery />
          <About />
          <Clients />
        </main>
        <SiteFooter />
      </CategoryProvider>
    </>
  );
}
