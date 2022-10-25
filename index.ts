import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

async function handler(_req: Request): Promise<Response> {
    return new Response(similarity("Hello ", " world !"))
}

function similarity(word1: string, word2:string): string {
    return word1+word2;
}


serve(handler);