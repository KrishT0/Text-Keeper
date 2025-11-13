import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system:
      "You are a helpful assistant always providing answers in markdown format using bullet points, headings, tablles,etc whatever fits the situation.",
    prompt,
  });

  return result.toUIMessageStreamResponse();
}
