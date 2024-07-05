"use client";

import { useEffect, useRef, useState } from "react";
import { quotes } from "@/app/quotes";
import Image from "next/image";
import chevLeft from "../../../public/chevron-left.svg";
import chevRight from "../../../public/chevron-right.svg";
import Link from "next/link";

interface Word {
  content: string;
  sentenceIndex: number;
}

interface Letter extends Word {
  wordIndex: number;
  letters: string[];
}
type QUOTE = {
  title: string;
  author: string;
  content: string;
};

export default function Home() {
  const [sentenceCurrent, setSentenceCurrent] = useState(0); //sentence Current position
  const [textValue, setTextValue] = useState(""); //for the print text

  const [quoteNumber, setQuoteNumber] = useState<number>(0);
  const [quote, setQuote] = useState<QUOTE>(quotes[0]);
  const [letterIndex, setLetterIndex] = useState(0);
  useEffect(() => {
    setQuote(quotes[quoteNumber]);
  }, [quoteNumber]);

  //Max legnth should be 45 but consider the space

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const sentences = quote.content.split("\n");

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let targetValue = e.currentTarget.value.split("\n");
    let targetLength = targetValue[sentenceCurrent].length;
    if (targetLength == sentences[sentenceCurrent].length) {
      // setInputCollection((prev: string[]) => {
      //   //다음 index가 없거나, 처음 들어올때
      //   if (prev[sentenceCurrent] == undefined || prev.length == 0) {
      //     return [...prev, targetValue[sentenceCurrent]];
      //   } else {
      //     let newInputCollection: string[] = [...prev];
      //     newInputCollection[sentenceCurrent] = targetValue[sentenceCurrent];
      //     return newInputCollection;
      //   }
      // });
      e.currentTarget.value += "\n";
      if (sentenceCurrent + 1 >= sentences.length) {
        alert("The End");
      }
      setSentenceCurrent((prev) => ++prev);
    }
    setTextValue(e.currentTarget.value);
    setLetterIndex(e.currentTarget.value.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key;
    if (key == " " || key == "Spacebar") {
    }
    if (key == "Backspace") {
      //Prevent From going over empty text area
      if (textValue == "") {
        e.preventDefault();
        return;
      }
      //if the whole length is smaller
      let inputSentence = textValue.split("\n");
      //If current Sentence Have Empty string
      //then Skip to the previous sentence
      if (inputSentence[sentenceCurrent] == "") {
        setTextValue((prev) => {
          return prev.slice(0, -1);
        });
        setSentenceCurrent((prev) => (prev -= 1));
      }
    }
    if (key == "Enter") {
      e.preventDefault();
      alert("You Cannot Skip the line");
    }
  };

  const LetterGenerator = ({
    wordIndex,
    content,
    sentenceIndex,
    letters,
  }: Letter) => {
    if (wordIndex != 0 && content == " ") {
      return <span>&nbsp;</span>;
    }
    let testInput = textValue.split("");
    return (
      <span className="flex flex-col">
        {testInput[wordIndex] && sentenceIndex == sentenceCurrent ? (
          <span className="flex flex-col text-white text-center">
            {testInput[wordIndex]}
          </span>
        ) : (
          <span className="text-[#818181] text-center">{content}</span>
        )}
        {letterIndex == wordIndex && sentenceIndex == sentenceCurrent && (
          <span className=" bg-white animate-blink h-[0.1px]"></span>
        )}
      </span>
    );
  };

  const WordGenerator = ({ content, sentenceIndex }: Word) => {
    //Split into letters
    let letters = content.split("");
    return (
      <div className="flex flex-wrap justify-start items-start gap-[0.06rem]">
        {letters.map((value, index) => {
          //Generate Each Letters
          return (
            <LetterGenerator
              key={index}
              wordIndex={index}
              sentenceIndex={sentenceIndex}
              content={value}
              letters={letters}
            ></LetterGenerator>
          );
        })}
      </div>
    );
  };

  const handleNextClick = () => {
    if (quoteNumber + 1 >= quotes.length) {
      setQuoteNumber(0);
    } else setQuoteNumber((prev) => ++prev);
    setQuote(quotes[quoteNumber]);
  };

  const handlePrevClick = () => {
    if (quoteNumber <= 0) {
      setQuoteNumber(quotes.length - 1);
    } else setQuoteNumber((prev) => --prev);
    setQuote(quotes[quoteNumber]);
  };
  const handlePrintClick = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col items-start w-[50%] m-32">
      <div
        id="print"
        onClick={handlePrintClick}
        className="flex  w-[36rem] h-[13rem] gap-1  p-10"
      >
        <div className="flex flex-wrap">
          <WordGenerator
            key={0}
            content={quote.content}
            sentenceIndex={0}
          ></WordGenerator>
        </div>
        <textarea
          className="absolute -z-10 bg-transparent text-transparent outline-none resize-none  caret-transparent"
          onChange={handleTextArea}
          value={textValue}
          ref={textAreaRef}
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>
      <hr className=" w-[100%] h-[0.75px] bg-white"></hr>
      <div className="flex flex-row gap-4 mt-2 ml-2">
        <button onClick={handlePrevClick}>
          <Image src={chevLeft} alt="chevLeft" width={20} />
        </button>
        <div className="flex flex-col ">
          <div className="flex flex-wrap">
            <div className=" h-[20px]">저자 :</div>
            <div>{quote.author}</div>
          </div>
          <div className="flex flex-wrap">
            <div className=" h-[20px]">제목 :</div>
            <div>{quote.title}</div>
          </div>
        </div>
        <button className="" onClick={handleNextClick}>
          <Image src={chevRight} alt="chevLeft" width={20} />
        </button>
        <div className="ml-12 mt-4 text-white">
          <Link href={"/userfeed"}>Leave Us a feedback===</Link>
        </div>
      </div>
    </div>
  );
}
