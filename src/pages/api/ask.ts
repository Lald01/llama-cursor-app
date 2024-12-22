// src/pages/api/ask.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { question } = req.body;

    try {
      const llamaApiUrl = process.env.LLAMA_API_URL;
      const llamaResponse = await axios.post(llamaApiUrl!, { question });

      const answer = llamaResponse.data.answer;

      res.status(200).json({ answer });
    } catch (error) {
      console.error('Fejl ved kommunikation med Llama:', error);
      res.status(500).json({ answer: 'Kunne ikke hente svar fra Llama.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Metode ${req.method} ikke tilladt`);
  }
}