import type { Metadata } from "next";
import { SignIn, SignOut } from "./actions";

import Form from "./form";

import { cache } from "react";
import Balancer from "react-wrap-balancer";

import type { Database } from "types/supabase";
import { serverClient } from "lib/supabase/server";
import { Hotline } from "components/HotlineBling";
import LOGIN from "components/Auth";
import LoginForm from "./login-form";
import Login from "./login";

type HotlineBling = Database["public"]["Views"]["hotline_bling"]["Row"];

export const dynamic = "force-dynamic";

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
  //const entries = await getHotline()
  //const user = await getUser()

  let entries;
  let user;

  try {
    const [entriesRes, userRes] = await Promise.allSettled([
      getHotline(),
      getUser(),
    ]);

    if (entriesRes.status === "fulfilled" && entriesRes.value[0]) {
      entries = entriesRes.value;
    } else {
      console.error(entriesRes);
    }

    if (userRes.status === "fulfilled") {
      user = userRes.value;
    } else {
      console.error(userRes);
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <section>
        <h1 className="max-w-[650px mb-8 font-serif text-3xl font-bold">
          <Balancer>Guestbook</Balancer>
        </h1>
        {/*         { user ? (
          <>
            <Form />
            <SignOut />
          </>
        ) : (
          <SignIn />
        ) } */}
        <Login />

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
