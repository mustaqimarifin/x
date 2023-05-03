//import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { routerClient } from "lib/supabase-server";
import { NextResponse } from "next/server";
//import { headers, cookies } from "next/headers"
//import { Database } from "types/supabase"
//type Post = Database["public"]["Tables"]["hotline"]["Row"]

export async function POST(request: Request) {
  const { body } = await request.json();
  const supabase = routerClient();

  /*   const supabase = createRouteHandlerSupabaseClient<Database>({
      headers,
      cookies,
    }) */
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
  const { content } = await request.json();
  const supabase = routerClient();

  /*   const supabase = createRouteHandlerSupabaseClient<Database>({
      headers,
      cookies,
    }) */
  const { data } = await supabase.from("hotline").delete().eq("id", content.id);

  return NextResponse.json(data);
}
