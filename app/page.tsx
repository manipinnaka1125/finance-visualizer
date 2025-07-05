'use client';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import BudgetForm from '@/components/BudgetForm';
import BudgetInsights from '@/components/BudgetInsights';
import MonthlyChart from '@/components/MonthlyChart';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const [txns, setTxns] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const fetchAll = async () => {
    try {
      const [txnRes, budgetRes] = await Promise.all([
        axios.get('/api/transactions'),
        axios.get('/api/budgets'),
      ]);
      setTxns(txnRes.data);
      setBudgets(budgetRes.data);
    } catch (err) {
      console.error('Fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Safe typing for refs
  const budgetRef = useRef<HTMLDivElement | null>(null);
  const transactionRef = useRef<HTMLDivElement | null>(null);
  const insightsRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold text-center">📊 Personal Finance Visualizer</h1>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <Button onClick={() => scrollToRef(transactionRef)}>➕ Add Transaction</Button>
        <Button onClick={() => scrollToRef(budgetRef)}>➕ Add Budget</Button>
        <Button onClick={() => scrollToRef(insightsRef)}>📈 Insights</Button>
        <Button onClick={() => scrollToRef(chartRef)}>📆 Monthly Chart</Button>
      </div>

      <div ref={transactionRef} className="bg-white p-5 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>
        <TransactionForm onSuccess={fetchAll} />
      </div>

      <div ref={budgetRef} className="bg-white p-5 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Add Budget</h2>
        <BudgetForm onSuccess={fetchAll} />
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-md">
        <TransactionList txns={txns} refresh={fetchAll} />
      </div>

      <div ref={insightsRef} className="bg-white p-5 rounded-2xl shadow-md">
        <BudgetInsights transactions={txns} budgets={budgets} />
      </div>

      <div ref={chartRef} className="bg-white p-5 rounded-2xl shadow-md">
        <MonthlyChart txns={txns} />
      </div>
    </main>
  );
}
