import {
  LayoutDashboard,
  ScanSearch,
  History,
  Bug,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <aside className="hidden md:flex w-64 bg-white shadow-xl flex-col p-6">
          
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-green-700">
            I.P.I.S
          </h1>

          <p className="text-sm text-gray-500">
            Pest Identification
          </p>
        </div>

        <nav className="flex flex-col gap-4">

          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-100 transition"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/scanner"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-100 transition"
          >
            <ScanSearch size={20} />
            Scanner
          </NavLink>

          <NavLink
            to="/dashboard/history"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-100 transition"
          >
            <History size={20} />
            History
          </NavLink>

          <NavLink
            to="/dashboard/library"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-100 transition"
          >
            <Bug size={20} />
            Pest Library
          </NavLink>
        </nav>

        {/* Logout */}
        <button className="mt-auto flex items-center gap-3 p-3 rounded-xl hover:bg-red-100 transition text-red-500">
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg flex justify-around items-center py-3 md:hidden z-50">

        <NavLink
          to="/dashboard"
          className="flex flex-col items-center text-gray-600"
        >
          <LayoutDashboard size={22} />
          <span className="text-xs">Home</span>
        </NavLink>

        <NavLink
          to="/dashboard/scanner"
          className="flex flex-col items-center text-gray-600"
        >
          <ScanSearch size={22} />
          <span className="text-xs">Scan</span>
        </NavLink>

        <NavLink
          to="/dashboard/history"
          className="flex flex-col items-center text-gray-600"
        >
          <History size={22} />
          <span className="text-xs">History</span>
        </NavLink>

        <NavLink
          to="/dashboard/library"
          className="flex flex-col items-center text-gray-600"
        >
          <Bug size={22} />
          <span className="text-xs">Library</span>
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;