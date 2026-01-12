import { IoMdClose } from "react-icons/io";

import { useState, useEffect } from "react";

import api from "../../axios/axios";

export default function UpdateTransaction({
  isOpen,
  onClose,
  refreshTransaction,
  selectedTransaction,
}) {
  if (!isOpen) return null;

  const [transaction, setTransaction] = useState({
    category_id: "",
    description: "",
    amount: 0,
    type: "expense",
    transaction_date: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setTransaction({
      category_id: selectedTransaction.category_id,
      description: selectedTransaction.description,
      amount: selectedTransaction.amount,
      type: selectedTransaction.type,
      transaction_date: selectedTransaction.transaction_date,
    });
  }, [selectedTransaction]);

  {
    /* Fetching categories for the drop down */
  }
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");

        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories: ", err);
      }
    };

    fetchCategories();
  }, []);

  const incomeCategories = categories.filter((cat) => cat.type === "income");
  const expenseCategories = categories.filter((cat) => cat.type === "expense");

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(
        `/transaction/${selectedTransaction.id}`,
        transaction
      );

      console.log(response.data);
      onClose();
      refreshTransaction();
    } catch (err) {
      console.error("Failed to updated transaction: ", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black/60 blackdrop-blur-sm inset-0 fixed z-50">
      <div className="p-5 w-100 bg-white rounded-xl relative">
        {/*Close button */}
        <button
          className="absolute right-3 top-3 text-gray-500 cursor-pointer hover:text-[#094067]"
          onClick={onClose}
        >
          <IoMdClose size={22} />
        </button>

        <h2 className="text-xl font-semibold mt-4 mb-3">Update Transaction</h2>

        {/*Category name section */}
        <div className="mb-4">
          <label className="block mb-1 text-[#5f6c7b]">Amount</label>
          <input
            type="number"
            name="amount"
            value={transaction.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#094067] bg-white"
          />
        </div>

        {/*Descrpition section */}
        <div className="mb-4">
          <label className="block mb-1 text-[#5f6c7b]">Description</label>
          <input
            type="text"
            name="description"
            value={transaction.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#094067] bg-white"
          />
        </div>

        {/*Category type section */}
        <div className="mb-4">
          <label className="block mb-1 text-[#5f6c7b]">Category</label>
          <select
            name="category_id"
            value={transaction.category_id}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#094067] bg-white"
          >
            <option value="">Select Category</option>
            <optgroup label="Expense">
              {expenseCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </optgroup>

            <optgroup label="Income">
              {incomeCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/*Type and date section */}
        <div className="mb-6 flex justify-between gap-4">
          {/*Type section */}
          <div className="flex-1">
            <label className="block mb-1 text-[#5f6c7b]">Type</label>
            <select
              name="type"
              value={transaction.type}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#094067] bg-white"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          {/*Date section */}
          <div className="flex-1">
            <label className="block mb-1 text-[#5f6c7b]">Date</label>
            <input
              type="date"
              name="transaction_date"
              onChange={handleChange}
              value={transaction.transaction_date}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#094067] bg-white"
            />
          </div>
        </div>

        {/*Error message */}
        {/* {errMsg && <p className="text-center text-red-500 mb-4">{errMsg}</p>} */}

        {/*Submit button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleUpdate}
            className="w-40 bg-[#094067] text-white py-2 rounded-lg cursor-pointer hover:opacity-90 active:bg-[#083156] transition duration-150"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
