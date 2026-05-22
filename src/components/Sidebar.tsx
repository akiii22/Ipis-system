import {
  LayoutDashboard,
  ScanSearch,
  History,
  Bug,
  LogOut,
  User, // Successfully integrated for the Account page
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  // Navigation active style logic for desktop items
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-3 rounded-xl transition-all font-medium cursor-pointer ${
      isActive
        ? "bg-slate-800 text-white shadow-md"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  // Navigation active style logic for mobile items
  const getMobileNavClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center transition-colors cursor-pointer ${
      isActive ? "text-slate-800 font-semibold" : "text-slate-400 hover:text-slate-600"
    }`;

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-white shadow-xl flex-col p-6 h-screen sticky top-0">
        
      <div className="mb-10 flex items-center gap-4">
          
          {/* Logo Container */}
          <div className="w-14 h-14 rounded-full overflow-hidden shadow-md border border-slate-200 shrink-0 bg-black flex items-center justify-center">
            {/* Make sure to import your logo at the top, or use the correct path */}
            <img 
              src="/Logo.jpg" 
              alt="I.P.I.S Logo" 
              className="w-full h-full object-cover scale-105" 
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-wide">
              I.P.I.S
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Pest Identification
            </p>
          </div>
        </div>

        {/* Desktop Navigation Link Stack */}
        <nav className="flex flex-col gap-2">
          <NavLink to="/dashboard" end className={getNavClass}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/scanner" className={getNavClass}>
            <ScanSearch size={20} />
            Scanner
          </NavLink>

          <NavLink to="/dashboard/history" className={getNavClass}>
            <History size={20} />
            History
          </NavLink>

          <NavLink to="/dashboard/library" className={getNavClass}>
            <Bug size={20} />
            Pest Library
          </NavLink>

          {/* New Account Link */}
          <NavLink to="/dashboard/account" className={getNavClass}>
            <User size={20} />
            Account
          </NavLink>
        </nav>

        {/* Logout */}
        <button className="mt-auto flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition text-red-500 font-medium cursor-pointer">
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-xl flex justify-around items-center py-2.5 md:hidden z-50">
        <NavLink to="/dashboard" end className={getMobileNavClass}>
          <LayoutDashboard size={22} />
          <span className="text-[10px] mt-0.5">Home</span>
        </NavLink>

        <NavLink to="/dashboard/scanner" className={getMobileNavClass}>
          <ScanSearch size={22} />
          <span className="text-[10px] mt-0.5">Scan</span>
        </NavLink>

        <NavLink to="/dashboard/history" className={getMobileNavClass}>
          <History size={22} />
          <span className="text-[10px] mt-0.5">History</span>
        </NavLink>

        <NavLink to="/dashboard/library" className={getMobileNavClass}>
          <Bug size={22} />
          <span className="text-[10px] mt-0.5">Library</span>
        </NavLink>

        {/* New Mobile Account Entry */}
        <NavLink to="/dashboard/account" className={getMobileNavClass}>
          <User size={22} />
          <span className="text-[10px] mt-0.5">Account</span>
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;