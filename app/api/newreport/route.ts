import { createClient } from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const supabase = createClient();

  if (!body.title || !body.link || !body.description || !body.author) {
    return NextResponse.json({
      error: true,
    });
  }

  const { error, data } = await supabase.from("posts").insert({
    id: v4(),
    title: body.title,
    link: body.link,
    description: body.description,
    author: body.author,
    status: 0,
  });
  console.log(data);
  if (!error) {
    return NextResponse.json({
      error: false,
    });
  } else {
    return NextResponse.json({
      error: true,
    });
  }
}
