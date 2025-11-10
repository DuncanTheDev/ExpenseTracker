import { MdOutlineMail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import api from "../../axios/axios.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrMsg("");

    if (!login.email || !login.password) {
      setErrMsg("Email and Password are required!");
      return;
    }

    try {
      const response = await api.post("/login", login);
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response.status === 401) {
        setErrMsg("Invalid email or password.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-md h-auto  shadow-md w-full max-w-md">
        <div className="flex flex-col text-center mb-6">
          <h1 className="text-2xl text-[#094067] font-bold">ExpenseTracker</h1>
          <p className="text-[#5f6c7b]">Sign in to your account</p>
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="">Email</label>
          <div className="relative">
            <MdOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5f6c7b] text-2xl" />
            <input
              type="email"
              id="email"
              name="email"
              value={login.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="w-full pl-10 pr-2 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#094067]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <label htmlFor="">Password</label>
          <div className="relative">
            <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5f6c7b] text-2xl" />
            <input
              type="email"
              id="email"
              value={login.password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              className="w-full pl-10 pr-2 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#094067]"
            />
          </div>
        </div>

        {errMsg && <p className="mb-6 text-center text-red-600">{errMsg}</p>}
        <button
          class="w-full bg-[#094067] text-white py-2 rounded-lg cursor-pointer hover:opacity-90 active:bg-[#083156] transition duration-150 mb-6"
          onClick={handleLogin}
        >
          Sign In
        </button>

        <div className="text-center mb-4">
          <p className="text-[#094067] cursor-pointer hover:text-[#083156]">
            Forgot your password?
          </p>
        </div>
        <div className="text-center">
          <p>
            Don't have an account?{" "}
            <span className="text-[#094067] cursor-pointer hover:text-[#083156]">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
