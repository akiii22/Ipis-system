import { useRef, useState } from "react";
import {
  User,
  Camera,
  Shield,
  ShieldAlert,
  Loader2,
  Moon,
  Sun,
  Mail,
  KeyRound,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAccountSettings } from "../hooks/useAccountSettings";

const Account = () => {
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  
  // Local state for UI preview toggle (replace with theme hook if available)
  const [isDarkMode, setIsDarkMode] = useState(true);

  const {
    username,
    setUsername,
    email,
    avatarUrl,
    totalScans,
    newPassword,
    setNewPassword,
    loading,
    updatingProfile,
    updatingPassword,
    uploadingAvatar,
    handleUpdateProfile,
    handleAvatarUpload,
    handleUpdatePassword,
  } = useAccountSettings();

  if (loading) {
    return (
      <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-indigo-400 stroke-[2.5]" size={36} />
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">
          Synchronizing Account Telemetry...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 select-none">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
            Account Settings
          </h1>
          <p className="text-slate-400 mt-1 text-sm font-medium">
            Manage your personal profile configurations and security preferences.
          </p>
        </div>
        
        <div className="flex items-center gap-2 self-start md:self-auto px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
          <Sparkles size={14} className="text-indigo-400" />
          <span>Account Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: AVATAR & STATS SUMMARY */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800/80 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />

            {/* Avatar Circle Container */}
            <div className="relative group mt-2">
              <div className="w-28 h-28 rounded-full bg-slate-950 border-2 border-slate-800 flex items-center justify-center text-slate-400 overflow-hidden shadow-inner relative group-hover:border-indigo-500/50 transition-colors duration-300">
                {uploadingAvatar ? (
                  <Loader2 className="animate-spin text-indigo-400 stroke-[2]" size={28} />
                ) : avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt="User profile avatar" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <User size={48} className="text-slate-500 group-hover:scale-105 transition-transform duration-300" />
                )}
              </div>

              {/* Change Avatar Overlay Trigger */}
              <motion.button 
                whileHover={{ scale: uploadingAvatar ? 1 : 1.08 }}
                whileTap={{ scale: uploadingAvatar ? 1 : 0.92 }}
                type="button"
                disabled={uploadingAvatar}
                onClick={() => avatarInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-full border-2 border-slate-900 shadow-lg transition-colors cursor-pointer disabled:opacity-50"
                title="Upload Avatar"
              >
                <Camera size={15} />
              </motion.button>
              
              <input 
                type="file" 
                accept="image/jpeg,image/png,image/webp" 
                hidden 
                ref={avatarInputRef} 
                onChange={handleAvatarUpload} 
              />
            </div>

            {/* User Details */}
            <h2 className="text-xl font-bold text-slate-100 mt-4 tracking-tight truncate w-full px-2">
              {username || "User profile name"}
            </h2>
            <p className="text-xs text-slate-400 font-medium truncate w-full px-2 mt-0.5">{email}</p>

            <div className="w-full border-t border-slate-800/80 my-5" />

            {/* Quick System Stats */}
            <div className="w-full">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-2">
                  <ShieldAlert size={16} className="text-indigo-400" /> Total Scans
                </span>
                <span className="text-sm font-bold text-slate-100 px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {totalScans} {totalScans === 1 ? "scan" : "scans"}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: FORMS & PREFERENCES */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* PROFILE DETAILS CARD */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800/80 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-indigo-400">
                <User size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-100 tracking-tight">Profile Information</h2>
                <p className="text-xs text-slate-400">Update your account identity details.</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                    Username / Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={updatingProfile}
                      className="w-full border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 outline-none focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-100 bg-slate-950/60 font-medium placeholder-slate-600 text-sm disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full border border-slate-800/60 text-slate-500 bg-slate-950/30 rounded-xl py-2.5 pl-10 pr-3 outline-none font-medium text-sm cursor-not-allowed select-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <motion.button
                  whileHover={{ scale: updatingProfile ? 1 : 1.01 }}
                  whileTap={{ scale: updatingProfile ? 1 : 0.99 }}
                  type="submit"
                  disabled={updatingProfile}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold tracking-wide transition-colors text-sm shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {updatingProfile && <Loader2 size={16} className="animate-spin" />}
                  {updatingProfile ? "Saving Details..." : "Save Profile Changes"}
                </motion.button>
              </div>
            </form>
          </div>

          {/* APPEARANCE CARD */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800/80 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-indigo-400">
                <Moon size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-100 tracking-tight">Appearance</h2>
                <p className="text-xs text-slate-400">Customize how the interface looks on your device.</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-800/80 bg-slate-950/60">
              <div>
                <p className="text-sm font-semibold text-slate-200">Dark Mode</p>
                <p className="text-xs text-slate-400 mt-0.5">Switch between dark and light themes.</p>
              </div>

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`relative w-16 h-9 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                  isDarkMode ? "bg-indigo-950 border border-indigo-500/30" : "bg-slate-800 border border-slate-700"
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md ${
                    isDarkMode ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-900"
                  }`}
                  style={{
                    marginLeft: isDarkMode ? "auto" : "0",
                  }}
                >
                  {isDarkMode ? <Moon size={14} /> : <Sun size={14} />}
                </motion.div>
              </button>
            </div>
          </div>

          {/* SECURITY CARD */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800/80 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-indigo-400">
                <Shield size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-100 tracking-tight">Security & Credentials</h2>
                <p className="text-xs text-slate-400">Update password and secure your authentication details.</p>
              </div>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  New Password
                </label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={updatingPassword}
                    className="w-full border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 outline-none focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-100 bg-slate-950/60 font-medium placeholder-slate-600 text-sm disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <motion.button
                  whileHover={{ scale: updatingPassword ? 1 : 1.01 }}
                  whileTap={{ scale: updatingPassword ? 1 : 0.99 }}
                  type="submit"
                  disabled={updatingPassword}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/60 px-5 py-2.5 rounded-xl font-semibold tracking-wide transition-colors text-sm shadow-md cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {updatingPassword && <Loader2 size={16} className="animate-spin" />}
                  {updatingPassword ? "Updating Password..." : "Update Password"}
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