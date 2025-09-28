import { cookies } from "next/headers";
import { sql } from "@/db";
import TextContent from "@/components/textContent";
import { decrypt } from "@/app/utils/session";

type TextItem = {
  id: string;
  header: string;
  text: string;
};

const TextPage = async () => {
  const session = (await cookies()).get("session")?.value;
  const userId = (await decrypt(session))?.userId;

  const data = (await sql`
    SELECT n.header, n.id, n.text
    FROM notes n
    JOIN users u ON n.user_id = u.id
    WHERE u.id = ${userId}`) as TextItem[];

  return (
    <div className="pb-8 ">
      {data.length > 0 ? (
        data.map((item: TextItem) => (
          <TextContent
            key={item.id}
            heading={item.header}
            id={item.id}
            text={item.text}
          />
        ))
      ) : (
        <p className="text-center text-sm pt-5">No Texts are created.</p>
      )}
    </div>
  );
};

export default TextPage;
