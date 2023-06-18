import { routerClient } from "lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { body } = await request.json();
  const supabase = await routerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("hotline")
    .insert([{ author_id: user.id, body: body }])
    .select();
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { comment } = await request.json();
  const supabase = await routerClient();
  const { data } = await supabase.from("hotline").delete().eq("id", comment);
  return NextResponse.json(data);
}
