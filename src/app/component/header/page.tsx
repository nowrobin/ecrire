"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div className="absolute flex flex-row gap-10 right-[32rem]">
      <div>Main</div>
      {session ? (
        <div></div>
      ) : (
        <div>
          <Link href={"/login"}>Login</Link>
          {/* <Link></Link> */}
        </div>
      )}
    </div>
  );
}
