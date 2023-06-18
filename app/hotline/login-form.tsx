"use client";

//import { useRouter } from "next/navigation";
import type { Session } from "@supabase/auth-helpers-nextjs";
import Form from "./form";
//import { supabase } from "lib/supabase/browser";
import SignOut from "components/Auth/SignOut";
import SignIN from "components/Auth/Signin";

export default function LoginForm({ session }: { session: Session | null }) {
  // for the `session` to be available on first SSR render, it must be
  // fetched in a Server Component and passed down as a prop
  return session ? (
    <>
      <Form />
      <SignOut />
    </>
  ) : (
    <>
      <SignIN />
    </>
  );
}
