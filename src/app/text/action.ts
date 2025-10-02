"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { sql } from "@/app/utils/db";
import { decrypt, deleteSession } from "@/app/utils/session";
import { redirect } from "next/navigation";

import type { TextItem, TextType } from "./types";

export async function addTextAction(data: TextType) {
  const header = data.header;
  const text = data.text;
  const cookiesStore = await cookies();
  const session = cookiesStore.get("session")?.value;
  const userId = session ? (await decrypt(session))?.userId : null;

  if (!userId) return { error: "User not authenticated" };

  await sql`
    INSERT INTO notes (header, text, user_id)
    VALUES (${header}, ${text}, ${userId})
  `;

  revalidateTag("notes");
  return { success: true };
}

export async function logOutAction() {
  await deleteSession();
  redirect("/auth");
}

export async function deleteNoteAction(id: string) {
  await sql`DELETE FROM notes WHERE id = ${id}`;
  revalidateTag("notes");
  return { success: true };
}

export const getUsername = unstable_cache(
  async (userId: string | unknown) => {
    const queryResult =
      await sql`SELECT username FROM users WHERE id = ${userId}`;
    const username = queryResult[0]?.username || "User";
    return username;
  },
  ["username"],
  { tags: ["username"] }
);

export const getNotes = unstable_cache(
  async (userId: string): Promise<TextItem[]> => {
    const dt = (await sql`
    SELECT n.header, n.id, n.text
    FROM notes n
    JOIN users u ON n.user_id = u.id
    WHERE u.id = ${userId}
  `) as TextItem[];
    return dt;
  },
  ["notes"],
  {
    tags: ["notes"],
  }
);
