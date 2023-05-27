import supabase from "lib/supabase/client";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { data } = await supabase.from("pageviews").select("*");
    const total = data?.reduce((acc, row) => acc + row.view_count, 0);

    return res.status(200).json({
      total,
    });
  } else
    return res.status(400).json({
      message: "Unsupported Request",
    });
}
