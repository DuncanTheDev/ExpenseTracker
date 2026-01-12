import { useState, useEffect } from "react";
import api from "../../axios/axios";

export default function CategoryBreakdown() {
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);

  useEffect(() => {
    const fetchCategoryBreakdown = async () => {
      try {
        const response = await api.get("/report/category-breakdown");

        setCategoryBreakdown(response.data);
      } catch (err) {
        console.error("Failed to fetch category breakdown: ", err);
      }
    };

    fetchCategoryBreakdown();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Category Breakdown</h2>
      </div>

      <div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-6 py-3 text-left text-gray-600">Category</th>
              <th className="p-6 py-3 text-left text-gray-600">Type</th>
              <th className="p-6 py-3 text-left text-gray-600">Amount</th>
              <th className="p-6 py-3 text-left text-gray-600">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {categoryBreakdown.map((cb) => (
              <tr key={cb.id} className="border-t border-gray-200">
                <td className="px-6 py-4">{cb.category_name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`${
                      cb.type === "income"
                        ? "bg-green-100 text-green-800 px-2 py-1 rounded"
                        : "bg-red-100 text-red-800 px-2 py-1 rounded"
                    }`}
                  >
                    {cb.type}
                  </span>
                </td>
                <td
                  className={`px-6 py-4 ${
                    cb.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {cb.type === "income"
                    ? `+₱${cb.total_amount}`
                    : `-₱${cb.total_amount}`}
                </td>
                <td className="px-6 py-4">{cb.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
