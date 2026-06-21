// pages/History.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Trash2, Loader2, AlertCircle } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import { usePestHistory, type HistoryItem } from "../hooks/usePestHistory";
import { HistoryStats } from "../components/HistoryStats";

const History = () => {
  const { historyItems, loading, error, toggleFavorite, deleteItem, clearAllHistory } = usePestHistory();
  const [selectedPest, setSelectedPest] = useState<HistoryItem | null>(null);
  const navigate = useNavigate();

  const handleFavoriteClick = async (id: string, currentStatus: boolean) => {
    const isNowFavorited = await toggleFavorite(id, currentStatus);
    
    // If we just favorited it, update our active modal view and slide to library path
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
      case "High": return "bg-red-950/40 text-red-400 border border-red-900/40";
      case "Medium": return "bg-amber-950/40 text-amber-400 border border-amber-900/40";
      case "Low": return "bg-emerald-950/40 text-emerald-400 border border-emerald-900/40";
      default: return "bg-slate-800 text-slate-400 border border-slate-750";
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Scan History</h1>
          <p className="text-slate-400 mt-1.5 text-sm font-medium">Review your previous pest identifications.</p>
        </div>
        {!loading && historyItems.length > 0 && (
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleClearAll} className="bg-red-950/20 border border-red-900/40 text-red-400 hover:bg-red-900 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer">
            Clear All History
          </motion.button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-950/30 text-red-400 border border-red-900/40 p-4 rounded-xl text-sm font-medium">
          <AlertCircle size={18} className="shrink-0" /> <p>{error}</p>
        </div>
      )}

      {!loading && <HistoryStats items={historyItems} />}

      <div className="space-y-3 relative">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div key="loader" className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
              <Loader2 className="animate-spin text-emerald-400" size={32} />
              <p className="text-xs font-bold uppercase tracking-widest">Fetching historical diagnostics...</p>
            </motion.div>
          ) : historyItems.length === 0 ? (
            <motion.div key="empty-view" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="bg-slate-900 rounded-3xl p-12 text-center border border-slate-800/80 shadow-sm bg-slate-950/20">
              <div className="text-slate-500 mb-3 text-5xl">📋</div>
              <h3 className="text-xl font-bold text-slate-100 mb-1">No Scans Yet</h3>
            </motion.div>
          ) : (
            historyItems.map((item) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -30, scale: 0.98, transition: { duration: 0.2 } }} layout className="group bg-slate-900 rounded-2xl shadow-sm border border-slate-800/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:border-slate-700/60">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex-shrink-0">
                    <img src={item.imageUrl} alt={item.pestName} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-200 text-lg group-hover:text-slate-100 transition-colors capitalize">{item.pestName}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-medium mt-1">
                      <span>{item.date}</span> <span>•</span> <span>{item.time}</span> <span>•</span>
                      <span className="text-indigo-400 font-bold bg-indigo-950/50 border border-indigo-900/40 px-2 py-0.5 rounded-md">{item.confidence}% match</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-0 pt-3 sm:pt-0 border-slate-800/60">
                  <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${getRiskBadgeStyles(item.riskLevel)}`}>{item.riskLevel} Risk</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setSelectedPest(item)} className="text-xs font-bold text-slate-300 hover:bg-slate-800 cursor-pointer px-3 py-2 rounded-lg transition-colors flex items-center gap-1 group/btn">
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

      {/* DETAILS MODAL OVERLAY */}
      <AnimatePresence>
        {selectedPest && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 px-4">
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 15 }} transition={{ type: "spring", duration: 0.35, bounce: 0.15 }} className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
              <button onClick={() => setSelectedPest(null)} className="absolute top-4 right-5 text-slate-400 cursor-pointer hover:text-slate-200 font-medium transition-colors text-lg">✕</button>
              <div className="overflow-hidden rounded-2xl border border-slate-800 h-52 w-full shadow-inner">
                <img src={selectedPest.imageUrl} alt={selectedPest.pestName} className="w-full h-full object-cover" />
              </div>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight capitalize">{selectedPest.pestName}</h2>
                  <motion.button whileTap={{ scale: 0.75 }} onClick={() => handleFavoriteClick(selectedPest.id, selectedPest.isFavorited)} className="text-2xl cursor-pointer select-none">
                    {selectedPest.isFavorited ? "❤️" : "🤍"}
                  </motion.button>
                </div>
                <div className="flex justify-between text-sm border-b border-slate-800/60 pb-2.5 font-medium">
                  <span className="text-slate-400">Confidence Match</span> <span className="font-bold text-slate-200">{selectedPest.confidence}%</span>
                </div>
                <div className="flex justify-between text-sm border-b border-slate-800/60 pb-2.5 font-medium">
                  <span className="text-slate-400">Risk Level</span> <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getRiskBadgeStyles(selectedPest.riskLevel)}`}>{selectedPest.riskLevel}</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-300 text-xs tracking-wide uppercase mb-1">Recommended Treatment</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{selectedPest.recommendation}</p>
                </div>
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setSelectedPest(null)} className="w-full bg-slate-800 border border-slate-700/40 hover:bg-slate-750 text-slate-200 py-3 rounded-xl font-bold tracking-wide transition-colors">Close Summary</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default History;