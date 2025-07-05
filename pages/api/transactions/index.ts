import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Transaction from '@/models/Transaction';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    const txns = await Transaction.find().sort({ date: -1 });
    return res.json(txns);
  }

  if (req.method === 'POST') {
    const txn = await Transaction.create(req.body);
    return res.json(txn);
  }
}
