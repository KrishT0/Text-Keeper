import { NextResponse } from "next/server";
import { sql } from "@/db";

type ParamsType = {
  slug: string;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<ParamsType> }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Missing note id" }, { status: 400 });
  }

  const notes = await sql`
    SELECT id, text, user_id, header
    FROM notes
    WHERE id = ${slug}
  `;

  if (notes.length === 0) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json(notes[0]);
}
