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

  // Animation Variants Setup
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
      
      {/* Background Ambient Glows - Translucent dark platform accents */}
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
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
            Sign In
          </h1>
          <p className="mt-2 text-xs text-slate-400 font-medium uppercase tracking-wider">
            Intelligent Pest Identification System
          </p>
        </motion.div>

        {/* FORM CONTAINER */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Input */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-800 rounded-xl p-3 outline-none focus:border-slate-600 transition-colors text-slate-200 bg-slate-950/50 font-medium placeholder-slate-700 text-sm"
              required
            />
          </motion.div>

          {/* Password Input */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-800 rounded-xl p-3 pr-11 outline-none focus:border-slate-600 transition-colors text-slate-200 bg-slate-950/50 font-medium placeholder-slate-700 text-sm"
                required
              />
              
              {/* Eye Toggle Icon with native gesture compression */}
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

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="pt-3">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-slate-800 border border-slate-700/40 hover:bg-slate-750 text-slate-200 py-3.5 rounded-xl font-bold text-base shadow-md transition-colors cursor-pointer tracking-wide"
            >
              Sign In to Dashboard
            </motion.button>
          </motion.div>
        </form>

        {/* FOOTER SECTION */}
        <motion.p variants={itemVariants} className="text-center text-sm text-slate-400 mt-8 font-medium">
          Don’t have an account?
          <Link
            to="/register"
            className="ml-2 text-indigo-400 font-bold hover:text-indigo-300 transition-colors duration-200"
          >
            Sign Up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LogIn;