import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Seo } from "@/lib/seo";
import { metadata, contact } from "@/config/variables";
import { faqs, faqGroups } from "@/data/faqs";
import { FaqList } from "@/components/faq-list";
import { buttonVariants } from "@/components/ui/button";
import { BAND, SHELL, T_BODY, T_HEADING, T_LABEL } from "@/lib/ui";
import { cn } from "@/lib/utils";

export default function FaqPage() {
  return (
    <>
      <Seo {...metadata.faq} />
      <main className="bg-slate-50">
        <div className={cn(SHELL, "pt-6 sm:pt-8")}>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950"><ArrowLeft className="size-4" aria-hidden="true" />Back to Home</Link>
          <p className={cn(T_LABEL, "mt-6 text-slate-500")}>FAQs</p>
          <h1 className={cn(T_HEADING, "mt-3 max-w-[24ch]")}>Questions before you get started.</h1>
          <p className={cn(T_BODY, "mt-5 text-slate-600")}>Choosing software, planning your setup and knowing what to ask before you decide.</p>
        </div>
        <div className={cn(SHELL, BAND, "space-y-12")}>
          {faqGroups.map((group, index) => (
            <section key={group} aria-labelledby={`faq-group-${index}`} className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <h2 id={`faq-group-${index}`} className="text-xl font-semibold text-slate-950 max-md:text-lg">{group}</h2>
              <FaqList items={faqs.filter((item) => item.group === group)} />
            </section>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-8">
            <p className="text-sm text-slate-600">Have a question about a specific product? Talk to our team.</p>
            <Link href={contact.contactPath} className={buttonVariants()}>Contact us <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </main>
    </>
  );
}
