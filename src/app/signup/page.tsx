"use client";

import Link from "next/link";
import { googleLogin, signUpPWD } from "../action/actions";
import { useEffect, useState } from "react";

export default function LoginPage() {
  return (
    <div className="flex flex-col m-10 bg-slate-500 p-10  gap-10 w-[38rem]">
      <div className="text-2xl text-center">Sign UP</div>
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
        <label htmlFor="name">Name:</label>
        <input
          className="text-black"
          id="name"
          name="name"
          type="text"
          required
        />
        <button
          className="bg-blue-500 text-white mt-4 h-12"
          formAction={signUpPWD}
        >
          Sign up
        </button>
      </form>
      <Link
        href="/login"
        className=" underline underline-offset-2 hover:text-red-300"
      >
        Already have accrount?
      </Link>
      <hr className="bg-white text-white  w-[32rem]"></hr>
      <button
        className="bg-red-400 w-[32rem] h-12 "
        onClick={() => googleLogin()}
      >
        Google Login
      </button>
    </div>
  );
}
