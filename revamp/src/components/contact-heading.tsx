"use client";

import { useRequestedSolution } from "@/lib/use-requested-solution";

/* ============================================================================
   ContactHeading  —  the one line that changes with the query string
   ----------------------------------------------------------------------------
   Two entry points, two titles, and nothing else differs:

     /contact                    -> "Contact us"                (no product)
     /contact?solution=k-exam    -> "Request a demo of K-Exam"   (that product)

   These are the only two labels the site uses for the contact form. There is no
   "Book a walkthrough", no "Get a quote" — one form, one name per context.
   ========================================================================== */

export function ContactHeading() {
  const solution = useRequestedSolution();

  return (
    <>
      <p className="t-label">{solution ? "Request a demo" : "Contact"}</p>

      <h1 className="t-heading mt-4 max-w-[20ch]">
        {solution ? (
          <>
            Request a demo of{" "}
            <span className="text-accent-bright">{solution.name}</span>
          </>
        ) : (
          "Contact us"
        )}
      </h1>

      <p className="t-body mt-6 max-w-[44ch]">
        {solution
          ? solution.problem
          : "One call is usually enough to say which solution fits, and when it can be live."}
      </p>
    </>
  );
}
