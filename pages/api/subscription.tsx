import type { NextApiRequest, NextApiResponse } from 'next';
import { IemailData, sendEmailSubscrition } from 'services/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = JSON.parse(req.body) as IemailData;

    const emailStatus = await sendEmailSubscrition({ ...body });
    
    if (emailStatus.status) {
        return res.status(200).json(true);
    }

    return res.status(200).json(false);
};


