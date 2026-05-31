import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Text Keeper",
  description: "Learn how Text Keeper handles your data.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-225 h-screen mx-auto">{children}</div>;
}
