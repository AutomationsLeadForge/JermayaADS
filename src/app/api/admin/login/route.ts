import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
  issueSession,
  verifyAdminPassword,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const password = typeof body.password === "string" ? body.password : "";
  if (!password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }
  if (!verifyAdminPassword(password)) {
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }
  const token = await issueSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
  return res;
}
