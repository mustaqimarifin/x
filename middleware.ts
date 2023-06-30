import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import type { Database } from "types/supabase";

export async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);

  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  const origin = requestHeaders.get("origin");
  if (origin && config.matcher.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
  }
  const supabase = createMiddlewareClient<Database>({ req, res });
  await supabase.auth.getSession();
  return res;
}

export const config = {
  matcher: ["/", "/hotline"],
};
