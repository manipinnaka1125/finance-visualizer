
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import BudgetForm from '@/components/BudgetForm';
import BudgetInsights from '@/components/BudgetInsights';

export default function HomePage() {
  const [txns, setTxns] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const fetchAll = async () => {
    const [txnRes, budgetRes] = await Promise.all([
      axios.get('/api/transactions'),
      axios.get('/api/budgets'),
    ]);
    setTxns(txnRes.data);
    setBudgets(budgetRes.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold text-center">📊 Personal Finance Visualizer</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>
          <TransactionForm onSuccess={fetchAll} />
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Add Budget</h2>
          <BudgetForm onSuccess={fetchAll} />
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-md">
        <TransactionList txns={txns} refresh={fetchAll} />
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-md">
        <BudgetInsights transactions={txns} budgets={budgets} />
      </div>
    </main>
  );
}
