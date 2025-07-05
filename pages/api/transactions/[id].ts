import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Transaction from '@/models/Transaction';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'PUT') {
    const txn = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    return res.json(txn);
  }

  if (req.method === 'DELETE') {
    await Transaction.findByIdAndDelete(id);
    return res.status(204).end();
  }
}
