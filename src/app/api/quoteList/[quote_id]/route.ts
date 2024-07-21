"use server";

import prisma from "@/app/lib/prisma";
import { createClient } from "@/app/utils/supabase/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { quote_id: string } }
) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const quoteNumber = parseInt(params.quote_id);
  console.log(quoteNumber);

  const quotes = user.data.user
    ? await prisma.user.findUnique({
        where: {
          auth_id: user.data.user?.id,
        },
        include: {
          upLoaded_Posts: true,
          Quote_Quote_liked_userIdToUser: true,
          Quote_Quote_completed_UserIdToUser: true,
        },
      })
    : await prisma.quote.findMany({
        take: 10,
        skip: quoteNumber ? 10 : 0,
        ...(quoteNumber && { cursor: { id: quoteNumber } }),
        orderBy: [
          {
            id: "asc",
          },
        ],
      });

  return Response.json({ message: "success", data: quotes }, { status: 200 });
}
