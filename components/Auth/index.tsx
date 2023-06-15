"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "lib/supabase/browser";

const LOGIN = () => (
  <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
    theme="dark"
    providers={["google", "github"]}
    onlyThirdPartyProviders={true}
  />
);

export default LOGIN;
