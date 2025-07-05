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

  // Refs for scrolling
  const budgetRef = useRef<HTMLDivElement>(null);
  const transactionRef = useRef<HTMLDivElement>(null);
  const insightsRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current!.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold text-center">📊 Personal Finance Visualizer</h1>

      {/* Top Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <Button onClick={() => scrollToRef(transactionRef)}>➕ Add Transaction</Button>
        <Button onClick={() => scrollToRef(budgetRef)}>➕ Add Budget</Button>
        <Button onClick={() => scrollToRef(insightsRef)}>📈 Insights</Button>
        <Button onClick={() => scrollToRef(chartRef)}>📆 Monthly Chart</Button>
      </div>

      {/* Add Transaction */}
      <div ref={transactionRef} className="bg-white p-5 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>
        <TransactionForm onSuccess={fetchAll} />
      </div>

      {/* Add Budget */}
      <div ref={budgetRef} className="bg-white p-5 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Add Budget</h2>
        <BudgetForm onSuccess={fetchAll} />
      </div>

      {/* Transaction List */}
      <div className="bg-white p-5 rounded-2xl shadow-md">
        <TransactionList txns={txns} refresh={fetchAll} />
      </div>

      {/* Budget Insights */}
      <div ref={insightsRef} className="bg-white p-5 rounded-2xl shadow-md">
        <BudgetInsights transactions={txns} budgets={budgets} />
      </div>

      {/* Monthly Chart */}
      <div ref={chartRef} className="bg-white p-5 rounded-2xl shadow-md">
        <MonthlyChart txns={txns} />
      </div>
    </main>
  );
}
