import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react";
import { useAuthLogin } from "../hooks/useAuthLogin";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

const LogIn = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    loading,
    handleLoginSubmit,
    handleForgotPassword,
  } = useAuthLogin();

  // Animation Variants Setup
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
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
    <div className="relative min-h-screen overflow-hidden bg-[#030712] flex items-center justify-center px-4 select-none">
      
      {/* Background Ambient Glowing Waves & Hexagon Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />
      
      {/* Glowing Neon Lines Background Effect */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-96 h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Curved Blue Light Trails */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100 200 C 300 100, 400 800, 1500 700" stroke="#3b82f6" strokeWidth="2" fill="none" className="blur-[1px]" />
        <path d="M-100 800 C 500 900, 800 200, 1600 300" stroke="#0ea5e9" strokeWidth="2" fill="none" className="blur-[1px]" />
      </svg>

      {/* GLASS CARD CONTAINER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md backdrop-blur-2xl bg-slate-950/70 border border-blue-500/30 rounded-[32px] shadow-[0_0_50px_-10px_rgba(30,58,138,0.3)] p-8 md:p-10 z-10"
      >
        {/* LOGO & TITLE SECTION */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          {/* IPIS HUD Logo Placeholder */}
          <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <img
              src="/Logo.jpg" 
              alt="IPIS Logo"
              className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]"
              onError={(e) => {
                // Fallback icon if logo image doesn't exist yet
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome Back!
          </h1>
          
          {/* Subtitle with decorative dots/lines */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-blue-500/60" />
            <span className="h-1 w-1 rounded-full bg-blue-400" />
            <p className="text-[10px] text-blue-300/80 font-bold uppercase tracking-widest">
              Intelligent Pest Identification System
            </p>
            <span className="h-1 w-1 rounded-full bg-blue-400" />
            <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-blue-500/60" />
          </div>
        </motion.div>

        {/* FORM CONTAINER */}
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          
          {/* Email Input */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 text-blue-400/80" size={18} />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-blue-900/40 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all text-slate-100 bg-slate-900/60 font-medium placeholder-slate-600 text-sm"
                disabled={loading}
                required
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Password
              </label>
              
              {/* Forgot Password Button */}
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer disabled:opacity-50"
              >
                Forgot Password?
              </button>
            </div>

            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 text-blue-400/80" size={18} />
              <input
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-blue-900/40 rounded-xl py-3 pl-10 pr-11 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all text-slate-100 bg-slate-900/60 font-medium placeholder-slate-600 text-sm"
                disabled={loading}
                required
              />
              
              <motion.button
                type="button"
                whileTap={{ scale: 0.85 }}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </motion.button>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="pt-2">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              className="w-full relative flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3.5 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all cursor-pointer tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? "Signing In..." : "Sign In to Dashboard"}</span>
              {!loading && <ArrowRight size={18} />}
            </motion.button>
          </motion.div>
        </form>

        {/* OR DIVIDER */}
        <motion.div variants={itemVariants} className="relative my-6 flex items-center justify-center">
          <div className="border-t border-slate-800/80 w-full" />
          <span className="bg-[#070c1e] px-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider absolute">
            OR
          </span>
        </motion.div>

        {/* FOOTER SECTION */}
        <motion.p variants={itemVariants} className="text-center text-xs text-slate-400 font-medium">
          Don’t have an account?
          <Link
            to="/register"
            className="ml-1.5 text-blue-400 font-bold hover:text-blue-300 transition-colors"
          >
            Sign Up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LogIn;