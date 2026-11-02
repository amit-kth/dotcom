import { ArrowUpRight, ImageIcon } from "lucide-react";
import { catalogue } from "@/data/catalogue";

export function CatalogueGrid() {
  return (
    <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {catalogue.map((item) => (
        <li key={item.id} id={`catalogue-${item.id}`} className="group">
          {item.image ? (
            <img
              src={item.image}
              alt=""
              width={640}
              height={400}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full rounded-2xl border border-slate-200 object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="relative block aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 bg-[radial-gradient(120%_90%_at_88%_0%,rgb(206_222_255/0.55),transparent_62%),repeating-linear-gradient(135deg,rgb(5_1_37/0.05)_0_1px,transparent_1px_10px)] transition-colors group-hover:border-[color-mix(in_oklch,var(--color-blue-600)_32%,var(--color-slate-200))]"
            >
              {/* the artwork slot, not an apology: it carries the group the
                  product belongs to, in the same corner every render will sit */}
              <span className="absolute bottom-[0.8125rem] left-3.5 text-[0.6875rem] font-semibold tracking-[0.14em] text-slate-500 uppercase">
                {item.group}
              </span>
              <span className="absolute bottom-7 left-3.5 h-0.5 w-6 rounded-[2px] bg-blue-600 opacity-85" />
              <ImageIcon
                strokeWidth={1.25}
                className="absolute top-3.5 right-3.5 size-4 text-slate-500 opacity-50"
              />
            </div>
          )}

          <div className="mt-4 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em] text-slate-950">
                {item.name}
              </h3>
              <p className="mt-1 text-[0.9375rem] leading-snug text-slate-600">
                {item.line}
              </p>
            </div>

            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.name}, open the product page`}
                className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-blue-600 hover:text-blue-600"
              >
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
