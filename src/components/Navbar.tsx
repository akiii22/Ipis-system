import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, ChevronDown } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Closes the dropdown if the user clicks anywhere outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-slate-100 shadow-sm px-6 py-4 flex items-center justify-between relative">
      
      {/* Title block */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Welcome back
        </p>
      </div>

      {/* User Avatar & Dropdown Container */}
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 focus:outline-none group cursor-pointer"
        >
          {/* Changed color from bg-green-500 to bg-slate-800 */}
          <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-900 text-white flex items-center justify-center font-bold shadow-sm transition-colors">
            A
          </div>
          <ChevronDown size={16} className={`text-slate-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {/* DROPDOWN MENU */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Account Info Header */}
            <div className="px-4 py-2 border-b border-slate-100">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Signed in as</p>
              <p className="text-sm font-semibold text-slate-800 truncate">Alex Mercer</p>
            </div>

            {/* Menu Links */}
            <div className="p-1.5 space-y-0.5">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/dashboard/account"); // Redirects to your Account page
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left cursor-pointer"
              >
                <User size={16} className="text-slate-400" />
                Account Settings
              </button>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/");
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left cursor-pointer"
              >
                <LogOut size={16} className="text-red-400" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

    </header>
  );
};

export default Header;