"use server";

import { sql } from "@/app/utils/db";
import { deleteSession, getUserIdFromSession } from "@/app/utils/session";
import { revalidateTag, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

import type { TextItem, TextType } from "./types";

export async function addTextAction(data: TextType) {
  const header = data.header;
  const text = data.text;
  const userId = await getUserIdFromSession();

  if (!userId) return { error: "User not authenticated" };

  await sql`
    INSERT INTO notes (header, text, user_id)
    VALUES (${header}, ${text}, ${userId})
  `;

  revalidateTag(`notes-${userId}`);
  return { success: true };
}

export async function logOutAction() {
  await deleteSession();
  redirect("/auth");
}

export async function deleteNoteAction(id: string) {
  const userId = await getUserIdFromSession();

  if (!userId) return { error: "User not authenticated" };

  await sql`DELETE FROM notes WHERE id = ${id}`;

  revalidateTag(`notes-${userId}`);
  return { success: true };
}

export async function editNoteAction(id: string, header: string, text: string) {
  const userId = await getUserIdFromSession();

  if (!userId) return { error: "User not authenticated" };

  await sql`
    UPDATE notes
    SET header = ${header}, text = ${text}
    WHERE id = ${id}
  `;

  revalidateTag(`notes-${userId}`);
  return { success: true };
}

export const getUsername = async (userId: string | unknown) =>
  unstable_cache(
    async () => {
      const queryResult =
        await sql`SELECT username FROM users WHERE id = ${userId}`;
      const username = queryResult[0]?.username || "User";
      return username;
    },
    [`username-${userId}`],
    { tags: [`username-${userId}`] },
  )();

export const getNotes = async (userId: string) =>
  unstable_cache(
    async (): Promise<TextItem[]> => {
      const dt = (await sql`
      SELECT header, id, text
      FROM notes
      WHERE user_id = ${userId}
    `) as TextItem[];
      return dt;
    },
    [`notes-${userId}`],
    {
      tags: [`notes-${userId}`],
    },
  )();
