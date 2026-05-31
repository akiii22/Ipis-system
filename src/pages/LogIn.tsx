import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Imported type Variants to support verbatimModuleSyntax configuration safely
import { motion, type Variants } from "framer-motion";

const LogIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    navigate("/dashboard");
  };

  // 1. Animation Variants Setup
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
        // Orchestrates children items to reveal sequentially
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
    <div className="relative min-h-screen overflow-hidden bg-[#edf7e7] flex items-center justify-center px-4 select-none">
      
      {/* Background Blobs - Fluid loops */}
      <div className="absolute w-80 h-80 bg-green-400 rounded-full blur-3xl opacity-40 left-20 top-40 animate-pulse duration-[4000ms]" />
      <div className="absolute w-80 h-80 bg-lime-300 rounded-full blur-3xl opacity-50 right-20 top-50 animate-pulse duration-[6000ms] delay-75" />
      <div className="absolute w-60 h-60 bg-green-300 rounded-full blur-3xl opacity-40 right-50 bottom-12 animate-pulse duration-[5000ms] delay-150" />

      {/* GLASS CARD CONTAINER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md backdrop-blur-xl bg-white/40 border border-white/60 rounded-[40px] shadow-2xl p-10"
      >
        
        {/* TITLE SECTION */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-700 tracking-wider">
            LOGIN
          </h1>
          <p className="mt-3 text-xs text-slate-500 font-semibold uppercase tracking-widest">
            Intelligent Pest Identification System
          </p>
        </motion.div>

        {/* FORM CONTAINER */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Email Input */}
          <motion.div variants={itemVariants} className="relative group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-2 border-slate-300 py-2 outline-none text-slate-800 font-medium placeholder:text-slate-400 transition-all duration-300 focus:border-slate-700 focus:-translate-y-0.5"
              required
            />
          </motion.div>

          {/* Password Input */}
          <motion.div variants={itemVariants} className="relative flex items-center group">
            <input
              type={showPassword ? "text" : "password"} 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b-2 border-slate-300 py-2 pr-10 outline-none text-slate-800 font-medium placeholder:text-slate-400 transition-all duration-300 focus:border-slate-700 focus:-translate-y-0.5"
              required
            />
            
            {/* Eye Toggle Icon with native gesture compression */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.8 }}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 bottom-2.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </motion.button>
          </motion.div>

          {/* Submit Button - Handled through native framer attributes */}
          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.015, y: -1 }}
              whileTap={{ scale: 0.985, y: 0 }}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/20 transition-colors cursor-pointer tracking-wider"
            >
              SIGN IN
            </motion.button>
          </motion.div>
        </form>

        {/* FOOTER SECTION */}
        <motion.p variants={itemVariants} className="text-center text-sm text-slate-500 mt-8 font-medium">
          Don’t have an account?
          <Link
            to="/register"
            className="ml-2 text-slate-700 font-bold hover:text-slate-900 hover:underline transition-colors duration-200"
          >
            Sign Up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LogIn;