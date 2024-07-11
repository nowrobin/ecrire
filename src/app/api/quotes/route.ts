"use server";

import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  const quotes = await prisma.quote.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
  return Response.json({ message: "success", data: quotes }, { status: 200 });
}

type USER = {
  id: number;
  username: string;
  email: string | null;
  profile_Image: string | null;
  auth_id: string;
  provider: string | null;
};

export async function POST(req: NextRequest) {
  const { id, author, content, title } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  const quote = await prisma.quote.create({
    data: {
      author: author,
      content: content,
      title: title,
      upload_User: {
        connect: {
          id: id,
        },
      },
    },
  });
  return Response.json({ message: "success", data: quote }, { status: 200 });
}
