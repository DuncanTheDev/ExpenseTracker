import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

import AOS from "aos";
import "aos/dist/aos.css";

import AddCategoryModal from "../../components/CategoryModal/AddCategory";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../axios/axios";

import { useState, useEffect } from "react";

export default function Category() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  {
    /**Fetch categories */
  }
  const fetchCategory = async () => {
    try {
      const response = await api.get("/categories");

      setCategories(response.data);
    } catch (err) {
      console.error("Failed to fetch categories: ", err);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 500, // Duration of animation in milliseconds
      easing: "ease-in-out", // Easing function
      once: true, // Only animate once (when scrolled into view)
    });

    fetchCategory();
  }, []);

  [
    /**Delete category */
  ];
  const handleDelete = async (id, name) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this category"
    );

    if (!isConfirmed) return;

    try {
      await api.delete(`/category/${id}`);
      toast.success(`${name} deleted successfully!`);
      fetchCategory();
    } catch (err) {
      console.error("Deleted failed: ", err);
    }
  };

  {
    /**filter for income and expense category */
  }
  const incomeCategories = categories.filter((cat) => cat.type === "income");
  const expenseCategories = categories.filter((cat) => cat.type === "expense");
  const totalIncomeCategories = incomeCategories.length;
  const totalExpenseCategories = expenseCategories.length;
  const totalCategories = totalIncomeCategories + totalExpenseCategories;

  return (
    <div>
      {/**toast message */}
      <Toaster position="bottom-right" />

      <Navbar />

      {/**Modal for adding category */}
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshCategory={fetchCategory}
      />

      <div className="flex">
        <Sidebar />

        <main className="bg-gray-50 p-8 flex-1" data-aos="zoom-in">
          {/**Header section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600">
              Organize your transactions with custom categories
            </p>
          </div>

          {/**button to add */}
          <button
            className="w-50 flex items-center justify-center gap-1 bg-[#094067] text-white py-2 rounded-lg cursor-pointer hover:opacity-90 active:bg-[#083156] transition duration-150 mb-6"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="text-lg">
              <IoMdAdd />
            </span>
            Add Category
          </button>

          <div className="grid grid-cols-3 gap-6">
            {/*Income Categories Section */}
            <div className="border border-gray-200 bg-white rounded-md p-2">
              <h3 className="text-lg font-semibold text-green-600 text-center mb-4">
                Income Categories
              </h3>

              {totalIncomeCategories === 0 && (
                <p className="text-center">No income categories</p>
              )}

              {incomeCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between pl-10 pr-10 mb-2"
                >
                  <p>{cat.name}</p>

                  {/**Action button */}
                  <div className="space-x-2">
                    <button className="bg-[#094067] p-1 rounded-md text-white">
                      <MdEdit />
                    </button>
                    <button
                      className="bg-red-600 p-1 rounded-md text-white cursor-pointer"
                      onClick={() => handleDelete(cat.id, cat.name)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/*Expense Categories Section */}
            <div className="border border-gray-200 bg-white rounded-md p-2">
              <h3 className="text-lg font-semibold text-red-600 text-center mb-4">
                Expense Categories
              </h3>

              {totalExpenseCategories === 0 && (
                <p className="text-center">No expense category</p>
              )}

              {expenseCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between pl-10 pr-10 mb-2"
                >
                  <p>{cat.name}</p>

                  {/**Action button */}
                  <div className="space-x-2">
                    <button className="bg-[#094067] p-1 rounded-md text-white">
                      <MdEdit />
                    </button>
                    <button
                      className="bg-red-600 p-1 rounded-md text-white cursor-pointer"
                      onClick={() => handleDelete(cat.id, cat.name)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/*Category Summary Section */}
            <div className="border border-gray-200 bg-white rounded-md p-2">
              <h3 className="text-lg font-semibold text-black text-center mb-4">
                Category Summary
              </h3>
              <div className="flex items-center justify-between pl-10 pr-10 mb-2">
                <p>Total Income Categories:</p>
                <p className="font-semibold">{totalIncomeCategories}</p>
              </div>
              <div className="flex items-center justify-between pl-10 pr-10 mb-2">
                <p>Total Expense Categories:</p>
                <p className="font-semibold">{totalExpenseCategories}</p>
              </div>
              <div className="flex items-center justify-between pl-10 pr-10 mb-2">
                <p>Total Categories:</p>
                <p className="font-semibold">{totalCategories}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
