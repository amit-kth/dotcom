"use client";

import { T_BODY, T_HEADING, T_LABEL } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { useRequestedSolution } from "@/app/contact/lib/use-requested-solution";

/* ============================================================================
   ContactHeading ,  the one line that changes with the query string
   ----------------------------------------------------------------------------
   Two entry points, two titles, and nothing else differs:

     /contact                    -> "Contact us"                (no product)
     /contact?solution=k-exam    -> "Request a demo of K-Exam"   (that product)

   These are the only two labels the site uses for the contact form. There is no
   "Book a walkthrough", no "Get a quote", one form, one name per context.
   ========================================================================== */

export function ContactHeading() {
  const solution = useRequestedSolution();

  return (
    <>
      <p className={cn(T_LABEL, "text-slate-600")}>
        {solution ? "Request a demo" : "Contact"}
      </p>

      <h1 className={cn(T_HEADING, "mt-4 max-w-[20ch]")}>
        {solution ? (
          <>
            Request a demo of{" "}
            <span className="text-blue-700">{solution.name}</span>
          </>
        ) : (
          "Contact us"
        )}
      </h1>

      <p className={cn(T_BODY, "mt-6 max-w-[44ch] text-slate-600")}>
        {solution
          ? solution.problem
          : "One call is usually enough to say which solution fits, and when it can be live."}
      </p>
    </>
  );
}
