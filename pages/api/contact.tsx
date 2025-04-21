import type { NextApiRequest, NextApiResponse } from 'next';
import { IemailData, sendEmail } from 'services/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = JSON.parse(req.body) as IemailData;

    const emailStatus = await sendEmail({ ...body });
    
    if (emailStatus.status) {
        return res.status(200).json({success: true,message:"Your message has been sent successfully"});
    }

    return res.status(200).json({success: false,message:"Your message has not been sent."});
};


