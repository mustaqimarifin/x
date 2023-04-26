import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { db } from "lib/kysely/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  if (req.method === "POST") {
    db.insertInto("Guestbook")
      .values({
        userId: session.user.id,
        body: (req.body.body || "").slice(0, 500),
      })
      .execute();

    return res.status(200).json({ error: null });
  }

  if (req.method === "DELETE") {
    await db
      .deleteFrom("Guestbook")
      .where("id", "=", req.body.id)

      .execute();

    return res.status(204).json({});
  }

  return res.send("Method not allowed.");
}
