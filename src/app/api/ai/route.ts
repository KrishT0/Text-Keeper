import { streamText } from "ai";
import { NextResponse } from "next/server";

type AIError = {
  responseBody?: string;
};

export async function POST(req: Request) {
  const { note } = await req.json();

  try {
    const result = streamText({
      model: "openai/gpt-5-nano",
      system:
        "You are a concise assistant that summarizes any given note into exactly one short paragraph of 1-2 lines maximum. Never add extra explanations, examples, or markdown. Return only the plain summary text and nothing else.",
      prompt: note,
    });

    return result.toTextStreamResponse();
  } catch (error: unknown) {
    const err = error as AIError;

    const body = err?.responseBody ? JSON.parse(err.responseBody) : null;
    const errorType = body?.error?.type;

    if (errorType === "customer_verification_required") {
      return NextResponse.json(
        {
          error: "AI service is currently unavailable. Please try again later.",
        },
        { status: 503 },
      );
    }

    if (errorType === "rate_limit_exceeded") {
      return NextResponse.json(
        {
          error: "AI service is currently overloaded. Please try again later.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
