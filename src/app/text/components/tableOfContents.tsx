"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

type TocItem = {
  header: string;
  id: string;
};

type TableOfContentsProps = {
  items: TocItem[];
};

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - 165;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setIsOpen(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <>
      {/* TOC Panel */}
      <div
        className={`fixed max-h-[35vh] w-[320px] bottom-20 border-2 border-[#2D2F2F] right-6 scrollbar-hide bg-[#1F2121] overflow-y-auto rounded-lg shadow-lg transition-all duration-300 ease-in-out z-40 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="p-1 px-2">
          <h3 className="font-medium">Table of Contents</h3>
        </div>
        <div className="p-1 max-h-[calc(70vh-60px)]">
          <ul className="">
            {items.map((item, index) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="cursor-pointer text-left w-full px-3 py-1 text-sm text-[#949592] hover:bg-[#2c2e2e] hover:text-white rounded-md transition-colors duration-150 flex items-start group"
                >
                  <span className="mr-2 text-[#949592] group-hover:text-white">
                    {index + 1}.
                  </span>
                  <span className="flex-1">{item.header}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 border border-[#949592] cursor-pointer right-6 bg-[#1F2121] hover:bg-[#2D2F2F] text-white rounded-full p-3 shadow-lg transition-all duration-200 z-40"
        aria-label={
          isOpen ? "Close Table of Contents" : "Open Table of Contents"
        }
      >
        {isOpen ? <X size={15} /> : <Menu size={15} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-[#000000a9] bg-opacity-20 z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
