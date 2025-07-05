'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function TransactionForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ amount: '', date: '', description: '', category: '' });

  const handleSubmit = async () => {
    if (!form.amount || !form.date || !form.description) return alert('Fill all fields');
    await axios.post('/api/transactions', {
      ...form,
      amount: Number(form.amount),
      date: new Date(form.date),
    });
    setForm({ amount: '', date: '', description: '', category: '' });
    onSuccess();
  };

  return (
    <div className="space-y-2">
      <Input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
      <Input type="date" placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <Input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
      <Button onClick={handleSubmit}>Add Transaction</Button>
    </div>
  );
}
