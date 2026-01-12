import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../axios/axios";

import { IoLockClosedOutline } from "react-icons/io5";

import { useState, useEffect } from "react";

export default function Setting() {
  const [info, setInfo] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await api.get("/account");

      setInfo(response.data);
    } catch (err) {
      console.error("Failed to fetch user info: ", err);
    }
  };
  

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="bg-gray-50 p-8 flex-1">
          {/**Heaer Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>

          {/*Profile Section */}
          <div className=" bg-white border border-gray-200 rounded-lg w-full h-auto p-8 mb-8">
            <h3 className="text-lg font-semibold mb-4">Profile</h3>
            <div className="mb-4">
              <label className="text-gray-600">Full Name</label>
              <p>{info.name}</p>
            </div>
            <div className="mb-4">
              <label className="text-gray-600">Email</label>
              <p>{info.email}</p>
            </div>
            <button className="flex items-center gap-1 bg-[#094067] text-white py-2 px-3 rounded-lg cursor-pointer hover:opacity-90">
              <span>
                <IoLockClosedOutline />
              </span>
              Change Password
            </button>
          </div>

          {/*Account Section */}
          <div className=" bg-white border border-gray-200 rounded-lg w-full h-auto p-8">
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <button className="py-2 px-3 mb-2 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-700">
              Delete Account
            </button>
            <p className="text-gray-600">
              Deleting your account is permanent and cannot be undone.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
