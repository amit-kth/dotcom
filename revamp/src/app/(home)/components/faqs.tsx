import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { faqs } from "@/data/faqs";
import { FaqList } from "@/components/faq-list";
import { SHELL, T_HEADING, T_LABEL } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function Faqs() {
  return (
    <section aria-labelledby="faq-title" className="bg-white py-12 sm:py-16">
      <div className={cn(SHELL, "grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16")}>
        <div>
          <p className={cn(T_LABEL, "text-slate-500")}>FAQs</p>
          <h2 id="faq-title" className={cn(T_HEADING, "mt-3 max-w-[20ch]")}>Before you get started.</h2>
          <Link href="/faq/" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900">View all FAQs <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
        </div>
        <FaqList items={faqs.slice(0, 6)} />
      </div>
    </section>
  );
}
