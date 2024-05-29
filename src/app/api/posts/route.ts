"use server";

import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany({});
  return Response.json({ message: "success", data: posts }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { feedback } = await req.json();
  const post = await prisma.post.create({
    data: {
      feedback: feedback,
      upvote: 0,
      downvote: 0,
    },
  });
  return Response.json({ message: "success", data: post }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { id, upvote, downvote } = await req.json();
  const vote = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      upvote: upvote,
      downvote: downvote,
    },
  });
  return Response.json({ message: "success", data: vote }, { status: 200 });
}
