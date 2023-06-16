import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LoginForm from "./login-form";

import type { Database } from "types/supabase";
import { serverClient } from "lib/supabase/server";

export default async function Login() {
  const supabase = serverClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <LoginForm session={session} />;
}
