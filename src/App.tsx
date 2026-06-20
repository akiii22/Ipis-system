import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { supabase } from "./lib/supabase";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import DashBoardLayout from "./layouts/DashBoardLayout";
import DashBoard from "./pages/DashBoard";
import Scanner from "./pages/Scanner";
import History from "./pages/History";
import PestLibrary from "./pages/PestLibrary";
import Account from "./pages/Account";
import ProtectedRoute from "./routes/ProtectedRoute";
import {ToastContainer} from "react-toastify";
import "react-toastify"
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    // Connect initial asset loader to the real Supabase session evaluation
    const initializeAuth = async () => {
      try {
        await supabase.auth.getSession();
      } catch (err) {
        console.error("Auth initialization error:", err);
      } finally {
        // Drop the splash screen safely after the handshake completes
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Define framer motion variants for the letter reveal sequence
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
            // Updated to matching slate-950 dark entry layer
            className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 select-none"
          >
            {/* Ambient Deep Glow for Premium Presentation */}
            <div className="absolute w-80 h-80 bg-indigo-950/20 rounded-full blur-3xl opacity-60 animate-pulse duration-[4000ms]" />

            {/* STAGGERED TEXT CONTAINER */}
            <motion.div
              variants={textContainerVariants}
              initial="initial"
              animate="animate"
              className="relative flex items-center text-5xl font-black text-slate-100 tracking-wide z-10"
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
              className="relative mt-4 text-xs tracking-widest font-bold text-slate-400 uppercase z-10"
            >
              Intelligent Pest Identification System
            </motion.p>

            {/* MINIMAL LOADING PROGRESS TRACK */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="relative w-24 h-1 bg-slate-900 rounded-full mt-8 overflow-hidden border border-slate-800/40 z-10"
            >
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.4, 
                  ease: "easeInOut" 
                }}
                className="absolute top-0 bottom-0 w-1/2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROUTES WRAPPER - Elements only populate layout context once loader drops out */}
     {!isLoading && (
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          
          {/* Secure System Routes Layer */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashBoardLayout />}>
              <Route index element={<DashBoard />} />
              <Route path="scanner" element={<Scanner />} />
              <Route path="history" element={<History />} />
              <Route path="library" element={<PestLibrary />} />
              <Route path="account" element={<Account />} />
            </Route>
          </Route>
        </Routes>
      )}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
