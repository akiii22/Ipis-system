import {
  LayoutDashboard,
  ScanSearch,
  History,
  Bug,
  LogOut,
  User,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";

const MotionNavLink = motion(NavLink);

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Logged out successfully!");
      navigate("/", { replace: true });
    } catch (error: unknown) {
      console.error("Sidebar logout error:", error);
      toast.error((error as { message?: string })?.message || "Failed to sign out securely.");
    }
  };

  // Cyber active style with blue glow & left pill highlight
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `group relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
      isActive
        ? "bg-gradient-to-r from-blue-600/30 via-blue-500/10 to-transparent text-white border-l-4 border-blue-500 shadow-[inset_0_0_15px_rgba(59,130,246,0.15)] font-semibold"
        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
    }`;

  const getMobileNavClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center transition-all duration-200 cursor-pointer ${
      isActive ? "text-blue-400 font-semibold scale-105" : "text-slate-500 hover:text-slate-400"
    }`;

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-[#050914] border-r border-blue-900/30 flex-col p-5 h-screen sticky top-0 z-40 select-none">
        
        {/* LOGO & HUD HEADER */}
        <div 
          onClick={() => navigate("/dashboard")}
          className="mb-8 flex flex-col items-center text-center cursor-pointer group"
        >
          {/* Logo Frame with Blue HUD Corners */}
          <div className="relative w-16 h-16 mb-2 flex items-center justify-center p-2 rounded-xl bg-slate-950 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-blue-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-blue-400" />
            <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-blue-400" />
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-blue-400" />
            
            <img 
              src="/Logo.jpg" 
              alt="I.P.I.S Logo" 
              className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>

          <h1 className="text-xl font-black text-white tracking-widest">I.P.I.S</h1>
          <p className="text-[10px] text-blue-300/60 font-semibold uppercase tracking-wider mt-0.5">
            Intelligent Pest Identification System
          </p>
        </div>

        {/* NAVIGATION STACK */}
        <nav className="flex flex-col gap-1.5 flex-1">
          <MotionNavLink to="/dashboard" end className={getNavClass} whileHover={{ x: 3 }}>
            <LayoutDashboard size={18} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span>Dashboard</span>
          </MotionNavLink>

          <MotionNavLink to="/dashboard/scanner" className={getNavClass} whileHover={{ x: 3 }}>
            <ScanSearch size={18} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span>Scanner</span>
          </MotionNavLink>

          <MotionNavLink to="/dashboard/history" className={getNavClass} whileHover={{ x: 3 }}>
            <History size={18} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span>History</span>
          </MotionNavLink>

          <MotionNavLink to="/dashboard/library" className={getNavClass} whileHover={{ x: 3 }}>
            <Bug size={18} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span>Pest Library</span>
          </MotionNavLink>

          <MotionNavLink to="/dashboard/account" className={getNavClass} whileHover={{ x: 3 }}>
            <User size={18} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span>Account</span>
          </MotionNavLink>
        </nav>

        {/* LOGOUT BUTTON */}
        <motion.button 
          onClick={handleLogout}
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.98 }}
          className="group mt-auto flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-950/30 transition-colors duration-200 text-red-400 font-semibold cursor-pointer text-sm"
        >
          <LogOut size={18} className="transition-transform duration-200 group-hover:-translate-x-0.5 text-red-400" />
          <span>Logout</span>
        </motion.button>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#050914]/95 backdrop-blur-md border-t border-blue-900/30 flex justify-around items-center py-2.5 md:hidden z-50">
        <NavLink to="/dashboard" end className={getMobileNavClass}>
          <LayoutDashboard size={20} />
          <span className="text-[10px] mt-0.5">Dashboard</span>
        </NavLink>

        <NavLink to="/dashboard/scanner" className={getMobileNavClass}>
          <ScanSearch size={20} />
          <span className="text-[10px] mt-0.5">Scan</span>
        </NavLink>

        <NavLink to="/dashboard/history" className={getMobileNavClass}>
          <History size={20} />
          <span className="text-[10px] mt-0.5">History</span>
        </NavLink>

        <NavLink to="/dashboard/library" className={getMobileNavClass}>
          <Bug size={20} />
          <span className="text-[10px] mt-0.5">Library</span>
        </NavLink>

        <NavLink to="/dashboard/account" className={getMobileNavClass}>
          <User size={20} />
          <span className="text-[10px] mt-0.5">Account</span>
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;