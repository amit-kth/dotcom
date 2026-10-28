import { Seo } from "@/components/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HomeSolutions } from "@/components/home-solutions";
import { Process } from "@/components/sections/process";
import { Proof } from "@/components/sections/proof";
import { Voices } from "@/components/sections/voices";
import { Contact } from "@/components/sections/contact";

/* ============================================================================
   HOMEPAGE
   ----------------------------------------------------------------------------
   Six blocks, five sections. The page makes one argument in this order:

     1  hero + chips     what this is, and the one question that narrows it
     2  solutions        what you can have, one card each, no catalogue
     3  process          the 15 days, as four dated steps       (ink)
     4  proof            numbers, CMMI, client names            (paper)
     5  voices           one client in full, two in support     (sand)
     6  contact          the form, on a paper card in the dark  (ink)

   Surfaces alternate paper → ink → paper → sand → ink. That rhythm is the main
   reason the page no longer reads as one long white sheet, and it is the only
   structural rule the sections share.

   Everything except the hero/product island is a server component, so the
   numbers, quotes and product names are in the static HTML.
   ========================================================================== */

export default function HomePage() {
  return (
    <>
      <Seo page="home" />
      <SiteHeader />

      <main>
        <HomeSolutions />
        <Process />
        <Proof />
        <Voices />
        <Contact />
      </main>

      <SiteFooter />
    </>
  );
}
