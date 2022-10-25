import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

async function handler(_req: Request): Promise<Response> {
    const guess = await extractGuess(_req);
    return new Response(similarity("This is your guess: ", guess))
}

function similarity(word1: string, word2:string): string {
    return word1+word2;
}

const extractGuess = async (req: Request) => {
    const slackPayload = await req.formData();
    const guess = await slackPayload.get("text")?.toString();
    if (!guess) {
      throw Error("Guess is empty or null");
    }
    return guess;
  };

serve(handler);