import { useState } from "react";
import { User, Camera, Shield, ShieldAlert, FileText } from "lucide-react";

const Account = () => {
  // Profile Form States
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  // Password Reset States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
    alert("Profile updated successfully!");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password update logic here
    alert("Password updated successfully!");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Account Settings</h1>
        <p className="text-gray-500 mt-2">Manage your profile configurations and security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: AVATAR & STATS SUMMARY */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col items-center text-center">
            {/* Avatar Circle */}
            <div className="relative group">
              <div className="w-28 h-28 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 overflow-hidden shadow-inner">
                <User size={48} className="text-slate-400" />
              </div>
              {/* Change Avatar Overlay Trigger */}
              <button className="absolute bottom-0 right-0 bg-slate-800 text-white p-2.5 rounded-full shadow-md hover:bg-slate-900 transition cursor-pointer">
                <Camera size={16} />
              </button>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mt-4">{username}</h2>
            <p className="text-sm text-gray-500">{email}</p>

            <div className="w-full border-t border-slate-100 my-4" />

            {/* Quick System Stats */}
            <div className="w-full text-left space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-2">
                  <FileText size={16} className="text-slate-400" /> Account Tier:
                </span>
                <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full text-xs">Standard</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-2">
                  <ShieldAlert size={16} className="text-slate-400" /> Total Scans:
                </span>
                <span className="font-semibold text-slate-800">120 scans</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FORMS FOR UPDATE PROFILE & PASSWORD */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* PROFILE DETAILS CARD */}
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-100 rounded-xl text-slate-700">
                <User size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Profile Information</h2>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">Full Name</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-slate-500 transition-colors text-slate-700 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-slate-500 transition-colors text-slate-700 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold transition cursor-pointer text-sm shadow-md"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>

          {/* CHANGE PASSWORD CARD */}
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-100 rounded-xl text-slate-700">
                <Shield size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Security & Credentials</h2>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-slate-500 transition-colors text-slate-700 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">New Password</label>
                  <input
                    type="password"
                    placeholder="Minimum 8 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-slate-500 transition-colors text-slate-700 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold transition cursor-pointer text-sm shadow-md"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Account;