import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

async function handler(_req: Request): Promise<Response> {
    const guess = await extractGuess(_req);
    const simscore = await getResponse('','');
    return new Response(`Here is the simscore ${simscore}`)
}

function similarity(word1: string, word2:string): string {
    return word1+word2;
}


const getResponse = async (word1: string, word2:string) => {
    const body = {
        lang: 'fr',
        sim1: 'chat',
        sim2: 'chien',
        type: 'General Word2Vec'
    }

    const JSON_response = await (await fetch('http://nlp.polytechnique.fr/similarityscore', { method: "GET", body: JSON.stringify(body) })).json();
    return JSON.parse(JSON_response).simscore;
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