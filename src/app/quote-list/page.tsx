"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import IdStore from "../store";
type DEBOUNCE = (...args: any) => void;

export default function QuoteList() {
  const [list, setList] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [searchkeyword, setSearchKeyword] = useState("");
  const [requestCount, setRequestCount] = useState(0);
  const [listLength, setListLength] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/quoteList/${page}`)
      .then((data) => data.json())
      .then((res) => {
        const { data } = res;
        setListLength(data[0]);
        setList(data[1]);
      });
  }, [page]);

  const PageGenerator = () => {
    const index = Math.ceil(listLength / 10);
    console.log(index, listLength);
    return <span className="text-black">{index}</span>;
  };

  const store = IdStore();

  const handleQuoteClick = (index: number) => {
    store.setQuoteId(index);
    router.push("/");
  };

  const getQuote = async (author: string) => {
    try {
      if (searchkeyword.length == 0) {
        setPage(0);
      } else {
        await fetch(`/api/search-keyword/${author}`)
          .then((data) => data.json())
          .then((res) => {});
      }
    } catch {
      alert("Fail to get Quote List");
    } finally {
      setRequestCount(requestCount + 1);
    }
  };

  const handleSeacrhInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.currentTarget.value);
    onLoadSearch(e.currentTarget.value);
  };

  let timer: NodeJS.Timeout | null;
  const debounce = (fn: DEBOUNCE, delay: number) => {
    return ((...args: any) => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    }) as DEBOUNCE;
  };

  const onLoadSearch = useCallback(debounce(getQuote, 1000), [
    searchkeyword.length,
  ]);

  //TODO: fix the type of the value in map
  return (
    <div className="flex flex-col gap-2 w-screen text-slate-700 items-center justify-center">
      <div className="mt-10  text-3xl">Quote List</div>
      <input
        className="bg-slate-500 w-[60%] text-white outline-none p-2"
        type="text"
        onChange={handleSeacrhInput}
      />
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
            <div className="truncate ">
              {value.content ? value.content.join("") : ""}
            </div>
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
        <PageGenerator></PageGenerator>
        <button onClick={() => setPage((prev) => (prev += 1))}>Next</button>
      </div>
    </div>
  );
}
