"use client";

import { Sparkles, X } from "lucide-react";
import { useState } from "react";

type TocItem = {
  header: string;
  note: string;
  id: string;
};

type TableOfContentsProps = {
  items: TocItem[];
};

export default function AIChat({ items }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responses, setResponses] = useState<string>("");

  const callAiApi = async (note: string) => {
    setIsLoading(true);
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note }),
    });

    if (!response.body) {
      setResponses("No response body.");
      setIsLoading(false);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        setResponses(result);
      }
    } catch (err) {
      setResponses(`Failed to generate response. ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* AI summary Panel */}
      <div
        className={`fixed max-h-[50vh] w-[320px] bottom-32 border-2 border-[#2D2F2F] right-6 scrollbar-hide bg-[#1F2121] overflow-y-auto rounded-lg shadow-lg transition-all duration-300 ease-in-out z-40 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="p-1 px-2 duration-300 transition-all ease-in-out">
          <h3 className="font-medium">Brief</h3>
          <p className="text-xs text-[#949592] font-medium mb-2">
            Select a note to view summary
          </p>

          <div className="mt-3 flex gap-1 flex-wrap max-h-[calc(70vh-60px)] overflow-y-auto scrollbar-hide">
            {items.map((item) => (
              <button
                key={item.id}
                disabled={isLoading}
                className={`text-xs text-black w-fit rounded-md px-2 bg-white duration-150 mb-2 
          ${
            isLoading
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-gray-200"
          }`}
                onClick={() => !isLoading && callAiApi(item.note)}
              >
                {item.header}
              </button>
            ))}
          </div>

          <div
            className={`text-[#949592] mb-1 text-xs bg-[#2D2F2F] rounded-md overflow-y-scroll scrollbar-hide transition-all duration-300 ease-in-out ${
              isLoading || responses
                ? "mt-2 p-2 max-h-48 opacity-100"
                : "max-h-0 opacity-0 p-0 m-0"
            }`}
          >
            {isLoading ? (
              <p key="loading" className="animate-pulse">
                Generating summary...
              </p>
            ) : (
              <p key="loaded" className="animate-fade-in duration-300">
                {responses}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setResponses("");
        }}
        className="fixed bottom-20 border border-[#949592] cursor-pointer right-6 bg-[#1F2121] hover:bg-[#2D2F2F] text-white rounded-full p-3 shadow-lg transition-all duration-200 z-40"
        aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
      >
        {isOpen ? <X size={15} /> : <Sparkles size={15} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-[#000000a9] bg-opacity-20 z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
