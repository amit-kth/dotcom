"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { contact } from "@/config/variables";
import { cn } from "@/lib/utils";
import {
  normalizeSearch,
  searchSolutions,
  suggestedSearches,
} from "@/lib/solution-search";

const SearchContext = createContext<((trigger: HTMLElement) => void) | null>(
  null,
);

/** One shared, browser-only dialog; the pages themselves remain statically rendered. */
export function SolutionSearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [shortcut, setShortcut] = useState("Ctrl K");
  const returnFocus = useRef<HTMLElement | null>(null);
  const input = useRef<HTMLInputElement | null>(null);
  const list = useRef<HTMLDivElement | null>(null);
  const id = useId();
  const results = useMemo(() => searchSolutions(query), [query]);
  const activeIndex = Math.min(active, Math.max(0, results.length - 1));

  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setQuery("");
      setActive(0);
    }
  };
  const openSearch = useCallback((trigger: HTMLElement) => {
    returnFocus.current = trigger;
    setOpen(true);
  }, []);

  useEffect(() => {
    setShortcut(/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘ K" : "Ctrl K");
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        !event.altKey &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        if (
          document.activeElement instanceof HTMLElement &&
          !document
            .querySelector("[data-solution-search]")
            ?.contains(document.activeElement)
        )
          returnFocus.current = document.activeElement;
        setOpen((current) => !current);
        setQuery("");
        setActive(0);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open)
      list.current
        ?.querySelector('[aria-selected="true"]')
        ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const updateQuery = (value: string) => {
    setQuery(value);
    setActive(0);
  };

  return (
    <SearchContext.Provider value={openSearch}>
      {children}
      <Dialog.Root open={open} onOpenChange={changeOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-slate-950/50 backdrop-blur-sm" />
          <Dialog.Content
            data-solution-search
            aria-describedby={`${id}-description`}
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              input.current?.focus();
            }}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              returnFocus.current?.focus();
            }}
            className="fixed inset-x-2 top-2 z-[101] flex max-h-[calc(100dvh-1rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-2xl sm:inset-x-auto sm:top-[10vh] sm:left-1/2 sm:w-[min(42rem,calc(100vw-2rem))] sm:max-h-[80dvh] sm:-translate-x-1/2"
          >
            <Dialog.Title className="sr-only">Search solutions</Dialog.Title>
            <Dialog.Description id={`${id}-description`} className="sr-only">
              Find products by name, industry or business need. Use arrow keys
              to select a result and Enter to open it.
            </Dialog.Description>
            <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 px-4 py-3">
              <Search
                className="size-5 shrink-0 text-blue-600"
                aria-hidden="true"
              />
              <Input
                ref={input}
                value={query}
                maxLength={160}
                onChange={(event) => updateQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                    event.preventDefault();
                    if (results.length)
                      setActive(
                        (activeIndex +
                          (event.key === "ArrowDown" ? 1 : -1) +
                          results.length) %
                          results.length,
                      );
                  } else if (event.key === "Enter") {
                    event.preventDefault();
                    list.current
                      ?.querySelector<HTMLAnchorElement>(
                        `[data-result-index="${activeIndex}"]`,
                      )
                      ?.click();
                  }
                }}
                role="combobox"
                aria-label="Search solutions"
                aria-autocomplete="list"
                aria-expanded={true}
                aria-controls={`${id}-results`}
                aria-activedescendant={
                  results.length ? `${id}-result-${activeIndex}` : undefined
                }
                autoComplete="off"
                placeholder="Search solutions or business needs…"
                className="min-w-0 flex-1 border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    updateQuery("");
                    input.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="flex size-11 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="size-4" />
                </button>
              )}
              <Dialog.Close
                className="flex size-11 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
                aria-label="Close search"
              >
                <X className="size-5" />
              </Dialog.Close>
            </div>
            <div className="min-h-0 overflow-y-auto overscroll-contain p-3">
              {!query && (
                <div className="mb-4 px-1">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Try a search
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          updateQuery(term);
                          input.current?.focus();
                        }}
                        className="min-h-11 rounded-full border border-slate-200 px-3 text-sm text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <p
                role="status"
                className="mb-2 px-2 text-xs font-medium text-slate-500"
              >
                {query
                  ? `${results.length} matching solution${results.length === 1 ? "" : "s"}`
                  : "Featured solutions"}
              </p>
              <div
                ref={list}
                id={`${id}-results`}
                role="listbox"
                aria-label="Matching solutions"
              >
                {results.map((result, index) => (
                  <Link
                    key={result.id}
                    id={`${id}-result-${index}`}
                    href={result.href}
                    role="option"
                    tabIndex={-1}
                    aria-selected={activeIndex === index}
                    data-result-index={index}
                    onMouseMove={() => setActive(index)}
                    onClick={() => changeOpen(false)}
                    className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 aria-selected:bg-blue-50 aria-selected:text-blue-900 hover:bg-blue-50"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">
                        <Highlighted text={result.name} query={query} />
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                        <Highlighted text={result.description} query={query} />
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">
                        {result.group}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-slate-400"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
              {!results.length && (
                <div className="px-3 py-8 text-center">
                  <p className="font-semibold">No matching solutions</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Try another term, or tell us what you need.
                  </p>
                  <Link
                    href={contact.contactPath}
                    onClick={() => changeOpen(false)}
                    className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white"
                  >
                    Contact us
                  </Link>
                </div>
              )}
            </div>
            <div className="flex shrink-0 justify-between border-t border-slate-200 px-4 py-3 text-xs text-slate-500">
              <span className="hidden sm:inline">
                ↑ ↓ Navigate · Enter Open · Esc Close
              </span>
              <span>{shortcut} to toggle search</span>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </SearchContext.Provider>
  );
}

export function SearchTrigger({
  compact = false,
  light = true,
}: {
  compact?: boolean;
  light?: boolean;
}) {
  const openSearch = useContext(SearchContext);
  return (
    <button
      type="button"
      aria-label="Search solutions"
      aria-keyshortcuts="Control+k Meta+k"
      aria-haspopup="dialog"
      onClick={(event) => openSearch?.(event.currentTarget)}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border text-sm transition-colors",
        light
          ? "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"
          : "border-white/20 bg-white/5 text-slate-100 hover:bg-white/10",
        compact
          ? "h-9 justify-center rounded-[0.625rem] px-3 max-sm:h-11 2xl:text-base"
          : "mt-8 min-h-11 w-full justify-start px-4 py-3 sm:max-w-xl",
      )}
    >
      <Search className="size-4 shrink-0" aria-hidden="true" />
      <span className={compact ? "hidden xl:inline" : "text-left"}>
        {compact ? "Search" : "Search solutions, industries or business needs"}
      </span>
      <kbd
        aria-hidden="true"
        className={cn(
          "ml-auto rounded border border-current/20 px-1.5 py-1 text-[0.6875rem] opacity-70",
          compact ? "hidden xl:inline" : "hidden sm:inline",
        )}
      >
        Ctrl / ⌘ K
      </kbd>
    </button>
  );
}

function Highlighted({ text, query }: { text: string; query: string }) {
  const terms = normalizeSearch(query).split(" ").filter(Boolean);
  if (!terms.length) return text;
  // Normalized terms are alphanumeric, so interpolation is safe in this regex.
  return text
    .split(new RegExp(`(${terms.join("|")})`, "gi"))
    .map((part, index) =>
      terms.includes(part.toLowerCase()) ? (
        <mark key={index} className="rounded bg-blue-100 text-inherit">
          {part}
        </mark>
      ) : (
        part
      ),
    );
}
