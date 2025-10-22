import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Geist_Mono } from "next/font/google";
import { Type } from "lucide-react";

const geistMono = Geist_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});

function JsonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-3 pt-5 px-5 sm:px-14">
      <nav
        className={`flex text-sm justify-between items-center gap-2 mb-4 ${geistMono.className}`}
      >
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Brand logo"
              width={20}
              height={20}
              loading="lazy"
            />
          </Link>
          <p className="font-semibold">JSON Formatter</p>
        </div>
        <div className="flex align-center gap-4">
          <Link href="/text">
            <Type className="cursor-pointer w-8 h-4 hover:text-green-400" />
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}

export default JsonLayout;
