"use client";

import { useEffect, useRef, useState } from "react";
import { quotes } from "@/app/quotes";
import Image from "next/image";
import chevLeft from "../../../public/chev-left.svg";
import chevRight from "../../../public/chev-right.svg";
import shareIcon from "../../../public/share.svg";
import bookmarkIcon from "../../../public/bookmark.png";
import Link from "next/link";

interface Word {
  content: string;
  sentenceIndex: number;
}

interface Letter extends Word {
  wordIndex: number;
}
type QUOTE = {
  title: string;
  author: string;
  content: string;
};

export default function Home() {
  const [textValue, setTextValue] = useState(""); //for the print text
  const [quoteNumber, setQuoteNumber] = useState<number>(0);
  const [quote, setQuote] = useState<QUOTE>(quotes[0]);
  const [letterIndex, setLetterIndex] = useState(0);
  useEffect(() => {
    setQuote(quotes[quoteNumber]);
  }, [quoteNumber]);

  let arr = [];
  let a = quote.content.split(" ");
  let x = 0; //sentence index
  let lengthCount = 0;
  let max = 30;
  let subArr = [];
  for (let i in a) {
    let checkLength = (lengthCount += a[i].length);
    if (checkLength >= max) {
      arr.push(subArr.join(" "));
      subArr = [];
      lengthCount = 0;
      x += 1;
    }
    subArr.push(a[i]);
    lengthCount += a[i].length;
  }

  arr.push(subArr.join(" "));
  console.log(quote.content);
  console.log(arr);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.currentTarget.value);
    setLetterIndex(e.currentTarget.value.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key;
    if (letterIndex == quote.content.length) {
      alert("End");
    }
    if (key == " " || key == "Spacebar") {
    }
    if (key == "Backspace") {
      if (textValue == "") {
        e.preventDefault();
        return;
      }
    }
    if (key == "Enter") {
      e.preventDefault();
      alert("You Cannot Skip the line");
    }
  };

  const handleNextClick = () => {
    if (quoteNumber + 1 >= quotes.length) {
      setQuoteNumber(0);
    } else setQuoteNumber((prev) => ++prev);
    setQuote(quotes[quoteNumber]);
    setTextValue("");
  };

  const handlePrevClick = () => {
    if (quoteNumber <= 0) {
      setQuoteNumber(quotes.length - 1);
    } else setQuoteNumber((prev) => --prev);
    setQuote(quotes[quoteNumber]);
    setTextValue("");
  };

  const handlePrintClick = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const LetterGenerator = ({ wordIndex, content, sentenceIndex }: Letter) => {
    if (wordIndex != 0 && content == " ") {
      return <span className="text-[2rem]">&nbsp;</span>;
    }
    let testInput = textValue.split("");
    for (let i = 0; i < sentenceIndex; i++) {
      wordIndex += arr[i].length;
    }
    return (
      <span className="flex flex-col font-hehmlet">
        {testInput[wordIndex] ? (
          testInput[wordIndex] != content && wordIndex !== letterIndex ? (
            testInput[wordIndex] == " " ? (
              <span className="text-red-500 text-center text-[2rem]">
                {content}
              </span>
            ) : (
              <span className="text-red-500 text-center text-[2rem]">
                {testInput[wordIndex]}
              </span>
            )
          ) : (
            <span className="text-black text-center text-[2rem]">
              {content}
            </span>
          )
        ) : (
          <span className="text-[#818181] text-center text-[2rem]">
            {content}
          </span>
        )}
        {letterIndex == wordIndex && (
          <span className=" bg-black animate-blink h-[1px] text-[2rem]"></span>
        )}
      </span>
    );
  };

  const WordGenerator = ({ content, sentenceIndex }: Word) => {
    let letters = content.split("");

    return (
      <div className="flex justify-start items-start gap-[0.06rem]">
        {letters.map((value, index) => {
          return (
            <LetterGenerator
              key={index}
              wordIndex={index}
              sentenceIndex={sentenceIndex}
              content={value}
            ></LetterGenerator>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-row  w-scren h-screen text-black bg-background">
      <div className="flex flex-col ml-[7.32rem] mt-[3.5rem] gap-[15px]">
        <div className="text-[40px] font-merriweather font-bold">Ecrire</div>
        <Link
          href="/"
          className="mt-[1rem] text-[20px] font-normal font-poppin underline underline-offset-2"
        >
          Main Cotent
        </Link>
        <Link
          href="/"
          className="text-[20px] font-normal font-poppin underline underline-offset-2"
        >
          Quote List
        </Link>
        <Link
          href="/"
          className="text-[20px] font-normal font-poppin underline underline-offset-2"
        >
          Login
        </Link>
        <Link
          href="/"
          className="text-[20px] font-normal font-poppin underline underline-offset-2"
        >
          Sign Up
        </Link>
        <Link
          href="/"
          className="text-[20px] mt-[30px] text-[#5D5D5D] font-normal font-poppin underline underline-offset-2"
        >
          Leave us feedback...
        </Link>
      </div>
      <div className="flex flex-col items-start ml-[16rem] mt-[6rem]">
        <div className="flex flex-row gap-4 ">
          <button onClick={handlePrevClick}>
            <Image src={chevLeft} alt="chevLeft" width={32} />
          </button>
          <div className="flex flex-col ">
            <div className="flex flex-wrap text-[1.25rem] text-[#5D5D5D]">
              {quote.author} | {quote.title}
            </div>
          </div>
          <button className="" onClick={handleNextClick}>
            <Image src={chevRight} alt="chevLeft" width={32} />
          </button>
          <button className="ml-[16rem]">
            <Image src={bookmarkIcon} alt="bookmark" width={32} />
          </button>
          <button className="">
            <Image src={shareIcon} alt="share" width={32} />
          </button>
        </div>
        <div
          id="print"
          onClick={handlePrintClick}
          className="flex flex-col w-[40rem] h-[13rem] gap-1"
        >
          <div className="flex flex-col font-hehmlet mt-[3rem]">
            {arr.map((value, index) => {
              return (
                <WordGenerator
                  key={index}
                  content={value}
                  sentenceIndex={index}
                ></WordGenerator>
              );
            })}
          </div>
          <textarea
            className="absolute -z-10 bg-transparent text-transparent outline-none resize-none  caret-transparent"
            onChange={handleTextArea}
            value={textValue}
            ref={textAreaRef}
            onKeyDown={handleKeyDown}
            spellCheck="false"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="flex flex-wrap font-hehmlet mt-[3rem]">
            <WordGenerator
              key={0}
              content={quote.content}
              sentenceIndex={0}
            ></WordGenerator>
          </div> */
}
