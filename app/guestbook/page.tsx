import type { Metadata } from "next";
import { db } from "lib/kysely/postgres";
import { SignIn, SignOut } from "./actions";

import Form from "./form";

import { formatDate } from "lib/utils";
import { cache } from "react";
import { getCurrentUser } from "lib/session";
import Avatar from "components/Avatar";
import Balancer from "react-wrap-balancer";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { Post } from "types/kysely"

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
 */
const getGuestbook = cache(async () => {
  return await db
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
    .execute();
});

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Leave a message!.",
};

export const dynamic = "force-dynamic";

export default async function GuestbookPage() {
  let entries;
  let session : Session

  try {
    const [guestbookRes, sessionRes] = await Promise.allSettled([
      getGuestbook(),
      getServerSession(authOptions),
    ]);

    if (guestbookRes.status === "fulfilled" && guestbookRes.value[0]) {
      entries = guestbookRes.value;
    } else {
      console.error(guestbookRes);
    }

    if (sessionRes.status === "fulfilled") {
      session = sessionRes.value;
    } else {
      console.error(sessionRes);
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
        {session?.user ? (
          <>
            <Form />
            <SignOut />
          </>
        ) : (
          <SignIn />
        )}

        <>
          {entries &&
            entries.map((post) => (
              <div key={post.id} className="rounded-lg p-4  text-base ">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 inline-flex items-center text-xs font-semibold text-gray-900 dark:text-white">
                      <Avatar
                        className="mr-2 h-4 w-4 rounded-full"
                        src={post.avatar}
                        alt="Michael Gough"
                      />
                      {post?.username}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {formatDate(post?.updatedAt.toString())}
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
