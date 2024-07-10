"use client";
import Link from "next/link";

import { getSession, signOut } from "@/app/login/actions";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

type USERINFO = {
  email: string;
  name: string;
  picture: string;
};

export default function Header() {
  const [name, setName] = useState("");
  useEffect(() => {
    async function getUserData() {
      const supabase = createClient();
      await supabase.auth.getUser().then((value) => {
        if (value.data.user) {
          setName(value.data.user.toString());
        }
      });
    }
    getUserData();
  }, []);

  const handleSignout = () => {
    localStorage.removeItem("userName");
    signOut();
    setName("");
  };

  return (
    <div>
      {name != "" ? (
        <div>
          <div>{name} 환영합니다</div>
          <button onClick={handleSignout}>logout</button>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
}
