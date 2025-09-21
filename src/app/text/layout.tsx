import React from "react";
import { Geist_Mono } from "next/font/google";
import { CircleUser } from "lucide-react";

const geistMono = Geist_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});

function TextLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-3 px-14 h-full">
      <nav
        className={`flex text-sm justify-end items-center gap-2 mb-4 ${geistMono.className}`}
      >
        <p>John Doe</p>
        <CircleUser />
      </nav>
      {children}
    </div>
  );
}

export default TextLayout;
