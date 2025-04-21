import type { NextApiRequest, NextApiResponse } from 'next';
import { IemailData, sendWarrantyEmail } from 'services/email';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body) as IemailData;

  const emailStatus = await sendWarrantyEmail({
    Warranty: {
      ...body,
    },
  });

  if (emailStatus.status) {
    return res.status(200).json(emailStatus);
  }

  return res.status(200).json(false);
}
