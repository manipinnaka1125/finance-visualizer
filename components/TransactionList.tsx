'use client';

import axios from 'axios';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import dayjs from 'dayjs';

type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

export default function TransactionList({
  txns,
  refresh,
}: {
  txns: Transaction[];
  refresh: () => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Transaction>>({});

  const startEdit = (txn: Transaction) => {
    setEditingId(txn._id);
    setEditForm({
      amount: txn.amount,
      date: dayjs(txn.date).format('YYYY-MM-DD'),
      description: txn.description,
      category: txn.category,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (id: string) => {
    await axios.put(`/api/transactions/${id}`, {
      ...editForm,
      amount: Number(editForm.amount),
      date: new Date(editForm.date || ''),
    });
    cancelEdit();
    refresh();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/transactions/${id}`);
    refresh();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Transactions</h2>
      <ul className="space-y-2">
        {txns.map((txn) => (
          <li key={txn._id} className="flex flex-col border p-3 rounded bg-gray-50">
            {editingId === txn._id ? (
              <div className="space-y-2">
                <Input
                  type="number"
                  value={editForm.amount || ''}
                  onChange={(e) => setEditForm({ ...editForm, amount: Number(e.target.value) })}
                />
                <Input
                  type="date"
                  value={editForm.date || ''}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                />
                <Input
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                />
                <Input
                  value={editForm.category || ''}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button onClick={() => saveEdit(txn._id)} className="bg-green-600 hover:bg-green-700 text-white">
                    Save
                  </Button>
                  <Button onClick={cancelEdit} variant="secondary">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {txn.description} - ₹{txn.amount}
                  </p>
                  <p className="text-sm text-gray-500">
                    {dayjs(txn.date).format('YYYY-MM-DD')} | {txn.category}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => startEdit(txn)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(txn._id)}>
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
