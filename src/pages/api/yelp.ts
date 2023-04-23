import { NextApiRequest, NextApiResponse } from 'next';

const yelp = require('yelp-fusion');

const apiKey = process.env.YELP_KEY;

type Data = any;
const client = yelp.client(apiKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') return res.status(400).json({ error: 'Invalid request method' });

  const { term, location } = req.body;

  try {
    const response = await client.search({ term, location });
    const firstResult = response.jsonBody.businesses[0];
    const pretty = JSON.stringify(firstResult, null, 4);
    return res.status(200).json(pretty);
  } catch (err: any) {
    return res.status(400).json({ error: 'ah' });
  }
}
