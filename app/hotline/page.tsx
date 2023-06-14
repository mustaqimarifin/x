import type { Metadata } from "next";
import { SignIn, SignOut } from "./actions";

import Form from "./form";

import { cache } from "react";
import Balancer from "react-wrap-balancer";

import type { Database } from "types/supabase";
import { serverClient } from "lib/supabase/server";
import { Hotline } from "components/HotlineBling";

type HotlineBling = Database["public"]["Views"]["hotline_bling"]["Row"];

export const revalidate = 0;

const getHotline = cache(async () => {
  const supabase = serverClient();

  const { data: entries } = await supabase.from("hotline_bling").select("*");
  return entries;
});

const getUser = cache(async () => {
  const supabase = serverClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

const metadata: Metadata = {
  title: "Guestbook",
  description: "Leave a message!.",
};

export default async function HotlinePage() {
  const entries = await getHotline();
  const user = await getUser();

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
              <Hotline
                key={post.id}
                avatar={post.avatar}
                username={post.username}
                posted_at={post.posted_at}
                body={post.body}
                id={post.id}
              />
            ))}
        </>
      </section>
    </>
  );
}

/* //^PRISMA 

const getGuestbook = cache(async () => {
  return await prisma.guestbook.findMany({
    include: {
      user: true
    },
    orderBy: {
      updatedAt: "desc",
    },
  })
})

*/

/* //^KYSELY
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
