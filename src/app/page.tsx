"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [textValue, setTextValue] = useState("");
  const quote = {
    title: "눈물을 마시는 새",
    author: "이영도",
    content:
      "아름다운 나의 벗이여, 내 형제여. 살았을 적 언제나 내 곁에, 죽은 후엔 영원히 내 속에 남은 이여 다시 돌아온 봄이건만, 꽃잎 맞으며 그대와 거닐 수 없으니 봄은 왔으되 결코 봄이 아니구나.",
  };
  const contents = quote.content.split(" ");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;
    if (key == " " || key == "Spacebar") {
      if (current >= contents.length) {
        setCurrent((prev) => prev++);
        setTextValue("");
      }
    }
  };

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.currentTarget.value);
    // let result = compare(e.currentTarget.value, contents[current]);
  };

  // const compare = (inputValue: string, contentValue: string) => {
  //   if (inputValue == contentValue) {
  //     //success
  //   }
  // };
  console.log(current, textValue);

  return (
    <div
      id="print"
      className="flex bg-[ rgb(255, 255, 255)] w-[32rem]"
      onKeyDown={handleKeyDown}
    >
      {/* {contents.map((value, index) => {
        return (
          <span className="text-[#818181]" key={index}>
            {value}
          </span>
        );
      })} */}
      <div className="text-[#818181]">{quote.content}</div>
      <textarea
        className="absolute bg-transparent text-white w-[32rem]"
        onChange={handleTextArea}
        value={textValue}
      ></textarea>
    </div>
  );
}
