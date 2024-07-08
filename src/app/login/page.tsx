"use client";
import Link from "next/link";
import { googleLogin, signOut } from "./actions";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const handleClick = async () => {
    // if (localStorage.getItem("userName")) {
    //   console.log("res", localStorage.getItem("userName"));
    // } else {
    //   const res = await googleLogin();
    //   try {
    //     localStorage.setItem("userName", res.data.user?.user_metadata.name);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
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
