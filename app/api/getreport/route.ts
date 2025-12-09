import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  const data = await supabase.from("posts").select("*");
  return NextResponse.json({
    data: data,
  });
}
