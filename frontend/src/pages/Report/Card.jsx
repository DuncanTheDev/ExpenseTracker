import api from "../../axios/axios";

import { useState, useEffect } from "react";

export default function Card() {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [avgExpense, setAvgExpense] = useState(0);

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions");

      setTransactions(response.data);
    } catch (err) {
      console.error("Failed to fetch: ", err);
    }
  };

  useEffect(() => {
    if (transactions.length > 0) {
      const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

      setTotalIncome(income);
      setTotalExpense(expense);
      setBalance(income - expense);

      //Average montly expense
      const expenseTransactions = transactions.filter(
        (t) => t.type === "expense"
      );

      // Group by YYYY-MM
      const monthlyTotals = {};

      expenseTransactions.forEach((t) => {
        const month = t.transaction_date.slice(0, 7); // "2025-02"
        if (!monthlyTotals[month]) monthlyTotals[month] = 0;
        monthlyTotals[month] += Number(t.amount);
      });

      const monthsCount = Object.keys(monthlyTotals).length;
      const avgMonthly =
        monthsCount > 0
          ? Object.values(monthlyTotals).reduce((a, b) => a + b, 0) /
            monthsCount
          : 0;

      setAvgExpense(avgMonthly);
    }
  }, [transactions]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      {/**Card Section */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/**Total Income */}
        <div className="pt-8 pb-8 p-4 bg-white border border-gray-200 rounded-lg">
          <p>Total Income</p>
          <h1 className="text-2xl font-bold text-green-600">
            ₱{totalIncome.toLocaleString()}
          </h1>
        </div>
        {/**Total Expense */}
        <div className="pt-8 pb-8 p-4 bg-white border border-gray-200 rounded-lg">
          <p>Total Expense</p>
          <h1 className="text-2xl font-bold text-red-600">
            ₱{totalExpense.toLocaleString()}
          </h1>
        </div>
        {/**Net Savings */}
        <div className="pt-8 pb-8 p-4 bg-white border border-gray-200 rounded-lg">
          <p>Net Savings</p>
          <h1 className="text-2xl font-bold text-teal-600">
            ₱{balance.toLocaleString()}
          </h1>
        </div>
        {/**Average Monthly Expense */}
        <div className="pt-8 pb-8 p-4 bg-white border border-gray-200 rounded-lg">
          <p>Avg. Monthly Expense</p>
          <h1 className="text-2xl font-bold text-black">
            ₱{avgExpense.toLocaleString()}
          </h1>
        </div>
      </div>
    </div>
  );
}
