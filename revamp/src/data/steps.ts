export type DeliveryStep = {
  id: string;
  /** DRAFT: the day ranges are the client's approved wording only. */
  days: string;
  title: string;
};

/* ============================================================================
   steps.ts  —  how a 15-day delivery runs
   ----------------------------------------------------------------------------
   Four stages, two words each. The rail under the number tells the story; the
   copy here only labels the stops, because a stage that needs a sentence to
   explain itself is a stage we have not finished designing.

   TODO(confirm): the four stages and their day ranges are DRAFT. The 15 days
   total is approved; the split inside it is not. Do not publish these ranges
   until the client confirms them.
   ========================================================================== */

export const deliverySteps: DeliveryStep[] = [
  { id: "map", days: "Day 1–2", title: "Map what you run" },
  { id: "configure", days: "Day 3–7", title: "Configure it" },
  { id: "migrate", days: "Day 8–12", title: "Bring your data" },
  { id: "live", days: "Day 13–15", title: "Go live" },
];
