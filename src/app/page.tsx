"use client";

import { Span } from "next/dist/trace";
import Image from "next/image";
import { useState } from "react";

interface Print {
  content: string;
  wordIndex: number;
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [textValue, setTextValue] = useState("");
  const [inputValue, setInputValue] = useState<string[]>([]);
  const quote = {
    title: "눈물을 마시는 새",
    author: "이영도",
    content:
      "아름다운 나의 벗이여, 내 형제여. 살았을 적 언제나 내 곁에, 죽은 후엔 영원히 내 속에 남은 이여 다시 돌아온 봄이건만, 꽃잎 맞으며 그대와 거닐 수 없으니 봄은 왔으되 결코 봄이 아니구나.",
  };

  const contents = quote.content.split(" ");

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.currentTarget.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key;
    if (key == " " || key == "Spacebar") {
      setCurrent((prev) => ++prev);
      setInputValue((prev) => [...prev, textValue.trim()]);
      setTextValue("");
    }
  };

  const PrintGenerator = ({ wordIndex, content }: Print) => {
    let contentletter = content.split("");
    let letter = textValue.split("");

    return (
      <span className="flex flex-row w-[32rem] h-[10rem]">
        {contentletter.map((value, letterIndex) => {
          if (content == inputValue[wordIndex]) {
            return (
              <span key={letterIndex} className="text-white">
                {value}
              </span>
            );
          } else {
            return current == wordIndex && letter[letterIndex] ? (
              <span key={letterIndex} className="text-white">
                {letter[letterIndex]}
              </span>
            ) : (
              <span key={letterIndex} className="text-[#818181]">
                {value}
              </span>
            );
          }
        })}
      </span>
    );
  };

  return (
    <div className="flex flex-col items-start w-[50%] m-32">
      <div id="print" className="flex bg-[ rgb(255, 255, 255)] w-[30rem] gap-1">
        {contents.map((value, index) => {
          return (
            <PrintGenerator
              key={index}
              wordIndex={index}
              content={value}
            ></PrintGenerator>
          );
        })}
        <textarea
          className="absolute  bg-transparent text-transparent w-[32rem] focus:outline-none resize-none"
          onChange={handleTextArea}
          value={textValue}
          onKeyUp={handleKeyDown}
        ></textarea>
      </div>
      <hr className=" w-[100%] h-[0.75px] bg-white"></hr>
      <div>{quote.author}</div>
      <div>{quote.title}</div>
    </div>
  );
}
