import LogoutBtn from "@/app/components/logoutBtn";
import AddText from "@/app/text/components/addText";
import { decrypt } from "@/app/utils/session";
import { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { getUsername, logOutAction } from "./action";

const geistMono = Geist_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workspace - Text Keeper",
  description: "Manage your saved notes and snippets.",
};

async function TextLayout({ children }: { children: React.ReactNode }) {
  const cookiesStore = await cookies();
  const session = cookiesStore.get("session")?.value;
  const userId = (await decrypt(session))?.userId;

  const username = await getUsername(userId);

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
          <p className="font-semibold">{username}</p>
        </div>
        <div className="flex align-center gap-4">
          <p className="text-[10px] text-[#C5C8C6] flex items-center gap-1">
            <span className="text-[8px] bg-[#2D2F2F] text-[#C5C8C6] px-1.5 py-1 rounded inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-3 h-3"
              >
                <path d="M11.5 14A2.502 2.502 0 0 1 9 11.5V10H7v1.5C7 12.879 5.878 14 4.5 14S2 12.879 2 11.5 3.122 9 4.5 9H6V7H4.5C3.122 7 2 5.878 2 4.5S3.122 2 4.5 2 7 3.122 7 4.5V6h2V4.5C9 3.122 10.121 2 11.5 2S14 3.122 14 4.5 12.879 7 11.5 7H10v2h1.5c1.379 0 2.5 1.121 2.5 2.5S12.879 14 11.5 14zM10 10v1.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5H10zm-5.5 0c-.827 0-1.5.673-1.5 1.5S3.673 13 4.5 13 6 12.327 6 11.5V10H4.5zM7 9h2V7H7v2zm3-3h1.5c.827 0 1.5-.673 1.5-1.5S12.327 3 11.5 3 10 3.673 10 4.5V6zM4.5 3C3.673 3 3 3.673 3 4.5S3.673 6 4.5 6H6V4.5C6 3.673 5.327 3 4.5 3z" />
              </svg>
            </span>
            +
            <span className="text-[8px] bg-[#2D2F2F] text-[#C5C8C6] px-2 py-1 rounded">
              F
            </span>
            <span>for quick search</span>
          </p>
          <LogoutBtn logOutHandler={logOutHandler} />
        </div>
      </nav>
      <AddText />
      <Suspense
        fallback={
          <p className="text-center text-sm pt-5">
            Loading Texts
            <span className="inline-flex gap-0.5 ml-0.5">
              <span className="animate-bounce [animation-delay:-0.3s]">.</span>
              <span className="animate-bounce [animation-delay:-0.15s]">.</span>
              <span className="animate-bounce">.</span>
            </span>
          </p>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}

export default TextLayout;
