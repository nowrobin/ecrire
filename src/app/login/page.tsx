"use client";
import Link from "next/link";
import { googleLogin, signOut, signInPWD, signUpPWD } from "./actions";
import { useEffect, useState } from "react";

export default function LoginPage() {
  return (
    <div>
      <div className="flex flex-col gap-10">
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
      <div>
        {" "}
        <form>
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
            type="name"
            required
          />
          <button formAction={signInPWD}>Log in</button>
          <button formAction={signUpPWD}>Sign up</button>
        </form>
      </div>
    </div>
  );
}
