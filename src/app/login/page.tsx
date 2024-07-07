"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

// export default function Login() {
//   const { data: session } = useSession();
//   return session ? (
//     <div>
//       Already Logged In go back to <Link href={"/"}>Main Page</Link>
//     </div>
//   ) : (
//     // <button onClick={() => signIn("google")}>Google LogIn</button>
//     <div></div>
//   );
// }

import { googleLogin, getSession, signOut } from "./actions";
import { useEffect, useState } from "react";

export default function LoginPage() {
  return (
    <div>
      <div>
        <button
          className="bg-red-100 w-[32rem] h-12"
          onClick={() => googleLogin()}
        >
          Google Login
        </button>
        <button className="bg-red-100 w-[32rem] h-12" onClick={() => signOut()}>
          SignOut
        </button>
      </div>
    </div>
  );
}
