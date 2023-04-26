import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
//import { db } from 'lib/planetscale'
import prisma from "lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  if (req.method === "POST") {
    const newEntry = await prisma.guestbook.create({
      data: {
        userId: session.user.id,
        body: (req.body.body || "").slice(0, 500),
      },
    });

    return res.status(200).json({
      id: newEntry.id.toString(),
      body: newEntry.body,
      name: session.user.name,
      image: session.user.image,
      createdAt: newEntry.createdAt.toString(),
      updatedAt: newEntry.updatedAt.toString(),
    });
  }
  if (req.method === "DELETE") {
    try {
      await prisma.guestbook.delete({
        where: {
          id: req.query.id as string,
        },
      });

      return res.status(204).end();
    } catch (error) {
      return res.status(500).end();
    }
  }

  return res.status(204).json({});
}
