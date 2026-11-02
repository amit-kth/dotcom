import { Testimonials } from "./testimonials";
import { SHELL, T_HEADING, T_LABEL } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function Clients() {
  return (
    <section id="clients" aria-labelledby="clients-title" className="bg-slate-50 text-slate-950">
      <div className={cn(SHELL, "py-12 sm:py-16")}>
        <p className={cn(T_LABEL, "text-slate-500")}>Client stories</p>
        <h2 id="clients-title" className={cn(T_HEADING, "mt-3 mb-7 max-w-[26ch]")}>
          In our clients’ words.
        </h2>
        <Testimonials />
      </div>
    </section>
  );
}
