"use client";
import Link from "next/link";
import { googleLogin, signOut } from "./actions";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const handleClick = () => {
    googleLogin();
  };
  return (
    <div>
      <div>
        <button className="bg-red-100 w-[32rem] h-12" onClick={handleClick}>
          Google Login
        </button>
        <button className="bg-red-100 w-[32rem] h-12" onClick={() => signOut()}>
          SignOut
        </button>
      </div>
    </div>
  );
}
