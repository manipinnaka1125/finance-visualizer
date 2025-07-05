'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

type Transaction = {
  amount: number;
  date: string;
};

export default function MonthlyChart({ txns }: { txns: Transaction[] }) {
  const monthly: Record<string, number> = {};
  txns.forEach((t) => {
    const month = dayjs(t.date).format('YYYY-MM');
    monthly[month] = (monthly[month] || 0) + t.amount;
  });

  const chartData = Object.entries(monthly).map(([month, amt]) => ({
    month,
    amount: amt,
  }));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">📆 Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
