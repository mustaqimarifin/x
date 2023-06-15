import {
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "types/supabase"

//! This needs to export a function, as the headers and cookies are not populated with values until the Server Component is requesting data.

export const serverClient = () =>
  createServerComponentClient<Database>({
    cookies,
  })

export const routerClient = () =>
  createRouteHandlerClient<Database>({
    cookies,
  })
