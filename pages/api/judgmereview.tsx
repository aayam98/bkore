// pages/api/proxy-reviews.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { getReview } from 'services/review/judge.me';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    const response = await getReview()
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}