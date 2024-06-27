"use client";

import { useState } from "react";

export default function Test() {
  const s =
    "Intelligence is the capacity to perceive the essential, the what is; and to awaken this capacity, in oneself and in others, is education.";
  //Divide by words
  const space = "\u00A0";
  const words = s.split(" ");
  const [current, setCurrent] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;
    if (key == " " || key == "Spacebar") {
      console.log(key);
    }
  };

  return (
    <div>
      <div
        className="bg-white text-black"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {words.map((k, v) => {
          return (
            <span key={v}>
              <span>{k}</span>
              {space}
            </span>
          );
        })}
      </div>
    </div>
  );
}
