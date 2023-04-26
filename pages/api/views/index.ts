import { db } from "lib/kysely/postgres";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await db
      .selectFrom("Post")
      .select(["slug", "count"])
      .execute();

    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
}
