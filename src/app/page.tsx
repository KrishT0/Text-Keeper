import VideoModal from "@/app/components/video-modal";
import Link from "next/link";

const features = [
  {
    title: "AI SUMMARIES",
    description:
      "Select any note and get its key points instantly. No switching tabs, no copy-pasting into ChatGPT. Just click and read what matters.",
  },
  {
    title: "INSTANT COPY",
    description:
      "One click copies any note straight to your clipboard. No selecting, no dragging. Just copy and keep moving.",
  },
  {
    title: "QR SHARING",
    description:
      "Generate a QR code for any note in one click. Scan from your phone and get the content immediately. No login, no typing, no friction.",
  },
  {
    title: "SECURE BY DEFAULT",
    description:
      "JWT based authentication keeps your notes private. No third party logins, no OAuth complexity. Sign in and your data stays yours.",
  },
];

export default function Home() {
  return (
    <div className="h-full px-5">
      <nav className="text-xs flex justify-between items-center py-4">
        <p>TEXT KEEPER</p>
        <Link href="/text" className="hover:text-[#949592] transition-colors">
          GET STARTED
        </Link>
      </nav>

      {/* Hero section */}
      <section
        id="hero"
        className="min-h-9/12 max-w-195 mx-auto flex flex-col gap-8 justify-center"
      >
        <div className="text-4xl sm:text-5xl md:text-5xl font-semibold animate-fade-in">
          <h1>YOUR TEXT,</h1>
          <h1>EVERYWHERE.</h1>
        </div>
        <p className="text-sm sm:w-4/5 md:w-3/5">
          Snippets disappear into Slack threads, browser tabs, and forgotten
          docs. Text Keeper gives you one place to paste, organize, and share
          text instantly. Synced across every device, accessible from anywhere,
          built for developers who move fast and hate friction.
        </p>
        <div className="underline underline-offset-2 flex gap-8 text-xs">
          <Link
            href="/text"
            className="cursor-pointer hover:text-[#949592] transition-colors"
          >
            GET STARTED
          </Link>
          <VideoModal src="https://res.cloudinary.com/dth9jxnnr/video/upload/v1779912709/demo_ll8xxz.mp4" />
        </div>
      </section>

      {/* Core value section */}
      <section
        id="core-values"
        className="max-w-195 mx-auto flex flex-col xs:flex-row"
      >
        <h2 className="text-xl xs:w-1/3 font-medium">FEATURES</h2>
        <div className="w-[90%] mt-8 xs:mt-0 sm:w-1/2 flex flex-col gap-16 xs:gap-12">
          {features.map((item) => (
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
        className="min-h-4/5 max-w-195 mx-auto flex flex-col gap-5 text-center justify-center"
      >
        <div className="text-2xl sm:text-2xl md:text-3xl font-semibold">
          <h2>EVERY SNIPPET SAVED.</h2>
          <h2>NOTHING LOST. EVER AGAIN.</h2>
        </div>
        <p className="text-sm xs:w-4/5 mx-auto">
          Never hunt through chat history or reopen closed tabs again. Your text
          is stored, synced, and ready whenever you need it.
        </p>
        <Link
          href="/text"
          className="mt-10 underline text-xs font-medium underline-offset-2 hover:text-[#949592] transition-colors"
        >
          START PASTING
        </Link>
      </section>

      <footer>
        <hr className="w-full text-[#949592]" />
        <div className="py-2 pb-6 flex justify-between">
          <p className="text-xs text-center py-4">
            &copy; {new Date().getFullYear()} Text Keeper. All rights reserved.
          </p>
          <p className="text-xs text-center py-4">
            <Link
              href="/privacy"
              className="hover:text-[#949592] underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
