import { Star } from "lucide-react";
import { platformRatings } from "@/data/site-content";

export function PlatformRatings() {
  return (
      <div className="grid grid-cols-3 divide-x divide-white/15 py-1">
        {platformRatings.map((rating) => (
          <a key={rating.title} href={rating.href} target="_blank" rel="noopener noreferrer" aria-label={`${rating.title}: ${rating.starCount} out of 5. View ratings (opens in a new tab)`} className="flex flex-col items-center justify-center gap-2 px-2 2xl:flex-row 2xl:gap-3 2xl:px-3">
            <img src={rating.platformLogo} alt="" width={36} height={36} loading="lazy" className="size-7 rounded-md bg-white object-contain p-1 xl:size-9" />
            <div className="text-center sm:text-left">
              <p className="text-[0.6875rem] font-medium text-slate-300 sm:text-sm">{rating.title}</p>
              <p className="text-xl font-semibold leading-tight text-slate-50 sm:text-2xl">{rating.starCount.toFixed(1)}<span className="ml-1 text-xs font-normal text-slate-400">/ 5</span></p>
              <span aria-hidden="true" className="mt-1 inline-flex gap-0.5 rounded bg-slate-950 px-1 py-1">
                {[0, 1, 2, 3, 4].map((index) => (
                  <span key={index} className="relative size-3">
                    <Star className="size-3 fill-slate-600 text-slate-300" />
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
  );
}
