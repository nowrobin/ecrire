"use client";

import { useEffect, useRef, useState } from "react";
import { quotes } from "@/app/quotes";
import Image from "next/image";
import chevLeft from "../../../public/chev-left.svg";
import chevRight from "../../../public/chev-right.svg";
import shareIcon from "../../../public/share.svg";
import bookmarkIcon from "../../../public/bookmark.png";
import Link from "next/link";
import { createClient } from "../utils/supabase/client";
import { usePathname, useRouter } from "next/navigation";

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
  content: string[];
};

export default function QuotePage() {
  const [textValue, setTextValue] = useState(""); //for the print text
  const pathname = usePathname();
  const [quoteNumber, setQuoteNumber] = useState<number>(
    parseInt(pathname.slice(1))
  );
  const [quote, setQuote] = useState<QUOTE>({
    title: " ",
    author: "",
    content: ["", ""],
  });
  const [isLoading, setIsloading] = useState(false);
  const [letterIndex, setLetterIndex] = useState(0);
  const [quoteLength, setQuoteLength] = useState(0);
  const [user, setUser] = useState("");
  useEffect(() => {
    setIsloading(true);
    fetch(`/api/quote/${quoteNumber}`)
      .then((res) => res.json())
      .then((data) => {
        const { title, author, content } = data.data;
        setQuote({ title: title, author: author, content: content });
        setQuoteLength(content.join("").length);
        setIsloading(false);
      });

    async function getUserData() {
      const supabase = createClient();
      await supabase.auth.getUser().then((value) => {
        if (value.data.user) {
          setUser(value.data.user.user_metadata.full_name);
        }
      });
    }
    getUserData();
  }, [quoteNumber]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.currentTarget.value);
    setLetterIndex(e.currentTarget.value.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key;
    if (letterIndex == quoteLength) {
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
    // setQuote(quotes[quoteNumber]);
    setTextValue("");
  };

  const handlePrevClick = () => {
    if (quoteNumber <= 0) {
      setQuoteNumber(quotes.length - 1);
    } else setQuoteNumber((prev) => --prev);
    // setQuote(quotes[quoteNumber]);
    setTextValue("");
  };

  const handlePrintClick = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const handleLikeButton = () => {
    // const res = fetch("/api/quote", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     userId: user.id,
    //     quoteId: quote.id,
    //   }),
    // }).then((response) => console.log(response));
  };

  const LetterGenerator = ({ wordIndex, content, sentenceIndex }: Letter) => {
    if (wordIndex != 0 && content == " ") {
      return <span className="text-[2rem]">&nbsp;</span>;
    }
    let testInput = textValue.split("");
    for (let i = 0; i < sentenceIndex; i++) {
      wordIndex += quote!.content[i].length;
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
        {user == "" ? (
          <>
            <Link
              href="/login"
              className="text-[20px] font-normal font-poppin underline underline-offset-2"
            >
              Login
            </Link>
            <Link
              href="/"
              className="text-[20px] font-normal font-poppin underline underline-offset-2"
            >
              Sign Up
            </Link>{" "}
          </>
        ) : (
          <Link
            href={`/mypage/${user}`}
            className="text-[20px] font-normal font-poppin underline underline-offset-2"
          >
            My page
          </Link>
        )}
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
              {quote!.author} | {quote!.title}
            </div>
          </div>
          <button className="" onClick={handleNextClick}>
            <Image src={chevRight} alt="chevLeft" width={32} />
          </button>
          <button className="ml-[16rem]" onClick={handleLikeButton}>
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
            {quote!.content?.map((value, index) => {
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
