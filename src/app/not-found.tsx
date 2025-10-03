import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full">
      <h1 className="text-5xl font-semibold text-[#C5C8C6]">404</h1>
      <h2 className="text-2xl font-semibold text-[#C5C8C6]">Page not found</h2>
      <p className="text-sm text-center text-[#C5C8C6]">
        Oops! The page you&apos;re looking for doesn&apos;t exist. It might have
        been moved or deleted.
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

export default NotFound;
