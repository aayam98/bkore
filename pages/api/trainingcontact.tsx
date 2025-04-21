import type { NextApiRequest, NextApiResponse } from 'next';
import { ContactFormTraining } from 'pages/functionaltraining';
import {sendEmailToUser, sendEmailTraining } from 'services/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = JSON.parse(req.body) as ContactFormTraining;

    const emailStatus = await sendEmailTraining({ ...body });
    const emaitToUser = await sendEmailToUser(body)
    console.log('emaitToUser', emaitToUser);
    if (emailStatus.status && emaitToUser.status) {
        return res.status(200).json(true);
    }

    return res.status(200).json(false);
};


