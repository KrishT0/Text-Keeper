"use client";

import { useState, useEffect } from "react";
import { useCompletion } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Geist_Mono } from "next/font/google";
import { CircleX } from "lucide-react";
import { checkUserAccess } from "@/app/text/action";

const geistMono = Geist_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

function AIModal({ aiCloseModal }: { aiCloseModal: () => void }) {
  const [userQuery, setUserQuery] = useState("");
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [accessMessage, setAccessMessage] = useState("");

  const { completion, complete } = useCompletion({
    api: "/api/ai",
  });

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const result = await checkUserAccess();
        setHasAccess(result.hasAccess);
        setAccessMessage(result.message || "");

        if (!result.hasAccess) {
        }
      } catch (error) {
        console.error("Access check failed:", error);
        setHasAccess(false);
        setAccessMessage("Error checking access");
      }
    };

    verifyAccess();
  }, []);

  if (hasAccess === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#000000a9] z-50">
        <div className="bg-[#1f2121bb] mx-2 backdrop-blur-sm border-2 w-[700px] h-[200px] rounded-lg p-6 flex items-center justify-center">
          <p className="text-[#949592]">Checking access...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#000000a9] z-50">
        <div className="bg-[#1f2121bb] mx-2 backdrop-blur-sm border-2 w-[700px] h-[200px] rounded-lg p-6 relative">
          <button
            className="absolute cursor-pointer top-8 right-8 text-[#949592] hover:text-[#c0c1bd]"
            onClick={aiCloseModal}
            aria-label="Close"
          >
            <CircleX size={20} />
          </button>
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-[#ff6b6b] text-lg mb-2">Access Denied</p>
            <p className="text-[#949592]">
              {accessMessage ||
                "You don't have permission to use this feature."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000a9] z-50">
      <div className="bg-[#1f2121bb] mx-2 backdrop-blur-sm border-2 w-[700px] h-[calc(100vh-100px)] rounded-lg p-6 relative">
        <button
          className="absolute cursor-pointer top-8 right-8 text-[#949592] hover:text-[#c0c1bd]"
          onClick={aiCloseModal}
          aria-label="Close"
        >
          <CircleX size={20} />
        </button>
        <h4 className="sm:text-lg font-semibold mb-4 text-[#949592]">
          AI Assistant
        </h4>
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            id="user-query"
            placeholder="Enter your prompt..."
            className="w-full p-2 mb-4 text-sm rounded bg-[#2D2F2F] text-[#C5C8C6] focus:outline-none"
            value={userQuery}
            autoComplete="off"
            onChange={(e) => setUserQuery(e.target.value)}
          />
          <button
            className="px-3 text-sm h-9 cursor-pointer py-1 bg-[#2D2F2F] text-[#C5C8C6] rounded hover:bg-[#505252]"
            onClick={async () => {
              await complete(userQuery);
              setUserQuery("");
            }}
          >
            Send
          </button>
        </div>
        <p
          className={`bg-[#2D2F2F] rounded-md text-xs p-2 ${geistMono.className} text-[#C5C8C6] h-[calc(100vh-266px)] overflow-y-auto`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ node, ...props }) => (
                <table
                  className="border-collapse w-full my-4 border border-gray-600"
                  {...props}
                />
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-[#1e1e1e]" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th
                  className="border border-gray-600 px-3 py-2 text-left font-semibold"
                  {...props}
                />
              ),
              td: ({ node, ...props }) => (
                <td className="border border-gray-600 px-3 py-2" {...props} />
              ),
              tr: ({ node, ...props }) => (
                <tr
                  className="hover:bg-[#3a3a3a] transition-colors"
                  {...props}
                />
              ),
              h1: ({ node, ...props }) => (
                <h1 className="text-2xl font-bold my-4" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-xl font-bold my-4" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-lg font-bold my-4" {...props} />
              ),
            }}
          >
            {completion}
          </ReactMarkdown>
        </p>
      </div>
    </div>
  );
}

export default AIModal;
