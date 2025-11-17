import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <section className="h-1/2 sm:h-2/3 p-10 flex flex-col justify-center w-full">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium">
          Store Text Securely
        </h1>
        <hr className="w-1/2 sm:w-1/4 mt-7 mb-4" />
        <Link href="text" className="sm:text-lg w-fit flex items-center gap-2">
          text-keeper.vercel.app/text
        </Link>
      </section>
      <section className="sm:h-1/3 flex gap-16 p-10 w-full">
        <p className="sm:w-2/3 sm:text-xl">
          Ideas are powerful when they&apos;re always within reach. With Text
          Keeper, you can save your text online and access it from any device,
          anytime. Organize, edit, and stay connected to your notes
          effortlessly.
        </p>
        <Image
          src="/logo.svg"
          alt="Brand logo"
          width={50}
          height={50}
          loading="lazy"
          className="hidden sm:block pb-8"
        />
      </section>
    </div>
  );
}
