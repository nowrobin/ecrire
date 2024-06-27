"use server";

import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
  return Response.json({ message: "success", data: posts }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { feedback } = await req.json();
  const post = await prisma.post.create({
    data: {
      feedback: feedback,
    },
  });
  return Response.json({ message: "success", data: post }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { id, upDown } = await req.json();
  console.log(id, upDown);
  const v =
    upDown == "UP"
      ? {
          increment: 1,
        }
      : {
          decrement: 1,
        };
  const vote = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      vote: v,
    },
  });
  return Response.json({ message: "success", data: vote }, { status: 200 });
}
