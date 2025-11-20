import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../axios/axios";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
              <p>Total Income</p>
              <h1 className="text-2xl font-bold text-red-600">
                ₱{totalExpense.toLocaleString()}
              </h1>
            </div>
            <div className="pt-8 pb-8 p-4 bg-white border border-gray-200 rounded-lg">
              <p>Total Income</p>
              <h1 className="text-2xl font-bold text-teal-600">
                ₱{balance.toLocaleString()}
              </h1>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-8">
            <h2 className="text-lg font-semibold mb-4">Expense by Category</h2>
            <div className="h-64"></div>
          </div>
        </main>
      </div>
    </div>
  );
}
