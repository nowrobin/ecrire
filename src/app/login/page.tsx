"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const { data: session } = useSession();
  return session ? (
    <div>
      Already Logged In go back to <Link href={"/"}>Main Page</Link>
    </div>
  ) : (
    <button onClick={() => signIn("google")}>Google LogIn</button>
  );
}
