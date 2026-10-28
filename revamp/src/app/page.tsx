import { Seo } from "@/components/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HomeSolutions } from "@/components/home-solutions";
import { AiCalling } from "@/components/sections/ai-calling";
import { Process } from "@/components/sections/process";
import { Proof } from "@/components/sections/proof";
import { Voices } from "@/components/sections/voices";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

/* ============================================================================
   HOMEPAGE
   ----------------------------------------------------------------------------
   Six blocks, five sections. The page makes one argument in this order:

     1  hero + chips     what this is, and the one question that narrows it
     2  ai calling       the one build that gets shown working     (ink)
     3  solutions        what you can have, one card each          (paper)
     4  process          the 15 days, as one promise             (ink)
     5  proof            numbers, CMMI, client names             (paper)
     6  voices           the clients, in their own words          (sand)
     7  faq              the questions that block a decision     (paper)
     8  contact          the form, on a paper card in the dark   (ink)

   Surfaces alternate ink → paper → ink → paper → sand → paper → ink. That rhythm is the main
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

      {/* The page itself is the neutral surface; every block below is a
          rounded scene sitting on it. main is display:contents so the scenes
          and the footer are siblings in one flow and the gap between them is
          the same everywhere. */}
      <div className="page">
        <main className="contents">
          <HomeSolutions />
          <AiCalling />
          <Process />
          <Proof />
          <Voices />
          <Faq />
          <Contact />
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
