import React from "react";
import { Geist_Mono } from "next/font/google";
import { Copy } from "lucide-react";

const geistMono = Geist_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});

function TextPage() {
  return (
    <div>
      <div>
        <h3 className="text-xl font-semibold">Heading</h3>
        <hr className="mt-1 mb-3 text-[#f5f5f51f]" />
        <div className="bg-[#1F2121] rounded-md">
          <div className="flex justify-between pb-0">
            <p
              className={`${geistMono.className} bg-[#2D2F2F] p-1 rounded-tl-md rounded-br-md font-semibold text-xs text-[#949592]`}
            >
              text
            </p>
            <Copy className="h-4 m-1 cursor-pointer text-[#949592]" />
          </div>
          <pre
            className={`${geistMono.className} p-4 whitespace-pre-wrap text-xs text-[#C5C8C6]`}
          >
            {`export default async function getNowPlayingItem() {
  const response = await getNowPlaying();
  if (response.status === 204 || response.status > 400) {
    return false;
  }
 
  const song = await response.json();
  const artist = song.item.artists[0].name;
  const isPlaying = song.is_playing;
  const title = song.item.name;
 
  return {
    artist,
    isPlaying,
    title,
  };
}`}
          </pre>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Heading</h3>
        <hr className="mt-1 mb-3 text-[#f5f5f51f]" />
        <div className="bg-[#1F2121] rounded-md">
          <div className="flex justify-between pb-0">
            <p
              className={`${geistMono.className} bg-[#2D2F2F] p-1 rounded-tl-md rounded-br-md font-semibold text-xs text-[#949592]`}
            >
              text
            </p>
            <Copy className="h-4 m-1 cursor-pointer text-[#949592]" />
          </div>
          <pre
            className={`${geistMono.className} p-4 whitespace-pre-wrap text-xs text-[#C5C8C6]`}
          >
            {`If the user query is a simple greeting like "hi", "hello", "hey", or "good morning", respond politely with a greeting followed by a reminder: 
  "Hello! Please ask BSR-related queries."

For other off-topic inputs or non-BSR queries (e.g., "how are you", "what's up"), respond with:
  "Thank you for reaching out. Please ask BSR-related queries so I can assist you effectively."

If the knowledge base result contains relevant information:
   - Respond with TL;DR, detailed explanation, insights, and tables if applicable.

If the knowledge base result is empty or irrelevant:
   - Respond as mentioned for off-topic inputs above.
`}
          </pre>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Heading</h3>
        <hr className="mt-1 mb-3 text-[#f5f5f51f]" />
        <div className="bg-[#1F2121] rounded-md">
          <div className="flex justify-between pb-0">
            <p
              className={`${geistMono.className} bg-[#2D2F2F] p-1 rounded-tl-md rounded-br-md font-semibold text-xs text-[#949592]`}
            >
              text
            </p>
            <Copy className="h-4 m-1 cursor-pointer text-[#949592]" />
          </div>
          <pre
            className={`${geistMono.className} p-4 whitespace-pre-wrap text-xs text-[#C5C8C6]`}
          >
            {`You are an AI assistant that only answers questions using the provided knowledge base search results.

Instructions:
- Always receive both the user’s query and the knowledge base search result.
- If the knowledge base contains relevant information:
   - Start with a short TL;DR summary (1-2 sentences).
   - Then explain the details clearly.
   - Where applicable, provide insights using numerical values, comparisons, or small tables for clarity.
- If the knowledge base has no relevant results or the query is unrelated to the knowledge base:
   - Do NOT invent or pull external information.
   - Respond only with a polite message like:
     "Please ask BSR-related queries."
- Never hallucinate, never search outside the knowledge base, and always stay within these instructions.
`}
          </pre>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Heading</h3>
        <hr className="mt-1 mb-3 text-[#f5f5f51f]" />
        <div className="bg-[#1F2121] rounded-md">
          <div className="flex justify-between pb-0">
            <p
              className={`${geistMono.className} bg-[#2D2F2F] p-1 rounded-tl-md rounded-br-md font-semibold text-xs text-[#949592]`}
            >
              text
            </p>
            <Copy className="h-4 m-1 cursor-pointer text-[#949592]" />
          </div>
          <pre
            className={`${geistMono.className} p-4 whitespace-pre-wrap text-xs text-[#C5C8C6]`}
          >
            {`export default async function getNowPlayingItem() {
  const response = await getNowPlaying();
  if (response.status === 204 || response.status > 400) {
    return false;
  }
 
  const song = await response.json();
  const artist = song.item.artists[0].name;
  const isPlaying = song.is_playing;
  const title = song.item.name;
 
  return {
    artist,
    isPlaying,
    title,
  };
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default TextPage;
