import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import api from "../../axios/axios";
import toast, { Toaster } from "react-hot-toast";

export default function AddCategory({ isOpen, onClose, refreshCategory }) {
  const [category, setCategory] = useState({
    name: "",
    type: "expense",
  });
  const [errMsg, setErrMsg] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  {/**Adding category */}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    if (!category.name) {
      setErrMsg("Category name is required!");
      return;
    }

    try {
      const response = await api.post("/category", category);

      console.log("Category added successfully:", response.data);
      onClose();
      refreshCategory();
      toast.success("Added category successfully");
    } catch (err) {
      console.error("Add category failed:", err);
      setErrMsg("Failed to add category.");
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

        <h2 className="text-xl font-semibold mt-4 mb-3">Add Category</h2>

        {/*Category name section */}
        <div className="mb-4">
          <label className="block mb-1 text-[#5f6c7b]">Category Name</label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            placeholder="Enter category name"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#094067] bg-white"
          />
        </div>

        {/*Category type section */}
        <div className="mb-6">
          <label className="block mb-1 text-[#5f6c7b]">Category Type</label>
          <select
            name="type"
            value={category.type}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#094067] bg-white"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        {/*Error message */}
        {errMsg && <p className="text-center text-red-500 mb-4">{errMsg}</p>}

        {/*Submit button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleSubmit}
            className="w-40 bg-[#094067] text-white py-2 rounded-lg cursor-pointer hover:opacity-90 active:bg-[#083156] transition duration-150"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
