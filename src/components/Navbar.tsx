import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, ChevronDown } from "lucide-react";
// Imported motion, AnimatePresence, and type Variants for your TS rules
import { motion, AnimatePresence, type Variants } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Soft spring dropdown variants
  const dropdownVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -8,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 14
      }
    },
    exit: {
      opacity: 0,
      y: -6,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  return (
    <header className="bg-white border-b border-slate-100 shadow-sm px-6 py-4 flex items-center justify-between relative">
      
      {/* LEFT SIDE: LOGO & TITLE GROUP */}
      <div className="flex items-center gap-6">
        <div 
          onClick={() => navigate("/dashboard")} 
          className="cursor-pointer group flex items-center select-none"
        >
          <img 
            src="/Logo.jpg"
            alt="Transforming Lives Logo" 
            className="h-12 w-auto transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>

        <div className="h-8 w-px bg-slate-100 hidden md:block" />

        <div>
          <h2 className="text-xl font-bold text-slate-900 leading-tight">
            Dashboard
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Welcome back, Alex
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: User Avatar & Dropdown Container */}
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 focus:outline-none group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-900 text-white flex items-center justify-center font-bold shadow-inner transition-colors duration-200">
            A
          </div>
          <ChevronDown 
            size={18} 
            className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} 
          />
        </button>

        {/* DROPDOWN MENU - Managed by AnimatePresence for clean exit transitions */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div 
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2.5 z-50 origin-top-right"
            >
              {/* Account Info Header */}
              <div className="px-5 py-2.5 border-b border-slate-100 mb-1">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Signed in as</p>
                <p className="text-sm font-bold text-slate-900 truncate">Alex Mercer</p>
                <p className="text-xs text-slate-500 truncate">alex.m@email.com</p>
              </div>

              {/* Menu Links */}
              <div className="px-2 space-y-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/dashboard/account");
                  }}
                  className="w-full flex items-center gap-3.5 px-3.5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left cursor-pointer"
                >
                  <User size={17} className="text-slate-400" />
                  Account Settings
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/");
                  }}
                  className="w-full flex items-center gap-3.5 px-3.5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left cursor-pointer"
                >
                  <LogOut size={17} className="text-red-400" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </header>
  );
};

export default Navbar;