import TextContent from "@/app/components/textContent";
import NoNoteFound from "@/app/share/[slug]/components/noNoteFound";
import { sql } from "@/app/utils/db";
import { verifyShareToken } from "@/app/utils/session";
import type { PageProps } from "./type";

async function NotePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { token } = await searchParams;

  if (token && !(await verifyShareToken(token, slug))) {
    return <NoNoteFound />;
  }

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
