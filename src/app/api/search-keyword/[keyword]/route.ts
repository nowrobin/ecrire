"use server";

import prisma from "@/app/lib/prisma";

import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { keyword: string } }
) {
  const quote = await prisma.quote.findMany({
    where: {
      OR: [
        {
          full_content: {
            contains: params.keyword,
          },
        },
        {
          author: {
            contains: params.keyword,
          },
        },
        {
          title: {
            contains: params.keyword,
          },
        },
      ],
    },
    include: {
      _count: true,
    },
  });
  return Response.json({ data: quote }, { status: 200 });
}
