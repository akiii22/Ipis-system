import { useNavigate } from "react-router-dom";
import { User, LogOut, ChevronDown, Loader2, } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useNavbar } from "../hooks/useNavbar";

const Navbar = () => {
  const navigate = useNavigate();

  const {
    dropdownOpen,
    setDropdownOpen,
    dropdownRef,
    email,
    username,
    avatarUrl,
    fetchingUser,
    welcomeName,
    userInitial,
    handleLogout,
  } = useNavbar();

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: -8, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 15 }
    },
    exit: { opacity: 0, y: -6, scale: 0.95, transition: { duration: 0.12, ease: "easeIn" } }
  };

  return (
    <header className="bg-[#030712] border-b border-blue-900/30 px-6 py-4 flex items-center justify-between relative z-40 select-none">
      
      {/* LEFT SIDE: TITLE & WELCOME */}
      <div>
        <h2 className="text-xl font-extrabold text-white tracking-tight">
          Dashboard
        </h2>
        <p className="text-xs text-blue-300/70 font-medium mt-0.5 flex items-center gap-1.5">
          {fetchingUser ? (
            <Loader2 size={12} className="animate-spin text-blue-400" />
          ) : (
            `Welcome back, ${welcomeName}!`
          )}
        </p>
      </div>


      {/* RIGHT SIDE: USER AVATAR & DROPDOWN */}
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setDropdownOpen(!dropdownOpen)}
          disabled={fetchingUser}
          className="flex items-center gap-2.5 focus:outline-none group cursor-pointer disabled:opacity-50"
        >
          <div className="w-10 h-10 rounded-full bg-slate-900 border border-blue-500/40 text-blue-200 flex items-center justify-center font-bold text-sm shadow-[0_0_10px_rgba(59,130,246,0.3)] overflow-hidden transition-all group-hover:border-blue-400">
            {avatarUrl ? (
              <img src={avatarUrl} alt="User profile" className="w-full h-full object-cover" />
            ) : (
              userInitial
            )}
          </div>
          <ChevronDown 
            size={16} 
            className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180 text-blue-300" : "group-hover:text-blue-300"}`} 
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
              className="absolute right-0 mt-3 w-60 bg-[#080d1e] backdrop-blur-md rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-blue-500/30 py-2 z-50 origin-top-right"
            >
              <div className="px-4 py-2.5 border-b border-blue-900/30 mb-1.5">
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Signed in as</p>
                <p className="text-sm font-bold text-slate-100 truncate mt-0.5">
                  {username || "Specimen System User"}
                </p>
                <p className="text-xs text-slate-400 truncate mt-0.5">{email}</p>
              </div>

              <div className="px-1.5 space-y-0.5">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/dashboard/account");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-blue-600/20 hover:text-white rounded-xl transition-all text-left cursor-pointer group/item"
                >
                  <User size={16} className="text-blue-400 group-hover/item:text-blue-300 transition-colors" />
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