import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { IoCard } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen border-r-2 border-gray-200 p-4">
      <div className="mt-3">
        <ul className="space-y-4">
          <li className="pl-3 p-1 font-medium hover:text-[#094067] cursor-pointer">
            <Link to="/dashboard" className="flex items-center gap-1"><span><MdSpaceDashboard/></span> Dashboard</Link>
          </li>
          <li className="pl-3 p-1 font-medium hover:text-[#094067] cursor-pointer">
            <Link to="/transactions" className="flex items-center gap-1"><span><IoCard/></span> Transactions</Link>
          </li>
          <li className="pl-3 p-1 font-medium hover:text-[#094067] cursor-pointer">
            <Link to="/categories" className="flex items-center gap-1"><span><MdCategory/></span> Categories</Link>
          </li>
          <li className="pl-3 p-1 font-medium hover:text-[#094067] cursor-pointer">
            <Link to="/reports" className="flex items-center gap-1"><span><IoDocumentText/></span> Reports</Link>
          </li>
          <li className="pl-3 p-1 font-medium hover:text-[#094067] cursor-pointer">
            <Link to="/settings" className="flex items-center gap-1"><span><IoSettings/></span> Settings</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
