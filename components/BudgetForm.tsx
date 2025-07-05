'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function BudgetForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ category: '', amount: '' });

  const handleSubmit = async () => {
    if (!form.category || !form.amount) return alert('Fill both fields');
    await axios.post('/api/budgets', {
      category: form.category,
      amount: Number(form.amount),
    });
    setForm({ category: '', amount: '' });
    onSuccess();
  };

  return (
    <div className="space-y-4 bg-gray-50 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-gray-800">🎯 Add Budget</h2>
      <div className="grid gap-4">
        <Input
          placeholder="e.g. Food, Rent"
          value={form.category}
          className="border border-gray-300"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Amount (₹)"
          value={form.amount}
          className="border border-gray-300"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <Button
          className="bg-blue-600 hover:bg-blue-700 transition text-white"
          onClick={handleSubmit}
        >
          ➕ Add Budget
        </Button>
      </div>
    </div>
  );
}
