import { routerClient } from "lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = routerClient();

  const { data } = await supabase.from("pageviews").select("*");
  const total = data?.reduce((acc, row) => acc + row.view_count, 0);

  return NextResponse.json(total);
}
