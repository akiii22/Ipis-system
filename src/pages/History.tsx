
import { useState } from "react";
import { Trash2 } from "lucide-react"; 
// Imported motion, AnimatePresence, and type Variants to satisfy your strict TS flags
import { motion, AnimatePresence, } from "framer-motion";

type HistoryItem = {
  id: string;
  date: string;
  time: string;
  pestName: string;
  confidence: number;
  riskLevel: "High" | "Medium" | "Low";
  imageUrl: string;
};

const MOCK_HISTORY: HistoryItem[] = [
  {
    id: "1",
    date: "May 15, 2026",
    time: "14:32",
    pestName: "Cockroach",
    confidence: 94,
    riskLevel: "High",
    imageUrl:
      "https://images.unsplash.com/photo-1727198634627-645ef5356455?q=80&w=1025&auto=format&fit=crop",
  },
  {
    id: "2",
    date: "May 12, 2026",
    time: "09:15",
    pestName: "Aphids",
    confidence: 88,
    riskLevel: "Medium",
    imageUrl:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=150&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    date: "May 08, 2026",
    time: "18:45",
    pestName: "Ladybug (Beneficial)",
    confidence: 97,
    riskLevel: "Low",
    imageUrl:
      "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=150&auto=format&fit=crop&q=60",
  },
];

const History = () => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(MOCK_HISTORY);
  const [selectedPest, setSelectedPest] = useState<HistoryItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const deleteItem = (id: string) => {
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
    if (selectedPest?.id === id) setSelectedPest(null);
  };

  const clearAllHistory = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your entire scan history? This action cannot be undone."
    );
    if (confirmClear) {
      setHistoryItems([]);
      setSelectedPest(null);
    }
  };

  // Translucent dark-mode risk badge tokens
  const getRiskBadgeStyles = (risk: "High" | "Medium" | "Low") => {
    switch (risk) {
      case "High":
        return "bg-red-950/40 text-red-400 border border-red-900/40";
      case "Medium":
        return "bg-amber-950/40 text-amber-400 border border-amber-900/40";
      case "Low":
        return "bg-slate-800 text-slate-400 border border-slate-750";
    }
  };
  const totalScans = historyItems.length;
  const highRiskCount = historyItems.filter((i) => i.riskLevel === "High").length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 select-none">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Scan History</h1>
          <p className="text-slate-400 mt-1.5 text-sm font-medium">
            Review your previous pest identifications and risk assessments.
          </p>
        </div>

        {totalScans > 0 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={clearAllHistory}
            className="self-start sm:self-center bg-red-950/20 border border-red-900/40 text-red-400 hover:bg-red-900 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            Clear All History
          </motion.button>
        )}
      </div>

      {/* STATS SECTION */}
      {totalScans > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800/80 shadow-sm transition-all duration-300 hover:border-slate-700/50">
            <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider">Total Scans</span>
            <span className="text-3xl font-extrabold text-slate-100 mt-1 block tracking-tight">{totalScans}</span>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800/80 shadow-sm transition-all duration-300 hover:border-slate-700/50">
            <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider">High Risk Alerts</span>
            <span className="text-3xl font-extrabold text-red-400 mt-1 block tracking-tight">{highRiskCount}</span>
          </div>
        </div>
      )}

      {/* HISTORY ITEMS */}
      <div className="space-y-3 relative">
        <AnimatePresence mode="popLayout">
          {historyItems.length === 0 ? (
            
            /* EMPTY STATE DISPLAY */
            <motion.div 
              key="empty-view"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-slate-900 rounded-3xl p-12 text-center border border-slate-800/80 shadow-sm bg-slate-950/20"
            >
              <div className="text-slate-500 mb-3 text-5xl">📋</div>
              <h3 className="text-xl font-bold text-slate-100 mb-1">No Scans Yet</h3>
              <p className="text-sm text-slate-400 max-w-xs mx-auto font-medium">
                Your scan history is empty. Once you scan a pest, it will appear here.
              </p>
            </motion.div>
          ) : (
            historyItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -30, scale: 0.98, transition: { duration: 0.2 } }}
                layout
                className="group bg-slate-900 rounded-2xl shadow-sm border border-slate-800/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:border-slate-700/60"
              >
                {/* LEFT CONTAINER (Pest Info) */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.pestName}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-200 text-lg group-hover:text-slate-100 transition-colors">
                      {item.pestName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-medium mt-1">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.time}</span>
                      <span>•</span>
                      <span className="text-indigo-400 font-bold bg-indigo-950/50 border border-indigo-900/40 px-2 py-0.5 rounded-md">
                        {item.confidence}% match
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT CONTAINER (Badges and Item Actions) */}
                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-0 pt-3 sm:pt-0 border-slate-800/60">
                  <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${getRiskBadgeStyles(item.riskLevel)}`}>
                    {item.riskLevel} Risk
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedPest(item)}
                      className="text-xs font-bold text-slate-300 hover:bg-slate-800 cursor-pointer px-3 py-2 rounded-lg transition-colors flex items-center gap-1 group/btn"
                    >
                      Details 
                      <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
                    </button>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteItem(item.id)}
                      className="p-2 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-950/30 transition-colors cursor-pointer"
                      title="Delete record"
                    >
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
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 px-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
              className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedPest(null)}
                className="absolute top-4 right-5 text-slate-400 cursor-pointer hover:text-slate-200 font-medium transition-colors text-lg"
              >
                ✕
              </button>

              <div className="overflow-hidden rounded-2xl border border-slate-800 h-52 w-full shadow-inner">
                <img
                  src={selectedPest.imageUrl}
                  alt={selectedPest.pestName}
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">{selectedPest.pestName}</h2>
                  <motion.button
                    whileTap={{ scale: 0.75 }}
                    onClick={() => toggleFavorite(selectedPest.id)}
                    className="text-2xl cursor-pointer select-none"
                  >
                    {favorites.includes(selectedPest.id) ? "❤️" : "🤍"}
                  </motion.button>
                </div>

                <div className="flex justify-between text-sm border-b border-slate-800/60 pb-2.5 font-medium">
                  <span className="text-slate-400">Confidence Match</span>
                  <span className="font-bold text-slate-200">{selectedPest.confidence}%</span>
                </div>

                <div className="flex justify-between text-sm border-b border-slate-800/60 pb-2.5 font-medium">
                  <span className="text-slate-400">Risk Level</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getRiskBadgeStyles(selectedPest.riskLevel)}`}>
                    {selectedPest.riskLevel}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-300 text-xs tracking-wide uppercase mb-1">Description</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    This pest may damage crops and should be monitored carefully.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-300 text-xs tracking-wide uppercase mb-1">Recommended Treatment</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    Apply appropriate insecticide and maintain sanitation.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedPest(null)}
                  className="w-full bg-slate-800 border border-slate-700/40 hover:bg-slate-750 text-slate-200 py-3 rounded-xl font-bold tracking-wide transition-colors"
                >
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