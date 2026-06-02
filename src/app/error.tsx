"use client";

import Image from "next/image";
import Link from "next/link";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 h-full">
      <div className="text-sm text-center text-[#C5C8C6]">
        Oops! Something went wrong while loading the page. Please try refreshing
        the page or come back later. If the problem persists, feel free to{" "}
        <a
          href="mailto:krshnabiswal619@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline underline-offset-4 hover:text-neutral-300 transition-colors"
        >
          contact
        </a>{" "}
        our support team for assistance.
      </div>

      <Link href="/" className="mt-4 transition-transform hover:scale-110">
        <Image
          src="/logo.svg"
          alt="Go to homepage"
          width={40}
          height={40}
          className="cursor-pointer"
        />
      </Link>
    </div>
  );
}

export default ErrorPage;
