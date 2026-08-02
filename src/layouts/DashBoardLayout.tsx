import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { motion, type Variants } from "framer-motion";

const DashboardLayout = () => {
  const pageTransitionVariants: Variants = {
    initial: { opacity: 0, y: 12 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8
      }
    }
  };

  return (
    <div className="h-screen bg-[#030712] flex overflow-hidden select-none">
      
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Navbar Header */}
        <Navbar />

        {/* Dynamic Route Content */}
        <motion.main 
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 bg-[radial-gradient(ellipse_100%_100%_at_50%_-10%,rgba(14,165,233,0.08),rgba(255,255,255,0))]"
        >
          <Outlet />
        </motion.main>

      </div>
    </div>
  );
};

export default DashboardLayout;