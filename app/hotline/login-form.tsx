"use client";

import { useRouter } from "next/navigation";
import type { Session } from "@supabase/auth-helpers-nextjs";
import { GoogleIcon } from "components/UI/icons";
import Form from "./form";
import { supabase } from "lib/supabase/browser";
import SignOut from "components/Auth/SignOut";

export default function LoginForm({ session }: { session: Session | null }) {
  const router = useRouter();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        //redirectTo: `${location.origin}/auth/callback`,
        redirectTo: (window.location.href =
          location.protocol + "//" + location.host + location.pathname),
      },
    });
    router.refresh();
  };

  // for the `session` to be available on first SSR render, it must be
  // fetched in a Server Component and passed down as a prop
  return session ? (
    <>
      <Form />
      <SignOut />
    </>
  ) : (
    <>
      <button
        className="mb-4 flex rounded-md border border-gray-800 bg-black px-4 py-3 text-sm font-semibold text-neutral-200 transition-all hover:text-white"
        onClick={handleSignIn}
      >
        <GoogleIcon />
        <div className="ml-3">Sign in with Google</div>
      </button>
    </>
  );
}
