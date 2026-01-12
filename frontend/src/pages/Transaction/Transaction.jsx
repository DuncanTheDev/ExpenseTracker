import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import AddTransaction from "../../components/TransactionModal/AddTransaction";
import UpdateTransaction from "../../components/TransactionModal/UpdateTransactions";
import api from "../../axios/axios";

import AOS from "aos";
import "aos/dist/aos.css";

import { useState, useEffect } from "react";

export default function Transaction() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterTransactionDate, setFilterTransactionDate] = useState("");
  const [search, setSearch] = useState("");
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  {
    /**Fetching categories for the drop down */
  }
  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");

      setCategories(response.data);
    } catch (err) {
      console.error("Failed to fetch categories: ", err);
    }
  };

  {
    /**Fetching all transactios */
  }
  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions", {
        params: {
          type: filterType || undefined,
          category_id: filterCategory || undefined,
          transaction_date: filterTransactionDate || undefined,
          search: search || undefined,
        },
      });

      setTransactions(response.data);
    } catch (err) {
      console.error("Failed to fetch transactions: ", err);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 500, // Duration of animation in milliseconds
      easing: "ease-in-out", // Easing function
      once: true, // Only animate once (when scrolled into view)
    });

    fetchTransactions(), fetchCategories();
  }, [filterType, filterCategory, filterTransactionDate, search]);

  {
    /*To delete transaction */
  }
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this transaction"
    );

    if (!isConfirmed) return;

    try {
      await api.delete(`/transaction/${id}`);

      fetchTransactions();
    } catch (err) {
      console.error("Failed to delete transaction: ", err);
    }
  };

  return (
    <div>
      <Navbar />

      {/**Modal for adding transaction */}
      <AddTransaction
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshTransaction={fetchTransactions}
      />

      <div className="flex">
        <Sidebar />

        <main className="bg-gray-50 p-8 flex-1" data-aos="zoom-in">
          {/**Heaer Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
            <p className="text-gray-600">Manage your income and expenses</p>
          </div>

          {/**Filter and search section */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between gap-4 mb-6">
            <div className="space-x-4">
              {/**Type filter */}
              <select
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                value={filterType}
                onChange={(e) =>
                  setFilterType(e.target.value.toLocaleLowerCase())
                }
              >
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              {/**Category filter */}
              <select
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/**Date filter */}
              <input
                type="date"
                value={filterTransactionDate}
                onChange={(e) => setFilterTransactionDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            {/**Search filter */}
            <div>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value.toLocaleLowerCase());
                }}
                placeholder="Search transactions..."
                className="border border-gray-300 w-80 rounded-md p-3 py-2 text-sm flex-1"
              />
            </div>
          </div>

          {/**Table Section */}
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              {/**Header of the table */}
              <h2 className="text-lg font-semibold">All Transactions</h2>
              <button
                className="text-white rounded-md p-3 py-2 text-sm bg-[#094067] cursor-pointer hover:opacity-90"
                onClick={() => setIsModalOpen(true)}
              >
                Add Transaction
              </button>
            </div>

            <div>
              <table className="w-full">
                {/**table header */}
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-6 py-3 text-left text-gray-600">Date</th>
                    <th className="p-6 py-3 text-left text-gray-600">
                      Category
                    </th>
                    <th className="p-6 py-3 text-left text-gray-600">
                      Description
                    </th>
                    <th className="p-6 py-3 text-left text-gray-600">Amount</th>
                    <th className="p-6 py-3 text-left text-gray-600">Type</th>
                    <th className="p-6 py-3 text-left text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/**Table body */}
                <tbody>
                  {transactions
                    .sort(
                      (a, b) =>
                        new Date(b.transaction_date) -
                        new Date(a.transaction_date)
                    )
                    .map((t) => (
                      <tr key={t.id} className="border-t border-gray-200">
                        {/**Date */}
                        <td className="px-6 py-4">{t.transaction_date}</td>
                        {/**category */}
                        <td className="px-6 py-4">
                          {t.category?.name || t.category}
                        </td>
                        {/**Description */}
                        <td className="px-6 py-4">{t.description}</td>
                        {/**Amount */}
                        <td
                          className={`px-6 py-4 ${
                            t.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {t.type === "income"
                            ? `+₱${t.amount}`
                            : `-₱${t.amount}`}
                        </td>
                        {/**Type */}
                        <td className="px-6 py-4">
                          <span
                            className={`${
                              t.type === "income"
                                ? "bg-green-100 text-green-800 px-2 py-1 rounded"
                                : "bg-red-100 text-red-800 px-2 py-1 rounded"
                            }`}
                          >
                            {t.type}
                          </span>
                        </td>
                        {/**Action */}
                        <td className="px-6 py-4">
                          <div className="space-x-2">
                            <button
                              className="bg-[#094067] p-1 rounded-md text-white cursor-pointer"
                              onClick={() => {
                                setSelectedTransaction(t);
                                setIsUpdateOpen(true);
                              }}
                            >
                              <MdEdit />
                            </button>
                            <button
                              className="bg-red-600 p-1 rounded-md text-white cursor-pointer"
                              onClick={() => handleDelete(t.id)}
                            >
                              <MdDelete />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <UpdateTransaction
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        refreshTransaction={fetchTransactions}
        selectedTransaction={selectedTransaction}
      />
    </div>
  );
}
