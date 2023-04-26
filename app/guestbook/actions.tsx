"use client";

import { GoogleIcon } from "components/icons";
import { signIn, signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button
      className="mb-6 mt-2 text-xs text-neutral-700 dark:text-neutral-300"
      onClick={() => signOut()}
    >
      → Sign out
    </button>
  );
}

export function SignIn() {
  return (
    <button
      className="mb-4 flex rounded-md border border-gray-800 bg-black px-4 py-3 text-sm font-semibold text-neutral-200 transition-all hover:text-white"
      onClick={() => signIn("google")}
    >
      <GoogleIcon />
      <div className="ml-3">Sign in with Google</div>
    </button>
  );
}
