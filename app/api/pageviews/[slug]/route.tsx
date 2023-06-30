import { PostgrestError } from "@supabase/supabase-js";
import { routerClient } from "lib/supabase/server";
import { errorToJSON } from "next/dist/server/render";
//import supabase  from "lib/supabase/client"
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let slug: string | null;
  try {
    const { searchParams } = new URL(req.url);
    slug = searchParams.get("slug");
    if (!slug) {
      const url = new URL(req.url);
      slug = url.pathname.substring(url.pathname.lastIndexOf("/") + 1);
    }

    const supabase = await routerClient();
    await supabase.rpc("increment_page_view", {
      page_slug: slug,
    });
    return new NextResponse("OK!");
  } catch (err) {
    return new Response(`Failed to increment page`, {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  let slug: string | null;
  try {
    const { searchParams } = new URL(req.url);
    slug = searchParams.get("slug");
    if (!slug) {
      const url = new URL(req.url);
      slug = url.pathname.substring(url.pathname.lastIndexOf("/") + 1);
    }

    const supabase = await routerClient();
    const { data } = await supabase
      .from("pageviews")
      .select("view_count")
      .eq("slug", slug);

    const total = data?.reduce((acc, row) => acc + row.view_count, 0);

    return NextResponse.json({ total });
  } catch (e) {
    console.log(`${e}`);
    return new Response(`Failed to increment page`, {
      status: 500,
    });
  }
}
