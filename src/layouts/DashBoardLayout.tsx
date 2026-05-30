import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"; // Your Header component

const DashboardLayout = () => {
  return (
    // 1. Changed min-h-screen to h-screen + overflow-hidden to lock viewport height
    <div className="h-screen bg-[#edf7e7] flex overflow-hidden select-none">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Navbar */}
        <Navbar />

        {/* Page Content Container */}
      
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;