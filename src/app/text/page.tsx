import { cookies } from "next/headers";
import TextContent from "@/app/components/textContent";
import { decrypt } from "@/app/utils/session";
import { getNotes } from "@/app/text/action";

import type { TextItem } from "./types";

const TextPage = async () => {
  const session = (await cookies()).get("session")?.value;
  const userId = String((await decrypt(session))?.userId || "");

  const data = await getNotes(userId);

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
