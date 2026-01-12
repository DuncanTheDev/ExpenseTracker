import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Card from "./Card";
import ExpenseVsIncome from "./MonthlyExpenseVSIncome";
import BalanceTrend from "./BalanceTrend";
import CategoryBreakdown from "./CategoryBreakdown";


import AOS from "aos";
import "aos/dist/aos.css";

import { useState, useEffect } from "react";

export default function Report() {
  useEffect(() => {
    AOS.init({
      duration: 500, // Duration of animation in milliseconds
      easing: "ease-in-out", // Easing function
      once: true, // Only animate once (when scrolled into view)
    });
  });

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <main className="bg-gray-50 p-8 flex-1" data-aos="zoom-in">
          {/**Heaer Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600">
              Analyze your financial trends and summaries
            </p>
          </div>

          {/**Filter Section */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between gap-4 mb-6">
            <div className="flex space-x-6">
              {/**Category filter */}
              <select
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                name=""
                id=""
              >
                <option value="">Select Category</option>
              </select>
              {/**From date filter */}
              <div className="space-x-1">
                <label htmlFor="">From</label>
                <input
                  type="date"
                  name=""
                  id=""
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
              {/**To date filter */}
              <div className="space-x-1">
                <label htmlFor="">To</label>
                <input
                  type="date"
                  name=""
                  id=""
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>
            {/**Button to export data */}
            <div>
              <button className="text-white rounded-md p-3 py-2 text-sm bg-[#094067] cursor-pointer hover:opacity-90">
                Export report
              </button>
            </div>
          </div>

          {/* Card Section */}
          <Card />

          {/** */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Monthly Expenses vs Income */}
            <ExpenseVsIncome />

            {/* Balance trend */}
            <BalanceTrend />
          </div>

          {/* Category breakdown table */}
          <CategoryBreakdown/>
        </main>
      </div>
    </div>
  );
}
