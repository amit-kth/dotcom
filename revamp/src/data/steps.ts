export type DeliveryStep = {
  id: string;
  /** DRAFT: the day ranges are the client's approved wording only. */
  days: string;
  title: string;
  line: string;
};

/* ============================================================================
   steps.ts  —  how a 15-day delivery runs
   ----------------------------------------------------------------------------
   TODO(confirm): the four stages and their day ranges are DRAFT. The 15 days
   total is approved; the split inside it is not. Do not publish these ranges
   until the client confirms them.
   ========================================================================== */

export const deliverySteps: DeliveryStep[] = [
  {
    id: "map",
    days: "Day 1–2",
    title: "Map what you run",
    line: "Your process, your data, written down.",
  },
  {
    id: "configure",
    days: "Day 3–7",
    title: "Configure",
    line: "Roles, fields, branding — set to your business.",
  },
  {
    id: "migrate",
    days: "Day 8–12",
    title: "Bring your data across",
    line: "Records imported, your team trained.",
  },
  {
    id: "live",
    days: "Day 13–15",
    title: "Go live",
    line: "Switched over, with us still on call.",
  },
];
