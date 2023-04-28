import type { Metadata } from "next";
import { SignIn, SignOut } from "./actions";

import Form from "./form";

import { formatDate } from "lib/utils";
import { cache } from "react";
import Avatar from "components/Avatar";
import Balancer from "react-wrap-balancer";

import type { Database } from "types/supabase";
import createClient from "lib/supabase-server";

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

type HotlineBling = Database["public"]["Views"]["hotline_bling"]["Row"];

/* const getGuestbook = cache(async () => {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  return await supabase.from("hotline_bling").select("*")
}) */

export const revalidate = 0;

const getHotline = cache(async () => {
  const supabaseServer = createClient();

  const { data: entries } = await supabaseServer
    .from("hotline_bling")
    .select("*");
  return entries;
});

const getUser = cache(async () => {
  const supabaseServer = createClient();

  const {
    data: { user },
  } = await supabaseServer.auth.getUser();
  return user;
});

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
};

export default async function HotlinePage() {
  const entries = await getHotline();
  const user = await getUser();

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
        {user ? (
          <>
            <Form />
            <SignOut />
          </>
        ) : (
          <SignIn />
        )}

        <>
          {entries &&
            entries.map((post: HotlineBling) => (
              <div key={Number(post.id)} className="rounded-lg p-4  text-base ">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 inline-flex items-center text-xs font-semibold text-gray-900 dark:text-white">
                      <Avatar
                        className="mr-2 h-4 w-4 rounded-full"
                        src={post.avatar}
                        alt={post?.username}
                      />
                      {post?.username ?? post?.fullname}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {formatDate(post?.posted_at)}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {post?.body}
                </div>
              </div>
            ))}
        </>
      </section>
    </>
  );
}
