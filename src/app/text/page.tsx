import TextContent from "@/components/textContent";

const data = [
  {
    id: "1",
    heading: "Spotify Code",
    text: `export default async function getNowPlayingItem() {
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
}`,
  },
  {
    id: "2",
    heading: "Sample Prompt",
    text: `If the user query is a simple greeting like "hi", "hello", "hey", or "good morning", respond politely with a greeting followed by a reminder: 
  "Hello! Please ask BSR-related queries."

For other off-topic inputs or non-BSR queries (e.g., "how are you", "what's up"), respond with:
  "Thank you for reaching out. Please ask BSR-related queries so I can assist you effectively."

If the knowledge base result contains relevant information:
   - Respond with TL;DR, detailed explanation, insights, and tables if applicable.

If the knowledge base result is empty or irrelevant:
   - Respond as mentioned for off-topic inputs above.`,
  },
  {
    id: "3",
    heading: "Sample Prompt II",
    text: `You are an AI assistant that only answers questions using the provided knowledge base search results.

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

`,
  },
];

function TextPage() {
  return (
    <div className="pb-8 ">
      {data.map((item, index) => (
        <TextContent
          key={index}
          heading={item.heading}
          id={item.id}
          text={item.text}
        />
      ))}
    </div>
  );
}

export default TextPage;
