import React from "react";
import Image from "next/image";
import Link from "next/link";

function NoNoteFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[50vh]">
      <h2 className="text-xl font-semibold text-[#C5C8C6]">Note Not Found</h2>
      <p className="text-sm text-center text-[#C5C8C6]">
        This note might have been deleted or never existed.
      </p>

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

export default NoNoteFound;
