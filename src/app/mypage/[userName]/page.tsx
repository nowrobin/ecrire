"use client";

import { createClient } from "@/app/utils/supabase/client";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type QUOTE = {
  index: number;
  title: string;
  author: string;
  content: string[];
};
export default function UploadQuote({
  params,
}: {
  params: { userName: string };
}) {
  const [user, setUser] = useState<string>(params.userName);
  const [id, setId] = useState<any>();
  const [section, setSection] = useState(0);
  const [state, setState] = useState();
  const [uploadList, setUploadList] = useState([]);
  const [likedList, setLikeList] = useState([]);
  const [completeList, setCompleteList] = useState([]);

  useEffect(() => {
    fetch("/api/quoteList")
      .then((data) => data.json())
      .then((res) => {
        setState(res.data);
        setCompleteList(res.data.Quote_Quote_completed_UserIdToUser);
        setLikeList(res.data.Quote_Quote_liked_userIdToUser);
        setUploadList(res.data.upLoaded_Posts);
      });
  }, []);
  const handleSectionClick = (btn: string) => {
    if (btn == "upload") {
      setSection(0);
    } else if (btn == "liked") {
      setSection(1);
    } else if (btn == "completed") {
      setSection(2);
    }
  };
  const router = useRouter();
  const handleQuoteClick = (index: number) => {
    router.push(`/${index}`);
  };

  const QuoteItemSection = ({ index, title, content, author }: QUOTE) => {
    return (
      <div
        className="bg-slate-600 w-[32rem]"
        onClick={() => handleQuoteClick(index)}
      >
        <div className="flex flex-row gap-10">
          <div>{author}</div>
          <div>{title}</div>
        </div>
        <div className="truncate">{content.join("")}</div>
        <div></div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-10 w-screen text-black m-20">
      <div className="flex flex-row gap-10">
        <button
          autoFocus
          className="focus:underline focus:underline-offset-6"
          onClick={() => handleSectionClick("upload")}
        >
          업로드한 글
        </button>
        <button
          className="focus:underline"
          onClick={() => handleSectionClick("liked")}
        >
          좋아요 누른 글
        </button>
        <button
          className="focus:underline"
          onClick={() => handleSectionClick("completed")}
        >
          필사 완료한 글
        </button>
      </div>
      {section == 0 ? (
        <section>
          <div>업로드한 글</div>
          <div className="flex flex-col gap-4">
            {uploadList && uploadList.length != 0 ? (
              uploadList.map((value: QUOTE, index) => (
                <QuoteItemSection
                  key={index}
                  index={index + 1}
                  title={value.title}
                  content={value.content}
                  author={value.author}
                ></QuoteItemSection>
              ))
            ) : (
              <div className="flex flex-col">
                NOTHING
                <Link
                  href="/quote-upload"
                  className="text-red-500  underline underline-offset-4"
                >
                  Go Upload your first Quote
                </Link>
              </div>
            )}
          </div>
        </section>
      ) : section == 1 ? (
        <section>
          <div>좋아요 누른 글</div>

          {likedList && likedList.length != 0 ? (
            likedList.map((value: QUOTE, index) => (
              <QuoteItemSection
                key={index}
                index={index + 1}
                title={value.title}
                content={value.content}
                author={value.author}
              ></QuoteItemSection>
            ))
          ) : (
            <div className="flex flex-col">
              NOTHING
              <Link
                href="/quote-list"
                className="text-red-500  underline underline-offset-4"
              >
                Go Like a quote
              </Link>
            </div>
          )}
        </section>
      ) : (
        <section>
          <div>완료한 글</div>
          {completeList && completeList.length != 0 ? (
            completeList.map((value: QUOTE, index) => (
              <QuoteItemSection
                key={index}
                index={index + 1}
                title={value.title}
                content={value.content}
                author={value.author}
              ></QuoteItemSection>
            ))
          ) : (
            <div className="flex flex-col">
              NOTHING
              <Link
                href="/"
                className="text-red-500  underline underline-offset-4"
              >
                Go complete a quote
              </Link>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
