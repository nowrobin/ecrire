import Link from "next/link";
import { createClient } from "@/app/utils/supabase/client";

import { getSession, signOut } from "@/app/login/actions";
import { cookies } from "next/headers";

export default async function Header() {
  const supabase = createClient();
  const { error, data } = await supabase.auth.getUser();
  console.log(data);
  return data ? (
    <div>
      <Link href="/login">logged In </Link>
    </div>
  ) : (
    <div>
      <Link href="/login">log </Link>
    </div>
  );
}
