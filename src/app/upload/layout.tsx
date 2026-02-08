import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Geist_Mono } from "next/font/google";
import { Type } from "lucide-react";
import LogoutBtn from "../components/logoutBtn";
import { logOutAction } from "../text/action";

const geistMono = Geist_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});

function UploadLayout({ children }: { children: React.ReactNode }) {
  const logOutHandler = async () => {
    "use server";
    await logOutAction();
  };

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
          <p className="font-semibold">File Upload</p>
        </div>
        <div className="flex align-center gap-4">
          <Link href="text">
            <Type className="cursor-pointer w-8 h-4 hover:text-green-400" />
          </Link>
          <LogoutBtn logOutHandler={logOutHandler} />
        </div>
      </nav>
      {children}
    </div>
  );
}

export default UploadLayout;
