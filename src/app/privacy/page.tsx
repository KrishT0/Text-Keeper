import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen text-white px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl xs:text-3xl font-semibold tracking-tight mb-2">
            Privacy Policy
          </h1>
          <Link
            href="/"
            className="text-xs underline underline-offset-2 text-neutral-300 hover:text-[#949592] transition-colors"
          >
            Back to Home
          </Link>
        </div>
        <p className="text-sm text-neutral-500">Last updated: May 2026</p>
        <hr className="w-full text-[#949592] mt-5 mb-10" />

        <section className="mb-10">
          <h2 className="text-sm font-semibold uppercase mb-1">Overview</h2>
          <p className="text-neutral-400 text-sm">
            Text Keeper is a personal notes and clipboard sync tool built for
            developers. This page explains what data we collect, how we use it,
            and how we protect it.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-semibold uppercase mb-1">
            What We Collect
          </h2>
          <p className="text-neutral-400 text-sm">
            When you sign up and use Text Keeper, we collect:
          </p>
          <ul className="text-neutral-400 text-sm list-disc pl-4 mt-1">
            <li>The notes and text snippets you save</li>
            <li>Basic usage data such as request timestamps</li>
          </ul>
          <p className="text-neutral-500 mt-2 text-sm">
            We do not collect your name, phone number, payment information, or
            any data beyond what is needed to run the app.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-semibold uppercase mb-1">
            How We Use Your Data
          </h2>
          <p className="text-neutral-400 text-sm">
            Your data is used solely to provide the Text Keeper service:
          </p>
          <ul className="text-neutral-400 text-sm list-disc pl-4 mt-1">
            <li>
              Your saved notes are stored in our database and returned only to
              you
            </li>
            <li>
              When you use the AI summary feature, the content of the selected
              note is sent to an AI provider to generate a summary. No note
              content is stored or used for training by the AI provider.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-semibold uppercase mb-1">Data Storage</h2>
          <p className="text-neutral-400 text-sm">
            Your data is stored in a PostgreSQL database hosted on Neon. Access
            is restricted and your notes are never shared with third parties.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-semibold uppercase mb-1">
            Authentication
          </h2>
          <p className="text-neutral-400 text-sm">
            Text Keeper uses JWT based authentication. No third party OAuth
            providers are used. Your session token is stored securely and
            expires automatically.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-semibold uppercase mb-1">
            Data Deletion
          </h2>
          <p className="text-neutral-400 text-sm">
            You can delete any note at any time from within the app. To
            permanently delete your account and all associated data, contact us
            at the email below.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-semibold uppercase mb-1">
            Third Party Services
          </h2>
          <p className="text-neutral-400 text-sm">
            Text Keeper uses the following third party services:
          </p>
          <ul className="text-neutral-400 text-sm list-disc pl-4 mt-1">
            <li>
              <span className="text-white">Neon</span>: database hosting
            </li>
            <li>
              <span className="text-white">Vercel</span>: application hosting
              and deployment
            </li>
            <li>
              <span className="text-white">OpenAI</span>: AI summary feature
              only, note content is not retained
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-semibold uppercase mb-1">Contact</h2>
          <div className="text-neutral-400 text-sm">
            If you have any questions about this policy or your data, reach out
            here:{" "}
            <a
              href="mailto:krshnabiswal619@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4 hover:text-neutral-300 transition-colors"
            >
              mail
            </a>
          </div>
        </section>

        <hr className="w-full text-[#949592] mb-6" />

        <p className=" text-center text-xs">
          © 2026 Text Keeper. All rights reserved.
        </p>
      </div>
    </div>
  );
}
