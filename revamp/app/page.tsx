import { Seo } from "@/components/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { SolutionsExplorer } from "@/components/solutions-explorer";
import { FeaturedProject } from "@/components/sections/featured-project";
import { Delivery } from "@/components/sections/delivery";
import { Comparison } from "@/components/sections/comparison";
import { Counters } from "@/components/sections/counters";
import { ClientLogos } from "@/components/sections/client-logos";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { FinalCta } from "@/components/sections/final-cta";

/* ============================================================================
   HOMEPAGE
   ----------------------------------------------------------------------------
   Section order is the argument the page makes:

     1 hero          what this is, and why it is fast
     2 explorer      the question, and the products that answer it
     3 featured      proof we can build, not just resell
     4 delivery      the 15 days, as four dated steps
     5 comparison    why this beats a custom quote
     6 counters      the size of the company behind it
     7 clients       names the visitor might recognise
     8 testimonials  someone like them already did this
     9 contact       the form, no dialog, for people who scrolled this far
    10 final cta     two exits

   All of it is server rendered into the static HTML, so the products, the
   counters and the testimonials are readable by search engines without running
   any JavaScript. Only the category filter and the enquiry form are client
   components.
   ========================================================================== */

export default function HomePage() {
  return (
    <>
      <Seo page="home" />
      <SiteHeader />

      <main>
        <Hero />
        <SolutionsExplorer />
        <FeaturedProject />
        <Delivery />
        <Comparison />
        <Counters />
        <ClientLogos />
        <Testimonials />
        <Contact />
        <FinalCta />
      </main>

      <SiteFooter />
    </>
  );
}
