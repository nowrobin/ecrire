"use client";

import { useEffect, useState } from "react";

export default function QuoteList() {
  const [list, setList] = useState<any>([]);
  useEffect(() => {
    fetch("/api/quoteList")
      .then((data) => data.json())
      .then((res) => {
        const { data } = res;
        setList(data);
      });
  }, []);
  //TODO: fix the type of the value in map
  return (
    <div className="flex flex-col gap-2">
      {list.map((value: any, index: number) => {
        return (
          <div key={index} className="bg-slate-600 w-[32rem]">
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