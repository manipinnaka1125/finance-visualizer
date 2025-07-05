import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Budget from '@/models/Budget';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    const budgets = await Budget.find();
    return res.json(budgets);
  }

  if (req.method === 'POST') {
    const budget = await Budget.create(req.body);
    return res.json(budget);
  }
}
