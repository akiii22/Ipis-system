import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { supabase } from "../lib/supabase"; // Import Supabase instance
import {toast} from "react-toastify";
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

  // Handle actual session clearance
  const handleLogout = async () => {
    setDropdownOpen(false);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Note: The ProtectedRoute's onAuthStateChange listener will 
      // automatically catch this event and redirect the user to "/".
      // We explicitly call navigate just to double-ensure execution flow control.
      toast.success("Logged out successfully!");
      navigate("/", { replace: true });
    } catch (error: unknown) {
      console.error("Logout execution error:", error);
      toast.error((error as { message?: string })?.message || "Failed to sign out securely.");
    }
  };

  // Smooth spring dropdown variants
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
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      y: -6,
      scale: 0.95,
      transition: {
        duration: 0.12,
        ease: "easeIn"
      }
    }
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800/80 px-6 py-4 flex items-center justify-between relative z-40">
      
      {/* LEFT SIDE: LOGO & TITLE GROUP */}
      <div className="flex items-center gap-6">
        <div 
          onClick={() => navigate("/dashboard")} 
          className="cursor-pointer group flex items-center select-none"
        >
          <img 
            src="/Logo.jpg"
            alt="Transforming Lives Logo" 
            className="h-11 w-auto transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>

        <div className="h-6 w-px bg-slate-800 hidden md:block" />

        <div>
          <h2 className="text-lg font-bold text-slate-100 leading-tight tracking-tight">
            Dashboard
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Welcome back, Alex
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: User Avatar & Dropdown Container */}
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2.5 focus:outline-none group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-750 border border-slate-700/60 text-slate-200 flex items-center justify-center font-bold text-sm transition-colors duration-200 shadow-inner">
            A
          </div>
          <ChevronDown 
            size={16} 
            className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180 text-slate-200" : "group-hover:text-slate-200"}`} 
          />
        </button>

        {/* DROPDOWN MENU */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div 
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 mt-3 w-60 bg-slate-950/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-800/80 py-2 z-50 origin-top-right"
            >
              <div className="px-4 py-2.5 border-b border-slate-800/60 mb-1.5">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Signed in as</p>
                <p className="text-sm font-bold text-slate-200 truncate mt-0.5">Alex Mercer</p>
                <p className="text-xs text-slate-400 truncate mt-0.5">alex.m@email.com</p>
              </div>

              <div className="px-1.5 space-y-0.5">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/dashboard/account");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/60 hover:text-slate-100 rounded-xl transition-all text-left cursor-pointer group/item"
                >
                  <User size={16} className="text-slate-500 group-hover/item:text-slate-300 transition-colors" />
                  Account Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300 rounded-xl transition-all text-left cursor-pointer group/item"
                >
                  <LogOut size={16} className="text-red-500/70 group-hover/item:text-red-400 transition-colors" />
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