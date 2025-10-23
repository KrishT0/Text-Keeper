"use client";

import { useState, useEffect, useRef } from "react";
import { Geist_Mono } from "next/font/google";
import { Copy, FileJson, Undo2, RemoveFormatting } from "lucide-react";
import { toast } from "sonner";

const geistMono = Geist_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

function JsonPage() {
  const [text, setText] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onClickCopy = () => {
    if (text.trim() === "") {
      toast.error("No text to copy");
      return;
    }
    navigator.clipboard.writeText(text);
    toast("Text copied to clipboard");
  };

  const onClickFormat = () => {
    if (text.trim() === "") {
      toast.error("No text to copy");
      return;
    }
    try {
      const formatted = JSON.stringify(JSON.parse(text), null, 2);
      setText(formatted);
      toast("JSON formatted successfully");
    } catch (error) {
      toast.error("Invalid JSON");
    }
  };

  const onClickRemoveFormatting = () => {
    if (text.trim() === "") {
      toast.error("No text to copy");
      return;
    }
    try {
      const unformatted = JSON.stringify(JSON.parse(text));
      setText(unformatted);
      toast("JSON formatting removed successfully");
    } catch (error) {
      toast.error("Invalid JSON");
    }
  };

  return (
    <div className="bg-[#1F2121] rounded-md">
      <div className="flex justify-between pb-0">
        <p
          className={`${geistMono.className} bg-[#2D2F2F] p-1 rounded-tl-md rounded-br-md font-semibold text-xs text-[#949592]`}
        >
          JSON
        </p>
        <div className="flex">
          {text.trim() !== "" && (
            <>
              <Undo2
                onClick={() => setText("")}
                className="h-4 m-1 hover:text-[#c0c1bd] cursor-pointer text-[#949592]"
              />
              <RemoveFormatting
                onClick={onClickRemoveFormatting}
                className="h-4 m-1 hover:text-[#c0c1bd] cursor-pointer text-[#949592]"
              />
            </>
          )}
          <FileJson
            onClick={onClickFormat}
            className="h-4 m-1 hover:text-[#c0c1bd] cursor-pointer text-[#949592]"
          />
          <Copy
            onClick={onClickCopy}
            className="h-4 m-1 hover:text-[#c0c1bd] cursor-pointer text-[#949592]"
          />
        </div>
      </div>
      <textarea
        id="json-text"
        ref={textRef}
        value={text}
        onChange={handleTextChange}
        placeholder="Enter or paste your JSON here"
        className={`${geistMono.className} bg-[#1F2121] p-4 h-[200px] rounded-md w-full font-medium whitespace-pre-wrap break-words text-xs text-[#C5C8C6] resize-none overflow-hidden focus:outline-none`}
      ></textarea>
    </div>
  );
}

export default JsonPage;
