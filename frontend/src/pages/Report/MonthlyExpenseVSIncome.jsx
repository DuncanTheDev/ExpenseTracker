import { useState, useEffect } from "react";
import api from "../../axios/axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyExpenseVsIncome() {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchMonthlyIncomeExpense = async () => {
      try {
        const response = await api.get("/report/monthly");

        setMonthlyData(response.data);
      } catch (err) {
        console.error("Failed to fetch: ", err);
      }
    };

    fetchMonthlyIncomeExpense();
  }, []);

  return (
    <div className="pt-8 pb-8 p-4 h-100 bg-white border border-gray-200 rounded-lg">
      <h2 className="text-lg font-bold text-center">
        Monthly Expenses vs Income
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData}>
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#4caf50" />
          <Bar dataKey="expense" fill="#f44336" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
