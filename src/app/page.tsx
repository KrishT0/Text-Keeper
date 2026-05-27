import Link from "next/link";

const coreValues = [
  {
    title: "VERCEL AI INTELLIGENCE",
    description:
      "One-click summarization via Vercel AI Gateway. Extract key variables, logic paths, and actionable points from raw text automatically.",
  },
  {
    title: "ADVANCED MANAGEMENT",
    description:
      "Per-snippet tagging for categorization and instant clipboard copy functionality for seamless workflow integration.",
  },
  {
    title: "MOBILE PRESENCE",
    description:
      "QR code generation for instant mobile sharing. Access your snippets on any mobile device without manual typing.",
  },
  {
    title: "SECURE ACCESS",
    description:
      "JWT-based secure access control and AES-256 encryption. Your data is protected by industry- standard stateless authentication.",
  },
];

export default function Home() {
  return (
    <div className="h-full px-5">
      <nav className="text-xs flex justify-between items-center py-4">
        <p>TEXT KEEPER</p>
        <Link href="/text">GET STARTED</Link>
      </nav>

      {/* Hero section */}
      <section
        id="hero"
        className="h-9/12 max-w-195 mx-auto flex flex-col gap-8 justify-center"
      >
        <div className="text-4xl sm:text-5xl md:text-5xl font-semibold">
          <h1>YOUR TEXT,</h1>
          <h1>EVERYWHERE.</h1>
        </div>
        <p className="text-sm sm:w-4/5 md:w-3/5">
          Minimalist snippet manager with CRUD operations and Cloud PostgreSQL
          sync. No clutter. Just high-contrast productivity accessible from any
          device. Minimalist snippet manager with CRUD operations and Cloud
          PostgreSQL sync. No clutter. Just high-contrast productivity
          accessible from any device.
        </p>
        <div className="underline cursor-pointer underline-offset-2 flex gap-8 text-xs">
          <Link href="/text">GET STARTED</Link>
          <p>VIEW DEMO</p>
        </div>
      </section>

      {/* Core value section */}
      <section
        id="core-values"
        className="max-w-195 mx-auto flex flex-col xs:flex-row"
      >
        <h2 className="text-xl xs:w-1/3 font-medium">CORE VALUES</h2>
        <div className="w-[90%] mt-8 xs:mt-0 sm:w-1/2 flex flex-col gap-16 xs:gap-12">
          {coreValues.map((item) => (
            <div key={item.title}>
              <p className="font-medium mb-3">{item.title}</p>
              <p className="text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom section */}
      <section
        id="bottom"
        className="h-2/3 max-w-195 mx-auto flex flex-col gap-5 text-center justify-center"
      >
        <div className="text-2xl max-w-[95%] xs:max-w-[70%] sm:max-w-2/3 mx-auto sm:text-2xl md:text-3xl  font-semibold">
          <h2>EFFICIENCY IS THE ONLY THE ONLY METRICS THAT MATTERS.</h2>
        </div>
        <p className="text-sm xs:w-3/5 mx-auto">
          Minimalist snippet manager with CRUD operations and Cloud PostgreSQL
          sync. No clutter. Just
        </p>
      </section>

      <footer>
        <hr className="w-full text-[#949592]" />
        <div className="flex justify-between">
          <p className="text-xs text-center py-4">
            &copy; {new Date().getFullYear()} Text Keeper. All rights reserved.
          </p>
          <p className="text-xs text-center py-4">
            <Link href="/privacy">Privacy Policy</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
