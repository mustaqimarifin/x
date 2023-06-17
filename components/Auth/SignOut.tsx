'use client';

import { useAuth } from "components/supabase-provider"


export default function SignOut() {
  const { signOut } = useAuth();

  async function handleSignOut() {
    const { error } = await signOut();

    if (error) {
      console.error('ERROR signing out:', error);
    }
  }

  return (
    <button type="button" className="mb-6 mt-2 text-xs text-neutral-700 dark:text-neutral-300"
 onClick={handleSignOut}>
      Sign Out
    </button>
  );
}