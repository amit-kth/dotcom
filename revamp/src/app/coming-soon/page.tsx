import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Seo } from "@/lib/seo";
import { metadata, contact } from "@/config/variables";
import { comingSoon } from "@/data/catalogue";
import { buttonVariants } from "@/components/ui/button";
import { SHELL, T_BODY, T_HEADING, T_LABEL } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** Products we are still building. They are kept out of `catalogue`, so this
 *  page is the only place they appear: not in the list, filters or search. */
export default function ComingSoonPage() {
  return (
    <>
      <Seo {...metadata.comingSoon} />
      <main className="bg-slate-50">
        <div className={cn(SHELL, "pt-6 sm:pt-8")}>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Home
          </Link>
          <p className={cn(T_LABEL, "mt-6 text-slate-500")}>Coming soon</p>
          <h1 className={cn(T_HEADING, "mt-3 max-w-[26ch]")}>
            Being built right now.
          </h1>
          <p className={cn(T_BODY, "mt-5 text-slate-600")}>
            These products are in development, so they are not on sale yet. If
            one of them fits what you need, tell us and we will confirm when it
            can be ready for you.
          </p>
        </div>

        {/* Few cards, so the band is tight rather than a half-empty grid. */}
        <div className={cn(SHELL, "pt-10 pb-[clamp(3.5rem,7vw,6rem)] max-md:pt-8")}>
          {comingSoon.length > 0 ? (
            <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {comingSoon.map((item) => (
                <li key={item.id}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      width={640}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full rounded-2xl border border-slate-200 object-cover saturate-[0.85]"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="aspect-[16/10] w-full rounded-2xl border border-dashed border-slate-300 bg-slate-100"
                    />
                  )}
                  <div className="mt-4 flex items-start gap-3">
                    <div>
                      <h2 className="text-[1.0625rem] max-md:text-sm font-semibold leading-snug tracking-[-0.015em] text-slate-950">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-[0.9375rem] max-md:text-[0.8125rem] leading-snug text-slate-600">
                        {item.line}
                      </p>
                    </div>
                    <span className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[0.75rem] font-medium text-slate-600">
                      <Clock className="size-3" aria-hidden="true" />
                      In development
                    </span>
                  </div>
                  <Link
                    href={`${contact.contactPath}?solution=${item.id}`}
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "sm" }),
                      "mt-4",
                    )}
                  >
                    Ask about {item.name}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className={cn(T_BODY, "text-slate-600")}>
              Nothing is in development at the moment. Every product we have is
              already available on{" "}
              <Link
                href="/solutions/"
                className="font-medium text-blue-700 hover:underline hover:underline-offset-4"
              >
                All solutions
              </Link>
              .
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-8">
            <p className="text-sm text-slate-600">
              Looking for something you can use now? The ready-made catalogue is
              live.
            </p>
            <Link href="/solutions/" className={buttonVariants()}>
              See all solutions
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
