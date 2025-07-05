'use client';

import axios from 'axios';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';

export default function TransactionList({ txns, refresh }: { txns: any[]; refresh: () => void }) {
  const handleDelete = async (id: string) => {
    await axios.delete(`/api/transactions/${id}`);
    refresh();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Transactions</h2>
      <ul className="space-y-2">
        {txns.map((txn) => (
          <li key={txn._id} className="flex justify-between border p-2 rounded">
            <div>
              <p>{txn.description} - ₹{txn.amount}</p>
              <p className="text-sm text-gray-500">
                {dayjs(txn.date).format('YYYY-MM-DD')} | {txn.category}
              </p>
            </div>
            <Button variant="destructive" onClick={() => handleDelete(txn._id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
