"use server";

import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  // const quotes = await prisma.quote.findMany({
  //   orderBy: [
  //     {
  //       id: "asc",
  //     },
  //   ],
  // });
  const quote = await prisma.quote.findUnique({
    where: {
      id: 1,
    },
  });
  return Response.json({ message: "success", data: quote }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { userId, quoteId } = await req.json();
  const updateQuote = await prisma.quote.update({
    where: {
      id: quoteId,
    },
    data: {
      User_Quote_liked_userIdToUser: {
        connect: {
          id: 1,
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
