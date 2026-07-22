import { Eye, EyeOff, Lock } from "lucide-react";
import { useResetPassword } from "../hooks/useResetPassword";
import { motion, type Variants } from "framer-motion";

const ResetPassword = () => {
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    loading,
    handleResetPasswordSubmit,
  } = useResetPassword();

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 16,
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 flex items-center justify-center px-4 select-none">
      
      {/* Background Ambient Glows */}
      <div className="absolute w-[450px] h-[450px] bg-indigo-950/20 rounded-full blur-3xl opacity-60 -left-10 top-20 animate-pulse duration-[6000ms]" />
      <div className="absolute w-[400px] h-[400px] bg-slate-900/40 rounded-full blur-3xl opacity-50 -right-10 bottom-20 animate-pulse duration-[5000ms] delay-150" />

      {/* GLASS CARD CONTAINER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md backdrop-blur-xl bg-slate-950/40 border border-slate-800/80 rounded-[32px] shadow-2xl p-8 md:p-10"
      >
        
        {/* TITLE SECTION */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 mb-4 shadow-inner">
            <Lock size={22} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Set New Password
          </h1>
          <p className="mt-2 text-xs text-slate-400 font-medium">
            Please enter and confirm your new account password below.
          </p>
        </motion.div>

        {/* FORM CONTAINER */}
        <form onSubmit={handleResetPasswordSubmit} className="space-y-5">
          
          {/* New Password Input */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              New Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-slate-800 rounded-xl p-3 pr-11 outline-none focus:border-slate-600 transition-colors text-slate-200 bg-slate-950/50 font-medium placeholder-slate-700 text-sm"
                disabled={loading}
                required
              />
              <motion.button
                type="button"
                whileTap={{ scale: 0.85 }}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-500 hover:text-slate-400 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </motion.button>
            </div>
          </motion.div>

          {/* Confirm Password Input */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Confirm New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-slate-800 rounded-xl p-3 outline-none focus:border-slate-600 transition-colors text-slate-200 bg-slate-950/50 font-medium placeholder-slate-700 text-sm"
              disabled={loading}
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="pt-3">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              className="w-full bg-slate-800 border border-slate-700/40 hover:bg-slate-750 text-slate-200 py-3.5 rounded-xl font-bold text-base shadow-md transition-colors cursor-pointer tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating Password..." : "Update Password"}
            </motion.button>
          </motion.div>
        </form>

      </motion.div>
    </div>
  );
};

export default ResetPassword;