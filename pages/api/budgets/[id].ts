import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Budget from '@/models/Budget';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'PUT') {
    const budget = await Budget.findByIdAndUpdate(id, req.body, { new: true });
    return res.json(budget);
  }

  if (req.method === 'DELETE') {
    await Budget.findByIdAndDelete(id);
    return res.status(204).end();
  }
}
