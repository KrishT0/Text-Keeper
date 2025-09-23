import React from "react";
import { Geist_Mono } from "next/font/google";
import { CircleUser, Search, Plus } from "lucide-react";

const geistMono = Geist_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});

function TextLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-3 px-5 sm:px-14">
      <nav
        className={`flex text-sm justify-end items-center gap-2 mb-4 ${geistMono.className}`}
      >
        <p>John Doe</p>
        <CircleUser />
      </nav>
      <div className="sticky shadow-lg shadow-black top-15 left-0 w-full border-2 rounded-xl mb-5 h-24 bg-[#1F2121] flex flex-col text-xs p-1">
        <textarea
          placeholder="Paste your text here..."
          className=" border-none outline-none m-2 h-10 text-sm resize-none"
        />
        <div className="flex gap-3 justify-end pr-3 ">
          <Search className="w-7 cursor-pointer hover:bg-[#2D2F2F] rounded-md p-1" />
          <Plus className="w-8 cursor-pointer hover:bg-[#2D2F2F] rounded-md p-1" />
        </div>
      </div>
      {children}
    </div>
  );
}

export default TextLayout;
