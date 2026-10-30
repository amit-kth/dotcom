export const SHELL = "mx-auto w-full max-w-none px-[clamp(1.25rem,4vw,6rem)]";

export const BAND = "py-[clamp(4.5rem,9vw,10rem)]";

export const T_DISPLAY =
  "text-[clamp(1.5rem,6.2vw,4.5rem)] font-bold leading-[1.04] tracking-[-0.04em]";

export const T_HEADING =
  "text-[clamp(1.5rem,3.4vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.035em]";

export const T_BODY = "max-w-[65ch] text-[1.125rem] leading-[1.6]";

export const T_LABEL =
  "text-[0.8125rem] leading-[1.4] font-semibold uppercase tracking-[0.16em]";

export const GLASS =
  "border border-white/15 bg-white/5 backdrop-blur-md backdrop-saturate-150";

export const LIGHT_BAND = [
  "relative isolate bg-slate-50 text-slate-950",
  "before:pointer-events-none before:absolute before:inset-0 before:-z-10",
  "before:bg-[radial-gradient(48%_60%_at_84%_8%,rgb(206_222_255/0.55),transparent_70%),radial-gradient(40%_50%_at_6%_92%,rgb(229_236_246/0.9),transparent_72%)]",
].join(" ");
