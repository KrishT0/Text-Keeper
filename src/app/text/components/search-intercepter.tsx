"use client";

import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { ArrowRight, CircleDot, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type TocItem = {
  header: string;
  id: string;
  note?: string;
};

type SearchIntercepterProps = {
  items: TocItem[];
};

function getSnippet(note: string, query: string) {
  const index = note.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return null;
  const start = Math.max(0, index - 100);
  const end = Math.min(note.length, index + query.length + 100);
  return {
    before: (start > 0 ? "..." : "") + note.slice(start, index),
    match: note.slice(index, index + query.length),
    after:
      note.slice(index + query.length, end) + (end < note.length ? "..." : ""),
  };
}

function SearchIntercepter({ items }: SearchIntercepterProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);

  const filteredHeaders = useMemo(() => {
    if (!openSearchModal) return [];
    return items.filter((item) =>
      item.header.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [openSearchModal, items, searchQuery]);

  const filteredNotes = useMemo(() => {
    if (!openSearchModal || !searchQuery) return [];
    return items.filter(
      (item) =>
        item.note &&
        item.note.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [openSearchModal, searchQuery, items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - 165;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setOpenSearchModal(false);
    }
  };

  useEffect(() => {
    if (!openSearchModal) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [openSearchModal]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setOpenSearchModal(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      } else if (e.key === "Escape") {
        setOpenSearchModal(false);
        setSearchQuery("");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const hasResults = filteredHeaders.length > 0 || filteredNotes.length > 0;

  return (
    <div>
      {openSearchModal && (
        <div
          className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50"
          onClick={() => setOpenSearchModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search notes"
            className="border-[3px] border-[#f5f5f535] bg-[#191A1A] h-90 w-115 p-2 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <input
                type="text"
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for notes..."
                className="border-2 text-sm bg-[#1F2121] pl-10 border-[#f5f5f51f] focus:outline-none p-1 rounded-lg w-full"
              />
              <Search className="absolute left-2 top-2 h-4 w-4 text-[#949592]" />
            </div>

            {!hasResults ? (
              <p className="text-xs text-[#949592] px-3 text-center mt-5 mb-1">
                No results found
              </p>
            ) : (
              <div className="mt-3 overflow-y-auto h-[calc(100%-45px)] scrollbar-hide flex flex-col gap-3">
                {filteredHeaders.length > 0 && (
                  <div>
                    <p className="text-xs text-[#949592] px-3 mb-1">Headers</p>
                    {filteredHeaders.map((item) => (
                      <div
                        className="relative"
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                      >
                        <ArrowRight className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[#949592]" />
                        <div className="pl-10 p-1 hover:bg-[#1F2121] border-2 border-transparent hover:border-[#f5f5f51f] text-sm rounded-lg cursor-pointer">
                          {item.header}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {filteredNotes.length > 0 && (
                  <div>
                    <p className="text-xs text-[#949592] px-3 mb-1">Notes</p>
                    {filteredNotes.map((item) => {
                      const snippet = getSnippet(item.note!, searchQuery);
                      if (!snippet) return null;
                      return (
                        <div
                          className="relative"
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                        >
                          <CircleDot className="absolute left-2 top-2 h-4 w-4 text-[#949592]" />
                          <div className="pl-10 p-1 hover:bg-[#1F2121] border-2 border-transparent hover:border-[#f5f5f51f] rounded-lg cursor-pointer">
                            <p className="text-sm">{item.header}</p>
                            <p className="text-xs text-[#949592]">
                              {snippet.before}
                              <span className="text-white bg-[#ffffff20] rounded px-0.5">
                                {snippet.match}
                              </span>
                              {snippet.after}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchIntercepterWrapper({
  items,
}: SearchIntercepterProps) {
  const isDesktop = useMediaQuery("(min-width:640px)");
  if (!isDesktop) return null;
  return <SearchIntercepter items={items} />;
}
