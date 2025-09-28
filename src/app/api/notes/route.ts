import { NextResponse } from "next/server";
import { sql } from "@/db";

export async function POST(request: Request) {
  const { text, user_id, header } = await request.json();

  if (!text || !header) {
    return NextResponse.json(
      { error: "Missing text or header" },
      { status: 400 }
    );
  }

  const result = await sql`
    INSERT INTO notes (text, user_id, header)
    VALUES (${text}, ${user_id}, ${header})
    RETURNING id;
  `;

  return NextResponse.json(result[0]);
}
