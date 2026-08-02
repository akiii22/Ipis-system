import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { 
  Trash2, 
  Loader2, 
  AlertCircle, 
  Search, 
  SlidersHorizontal, 
  ClipboardList, 
  ScanSearch, 
  Lightbulb, 
  Bug, 
  Calendar,
  X
} from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import { usePestHistory, type HistoryItem } from "../hooks/usePestHistory";

const History = () => {
  const { historyItems, loading, error, toggleFavorite, deleteItem, clearAllHistory } = usePestHistory();
  const [selectedPest, setSelectedPest] = useState<HistoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleFavoriteClick = async (id: string, currentStatus: boolean) => {
    const isNowFavorited = await toggleFavorite(id, currentStatus);
    
    if (isNowFavorited) {
      if (selectedPest?.id === id) {
        setSelectedPest((prev) => prev ? { ...prev, isFavorited: true } : null);
      }
      setTimeout(() => navigate("/dashboard/library"), 250);
    } else {
      if (selectedPest?.id === id) {
        setSelectedPest((prev) => prev ? { ...prev, isFavorited: false } : null);
      }
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteItem(id);
    if (success && selectedPest?.id === id) {
      setSelectedPest(null);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to clear your entire scan history?")) {
      await clearAllHistory();
      setSelectedPest(null);
    }
  };

  const getRiskBadgeStyles = (risk: "High" | "Medium" | "Low") => {
    switch (risk) {
      case "High": 
        return "bg-red-950/60 text-red-400 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]";
      case "Medium": 
        return "bg-amber-950/60 text-amber-400 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]";
      case "Low": 
        return "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
      default: 
        return "bg-slate-800 text-slate-400 border border-slate-700";
    }
  };

  const filteredHistory = historyItems.filter((item) =>
    item.pestName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 select-none">
      
      {/* HEADER BAR WITH SEARCH AND FILTERS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Scan History</h1>
          <p className="text-blue-300/60 mt-1 text-sm font-medium">Review your previous pest identifications.</p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Search Input Bar */}
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3.5 text-blue-400/70" />
            <input
              type="text"
              placeholder="Search scans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#050918] border border-blue-900/40 rounded-xl py-2 pl-9 pr-4 text-xs font-medium text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500/60 transition-all w-48 sm:w-64"
            />
          </div>

          {/* Filter Option Button */}
          <button className="p-2.5 bg-[#050918] border border-blue-900/40 hover:border-blue-500/50 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer">
            <SlidersHorizontal size={16} />
          </button>

          {/* Clear All Action */}
          {!loading && historyItems.length > 0 && (
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              onClick={handleClearAll} 
              className="bg-red-950/50 border border-red-500/30 text-red-400 hover:bg-red-900/80 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Clear All
            </motion.button>
          )}
        </div>
      </div>

      {/* ERROR MESSAGE ALERT */}
      {error && (
        <div className="flex items-center gap-3 bg-red-950/40 text-red-400 border border-red-500/40 p-4 rounded-xl text-sm font-medium">
          <AlertCircle size={18} className="shrink-0" /> 
          <p>{error}</p>
        </div>
      )}

      {/* MAIN HISTORY CONTENT CONTAINER */}
      <div className="space-y-3 relative">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div key="loader" className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
              <Loader2 className="animate-spin text-cyan-400" size={32} />
              <p className="text-xs font-bold uppercase tracking-widest text-blue-300/80">Fetching historical diagnostics...</p>
            </motion.div>
          ) : filteredHistory.length === 0 ? (
            
            /* EMPTY SCAN HISTORY STATE CARD */
            <motion.div 
              key="empty-view" 
              initial={{ opacity: 0, scale: 0.96 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.96 }} 
              className="bg-[#070b19]/90 rounded-3xl border border-blue-900/30 p-12 text-center flex flex-col items-center justify-center min-h-[360px] shadow-[0_0_40px_rgba(15,23,42,0.6)]"
            >
              {/* Glowing Clipboard Circle Badge */}
              <div className="w-20 h-20 rounded-full bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-[0_0_25px_rgba(99,102,241,0.25)] mb-4">
                <ClipboardList size={36} />
              </div>

              <h3 className="text-xl font-extrabold text-white mb-2">No Scans Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm font-medium leading-relaxed mb-6">
                You haven't scanned any pests yet.<br />Start scanning to see your history here.
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/dashboard/scanner")}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl text-xs font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all cursor-pointer"
              >
                <ScanSearch size={16} />
                <span>Start Scanning</span>
              </motion.button>
            </motion.div>
          ) : (
            
            /* SCAN HISTORY ITEMS LIST */
            filteredHistory.map((item) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 12 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, x: -30, scale: 0.98, transition: { duration: 0.2 } }} 
                layout 
                className="group bg-[#070b19]/90 rounded-2xl border border-blue-900/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:border-blue-500/40 shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-blue-500/30 flex-shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                    <img src={item.imageUrl} alt={item.pestName} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors capitalize">{item.pestName}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-medium mt-1">
                      <span>{item.date}</span> <span>•</span> <span>{item.time}</span> <span>•</span>
                      <span className="text-blue-400 font-bold bg-blue-950/60 border border-blue-900/50 px-2 py-0.5 rounded-md">{item.confidence}% match</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-0 pt-3 sm:pt-0 border-blue-900/30">
                  <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${getRiskBadgeStyles(item.riskLevel)}`}>{item.riskLevel} Risk</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setSelectedPest(item)} className="text-xs font-bold text-slate-300 hover:bg-blue-600/20 hover:text-white cursor-pointer px-3 py-2 rounded-lg transition-colors flex items-center gap-1 group/btn">
                      Details <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
                    </button>
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleDelete(item.id)} className="p-2 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-950/30 transition-colors cursor-pointer">
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* DID YOU KNOW & QUICK STATS FOOTER PANEL */}
      <div className="bg-[#070b19]/90 rounded-2xl border border-blue-900/30 p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        
        {/* Left: Tip Section */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-[0_0_12px_rgba(59,130,246,0.2)]">
            <Lightbulb size={20} />
          </div>
          <div>
            <p className="text-xs font-extrabold text-blue-300 tracking-wide">Did you know?</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Regular monitoring and early detection help prevent pest infestations.
            </p>
          </div>
        </div>

        {/* Right: Metrics */}
        <div className="flex items-center gap-6 sm:gap-8 divide-x divide-blue-900/40">
          
          {/* Total Scans */}
          <div className="flex items-center gap-3 pl-2">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <ScanSearch size={18} />
            </div>
            <div>
              <p className="text-lg font-black text-white leading-none">{historyItems.length}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Total Scans</p>
            </div>
          </div>

          {/* Pests Detected */}
          <div className="flex items-center gap-3 pl-6">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Bug size={18} />
            </div>
            <div>
              <p className="text-lg font-black text-white leading-none">{historyItems.length}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Pests Detected</p>
            </div>
          </div>

          {/* This Month */}
          <div className="flex items-center gap-3 pl-6">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-lg font-black text-white leading-none">{historyItems.length}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">This Month</p>
            </div>
          </div>

        </div>
      </div>

      {/* DETAILS MODAL OVERLAY */}
      <AnimatePresence>
        {selectedPest && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-50 px-4">
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 15 }} transition={{ type: "spring", duration: 0.35, bounce: 0.15 }} className="bg-[#080d22] border border-blue-500/30 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
              <button onClick={() => setSelectedPest(null)} className="absolute top-4 right-5 text-slate-400 cursor-pointer hover:text-white transition-colors">
                <X size={20} />
              </button>
              
              <div className="overflow-hidden rounded-2xl border border-blue-500/30 h-52 w-full shadow-inner">
                <img src={selectedPest.imageUrl} alt={selectedPest.pestName} className="w-full h-full object-cover" />
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-extrabold text-white tracking-tight capitalize">{selectedPest.pestName}</h2>
                  <motion.button whileTap={{ scale: 0.75 }} onClick={() => handleFavoriteClick(selectedPest.id, selectedPest.isFavorited)} className="text-2xl cursor-pointer select-none">
                    {selectedPest.isFavorited ? "❤️" : "🤍"}
                  </motion.button>
                </div>
                
                <div className="flex justify-between text-sm border-b border-blue-900/30 pb-2.5 font-medium">
                  <span className="text-slate-400">Confidence Match</span> 
                  <span className="font-bold text-white">{selectedPest.confidence}%</span>
                </div>

                <div className="flex justify-between text-sm border-b border-blue-900/30 pb-2.5 font-medium">
                  <span className="text-slate-400">Risk Level</span> 
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getRiskBadgeStyles(selectedPest.riskLevel)}`}>{selectedPest.riskLevel}</span>
                </div>

                <div>
                  <h3 className="font-bold text-blue-400 text-xs tracking-wide uppercase mb-1">Recommended Treatment</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">{selectedPest.recommendation}</p>
                </div>

                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setSelectedPest(null)} className="w-full bg-blue-600/20 border border-blue-500/40 hover:bg-blue-600/30 text-white py-3 rounded-xl font-bold tracking-wide transition-colors cursor-pointer">
                  Close Summary
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default History;