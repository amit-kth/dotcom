"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { testimonials, videoTestimonials } from "@/data/site-content";

export function Testimonials() {
  const [review, setReview] = useState(0);
  const [video, setVideo] = useState<(typeof videoTestimonials)[number] | null>(null);
  const videoTrigger = useRef<HTMLButtonElement | null>(null);

  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduceMotion || video || !inView) return;
    const timer = window.setInterval(() => {
      if (document.hidden || root.current?.matches(":hover, :focus-within")) return;
      setReview((current) => (current + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, video, inView, review]);

  return (
    <div ref={root} aria-label="Client testimonials" className="grid gap-7 md:grid-cols-[1.2fr_1fr] md:gap-8 lg:gap-16">
      <div className="min-w-0">
        <div id="client-reviews" className="grid" aria-live={paused || reduceMotion ? "polite" : "off"} aria-atomic="true">
          {testimonials.map((item, index) => (
            <figure key={item.id} aria-hidden={index !== review} inert={index !== review} className={`col-start-1 row-start-1 flex flex-col ${index !== review ? "invisible" : ""}`}>
              <blockquote className="flex-1 text-[clamp(1.25rem,2.2vw,2rem)] max-md:text-lg font-medium leading-snug tracking-[-0.025em] text-slate-900">“{item.excerpt}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-4">
                <span className="flex h-14 w-16 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white p-2">
                  <img src={item.logo} alt="" width={48} height={40} loading="lazy" className="size-full object-contain" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{item.name}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-slate-600">{item.role}</span>
                </span>
              </figcaption>
              <div className="mt-3 min-h-8">
                {item.sourceLink && <a href={item.sourceLink} target="_blank" rel="noopener noreferrer" aria-label={`Read ${item.name}’s review on ${item.source} (opens in a new tab)`} className="inline-flex min-h-8 items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900">Read on {item.source}<ArrowUpRight className="size-3" aria-hidden="true" /></a>}
              </div>
            </figure>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button type="button" aria-label="Previous reviews" aria-controls="client-reviews" onClick={() => setReview((current) => (current - 1 + testimonials.length) % testimonials.length)} className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white hover:border-blue-600 hover:text-blue-700"><ArrowLeft className="size-4" aria-hidden="true" /></button>
          <span className="min-w-10 text-center text-xs tabular-nums text-slate-500" aria-hidden="true">{review + 1} / {testimonials.length}</span>
          <button type="button" aria-label="Next reviews" aria-controls="client-reviews" onClick={() => setReview((current) => (current + 1) % testimonials.length)} className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white hover:border-blue-600 hover:text-blue-700"><ArrowRight className="size-4" aria-hidden="true" /></button>
          {!reduceMotion && <button type="button" onClick={() => setPaused((current) => !current)} aria-label={paused ? "Resume automatic reviews" : "Pause automatic reviews"} className="ml-1 flex size-11 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white hover:border-blue-600 hover:text-blue-700">{paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}</button>}
        </div>
      </div>

      <div className="min-w-0 border-t border-slate-200 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-6 lg:pl-10">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Hear it from them</h3>
        <div className="divide-y divide-slate-200">
          {videoTestimonials.map((item) => (
            <button key={item.videoLink} type="button" onClick={(event) => { videoTrigger.current = event.currentTarget; setVideo(item); }} aria-label={`Play video testimonial: ${item.name}, ${item.role}`} className="group flex w-full cursor-pointer items-center gap-4 py-3 text-left lg:py-4">
              <span className="relative block aspect-square w-24 shrink-0 overflow-hidden rounded-lg bg-slate-200 sm:w-28 md:w-24 lg:w-28">
                <img src={item.thumbnail} alt="" width={256} height={256} loading="lazy" className="size-full object-contain" />
                <span className="absolute inset-0 flex items-center justify-center bg-slate-950/15">
                  <span className="flex size-8 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm group-hover:bg-blue-600 group-hover:text-white"><Play className="ml-0.5 size-3.5 fill-current" aria-hidden="true" /></span>
                </span>
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-slate-950 group-hover:text-blue-700">{item.name}</span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-600">{item.role}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={video !== null} onOpenChange={(open) => { if (!open) setVideo(null); }}>
        <DialogContent className="w-[calc(100vw-1.5rem)] max-w-4xl gap-3 p-3 pt-12 sm:p-5 sm:pt-12" onCloseAutoFocus={(event) => { event.preventDefault(); videoTrigger.current?.focus({ preventScroll: true }); }}>
          <DialogTitle className="sr-only">Video testimonial: {video?.name}</DialogTitle>
          <DialogDescription className="sr-only">{video?.role}. YouTube video player.</DialogDescription>
          {video && <iframe src={`${video.videoLink}?autoplay=1&rel=0`} title={`Video testimonial from ${video.name}`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="aspect-video max-h-[70dvh] w-full rounded-lg border-0" />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
