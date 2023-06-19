"use client";

import { GoogleIcon } from "components/UI/icons";
import { supabase } from "lib/supabase/browser";

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

export const getURL2 = () => `window.location.href =
  location.protocol + "//" + location.host + location.pathname`;

export function SignOut() {
  return (
    <button
      className="mb-6 mt-2 text-xs text-neutral-700 dark:text-neutral-300"
      onClick={async () => await supabase.auth.signOut()}
    >
      → Sign out
    </button>
  );
}

export function SignIn() {
  return (
    <button
      className="mb-4 flex rounded-md border border-gray-800 bg-black px-4 py-3 text-sm font-semibold text-neutral-200 transition-all hover:text-white"
      onClick={async () =>
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: getURL2(),
          },
        })
      }
    >
      <GoogleIcon />
      <div className="ml-3">Sign in with Google</div>
    </button>
  );
}
