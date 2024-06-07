"use client";

import { useState } from "react";

interface Word {
  content: string;
  sentenceIndex: number;
}

interface Letter extends Word {
  wordIndex: number;
  letters: string[];
}

export default function Home() {
  const [wordCurrent, setWordCurrent] = useState(0); // word current

  const [letterCurrent, setLetterCurrent] = useState(0);

  //For sentence
  const [sentenceCurrent, setSentenceCurrent] = useState(0); //sentence Current position
  const [textValueC, setTextValueC] = useState(""); // for textArea value

  const [textValue, setTextValue] = useState(""); //for the print text
  const [inputValue, setInputValue] = useState<string[]>([]);
  const [compare, setCompare] = useState(false);
  const quote = {
    title: "눈물을 마시는 새",
    author: "이영도",
    content:
      "아름다운 나의 벗이여, 내 형제여. 살았을 적 언제나 내 곁에,\n죽은 후엔 영원히 내 속에 남은 이여 다시 돌아온 봄이건만,\n꽃잎 맞으며 그대와 거닐 수 없으니 봄은 왔으되 결코 봄이 아니구나.",
  };

  const sentences = quote.content.split("\n");

  const contents = quote.content.split(" ");

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newLine = "";
    let targetValue = e.currentTarget.value;
    let targetLegnth = targetValue.length;
    if (sentenceCurrent !== 0) {
      targetLegnth += sentences[sentenceCurrent].length;
      if (targetLegnth == sentences[sentenceCurrent].length) {
        e.currentTarget.value += "\n";
        setSentenceCurrent((prev) => ++prev);
      }
    } else if (targetLegnth == sentences[sentenceCurrent].length) {
      e.currentTarget.value += "\n";
      setSentenceCurrent((prev) => ++prev);
    }
    // //Compare the length
    // if (targetLegnth == sentences[sentenceCurrent].length) {
    //   setLetterCurrent(0);
    //   setSentenceCurrent((prev: number) => ++prev);
    //   setTextValue("");
    // }
    //or
    // if (targetValue == sentences[sentenceCurrent]) {
    //   setLetterCurrent(0);
    //   setSentenceCurrent((prev: number) => ++prev);
    //   setTextValue("");
    // } else {

    setLetterCurrent(targetValue.length);
    setTextValue(e.currentTarget.value);
    //}
    //if there is newline than clear it out
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key;
    if (key == " " || key == "Spacebar") {
      setWordCurrent((prev) => ++prev);
      setInputValue((prev) => [...prev, textValue.trim()]);
    }
  };

  const LetterGenerator = ({
    wordIndex,
    content,
    sentenceIndex,
    letters,
  }: Letter) => {
    //Quote in letters
    //User Input Value in lettters
    let inputletter = textValue.split("");
    let contentLetter = content.split("");
    console.log(inputletter);
    console.log(content, wordIndex);
    //.filter((value) => value != " ");

    // if(inputletter[wordIndex] && inputletter[wordIndex])
    return (
      <div>
        {contentLetter.map((value, letterIndex) => {
          if (value == " ") {
            return <span key={letterIndex}>&nbsp;</span>;
          }
          return sentenceCurrent == sentenceIndex ? (
            inputletter[wordIndex] ? (
              inputletter[wordIndex] == content ? (
                <span key={letterIndex} className="text-white">
                  {value}
                </span>
              ) : (
                <span key={letterIndex} className="text-red-600">
                  {inputletter[wordIndex]}
                </span>
              )
            ) : (
              <span key={letterIndex} className="text-[#818181]">
                {value}
              </span>
            )
          ) : (
            <span key={letterIndex} className="text-[#818181]">
              {value}
            </span>
          );
        })}
      </div>
    );
  };
  const WordGenerator = ({ content, sentenceIndex }: Word) => {
    //Split into letters
    let letters = content.split("");
    return (
      <div className="flex flex-row gap-[0.06rem]">
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

  return (
    <div className="flex flex-col items-start w-[50%] m-32">
      <div id="print" className="flex  w-[36rem] h-[13rem] gap-1  p-10">
        <div className="flex flex-col">
          {sentences.map((value, index) => {
            return (
              //Each Word generate
              <WordGenerator
                key={index}
                content={value}
                sentenceIndex={index}
              ></WordGenerator>
            );
          })}
        </div>
        <textarea
          className="absolute top-[8rem] left-[8rem] bg-transparent text-transparent w-[36rem] h-[13rem] focus:outline-none p-10 resize-none caret-white tracking-[0.06rem]"
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
