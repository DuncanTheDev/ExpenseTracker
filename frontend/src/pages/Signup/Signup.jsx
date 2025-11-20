import { MdOutlineMail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";
import api from "../../axios/axios.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrMsg("");

    if (!signup.name || !signup.email || !signup.password || !signup.password_confirmation) {
      setErrMsg("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signup.email)) {
      setErrMsg("Invalid email address.");
      return;
    }

    if (signup.password !== signup.password_confirmation) {
      setErrMsg("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("/register", signup);
      console.log("Create account successful:", response.data);
      localStorage.setItem("token", response.data.token);

      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response.status === 401) {
        setErrMsg("Failed to create account.");
      }
    }
  };

  const handleSignin = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-md h-auto  shadow-md w-full max-w-md">
        <div className="flex flex-col text-center mb-6">
          <h1 className="text-2xl text-[#094067] font-bold">ExpenseTracker</h1>
          <p className="text-[#5f6c7b]">Create your account</p>
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="name">Full Name</label>
          <div className="relative">
            <MdOutlinePersonOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5f6c7b] text-2xl" />
            <input
              type="text"
              id="name"
              name="name"
              value={signup.name}
              onChange={handleChange}
              placeholder="Enter Your Full Name"
              className="w-full pl-10 pr-2 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#094067]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="email">Email</label>
          <div className="relative">
            <MdOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5f6c7b] text-2xl" />
            <input
              type="email"
              id="email"
              name="email"
              value={signup.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="w-full pl-10 pr-2 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#094067]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5f6c7b] text-2xl" />
            <input
              type="password"
              id="password"
              name="password"
              value={signup.password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              className="w-full pl-10 pr-2 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#094067]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <label htmlFor="password_confirmation">Confrim Password</label>
          <div className="relative">
            <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5f6c7b] text-2xl" />
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={signup.password_confirmation}
              onChange={handleChange}
              placeholder="Enter Your Password"
              className="w-full pl-10 pr-2 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#094067]"
            />
          </div>
        </div>

        {errMsg && <p className="mb-6 text-center text-red-600">{errMsg}</p>}
        <button
          className="w-full bg-[#094067] text-white py-2 rounded-lg cursor-pointer hover:opacity-90 active:bg-[#083156] transition duration-150 mb-6"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <div className="text-center">
          <p>
            Already have an account?{" "}
            <span
              onClick={handleSignin}
              className="text-[#094067] cursor-pointer hover:text-[#083156]"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
