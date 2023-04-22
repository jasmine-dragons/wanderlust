// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cohere from 'cohere-ai';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = any;

const COHERE_KEY = process.env.COHERE_KEY as string;
cohere.init(COHERE_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') return res.status(400).json({ error: 'Invalid request method' });

  const prompt = req.body.prompt;

  const response = await cohere.generate({
    prompt,
    preset: 'Itinerary-k9t4es',
    temperature: 0.9,
    model: 'command-52b-v12-1-apr23-uhhd0ymd',
    num_generations: 1,
    max_tokens: 1000,
  });

  res.status(200).json(response.body.generations.map(res => res.text));
}

// `create an itinerary for my day in Los Angeles including all of the following locations in whichever order makes the most sense:
//     - UCLA
//     - Getty Villa
//     - Hammer Museum
//     - LACMA
//     - Diddy Riese
//     - Egg Tuck
//     `
