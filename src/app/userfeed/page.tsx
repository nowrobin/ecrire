"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import chevronUP from "../../../public/chevron-up.svg";
import chevronDown from "../../../public/chevron-down.svg";
import Image from "next/image";

interface FeedBackDetail {
  upvote: number;
  downvote: number;
  feedback: string;
}

export default function UserFeedback() {
  const [inputValue, setInputValue] = useState("");
  const [userFeed, setUserFeed] = useState<FeedBackDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const posts = fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setUserFeed(data.data));
  }, [isLoading]);

  const mockFeed = [
    { upvote: 1, downvote: 3, feedback: "디자인이 별로에요" },
    { upvote: 1, downvote: 3, feedback: "디자인이 별로에요" },
    { upvote: 1, downvote: 3, feedback: "디자인이 별로에요" },
    { upvote: 1, downvote: 3, feedback: "디자인이 별로에요" },
    { upvote: 1, downvote: 3, feedback: "디자인이 별로에요" },
  ];

  console.log(userFeed);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };
  const FeedBacks = ({ upvote, downvote, feedback }: FeedBackDetail) => {
    const votes = upvote - downvote;
    return (
      <div className="flex flex-row text-black bg-white w-[20rem]">
        <div className="felx flex-col">
          <button>
            <Image src={chevronUP} alt="chev_UP" width={20} height={20} />
          </button>
          <div>{votes}</div>
          <button>
            <Image src={chevronDown} alt="chev_DOWN" width={20} height={20} />
          </button>
        </div>
        <div>{feedback}</div>
      </div>
    );
  };
  const FeedBackSkeleton = () => {
    return (
      <div className="flex flex-row w-[20rem] bg-white">
        <div className="felx flex-col">
          <Image
            className="animate-bounce text-white"
            src={chevronUP}
            alt="chev_UP"
            width={20}
            height={20}
          />
          <div className=""></div>
          <Image
            className="animate-bounce"
            src={chevronDown}
            alt="chev_Down"
            width={20}
            height={20}
          />
        </div>
        <div className=" animate-shimmer bg-gradient-custom bg-custom"></div>
      </div>
    );
  };
  const handleCommentClick = () => {
    setIsLoading(true);
    const result = fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feedback: inputValue,
      }),
    }).then(() => setIsLoading(false));
  };

  const handleKeyUP = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      handleCommentClick();
    }
  };

  return (
    <div className="m-32 w-[80%] bg-[#D9D9D9] p-10">
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
      <div className="mt-8 grid grid-cols-2 gap-4">
        {userFeed.map((value, index) => {
          return isLoading ? (
            <div></div>
          ) : (
            <FeedBacks
              key={index}
              upvote={value.upvote}
              downvote={value.downvote}
              feedback={value.feedback}
            ></FeedBacks>
          );
        })}
      </div>
      <FeedBackSkeleton></FeedBackSkeleton>
    </div>
  );
}
