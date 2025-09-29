"use server";

import { cookies } from "next/headers";
import { sql } from "@/app/utils/db";
import { decrypt, deleteSession } from "@/app/utils/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type TextType = {
  header: string;
  text: string;
};

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

  revalidatePath("/text");
  return { success: true };
}

export async function logOutAction() {
  await deleteSession();
  redirect("/auth");
}

export async function deleteNoteAction(id: string) {
  await sql`DELETE FROM notes WHERE id = ${id}`;
  revalidatePath("/text");
  return { success: true };
}
