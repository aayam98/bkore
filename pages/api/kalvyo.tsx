import type { NextApiRequest, NextApiResponse } from 'next';
import { IkalvyoData, sendEmail, sendKalvyo } from 'services/email';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body) as IkalvyoData;

  const emailStatus = await sendKalvyo({ ...body });

  if (emailStatus.status) {
    return res.status(200).json(emailStatus);
  }

  return res.status(200).json(false);
}
