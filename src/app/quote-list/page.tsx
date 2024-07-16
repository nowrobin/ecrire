"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuoteList() {
  const [list, setList] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    fetch("/api/quoteList")
      .then((data) => data.json())
      .then((res) => {
        const { data } = res;
        setList(data);
      });
  }, []);

  const handleQuoteClick = (index: number) => {
    router.push(`/${index}`);
  };
  //TODO: fix the type of the value in map
  return (
    <div className="flex flex-col gap-2 w-screen items-center justify-center">
      <div className="mt-10 text-slate-700 text-3xl">Quote List</div>
      {list.map((value: any, index: number) => {
        return (
          <div
            key={index}
            className="bg-slate-600 w-[32rem]"
            onClick={() => handleQuoteClick(index)}
          >
            <div className="flex flex-row gap-10">
              <div>{value.author}</div>
              <div>{value.title}</div>
            </div>
            <div className="truncate ">{value.content.join("")}</div>
            <div></div>
          </div>
        );
      })}
    </div>
  );
}
