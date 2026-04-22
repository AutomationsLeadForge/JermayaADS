import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabase
    .from("work_projects")
    .select(
      "id, slug, number, title, category, category_label, role, outcome_metric, outcome_label, summary, thumbnail_url, icon_key, href, featured, sort_order",
    )
    .is("deleted_at", null)
    .order("sort_order", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ projects: data ?? [] });
}
