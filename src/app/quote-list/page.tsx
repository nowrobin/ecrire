"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuoteList() {
  const [list, setList] = useState<any>([]);
  const [page, setPage] = useState(0);
  const router = useRouter();
  useEffect(() => {
    fetch(`/api/quoteList/${page}`)
      .then((data) => data.json())
      .then((res) => {
        const { data } = res;
        setList(data);
      });
  }, [page]);
  const handleQuoteClick = (index: number) => {
    router.push(`/${index}`);
  };
  //TODO: fix the type of the value in map
  return (
    <div className="flex flex-col gap-2 w-screen text-slate-700 items-center justify-center">
      <div className="mt-10  text-3xl">Quote List</div>
      {list.map((value: any, index: number) => {
        return (
          <div
            key={index}
            className="bg-slate-600 text-white w-[32rem]"
            onClick={() => handleQuoteClick(index + 1)}
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
      <div className="flex flex-row gap-10">
        <button
          onClick={() =>
            setPage((prev) => (prev !== 0 ? (prev -= 1) : (prev = 0)))
          }
        >
          Prev
        </button>
        <div>{page}</div>
        <button onClick={() => setPage((prev) => (prev += 1))}>Prev</button>
      </div>
    </div>
  );
}
