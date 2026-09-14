"use server";

import { sql } from "@/app/utils/db";
import {
  createShareToken,
  deleteSession,
  getUserIdFromSession,
} from "@/app/utils/session";
import { revalidateTag, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

import type { TextItem, TextType } from "./types";

export type ShareExpiry = "hour" | "day" | "never" | number;

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

export async function createShareLink(id: string, expiry: ShareExpiry) {
  const userId = await getUserIdFromSession();

  if (!userId) return { error: "User not authenticated" };

  const note = await sql`
    SELECT id
    FROM notes
    WHERE id = ${id} AND user_id = ${userId}
  `;

  if (note.length === 0) return { error: "Note not found" };

  if (expiry === "never") {
    return { success: true, token: null };
  }

  const durationInMinutes =
    expiry === "hour" ? 60 : expiry === "day" ? 1440 : expiry;

  if (
    typeof durationInMinutes !== "number" ||
    !Number.isInteger(durationInMinutes) ||
    durationInMinutes < 1 ||
    durationInMinutes > 525600
  ) {
    return { error: "Expiry must be between 1 minute and 1 year" };
  }

  const expiresAt = Date.now() + durationInMinutes * 60 * 1000;
  const token = await createShareToken(id, expiresAt);

  return { success: true, token, expiresAt };
}

export async function deleteNoteAction(id: string) {
  const userId = await getUserIdFromSession();

  if (!userId) return { error: "User not authenticated" };

  const deletedNotes = await sql`
    DELETE FROM notes
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING id
  `;

  if (deletedNotes.length === 0) {
    return { error: "Note not found" };
  }

  revalidateTag(`notes-${userId}`);
  return { success: true };
}

export async function editNoteAction(id: string, header: string, text: string) {
  const userId = await getUserIdFromSession();

  if (!userId) return { error: "User not authenticated" };

  const updatedNotes = await sql`
    UPDATE notes
    SET header = ${header}, text = ${text}
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING id
  `;

  if (updatedNotes.length === 0) {
    return { error: "Note not found" };
  }

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

export const getNotes = async (userId: string | null) =>
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
