import ToastProvider from "@/app/components/sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const font = Rubik({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Text Keeper",
  description: "A simple text storage app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`max-w-225 h-screen mx-auto ${font.className} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <ToastProvider />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
