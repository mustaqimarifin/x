import { routerClient } from "lib/supabase/server";
//import supabase  from "lib/supabase/client"
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const getSlug = new URL(request.url);
  const slug = getSlug.pathname.substring(
    getSlug.pathname.lastIndexOf("/") + 1
  );
    const { body } = await request.json();

  const supabase = await routerClient();
  const { data } = await supabase.rpc("increment_page_view", {
    page_slug: body,
  });
  console.log(data);
 return new NextResponse(data, { status: 204 });
 
}

export async function GET(request: Request) {
  const getSlug = new URL(request.url);
  const slug = getSlug.pathname.substring(
    getSlug.pathname.lastIndexOf("/") + 1
  );
    const { body } = await request.json();

  const supabase = await routerClient();
  const { data } = await supabase
    .from("pageviews")
    .select("view_count")
    .eq("slug", body);
    
    const views = !data.length ? 0 : Number(data[0].view_count);

  return NextResponse.json(views);
}
