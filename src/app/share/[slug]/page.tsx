import TextContent from "@/components/textContent";
import { sql } from "@/app/utils/db";
import NoNoteFound from "@/app/share/[slug]/components/noNoteFound";
import type { PageProps } from "./type";

async function NotePage({ params }: PageProps) {
  const { slug } = await params;

  const res = await sql`
      SELECT id, text, user_id, header
      FROM notes
      WHERE id = ${slug}
    `;

  if (res.length === 0) {
    return <NoNoteFound />;
  }

  const data = res[0];

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
