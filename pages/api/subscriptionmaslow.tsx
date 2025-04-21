import type { NextApiRequest, NextApiResponse } from 'next';
import { IemailData, sendEmailSubscritionMaslow } from 'services/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = JSON.parse(req.body) as IemailData;

    const emailStatus = await sendEmailSubscritionMaslow({ ...body });
    
    if (emailStatus.status) {
        return res.status(200).json(true);
    }

    return res.status(200).json(false);
};


