import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { BLOG_IMAGES_BUCKET, getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
]);

function extFromType(type: string): string {
  switch (type) {
    case "image/png": return "png";
    case "image/jpeg": return "jpg";
    case "image/webp": return "webp";
    case "image/gif": return "gif";
    default: return "bin";
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const postId = (form.get("postId") as string | null)?.trim() || "orphan";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: `Unsupported type: ${file.type}` },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image exceeds 5 MB limit" },
      { status: 413 },
    );
  }

  const folder = postId.replace(/[^a-zA-Z0-9_-]/g, "") || "orphan";
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extFromType(file.type)}`;
  const path = `${folder}/${name}`;

  const db = getSupabaseAdmin();
  const bytes = Buffer.from(await file.arrayBuffer());

  const { error } = await db.storage
    .from(BLOG_IMAGES_BUCKET)
    .upload(path, bytes, { contentType: file.type, upsert: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: pub } = db.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(path);
  return NextResponse.json({ url: pub.publicUrl, path });
}
