import TextContent from "@/components/textContent";
import { sql } from "@/db";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function NotePage({ params }: PageProps) {
  const { slug } = await params;

  const res = await sql`
      SELECT id, text, user_id, header
      FROM notes
      WHERE id = ${slug}
    `;

  if (res.length === 0) {
    return <div>Note not found</div>;
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
