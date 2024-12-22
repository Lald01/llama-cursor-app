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
      // Udskift med den faktiske endpoint hvor Llama 3.2 er tilgængelig
      const llamaResponse = await axios.post('https://2477-94-145-243-197.ngrok-free.app/ep_2qa8UGKchDFyYB54hd6uFo9Ii6F', { question });

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