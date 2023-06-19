import type { Metadata } from "next";

import { cache } from "react";
import Balancer from "react-wrap-balancer";

import type { Database } from "types/supabase";
import { serverClient } from "lib/supabase/server";
import { Hotline } from "components/HotlineBling";
import LoginForm from "./login-form";

type HotlineBling = Database["public"]["Views"]["hotline_bling"]["Row"];

export const dynamic = "force-dynamic";

const getHotline = cache(async () => {
  const supabase = await serverClient();

  const { data: entries } = await supabase.from("hotline_bling").select("*");
  return entries;
});

async function HotlineForm() {
  const supabase = await serverClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <LoginForm session={session} />;
}

const metadata: Metadata = {
  title: "Guestbook",
  description: "Leave a message!.",
};

export default async function HotlinePage() {
  const entries = await getHotline();
  //const user = await getUser()

  /*   let entries;

  try {
    [entries] = await Promise.allSettled([getHotline()]);

    if (entries.status === "fulfilled" && entries.value[0]) {
      entries = entries.value;
    } else {
      console.error(entries);
    }
  } catch (error) {
    console.error(error);
  } */
  return (
    <>
      <section>
        <h1 className="max-w-[650px mb-8 font-serif text-3xl font-bold">
          <Balancer>Guestbook</Balancer>
        </h1>
        <HotlineForm />
        <>
          {entries &&
            entries.map((post: HotlineBling) => (
              <Hotline
                key={post.id}
                avatar={post.avatar}
                fullname={post.fullname}
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

const getHotline = cache(async () => {
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
