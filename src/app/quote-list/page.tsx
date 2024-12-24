"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import IdStore from "../store";
type DEBOUNCE = (...args: any) => void;

export default function QuoteList() {
  const [list, setList] = useState<any>(null);
  const [searchedList, setSearchedList] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [isLoading, setIsloading] = useState(true);
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
        setIsloading(false);
      });
  }, [page, isLoading, searchedList]);
  console.log(list);
  const store = IdStore();

  const handleQuoteClick = (index: number) => {
    store.setQuoteId(index);
    router.push("/");
  };

  const getQuote = (keyword: string) => {
    if (keyword.length == 0) {
      setSearchedList(null);
    } else {
      try {
        fetch(`/api/search-keyword/${keyword}`)
          .then((data) => data.json())
          .then((res) => {
            setSearchedList(res.data);
          });
      } catch {
        alert("Fail to get Quote List");
      }
    }
  };

  const handleSeacrhInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.currentTarget.value);
    getQuote(e.currentTarget.value);
    // onLoadSearch(e.currentTarget.value);
  };

  // let timer: NodeJS.Timeout | null;
  // const debounce = (fn: DEBOUNCE, delay: number) => {
  //   return ((...args: any) => {
  //     if (timer) {
  //       clearTimeout(timer);
  //       timer = null;
  //     }
  //     timer = setTimeout(() => {
  //       fn(...args);
  //     }, delay);
  //   }) as DEBOUNCE;
  // };

  // const onLoadSearch = useCallback(debounce(getQuote, 1000), [
  //   searchkeyword.length,
  // ]);
  const PageGen = () => {
    const index = Math.ceil(listLength / 10);
    const paginationIndex = [];
    for (let i = 1; i > index + 1; i++) {
      paginationIndex.push(<span className="text-black">{i}</span>);
    }
    return paginationIndex;
  };
  //TODO: fix the type of the value in map
  return (
    <div className="flex flex-col gap-2 w-screen text-slate-700 items-center justify-center">
      <div className="mt-10  text-3xl">Quote List</div>
      <div className="flex flex-row gap-2">
        <input
          className="bg-slate-500 w-[20rem] text-white outline-none p-2"
          type="text"
          value={searchkeyword}
          onChange={handleSeacrhInput}
        />
        <button className="text-black" onClick={() => setSearchKeyword("")}>
          reset
        </button>
      </div>
      {searchedList && searchedList.length != 0 ? (
        searchedList.map((value: any, index: number) => {
          return (
            <div
              key={index}
              className="bg-slate-600 text-white w-[32rem]"
              onClick={() => handleQuoteClick(value.id)}
            >
              <div className="flex flex-row gap-10">
                <div>{value.author}</div>
                <div>{value.title}</div>
              </div>
              <div className="truncate ">
                {value.content ? value.content.join("") : ""}
              </div>
            </div>
          );
        })
      ) : list && list.length != 0 ? (
        list.map((value: any, index: number) => {
          return (
            <div
              key={index}
              className="bg-slate-600 text-white w-[32rem]"
              onClick={() => handleQuoteClick(value.id)}
            >
              <div className="flex flex-row gap-10">
                <div>{value.author}</div>
                <div>{value.title}</div>
                <div>{value.id}</div>
              </div>
              <div className="truncate ">
                {value.content ? value.content.join("") : ""}
              </div>
            </div>
          );
        })
      ) : (
        <>QUOTE LIST UNAVALIABLE</>
      )}
      <div className="flex flex-row gap-10">
        <button
          onClick={() =>
            setPage((prev) => (prev !== 0 ? (prev -= 1) : (prev = 0)))
          }
        >
          Prev
        </button>
        <div>{page == 0 && "as"}</div>
        <button onClick={() => setPage((prev) => (prev += 1))}>Next</button>
      </div>
    </div>
  );
}
