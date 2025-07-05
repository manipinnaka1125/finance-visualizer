'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c'];

export default function BudgetInsights({ transactions, budgets }: { transactions: any[], budgets: any[] }) {
  const grouped: { [key: string]: number } = {};
  transactions.forEach(t => {
    if (!grouped[t.category]) grouped[t.category] = 0;
    grouped[t.category] += t.amount;
  });

  const pieData = Object.entries(grouped).map(([cat, amt]) => ({ name: cat, value: amt }));
  const budgetCompare = budgets.map(b => ({
    category: b.category,
    budget: b.amount,
    spent: grouped[b.category] || 0,
  }));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium">Category-wise Spending</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-medium">Budget vs Actual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetCompare}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="budget" fill="#82ca9d" />
              <Bar dataKey="spent" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
