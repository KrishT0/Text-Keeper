import React from "react";
import Image from "next/image";
import Link from "next/link";

function AuthtLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-10 h-full flex justify-center items-center">
      <div className="w-[350px]">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Brand logo"
            width={50}
            height={50}
            loading="lazy"
            className="mx-auto"
          />
        </Link>
        {children}
      </div>
    </div>
  );
}

export default AuthtLayout;
