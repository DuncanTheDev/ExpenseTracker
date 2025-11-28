import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { IoCard } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";

import api from "../../axios/axios";

import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");

      // remove auth token
      localStorage.removeItem("token");

      // navigate to login
      navigate("/");
    } catch (err) {
      console.log("Failed to logout: ", err);
    }
  };

  return (
    <aside className="flex flex-col justify-between w-64 h-screen border-r-2 border-gray-200 p-4 sticky top-0">
      <div className="mt-3">
        <ul className="space-y-4">
          <li className="pl-3 p-1 font-medium hover:text-[#094067] cursor-pointer">
            <Link to="/dashboard" className="flex items-center gap-1">
              <span>
                <MdSpaceDashboard />
              </span>{" "}
              Dashboard
            </Link>
          </li>
          <li className="pl-3 p-1 font-medium hover:text-[#094067] cursor-pointer">
            <Link to="/transactions" className="flex items-center gap-1">
              <span>
                <IoCard />
              </span>{" "}
              Transactions
            </Link>
          </li>
          <li className="pl-3 p-1 font-medium hover:text-[#094067] cursor-pointer">
            <Link to="/categories" className="flex items-center gap-1">
              <span>
                <MdCategory />
              </span>{" "}
              Categories
            </Link>
          </li>
          <li className="pl-3 p-1 font-medium hover:text-[#094067] cursor-pointer">
            <Link to="/reports" className="flex items-center gap-1">
              <span>
                <IoDocumentText />
              </span>{" "}
              Reports
            </Link>
          </li>
          <li className="pl-3 p-1 font-medium hover:text-[#094067] cursor-pointer">
            <Link to="/settings" className="flex items-center gap-1">
              <span>
                <IoSettings />
              </span>{" "}
              Settings
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <button
          className="flex items-center gap-1 pl-3 p-1 font-medium hover:text-[#094067] cursor-pointer"
          onClick={handleLogout}
        >
          <span>
            <IoLogOut />
          </span>{" "}
          Logout
        </button>
      </div>
    </aside>
  );
}
