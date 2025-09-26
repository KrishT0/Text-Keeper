import TextContent from "@/components/textContent";
import React from "react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function NotePage({ params }: PageProps) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/notes/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch note");

  const data = await res.json();

  return (
    <TextContent
      id={slug}
      text={data.text}
      heading={data.header}
      isDeletable={false}
    />
  );
}

export default NotePage;
