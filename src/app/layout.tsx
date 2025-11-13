import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import ToastProvider from "@/app/components/sonner";
import "./globals.css";

const openSans = Open_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Text Keeper",
  description: "A simple text storage app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`max-w-[900px] h-screen mx-auto ${openSans.className} antialiased`}
      >
        {children}
        <ToastProvider />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
