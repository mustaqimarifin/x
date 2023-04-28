import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { Database } from "types/supabase";
// This needs to export a function, as the headers and cookies are not populated with values until the Server Component is requesting data.

export default () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
