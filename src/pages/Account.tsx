import { useState } from "react";
import { User, Camera, Shield, ShieldAlert, FileText } from "lucide-react";
import { motion } from "framer-motion";

const Account = () => {
  // Profile Form States
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  // Password Reset States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password updated successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 select-none">
      {/* HEADER SECTION */}
      <div>
        <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Account Settings</h1>
        <p className="text-slate-400 mt-1.5 text-sm font-medium">
          Manage your profile configurations and security options.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: AVATAR & STATS SUMMARY */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800/80 shadow-sm flex flex-col items-center text-center">
            
            {/* Avatar Circle */}
            <div className="relative group mt-2">
              <div className="w-28 h-28 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 overflow-hidden shadow-inner">
                <User size={48} className="text-slate-500 group-hover:scale-105 transition-transform duration-300" />
              </div>
              {/* Change Avatar Overlay Trigger */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-0 right-0 bg-slate-800 text-slate-200 p-2.5 rounded-full border border-slate-700 shadow-md hover:bg-slate-750 transition-colors cursor-pointer"
              >
                <Camera size={16} />
              </motion.button>
            </div>

            <h2 className="text-xl font-bold text-slate-200 mt-4 tracking-tight">{username}</h2>
            <p className="text-xs text-slate-400 font-medium">{email}</p>

            <div className="w-full border-t border-slate-800/60 my-5" />

            {/* Quick System Stats */}
            <div className="w-full text-left space-y-3.5 mb-2">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-slate-400 flex items-center gap-2">
                  <FileText size={16} className="text-slate-500" /> Account Tier:
                </span>
                <span className="font-bold text-indigo-400 bg-indigo-950/50 border border-indigo-900/40 px-2.5 py-0.5 rounded-md text-xs">
                  Standard
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-slate-400 flex items-center gap-2">
                  <ShieldAlert size={16} className="text-slate-500" /> Total Scans:
                </span>
                <span className="font-bold text-slate-200">120 scans</span>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: FORMS FOR UPDATE PROFILE & PASSWORD */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* PROFILE DETAILS CARD */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800/80 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300">
                <User size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-200 tracking-tight">Profile Information</h2>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border border-slate-800 rounded-xl p-3 outline-none focus:border-slate-600 transition-colors text-slate-200 bg-slate-950/40 font-medium placeholder-slate-600 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-800 rounded-xl p-3 outline-none focus:border-slate-600 transition-colors text-slate-200 bg-slate-950/40 font-medium placeholder-slate-600 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="bg-slate-800 border border-slate-700/40 hover:bg-slate-750 text-slate-200 px-5 py-2.5 rounded-xl font-bold tracking-wide transition-colors text-sm shadow-md cursor-pointer"
                >
                  Save Profile Changes
                </motion.button>
              </div>
            </form>
          </div>

          {/* CHANGE PASSWORD CARD */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800/80 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300">
                <Shield size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-200 tracking-tight">Security & Credentials</h2>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full border border-slate-800 rounded-xl p-3 outline-none focus:border-slate-600 transition-colors text-slate-200 bg-slate-950/40 font-medium placeholder-slate-700 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Minimum 8 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-slate-800 rounded-xl p-3 outline-none focus:border-slate-600 transition-colors text-slate-200 bg-slate-950/40 font-medium placeholder-slate-700 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="bg-slate-800 border border-slate-700/40 hover:bg-slate-750 text-slate-200 px-5 py-2.5 rounded-xl font-bold tracking-wide transition-colors text-sm shadow-md cursor-pointer"
                >
                  Update Password
                </motion.button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Account;