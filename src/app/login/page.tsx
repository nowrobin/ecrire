"use client";
import Link from "next/link";
import { googleLogin, signOut, signInPWD, signUpPWD } from "../action/actions";
import { useEffect, useState } from "react";

export default function LoginPage() {
  return (
    <div className="flex flex-col m-10 bg-slate-500 p-10 w-[38rem] gap-10">
      <div className="text-2xl text-center">Login</div>
      <form className="flex flex-col w-[32rem]">
        <label htmlFor="email">Email:</label>
        <input
          className="text-black"
          id="email"
          name="email"
          type="email"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          className="text-black"
          id="password"
          name="password"
          type="password"
          required
        />
        <button
          className="bg-blue-500 text-white mt-4 h-12"
          formAction={signInPWD}
        >
          Log in
        </button>
      </form>
      <Link
        className=" underline underline-offset-2 hover:text-red-300"
        href="/signup"
      >
        회원가입 하러가기
      </Link>
      <hr className="w-[32rem]" />
      <button
        className="bg-red-400 w-[32rem] h-12 "
        onClick={() => googleLogin()}
      >
        Google Login
      </button>
    </div>
  );
}
