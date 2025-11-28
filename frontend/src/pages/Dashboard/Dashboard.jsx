import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../axios/axios";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data);
    } catch (err) {
      console.error("Failed to fetch transactions: ", err);
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
    }
  }, [transactions]);

  useEffect(() => {
    AOS.init({
      duration: 500, // Duration of animation in milliseconds
      easing: "ease-in-out", // Easing function
      once: true, // Only animate once (when scrolled into view)
    });

    fetchTransactions();
  }, []);

  /*Chart methods */
  const incomeCategoryTotals = {};
  const expenseCategoryTotals = {};

  transactions.forEach((t) => {
    if (!t.category) return;

    if (t.type === "income") {
      incomeCategoryTotals[t.category.name] =
        (incomeCategoryTotals[t.category.name] || 0) + Number(t.amount);
    }

    if (t.type === "expense") {
      expenseCategoryTotals[t.category.name] =
        (expenseCategoryTotals[t.category.name] || 0) + Number(t.amount);
    }
  });

  const incomePieData = Object.entries(incomeCategoryTotals).map(
    ([name, value]) => ({ name, value })
  );

  const expensePieData = Object.entries(expenseCategoryTotals).map(
    ([name, value]) => ({ name, value })
  );

  const COLORS = [
    "#0ea5e9",
    "#6366f1",
    "#10b981",
    "#f97316",
    "#ef4444",
    "#8b5cf6",
  ];

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="bg-gray-50 p-8 flex-1" data-aos="zoom-in">
          <div className="grid grid-cols-3 gap-4">
            <div className="pt-8 pb-8 p-4 bg-white border border-gray-200 rounded-lg">
              <p>Total Income</p>
              <h1 className="text-2xl font-bold text-green-600">
                ₱{totalIncome.toLocaleString()}
              </h1>
            </div>
            <div className="pt-8 pb-8 p-4 bg-white border border-gray-200 rounded-lg">
              <p>Total Expense</p>
              <h1 className="text-2xl font-bold text-red-600">
                ₱{totalExpense.toLocaleString()}
              </h1>
            </div>
            <div className="pt-8 pb-8 p-4 bg-white border border-gray-200 rounded-lg">
              <p>Net Savings</p>
              <h1 className="text-2xl font-bold text-teal-600">
                ₱{balance.toLocaleString()}
              </h1>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-8">
            <h2 className="text-center text-lg font-semibold mb-4">
              Income & Expense Overview
            </h2>

            <div className="grid grid-cols-2 gap-4 pb-6">
              {/* INCOME PIE */}
              <div className="h-64 overflow-visible">
                <h3 className="text-center font-medium mb-2">
                  Income by Category
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart
                    margin={{ top: 16, right: 16, bottom: 16, left: 16 }}
                  >
                    <Pie
                      data={incomePieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="40%"
                      outerRadius="70%"
                      labelLine={false}
                      label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                    >
                      {incomePieData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend/>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* EXPENSE PIE */}
              <div className="h-64 overflow-visible">
                <h3 className=" text-center font-medium mb-2">
                  Expense by Category
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart
                    margin={{ top: 16, right: 16, bottom: 16, left: 16 }}
                  >
                    <Pie
                      data={expensePieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="40%"
                      outerRadius="70%"
                      labelLine={false}
                      label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                    >
                      {expensePieData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
