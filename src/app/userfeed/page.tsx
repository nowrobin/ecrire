"use client";

import { useState } from "react";

interface FeedBackDetail {
  upvote: number;
  downvote: number;
  feedback: string;
}

export default function UserFeedback() {
  const [inputValue, setInputValue] = useState("");
  // const [userFeed, setUserFeed] = useState<FeedBackDetail[]>([]);
  const mockFeed = [
    { upvote: 1, downvote: 3, feedback: "디자인이 별로에요" },
    { upvote: 1, downvote: 3, feedback: "디자인이 별로에요" },
    { upvote: 1, downvote: 3, feedback: "디자인이 별로에요" },
    { upvote: 1, downvote: 3, feedback: "디자인이 별로에요" },
    { upvote: 1, downvote: 3, feedback: "디자인이 별로에요" },
  ];
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };
  const FeedBacks = ({ upvote, downvote, feedback }: FeedBackDetail) => {
    return (
      <div className="flex flex-row">
        <div className="felx flex-col">
          <button></button>
          <button></button>
        </div>
        <div>{feedback}</div>
      </div>
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Feel Free to leave us a comment"
        onChange={handleOnChange}
      />
      <div>
        {mockFeed.map((value, index) => {
          return <></>;
        })}
      </div>
    </div>
  );
}
