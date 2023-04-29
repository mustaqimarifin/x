import type { Metadata } from "next"
import { SignIn, SignOut } from "./actions"

import Form from "./form"

//import { formatDate } from "lib/utils"
import { cache } from "react"
//import Avatar from "components/HotlineBling/Avatar"
import Balancer from "react-wrap-balancer"

import type { Database } from "types/supabase"
import { serverClient } from "lib/supabase-server"
import { Hotline } from "components/HotlineBling"

/* const getGuestbook = cache(async () => {
  return await prisma.guestbook.findMany({
    include: {
      user: true
    },
    orderBy: {
      updatedAt: "desc",
    },
  })
})

db
    .selectFrom("Guestbook")
    .innerJoin("User", "User.id", "Guestbook.userId")
    .select([
      "Guestbook.id",
      "body",
      "User.name as username",
      "User.image as avatar",
      "updatedAt",
    ])
    .orderBy("updatedAt", "desc")
    .limit(100)
    .execute()
 */

type HotlineBling = Database["public"]["Views"]["hotline_bling"]["Row"]

/* const getGuestbook = cache(async () => {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  return await supabase.from("hotline_bling").select("*")
}) */

export const revalidate = 0

const getHotline = cache(async () => {
  const supabaseServer = serverClient()

  const { data: entries } = await supabaseServer
    .from("hotline_bling")
    .select("*")
  return entries
})

const getUser = cache(async () => {
  const supabaseServer = serverClient()

  const {
    data: { user },
  } = await supabaseServer.auth.getUser()
  return user
})

/* async function getGuestBook () {
     const supabase = createServerComponentSupabaseClient<Database>({
      headers,
      cookies,
    }) 
  const { data: entries } = await supabase.from("hotline_bling").select('*')
  return entries
} */
/* export async function getUser () {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  const { data: { user } } = await supabase.auth.getUser()
  return user
} */

const metadata: Metadata = {
  title: "Guestbook",
  description: "Leave a message!.",
}

export default async function HotlinePage () {
  const entries = await getHotline()
  const user = await getUser()

  /*   try {
      const [guestbookRes, userRes] = await Promise.allSettled([
        getHotline(),
        getUser()
  
      ])
  
      if (guestbookRes.status === "fulfilled" && guestbookRes.value[0]) {
        entries = guestbookRes.value
      } else {
        console.error(guestbookRes)
      }
  
      if (userRes.status === "fulfilled") {
        user = userRes.value
      } else {
        console.error(userRes)
      }
  
    } catch (error) {
      console.error(error)
    } */

  return (
    <>
      <section>
        <h1 className="max-w-[650px mb-8 font-serif text-3xl font-bold">
          <Balancer>Guestbook</Balancer>
        </h1>
        { user ? (
          <>
            <Form />
            <SignOut />
          </>
        ) : (
          <SignIn />
        ) }

        <>
          { entries &&
            entries.map((post: HotlineBling) => (
              <Hotline
                key={ post.id }
                avatar={ post.avatar }
                username={ post.username }
                posted_at={ post.posted_at }
                body={ post.body }
                id={ post.id }
              />
            )) }
        </>
      </section>
    </>
  )
}
