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
