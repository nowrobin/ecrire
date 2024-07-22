"use server";

import prisma from "@/app/lib/prisma";

import { NextRequest } from "next/server";

// { params }: { params: { id: string } }
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const quote = await prisma.quote.findUnique({
    where: {
      id: parseInt(params?.id),
    },
  });
  return Response.json({ data: quote }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { userId, quoteId } = await req.json();
  if (userId === null || userId == undefined)
    throw new Error("Not Authenticated");
  const connectedUser = await prisma.user.findUnique({
    where: {
      auth_id: userId,
      Quote_Quote_liked_userIdToUser: {
        some: {
          id: quoteId,
        },
      },
    },
  });
  let updateQuote;
  if (connectedUser) {
    updateQuote = await prisma.quote.update({
      where: {
        id: quoteId,
      },
      data: {
        User_Quote_liked_userIdToUser: {
          disconnect: {
            auth_id: userId,
          },
        },
      },
    });
  } else {
    updateQuote = await prisma.quote.update({
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
  }
  return Response.json(
    { message: "success", data: updateQuote },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const { id, author, title, content, full_content } = await req.json();
  if (id === null) throw new Error("Not Authenticated");
  // let content: string[];
  let maxLength = 26;

  const newQuote = await prisma.quote.create({
    data: {
      author: author,
      content: content,
      title: title,
      full_content: full_content,
      upload_User: {
        connect: {
          id: id,
        },
      },
    },
  });
  return Response.json({ message: "success", data: newQuote }, { status: 200 });
}
