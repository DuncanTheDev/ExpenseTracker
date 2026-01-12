import { useState, useEffect } from "react";
import api from "../../axios/axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BalanceTrend() {
  const [balanceTrend, setBalanceTrend] = useState([]);

  useEffect(() => {
    const fetchBalanceTrend = async () => {
      try {
        const response = await api.get("/report/balance-trend");

        setBalanceTrend(response.data);
      } catch (err) {
        console.error("Failed to fetch balance trend: ", err);
      }
    };

    fetchBalanceTrend();
  }, []);

  return (
    <div className="pt-8 pb-8 p-4 h-100 bg-white border border-gray-200 rounded-lg">
      <h2 className="text-lg font-bold text-center">Balance Trend</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={balanceTrend}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#0d9488"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
