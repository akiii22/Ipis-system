import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// 1. Import Framer Motion features
import { motion, AnimatePresence, type Variants } from "framer-motion";

import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import DashBoardLayout from "./layouts/DashBoardLayout";
import DashBoard from "./pages/DashBoard";
import Scanner from "./pages/Scanner";
import History from "./pages/History";
import PestLibrary from "./pages/PestLibrary";
import Account from "./pages/Account";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulates the initial asset bundle/auth handshake loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2400); // 2.4 seconds loading window

    return () => clearTimeout(timer);
  }, []);

  // 2. Define framer motion variants for the letter reveal sequence
  const textContainerVariants: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.12, // Gap duration between each letter appearing
      },
    },
  };

  const letterVariants: Variants = {
    initial: { opacity: 0, y: 20, scale: 0.8 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 12 } 
    },
  };

  return (
    <>
      {/* AnimatePresence captures the exit fade animation when isLoading turns false */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="app-loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.4, ease: "easeInOut" } 
            }}
            // Uses your custom soft-green system color variable for a perfect blend
            className="fixed inset-0 bg-[#edf7e7] flex flex-col items-center justify-center z-50 select-none"
          >
            {/* STAGGERED TEXT CONTAINER */}
            <motion.div
              variants={textContainerVariants}
              initial="initial"
              animate="animate"
              className="flex items-center text-5xl font-black text-slate-800 tracking-wide"
            >
              {"I.P.I.S".split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* SUBTITLE ENTRY */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-4 text-xs tracking-widest font-bold text-slate-400 uppercase"
            >
              Intelligent Pest Identification System
            </motion.p>

            {/* MINIMAL LOADING PROGRESS TRACK */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="w-24 h-1 bg-slate-200/80 rounded-full mt-8 overflow-hidden relative"
            >
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.4, 
                  ease: "easeInOut" 
                }}
                className="absolute top-0 bottom-0 w-1/2 bg-slate-700 rounded-full shadow-xs"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROUTES WRAPPER - Elements only populate layout context once loader drops out */}
      {!isLoading && (
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashBoardLayout />}>
            <Route index element={<DashBoard />} />
            <Route path="scanner" element={<Scanner />} />
            <Route path="history" element={<History />} />
            <Route path="library" element={<PestLibrary />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default App;
