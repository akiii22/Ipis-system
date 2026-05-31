import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"; // Your Header component
// Imported motion and type Variants to satisfy your verbatimModuleSyntax rules
import { motion, type Variants } from "framer-motion";

const DashboardLayout = () => {
  

  const pageTransitionVariants: Variants = {
    initial: { 
      opacity: 0, 
      y: 12 
    },
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
    <div className="h-screen bg-[#edf7e7] flex overflow-hidden select-none">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Navbar */}
        <Navbar />

        {/* Page Content Container */}
        <motion.main 
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8"
        >
          <Outlet />
        </motion.main>

      </div>
    </div>
  );
};

export default DashboardLayout;