import { Link, useNavigate } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { searchableLabs } from "@/content/labs";

export function DashboardSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function selectLab(href: string) {
    setIsOpen(false);
    setQuery("");
    inputRef.current?.blur();
    navigate({ to: href });
  }

  const filteredLabs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return searchableLabs.filter((lab) => {
      const searchableText = [
        lab.title,
        lab.sectionLabel,
        lab.description,
      ].join(" ");

      return searchableText.toLowerCase().includes(normalizedQuery);
    });
  }, [query]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if (
        !(event.metaKey || event.ctrlKey) ||
        event.key.toLowerCase() !== "k"
      ) {
        return;
      }

      event.preventDefault();
      inputRef.current?.focus();
      setIsOpen(true);
    }

    window.addEventListener("keydown", handleShortcut);

    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div className="relative w-[min(calc(100vw-6rem),22rem)] transition-all duration-200 focus-within:w-[min(calc(100vw-6rem),28rem)]">
      <InputGroup>
        <InputGroupInput
          aria-label="Search labs"
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(event) => {
            if (event.key !== "Enter" || !filteredLabs.length) {
              return;
            }

            event.preventDefault();
            setIsOpen(false);
            navigate({ to: filteredLabs[0].href });
          }}
          placeholder="Search labs..."
          ref={inputRef}
          type="search"
          value={query}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </InputGroupAddon>
      </InputGroup>

      {isOpen && query.trim() ? (
        <div className="absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-lg border bg-background shadow-lg">
          {filteredLabs.length ? (
            <ul className="max-h-80 overflow-y-auto py-1">
              {filteredLabs.map((lab) => (
                <li key={lab.href}>
                  <Link
                    className="group/result block px-3 py-2.5 outline-none transition-colors hover:bg-muted/60 focus-visible:bg-muted/60"
                    onClick={(event) => {
                      event.preventDefault();
                      selectLab(lab.href);
                    }}
                    onPointerDown={(event) => {
                      event.preventDefault();
                      selectLab(lab.href);
                    }}
                    to={lab.href}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-medium text-sm group-hover/result:underline">
                        {lab.title}
                      </span>
                      <span className="shrink-0 rounded-full border bg-muted/40 px-2 py-0.5 text-muted-foreground text-xs">
                        {lab.sectionLabel}
                      </span>
                    </span>
                    <span className="mt-1 line-clamp-2 block text-muted-foreground text-xs leading-5">
                      {lab.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-3 text-muted-foreground text-sm">
              No matching labs
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
