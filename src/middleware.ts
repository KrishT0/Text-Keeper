import { decrypt, deleteSession } from "@/app/utils/session";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get("session")?.value;
  const pathname = req.nextUrl.pathname;

  if (pathname === "/auth" && cookie) {
    const session = await decrypt(cookie);
    if (session) {
      return NextResponse.redirect(new URL("/text", req.url));
    }
  }

  if (pathname === "/text") {
    if (!cookie) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
    const session = await decrypt(cookie);
    if (!session) {
      await deleteSession();
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/text", "/upload"],
};
