"user server";

import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { auth_id } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      auth_id: auth_id,
    },
  });
  return Response.json({ message: "success", data: user }, { status: 200 });
}

// export async function POST(req: NextRequest) {
//   const { username, provider, email, profile_Image, auth_id } =
//     await req.json();
//   const user = await prisma.user.create({
//     data: {
//       username: username,
//       provider: provider,
//       email: email,
//       profile_Image: profile_Image,
//       auth_id: auth_id,
//     },
//   });
//   return Response.json({ message: "success", data: user }, { status: 200 });
// }
