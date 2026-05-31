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

// Create a motion-enabled NavLink component for smooth framer gestures
const MotionNavLink = motion(NavLink);

const Sidebar = () => {
  const navigate = useNavigate();

  // Clean, dark theme classes for desktop items
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `group flex items-center gap-3 p-3 rounded-xl font-medium transition-colors duration-200 cursor-pointer ${
      isActive
        ? "bg-slate-800 text-slate-100 shadow-lg shadow-slate-950/30"
        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
    }`;

  // Clean, dark theme classes for mobile bottom bar
  const getMobileNavClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center transition-all duration-200 cursor-pointer ${
      isActive ? "text-slate-200 font-semibold scale-105" : "text-slate-500 hover:text-slate-400"
    }`;

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-slate-900 border-r border-slate-800/80 flex-col p-6 h-screen sticky top-0 z-40">
        
        {/* BRAND BLOCK */}
        <div 
          onClick={() => navigate("/dashboard")}
          className="mb-10 flex items-center gap-4 group cursor-pointer select-none"
        >
          {/* Logo Container with micro-rotation */}
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border border-slate-800 shrink-0 bg-slate-950 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <img 
              src="/Logo.jpg" 
              alt="I.P.I.S Logo" 
              className="w-full h-full object-cover scale-105" 
            />
          </div>

          <div>
            <h1 className="text-xl font-black text-slate-100 tracking-wide transition-colors duration-200">
              I.P.I.S
            </h1>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight">
              Pest Identification
            </p>
          </div>
        </div>

        {/* Desktop Navigation Link Stack */}
        <nav className="flex flex-col gap-1.5">
          <MotionNavLink 
            to="/dashboard" 
            end 
            className={getNavClass}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <LayoutDashboard size={18} className="text-slate-400 group-hover:text-slate-200 transition-colors" />
            <span>Dashboard</span>
          </MotionNavLink>

          <MotionNavLink 
            to="/dashboard/scanner" 
            className={getNavClass}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <ScanSearch size={18} className="text-slate-400 group-hover:text-slate-200 transition-colors group-hover:rotate-6" />
            <span>Scanner</span>
          </MotionNavLink>

          <MotionNavLink 
            to="/dashboard/history" 
            className={getNavClass}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <History size={18} className="text-slate-400 group-hover:text-slate-200 transition-colors group-hover:-rotate-6" />
            <span>History</span>
          </MotionNavLink>

          <MotionNavLink 
            to="/dashboard/library" 
            className={getNavClass}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Bug size={18} className="text-slate-400 group-hover:text-slate-200 transition-colors" />
            <span>Pest Library</span>
          </MotionNavLink>

          <MotionNavLink 
            to="/dashboard/account" 
            className={getNavClass}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <User size={18} className="text-slate-400 group-hover:text-slate-200 transition-colors" />
            <span>Account</span>
          </MotionNavLink>
        </nav>

        {/* Logout Button */}
        <motion.button 
          onClick={() => navigate("/")}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          className="group mt-auto flex items-center gap-3 p-3 rounded-xl hover:bg-red-950/30 transition-colors duration-200 text-red-400 font-medium cursor-pointer text-sm"
        >
          <LogOut size={18} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>Logout</span>
        </motion.button>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 flex justify-around items-center py-2 md:hidden z-50">
        <NavLink to="/dashboard" end className={getMobileNavClass}>
          <LayoutDashboard size={20} />
          <span className="text-[10px] mt-0.5">Home</span>
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