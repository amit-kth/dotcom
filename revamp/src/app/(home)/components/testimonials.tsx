"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { platformRatings, testimonials, videoTestimonials } from "@/data/site-content";

export function Testimonials() {
  const reviews = useRef<HTMLUListElement>(null);
  const [video, setVideo] = useState<(typeof videoTestimonials)[number] | null>(null);
  const videoTrigger = useRef<HTMLButtonElement | null>(null);

  return (
    <div aria-label="Client ratings and testimonials" className="space-y-7">
      <div className="grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white py-4">
        {platformRatings.map((rating) => (
          <a key={rating.title} href={rating.href} target="_blank" rel="noopener noreferrer" aria-label={`${rating.title}: ${rating.starCount} out of 5. View ratings (opens in a new tab)`} className="flex flex-col items-center justify-center gap-2 px-2 sm:flex-row sm:gap-4 sm:px-4">
            <img src={rating.platformLogo} alt="" width={36} height={36} loading="lazy" className="size-7 object-contain sm:size-9" />
            <div className="text-center sm:text-left">
              <p className="text-[0.6875rem] font-medium whitespace-nowrap text-slate-600 sm:text-sm">{rating.title}</p>
              <p className="text-xl font-semibold leading-tight text-slate-950 sm:text-2xl">{rating.starCount.toFixed(1)}<span className="ml-1 text-xs font-normal text-slate-500">/ 5</span></p>
              <span aria-hidden="true" className="mt-1 inline-flex gap-0.5 rounded bg-slate-950 px-1.5 py-1">
                {[0, 1, 2, 3, 4].map((index) => (
                  <span key={index} className="relative size-3">
                    <Star className="size-3 fill-slate-600 text-slate-600" />
                    <span className="absolute inset-0 overflow-hidden" style={{ width: `${Math.max(0, Math.min(1, rating.starCount - index)) * 100}%` }}>
                      <Star className="size-3 fill-current" style={{ color: rating.starColor }} />
                    </span>
                  </span>
                ))}
              </span>
            </div>
          </a>
        ))}
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-slate-950">In our clients’ words</h3>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous reviews" aria-controls="client-reviews" onClick={() => reviews.current?.scrollBy({ left: -reviews.current.clientWidth, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })} className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-100"><ArrowLeft className="size-4" aria-hidden="true" /></button>
            <button type="button" aria-label="Next reviews" aria-controls="client-reviews" onClick={() => reviews.current?.scrollBy({ left: reviews.current.clientWidth, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })} className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-100"><ArrowRight className="size-4" aria-hidden="true" /></button>
          </div>
        </div>
        <ul id="client-reviews" ref={reviews} aria-label="Written client reviews" tabIndex={0} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
          {testimonials.map((item) => (
            <li key={item.id} className="w-[88%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]">
              <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5">
                <blockquote className="mb-5 text-[0.9375rem] leading-relaxed text-slate-700">“{item.excerpt}”</blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  <img src={item.logo} alt="" width={48} height={40} loading="lazy" className="h-9 w-12 shrink-0 object-contain" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-950">{item.name}</p>
                    <p className="text-xs leading-relaxed text-slate-600">{item.role}</p>
                  </div>
                </figcaption>
                {item.sourceLink && <a href={item.sourceLink} target="_blank" rel="noopener noreferrer" aria-label={`Read ${item.name}’s review on ${item.source} (opens in a new tab)`} className="mt-3 inline-flex min-h-8 items-center gap-1 self-start text-xs font-semibold text-blue-700 hover:text-blue-900">Read on {item.source}<ArrowUpRight className="size-3" aria-hidden="true" /></a>}
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-slate-950">Watch their stories</h3>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible">
          {videoTestimonials.map((item) => (
            <button key={item.videoLink} type="button" onClick={(event) => { videoTrigger.current = event.currentTarget; setVideo(item); }} aria-label={`Play video testimonial: ${item.name}, ${item.role}`} className="group w-[78%] shrink-0 cursor-pointer snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white text-left sm:w-auto">
              <span className="relative block aspect-video w-full max-h-40 overflow-hidden bg-slate-200">
                <img src={item.thumbnail} alt="" width={480} height={270} loading="lazy" className="size-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none" />
                <span className="absolute inset-0 bg-slate-950/15" />
                <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-blue-700 shadow-lg transition-colors group-hover:bg-blue-600 group-hover:text-white"><Play className="ml-0.5 size-5 fill-current" aria-hidden="true" /></span>
              </span>
              <span className="block px-4 py-3">
                <span className="block text-sm font-semibold text-slate-950">{item.name}</span>
                <span className="block text-xs text-slate-600">{item.role}</span>
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
