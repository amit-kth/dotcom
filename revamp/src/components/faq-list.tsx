import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faqs";

export function FaqList({ items }: { items: typeof faqs }) {
  return (
    <div className="divide-y divide-slate-200 border-y border-slate-200">
      {items.map((item) => (
        <details key={item.id} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 rounded-lg py-4 text-base font-medium text-slate-950 transition-colors hover:text-blue-700 max-md:text-sm [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
          </summary>
          <p className="max-w-[72ch] pb-5 pr-8 text-[0.9375rem] leading-relaxed text-slate-600 max-md:text-sm">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
