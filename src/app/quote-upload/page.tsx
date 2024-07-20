"use client";

import { createClient } from "@/app/utils/supabase/client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function UploadQuote({
  params,
}: {
  params: { userName: string };
}) {
  const [content, setContent] = useState<string[]>([]);
  const [user, setUser] = useState<string>(params.userName);
  const [id, setId] = useState<any>();
  const [author, setAuthor] = useState(params.userName);
  const [title, setTitle] = useState("Title");

  useEffect(() => {
    async function getUserData() {
      const supabase = createClient();
      await supabase.auth.getUser().then((value) => {
        if (value.data.user) {
          setId(value.data.user.id);
        }
      });
    }
    getUserData();
  });
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value.split(""));
  };
  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = fetch("/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        author: author,
        content: content,
        title: title,
      }),
    }).then((response) => alert("success"));
  };

  return (
    <div className="flex flex-col gap-10 w-[50%]">
      <div>Uploaded by {user} </div>
      <input
        className="text-black bg-white w-[20rem]"
        type="text"
        placeholder="Author"
        onChange={(e) => setAuthor(e.currentTarget.value)}
      />
      <input
        className="text-black bg-white w-[20rem]"
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <textarea
        className="w-[40rem] h-[10rem] bg-slate-400 text-black"
        id=""
        onChange={handleTextAreaChange}
      ></textarea>
      <button onClick={handleUploadClick}>upload</button>
    </div>
  );
}
