"use client";

import { useEffect, useState } from "react";

interface Word {
  content: string;
  sentenceIndex: number;
}

interface Letter extends Word {
  wordIndex: number;
  letters: string[];
}

export default function Home() {
  //Get Session Info
  //For sentence
  const [sentenceCurrent, setSentenceCurrent] = useState(0); //sentence Current position
  const [textValue, setTextValue] = useState(""); //for the print text
  // let inputCollection: string[] = [];
  const [inputCollection, setInputCollection] = useState<string[]>([]);
  const quote = {
    title: "눈물을 마시는 새",
    author: "이영도",
    content:
      "아름다운 나의 벗이여, 내 형제여. 살았을 적 언제나 내 곁에,\n죽은 후엔 영원히 내 속에 남은 이여 다시 돌아온 봄이건만,\n꽃잎 맞으며 그대와 거닐 수 없으니 봄은 왔으되 결코 봄이 아니구나.",
  };

  const sentences = quote.content.split("\n");

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let targetValue = e.currentTarget.value.split("\n");
    let targetLength = targetValue[sentenceCurrent].length;
    if (targetLength == sentences[sentenceCurrent].length) {
      setInputCollection((prev: string[]) => {
        //다음 index가 없거나, 처음 들어올때
        if (prev[sentenceCurrent] == undefined || prev.length == 0) {
          return [...prev, targetValue[sentenceCurrent]];
        } else {
          let newInputCollection: string[] = [...prev];
          newInputCollection[sentenceCurrent] = targetValue[sentenceCurrent];
          return newInputCollection;
        }
      });
      e.currentTarget.value += "\n";
      if (sentenceCurrent + 1 >= sentences.length) {
        alert("The End");
      }
      setSentenceCurrent((prev) => ++prev);
    }
    setTextValue(e.currentTarget.value);
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
    if (sentenceIndex < sentenceCurrent) {
      let previousInputValue = inputCollection[sentenceIndex].split("");
      return previousInputValue[wordIndex] == content ? (
        <span className="text-white">{content}</span>
      ) : (
        <span className="text-red-800">{previousInputValue[wordIndex]}</span>
      );
    }

    let testInput = textValue.split("\n");
    let testInputLetter = testInput[sentenceCurrent].split("");

    return sentenceCurrent == sentenceIndex && testInputLetter[wordIndex] ? (
      testInputLetter[wordIndex] == content ? (
        <span className="text-white">{content}</span>
      ) : testInputLetter[wordIndex] == " " ? (
        <span className="text-red-600">{content}</span>
      ) : (
        <span className="text-red-600">{testInputLetter[wordIndex]}</span>
      )
    ) : (
      <span className="text-[#818181]">{content}</span>
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
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>
      <hr className=" w-[100%] h-[0.75px] bg-white"></hr>
      <div>{quote.author}</div>
      <div>{quote.title}</div>
    </div>
  );
}
