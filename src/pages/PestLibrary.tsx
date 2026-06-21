// pages/PestLibrary.tsx
import { Heart, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { usePestHistory, type HistoryItem } from "../hooks/usePestHistory";

const PestLibrary = () => {
  const { historyItems, loading, toggleFavorite } = usePestHistory();
  const [search, setSearch] = useState("");
  const [selectedPest, setSelectedPest] = useState<HistoryItem | null>(null);

  // Filter out history entries that are favorited by the user
  const savedPests = historyItems.filter((item) => item.isFavorited);

  // Add search filter overlay capability inside the favorited subcollection
  const filteredPests = savedPests.filter((pest) =>
    pest.pestName.toLowerCase().includes(search.toLowerCase())
  );

  const getRiskStyles = (risk: "High" | "Medium" | "Low") => {
    switch (risk) {
      case "High": return "bg-red-950/40 text-red-400 border border-red-900/40";
      case "Medium": return "bg-amber-950/40 text-amber-400 border border-amber-900/40";
      case "Low": return "bg-emerald-950/40 text-emerald-400 border border-emerald-900/40";
      default: return "bg-slate-800 text-slate-400 border border-slate-750";
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.92, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 140, damping: 16 } },
    exit: { opacity: 0, scale: 0.92, y: 5, transition: { duration: 0.18 } }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 select-none">
      <div>
        <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Saved Pest Library</h1>
        <p className="text-slate-400 mt-1.5 text-sm font-medium">Your curated collection of favorited scan instances.</p>
      </div>

      {/* SEARCH BAR */}
      {!loading && savedPests.length > 0 && (
        <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800/80 focus-within:shadow-lg focus-within:border-slate-700/60 transition-all duration-300">
          <input type="text" placeholder="Search saved instances by name..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-transparent p-2 outline-none text-slate-200 placeholder-slate-500 text-sm font-medium" />
        </div>
      )}

      {/* RENDER INTERFACE GRID */}
      <div className="relative">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div key="loader" className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400">
              <Loader2 className="animate-spin text-emerald-400" size={32} />
              <p className="text-xs font-bold uppercase tracking-widest">Loading favorites data...</p>
            </motion.div>
          ) : savedPests.length === 0 ? (
            
            /* DYNAMIC FALLBACK: No favorites found text */
            <motion.div key="empty-library" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="bg-slate-900 rounded-3xl p-16 text-center border border-slate-800/80 bg-slate-950/20 shadow-sm max-w-xl mx-auto">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-slate-100 mb-1.5">No Favorites Added</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Your pest library is empty. Go to your <span className="text-emerald-400 font-bold">Scan History</span> log, open an item's details, and tap the heart icon to add your scanned specimens here.
              </p>
            </motion.div>
          ) : filteredPests.length === 0 ? (
            <motion.div key="empty-search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-slate-900 rounded-3xl p-12 text-center border border-slate-800/80 shadow-sm text-slate-400 font-medium text-sm bg-slate-950/20">
              No saved items match "{search}".
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPests.map((pest) => (
                <motion.div key={pest.id} variants={cardVariants} initial="hidden" animate="visible" exit="exit" layout className="group bg-slate-900 rounded-3xl overflow-hidden border border-slate-800/80 shadow-sm hover:border-slate-700/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className="w-full h-52 overflow-hidden bg-slate-950 relative">
                    <img src={pest.imageUrl} alt={pest.pestName} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                  </div>
                  <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h2 className="text-xl font-bold text-slate-200 tracking-tight group-hover:text-slate-100 transition-colors capitalize">{pest.pestName}</h2>
                          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">{pest.date} • {pest.time}</p>
                        </div>
                        {/* Instant Un-favorite toggle */}
                        <motion.button whileTap={{ scale: 0.75 }} onClick={() => toggleFavorite(pest.id, pest.isFavorited)} className="p-1.5 rounded-xl hover:bg-slate-800 transition-colors shrink-0 cursor-pointer">
                          <Heart size={18} className="fill-red-500 text-red-500 scale-105 drop-shadow-sm" />
                        </motion.button>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getRiskStyles(pest.riskLevel)}`}>{pest.riskLevel} Risk</span>
                        <span className="text-xs text-indigo-400 font-bold bg-indigo-950/50 border border-indigo-900/40 px-2 py-0.5 rounded-md">{pest.confidence}% match</span>
                      </div>
                    </div>
                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setSelectedPest(pest)} className="w-full bg-slate-800 border border-slate-700/40 hover:bg-slate-750 text-slate-200 py-2.5 rounded-xl font-bold text-sm transition-colors cursor-pointer">View Details</motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* DETAILS MODAL OVERLAY */}
      <AnimatePresence>
        {selectedPest && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 px-4">
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 15 }} transition={{ type: "spring", duration: 0.35, bounce: 0.15 }} className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
              <button onClick={() => setSelectedPest(null)} className="absolute top-4 right-5 text-slate-400 cursor-pointer hover:text-slate-200 font-medium transition-transform duration-200 hover:rotate-90 text-lg">✕</button>
              <div className="w-full h-52 overflow-hidden rounded-2xl border border-slate-800 shadow-inner">
                <img src={selectedPest.imageUrl} alt={selectedPest.pestName} className="w-full h-full object-cover" />
              </div>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight capitalize">{selectedPest.pestName}</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Scanned on {selectedPest.date} at {selectedPest.time}</p>
                  </div>
                  <span className={`px-3 py-0.5 rounded-full text-xs font-bold shrink-0 ${getRiskStyles(selectedPest.riskLevel)}`}>{selectedPest.riskLevel}</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-300 text-xs tracking-wide uppercase mb-1">Recommended Treatment</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{selectedPest.recommendation}</p>
                </div>
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setSelectedPest(null)} className="w-full bg-slate-800 border border-slate-700/40 hover:bg-slate-750 text-slate-200 py-3 rounded-xl font-bold tracking-wide transition-colors cursor-pointer">Return to Library</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PestLibrary;