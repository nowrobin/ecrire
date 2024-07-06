"use client";

import React, { useEffect, useState } from "react";
import chevronUP from "../../../public/chevron-up.svg";
import chevronDown from "../../../public/chevron-down.svg";
import Image from "next/image";

interface FeedBackDetail {
  id: number;
  vote: number;
  feedback: string;
}

export default function UserFeedback() {
  const [inputValue, setInputValue] = useState("");
  const [userFeed, setUserFeed] = useState<FeedBackDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setUserFeed(data.data);
        setIsLoading(false);
      });
  }, [isLoading]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const FeedBacks = ({ vote, feedback, id }: FeedBackDetail) => {
    return (
      <div className="flex flex-row relative h-[5rem] text-black bg-white w-[18rem] rounded-xl p-2">
        <div className="flex flex-col h-[3rem]  mt-2 justify-center items-center">
          <button
            className=" flex rounded-md bg-red-300"
            onClick={() => {
              handleVote(id, "UP");
            }}
          >
            <Image src={chevronUP} alt="chev_UP" width={20} height={20} />
          </button>

          <div className={"text-center text-[16px]"}>{vote}</div>
          <button
            className="bg-red-300 rounded-md"
            onClick={() => handleVote(id, "DOWN")}
          >
            <Image src={chevronDown} alt="chev_DOWN" width={20} height={20} />
          </button>
        </div>
        <div className="truncate ml-[20px] text-start leading-[4rem] w-[18rem]">
          {feedback}
        </div>
      </div>
    );
  };
  const FeedBackSkeleton = () => {
    return (
      <div className="flex flex-row w-[18rem] h-[5rem] bg-white rounded-xl p-2">
        <div className="felx flex-col">
          <Image
            className="animate-bounce text-white"
            src={chevronUP}
            alt="chev_UP"
            width={20}
            height={20}
          />
          <div className="flex animate-shimmer bg-gradient-custom bg-custom rounded-2xl">
            &nbsp;
          </div>
          <Image
            className=""
            src={chevronDown}
            alt="chev_Down"
            width={20}
            height={20}
          />
        </div>
        <div className="flex ml-[20px] animate-shimmer bg-gradient-custom bg-custom w-[8rem] h-[1.5rem] self-center rounded-2xl"></div>
      </div>
    );
  };
  const handleCommentClick = async () => {
    setIsLoading(true);
    const result = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feedback: inputValue,
      }),
    });
    if (result) {
      setIsLoading(false);
    }
  };

  const handleKeyUP = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      handleCommentClick();
    }
  };

  const handleVote = async (id: number, upDown: string) => {
    let result = await fetch("/api/posts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        upDown: upDown,
        id: id,
      }),
    }).then((data) => data.json());
    if (result) {
    }
  };
  return (
    <div className="m-32 w-[80%] bg-[#D9D9D9] p-10 rounded-md">
      <div className="flex flex-row gap-4 h-[40px]">
        <input
          type="text"
          className="w-[32rem] text-white bg-[#3A3636] rounded-lg pl-2 outli"
          placeholder="Feel Free to leave us a comment"
          onChange={handleOnChange}
          onKeyUp={handleKeyUP}
        />
        <button
          className="hover:bg-white hover:text-black bg-[#3A3636] p-2 rounded-lg"
          onClick={handleCommentClick}
        >
          comment
        </button>
      </div>
      <div className="mt-8 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {isLoading ? (
          <>
            <FeedBackSkeleton></FeedBackSkeleton>
            <FeedBackSkeleton></FeedBackSkeleton>
            <FeedBackSkeleton></FeedBackSkeleton>
            <FeedBackSkeleton></FeedBackSkeleton>
            <FeedBackSkeleton></FeedBackSkeleton>
            <FeedBackSkeleton></FeedBackSkeleton>
          </>
        ) : (
          userFeed.map((value, index) => {
            return (
              <FeedBacks
                id={value.id}
                key={value.id}
                vote={value.vote}
                feedback={value.feedback}
              ></FeedBacks>
            );
          })
        )}
      </div>
    </div>
  );
}
