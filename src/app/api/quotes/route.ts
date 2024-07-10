"user server";

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

export async function POST(req: NextRequest) {
  const { author, content, upload_User } = await req.json();
  const user = await prisma.quote.create({
    data: {
      author: author,
      content: content,
      upload_User: upload_User,
    },
  });
  return Response.json({ message: "success", data: user }, { status: 200 });
}
