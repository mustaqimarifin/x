import { createClient } from "@supabase/supabase-js";
import { Database } from "types/supabase";
import ky from "ky-universal";

export default createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    global: {
      fetch: async (...args) => await ky(...args),
    },
  }
);
