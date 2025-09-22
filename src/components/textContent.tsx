"use client";

import React from "react";
import { Geist_Mono } from "next/font/google";
import { Copy } from "lucide-react";

const geistMono = Geist_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});

type TextContentPropsType = {
  heading: string;
  text: string;
};

function TextContent({ heading, text }: TextContentPropsType) {
  const onClickCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="pb-5">
      <h3 className="text-xl font-semibold">{heading}</h3>
      <hr className="mt-1 mb-3 text-[#f5f5f51f]" />
      <div className="bg-[#1F2121] rounded-md">
        <div className="flex justify-between pb-0">
          <p
            className={`${geistMono.className} bg-[#2D2F2F] p-1 rounded-tl-md rounded-br-md font-semibold text-xs text-[#949592]`}
          >
            text
          </p>
          <Copy
            className="h-4 m-1 cursor-pointer text-[#949592]"
            onClick={onClickCopy}
          />
        </div>
        <pre
          className={`${geistMono.className} p-4 whitespace-pre-wrap text-xs text-[#C5C8C6]`}
        >
          {`${text}`}
        </pre>
      </div>
    </div>
  );
}

export default TextContent;
