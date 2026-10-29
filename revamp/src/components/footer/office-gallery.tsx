"use client";

import { useEffect, useId, useRef, useState, type ComponentProps } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { locations, type LocationItem } from "@/data/locations";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

type OfficeGalleryProps = ComponentProps<"section"> & {
  list?: LocationItem[];
  autoPlay?: boolean;
};

/** Adapted from the supplied Expandable gallery; vertical on narrow phones so
 * addresses remain legible. Native buttons and sibling map links avoid nested
 * interactive elements. Autoplay pauses for keyboard, pointer, hidden tabs,
 * offscreen galleries and reduced motion, with an explicit pause control. */
export function OfficeGallery({
  list = locations,
  autoPlay = true,
  className,
  ...props
}: OfficeGalleryProps) {
  const [activeItem, setActiveItem] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const activeIndex = Math.min(activeItem, Math.max(0, list.length - 1));

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(element);
    const onVisibility = () => setPageVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (
      !autoPlay ||
      paused ||
      hovering ||
      focused ||
      !visible ||
      !pageVisible ||
      reduceMotion ||
      list.length < 2
    )
      return;
    const timer = window.setInterval(
      () => setActiveItem((previous) => (previous + 1) % list.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, [
    autoPlay,
    paused,
    hovering,
    focused,
    visible,
    pageVisible,
    reduceMotion,
    list.length,
  ]);

  useEffect(() => {
    if (!visible || list.length < 2) return;
    const next = new Image();
    next.src = list[(activeIndex + 1) % list.length].image;
  }, [activeIndex, list, visible]);

  if (!list.length) return null;

  return (
    <section
      {...props}
      ref={ref}
      aria-label="Office locations gallery"
      className={cn("py-10 sm:py-12", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
          Our locations
        </h2>
        {autoPlay && !reduceMotion && list.length > 1 && (
          <Button
            variant="outline"
            size="sm"
            type="button"
            aria-label={paused ? "Play office gallery" : "Pause office gallery"}
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? (
              <Play aria-hidden="true" />
            ) : (
              <Pause aria-hidden="true" />
            )}
            {paused ? "Play" : "Pause"}
          </Button>
        )}
      </div>
      <div className="flex h-[28rem] w-full min-w-0 flex-col gap-2 md:h-80 md:flex-row">
        {list.map((item, index) => {
          const active = index === activeIndex;
          return (
            <article
              key={item.city}
              className={cn(
                "relative isolate min-h-11 min-w-0 overflow-hidden rounded-[2rem] bg-slate-900 transition-[flex-grow,flex-basis] duration-500 ease-out motion-reduce:transition-none md:min-h-0 md:min-w-11",
                active
                  ? "flex-[1_1_0%]"
                  : "flex-[0_0_2.75rem] md:flex-[0_0_5rem] lg:flex-[0_0_8rem]",
              )}
            >
              <img
                src={item.image}
                alt={`${item.city} location`}
                loading="lazy"
                decoding="async"
                className={cn(
                  "absolute inset-0 size-full object-cover transition-[filter] duration-500 motion-reduce:transition-none",
                  active ? "brightness-50" : "brightness-75",
                )}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent"
              />
              <button
                ref={(element) => {
                  buttons.current[index] = element;
                }}
                type="button"
                aria-expanded={active}
                aria-controls={`${id}-${index}`}
                aria-label={`View ${item.city} location`}
                className="absolute inset-0 z-10 cursor-pointer rounded-[2rem] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-blue-300"
                onClick={() => setActiveItem(index)}
                onMouseEnter={() => setActiveItem(index)}
                onFocus={() => setActiveItem(index)}
                onKeyDown={(event) => {
                  let next: number;
                  if (["ArrowRight", "ArrowDown"].includes(event.key))
                    next = (index + 1) % list.length;
                  else if (["ArrowLeft", "ArrowUp"].includes(event.key))
                    next = (index + list.length - 1) % list.length;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = list.length - 1;
                  else return;
                  event.preventDefault();
                  setActiveItem(next);
                  buttons.current[next]?.focus();
                }}
              >
                {!active && (
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold tracking-wide text-white md:[writing-mode:vertical-rl] lg:[writing-mode:horizontal-tb]">
                    {item.city}
                  </span>
                )}
              </button>
              <div
                id={`${id}-${index}`}
                hidden={!active}
                className="pointer-events-none absolute inset-x-6 bottom-6 z-20 text-white sm:inset-x-8 sm:bottom-8"
              >
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {item.city}
                </h3>
                <a
                  href={item.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto mt-3 inline-flex min-h-11 max-w-[38ch] items-start gap-2 rounded-lg text-sm leading-relaxed text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300 sm:text-base"
                  aria-label={`Open ${item.city} office in Google Maps: ${item.address}`}
                >
                  {item.address}
                  <ArrowUpRight
                    className="mt-1 size-4 shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
