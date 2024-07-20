"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function googleLogin() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
        redirectTo: `/`,
      },
    },
  });
  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUpPWD(formData: FormData) {
  const supabase = createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: formData.get("name") as string,
      },
    },
  };
  const { error } = await supabase.auth.signUp(data);
  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signInPWD(formData: FormData) {
  const supabase = createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
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
