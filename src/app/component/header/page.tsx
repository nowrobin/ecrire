"use client";
import Link from "next/link";

import { getSession } from "@/app/login/actions";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";

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
          if (localStorage.getItem("userName")) {
            const user = localStorage.getItem("userName") as string;
            setName(user);
          } else
            localStorage.setItem(
              "userName",
              value.data.user.user_metadata.name
            );
          console.log(value.data.user.user_metadata);
        } else console.log(value);
      });
    }
    getUserData();
  }, []);

  return (
    <div>
      {name != "" ? (
        <div>{name} 환영합니다</div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
}
