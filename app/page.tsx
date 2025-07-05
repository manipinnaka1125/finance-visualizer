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
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Personal Finance Visualizer</h1>
      <TransactionForm onSuccess={fetchAll} />
      <TransactionList txns={txns} refresh={fetchAll} />
      <BudgetForm onSuccess={fetchAll} />
      <BudgetInsights transactions={txns} budgets={budgets} />
    </main>
  );
}
