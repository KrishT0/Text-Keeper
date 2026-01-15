"use server";

import { supabaseStorage } from "@/app/utils/supabase-storage";
import { sql } from "@/app/utils/db";
import { revalidatePath } from "next/cache";
import { getUserIdFromSession } from "@/app/utils/session";

export async function uploadFile(file: File[]) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) return { error: "User not authenticated" };
    if (!file) return { error: "No file provided" };
    for (const item of file) {
      const fileName = `${userId}/${item.name}`;

      const arrayBuffer = await item.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const { data: storageData, error: storageError } =
        await supabaseStorage.storage
          .from("Text Keeper Storage")
          .upload(fileName, buffer, {
            upsert: true,
            contentType: item.type,
          });

      if (storageError) {
        return { error: storageError.message };
      }

      await sql`
      INSERT INTO files (user_id, file_name, file_size)
      VALUES (${userId}, ${item.name}, ${item.size})
      ON CONFLICT (user_id, file_name)
      DO NOTHING`;
    }
    revalidatePath("/upload");

    return {
      success: true,
      data: "File uploaded successfully",
    };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Failed to upload file" };
  }
}

export async function getUserFiles() {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) return { error: "User not authenticated" };

    const data = await sql`
      SELECT file_name, id
      FROM files 
      WHERE user_id = ${userId}`;

    if (!data) {
      return { error: "No files found" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.error("Fetch files error:", error);
    return { success: false, error: "Failed to retrieve files" };
  }
}

export async function deleteFile(fileName: string) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) return { error: "User not authenticated" };

    const fileResult = await sql`
      SELECT id, file_name
      FROM files
      WHERE file_name = ${fileName} AND user_id = ${userId}
    `;

    if (!fileResult || fileResult.length === 0) {
      return { error: "File not found or unauthorized" };
    }
    await supabaseStorage.storage
      .from("Text Keeper Storage")
      .remove([`${userId}/${fileName}`]);

    await sql`
      DELETE FROM files
      WHERE file_name = ${fileName} AND user_id = ${userId}
    `;

    revalidatePath("/upload");

    return { success: true, message: "File deleted successfully" };
  } catch (error) {
    console.error("Delete error:", error);
    return { error: "Failed to delete file" };
  }
}

export async function downloadFile(fileName: string) {
  try {
    if (!fileName) return { error: "No filename specified" };

    const userId = await getUserIdFromSession();

    if (!userId) return { error: "User not authenticated" };

    const { data, error } = await supabaseStorage.storage
      .from("Text Keeper Storage")
      .download(`${userId}/${fileName}`);
    if (error || !data) {
      console.error("Download error:", error);
      return { error: "Failed to download file" };
    }
    return data;
  } catch (error) {
    console.error("Download error:", error);
    return { success: false, error: "Failed to generate download link" };
  }
}
