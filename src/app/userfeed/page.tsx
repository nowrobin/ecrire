"use client";

import { useEffect, useState } from "react";

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
      <div className="flex flex-row">
        <div className="felx flex-col">
          <button>u</button>
          <div>{votes}</div>
          <button>d</button>
        </div>
        <div>{feedback}</div>
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

  return (
    <div className="m-32">
      <div className="flex flex-row gap-4">
        <input
          type="text"
          className="w-[32rem] text-black"
          placeholder="Feel Free to leave us a comment"
          onChange={handleOnChange}
        />
        <button
          className="hover:bg-white hover:text-black "
          onClick={handleCommentClick}
        >
          comment
        </button>
      </div>
      <div className="flex flex-col gap-5">
        {userFeed.map((value, index) => {
          return (
            <FeedBacks
              key={index}
              upvote={value.upvote}
              downvote={value.downvote}
              feedback={value.feedback}
            ></FeedBacks>
          );
        })}
      </div>
    </div>
  );
}
