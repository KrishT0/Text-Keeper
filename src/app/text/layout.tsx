import LogoutBtn from "@/app/components/logoutBtn";
import AddText from "@/app/text/components/addText";
import { decrypt } from "@/app/utils/session";
import { FolderSync } from "lucide-react";
import { Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getUsername, logOutAction } from "./action";

const geistMono = Geist_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});

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
          <Link href="upload" title="View as JSON">
            <FolderSync className="cursor-pointer w-8 h-4 hover:text-green-400" />
          </Link>
          <LogoutBtn logOutHandler={logOutHandler} />
        </div>
      </nav>
      {/* <SearchIntercepter /> */}
      <AddText />
      {children}
    </div>
  );
}

export default TextLayout;
