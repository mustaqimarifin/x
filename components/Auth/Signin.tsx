"use client";

import { useAuth } from "components/Providers/supabase-provider";
import { GoogleIcon } from "components/UI/icons";

export default function SignIN() {
  const { signIn } = useAuth();

  async function handleSignIN() {
    const { error } = await signIn();

    if (error) {
      console.error("ERROR signing out:", error);
    }
  }

  return (
    <button
      className="mb-4 flex rounded-md border border-gray-800 bg-black px-4 py-3 text-sm font-semibold text-neutral-200 transition-all hover:text-white"
      onClick={handleSignIN}
    >
      <GoogleIcon />
      <div className="ml-3">Sign in with Google</div>
    </button>
  );
}
