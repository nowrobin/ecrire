"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";

export async function googleLogin() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    },
  });

  //Send to google Login URL
  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
  if (error) {
    console.log(error);
    redirect("/error");
  }
  return supabase.auth.getUser();
  // revalidatePath("/", "layout");
  // redirect("/");
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function getSession() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return data;
}
