import { Seo } from "@/lib/seo";
import { metadata } from "@/config/variables";
import { Hero } from "@/app/(home)/components/hero";
import { Solutions } from "@/app/(home)/components/solutions";
import { Delivery } from "@/app/(home)/components/delivery";
import { About } from "@/app/(home)/components/about";
import { ClientStrip } from "@/app/(home)/components/client-strip";
import { Clients } from "@/app/(home)/components/clients";

export default function HomePage() {
  return (
    <>
      <Seo {...metadata.home} />

      <main>
        <Hero />
        <ClientStrip />
        <Solutions />
        <Delivery />
        <About />
        <Clients />
      </main>
    </>
  );
}
