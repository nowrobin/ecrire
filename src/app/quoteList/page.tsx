"use client";

import { createClient } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";

export default function QuoteList() {
  const [quote, setQuote] = useState<any>();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const res = fetch("/api/quote")
      .then((data) => data.json())
      .then((res) => setQuote(res.data));
    async function getUserData() {
      const supabase = createClient();
      await supabase.auth.getUser().then((value) => {
        if (value.data.user) {
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);
  console.log(user);
  let a = "";
  if (quote) {
    a = quote.content;
  }
  const handleLikeButton = () => {
    const res = fetch("/api/quote", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        quoteId: quote.id,
      }),
    }).then((response) => console.log(response));
  };
  return (
    <div>
      {quote ? (
        <div>
          {a}
          <button onClick={handleLikeButton}>Liked</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
