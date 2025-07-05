'use client';
import { Card, CardContent } from '@/components/ui/card';

type Transaction = {
  amount: number;
  description: string;
  category: string;
  date: string;
};

export default function SummaryCards({ txns }: { txns: Transaction[] }) {
  const total = txns.reduce((sum, t) => sum + t.amount, 0);
  const latest = txns.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  const byCategory: Record<string, number> = {};
  txns.forEach((t) => {
    byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
  });
  const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Total Spent</p>
          <p className="text-2xl font-bold">₹{total.toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Top Category</p>
          <p className="text-xl font-semibold">{topCategory?.[0] || '-'}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Latest Transaction</p>
          <p className="text-md">{latest?.description || '-'}</p>
          <p className="text-xs text-gray-400">{latest?.date?.slice(0, 10) || '-'}</p>
        </CardContent>
      </Card>
    </div>
  );
}
