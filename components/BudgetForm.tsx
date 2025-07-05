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
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Add Budget</h2>
      <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
      <Input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
      <Button onClick={handleSubmit}>Add Budget</Button>
    </div>
  );
}
