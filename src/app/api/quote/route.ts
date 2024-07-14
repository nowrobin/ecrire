"use server";

import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  const quote = await prisma.quote.findUnique({
    where: {
      id: 1,
    },
  });
  return Response.json({ message: "success", data: quote }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { userId, quoteId } = await req.json();
  if (userId === null || userId == undefined)
    throw new Error("Not Authenticated");
  const updateQuote = await prisma.quote.update({
    where: {
      id: quoteId,
    },
    data: {
      User_Quote_liked_userIdToUser: {
        connect: {
          auth_id: userId,
        },
      },
    },
  });
  return Response.json(
    { message: "success", data: updateQuote },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const { id, author, content, title } = await req.json();
  if (id === null) throw new Error("Not Authenticated");
  const newQuote = await prisma.quote.create({
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
  return Response.json({ message: "success", data: newQuote }, { status: 200 });
}
