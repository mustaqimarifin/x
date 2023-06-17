"use client";

import React from "react";
import { AuthProvider } from "./supabase-provider";
import { supabase } from "lib/supabase/browser";

export async function Providers({ children }: { children: React.ReactNode }) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const accessToken = session?.access_token || null;
  return <AuthProvider accessToken={accessToken}>{children}</AuthProvider>;
}
