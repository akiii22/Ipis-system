import { useState } from "react";
import { Heart, Loader2, Search, X, BookOpen, ScanSearch } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { usePestHistory, type HistoryItem } from "../hooks/usePestHistory";
import { pestInfo, getNormalizedClass } from "../data/pestData";

const PestLibrary = () => {
  const { historyItems, loading, toggleFavorite } = usePestHistory();
  const [search, setSearch] = useState("");
  const [selectedPest, setSelectedPest] = useState<HistoryItem | null>(null);
  const navigate = useNavigate();

  const savedPests = historyItems.filter((item) => item.isFavorited);

  const filteredPests = savedPests.filter((pest) =>
    pest.pestName.toLowerCase().includes(search.toLowerCase())
  );

  const getRiskStyles = (risk: "High" | "Medium" | "Low") => {
    switch (risk) {
      case "High": return "bg-red-950/60 text-red-400 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]";
      case "Medium": return "bg-amber-950/60 text-amber-400 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]";
      case "Low": return "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
      default: return "bg-slate-800 text-slate-400 border border-slate-700";
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
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Saved Pest Library</h1>
        <p className="text-blue-300/60 mt-1.5 text-sm font-medium">Your curated collection of favorited scan instances.</p>
      </div>

      {/* SEARCH BAR */}
      {!loading && savedPests.length > 0 && (
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-blue-400/70" />
          <input
            type="text"
            placeholder="Search saved instances by pest name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#050918] border border-blue-900/40 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500/60 transition-all"
          />
        </div>
      )}

      {/* RENDER INTERFACE GRID */}
      <div className="relative">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div key="loader" className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400">
              <Loader2 className="animate-spin text-cyan-400" size={32} />
              <p className="text-xs font-bold uppercase tracking-widest text-blue-300/80">Loading saved library items...</p>
            </motion.div>
          ) : filteredPests.length === 0 ? (
            <motion.div
              key="empty-library"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-[#070b19]/90 rounded-3xl border border-blue-900/30 p-12 text-center flex flex-col items-center justify-center min-h-[360px] shadow-[0_0_40px_rgba(15,23,42,0.6)]"
            >
              <div className="w-20 h-20 rounded-full bg-rose-950/60 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.25)] mb-4">
                <BookOpen size={36} />
              </div>

              <h3 className="text-xl font-extrabold text-white mb-2">
                {savedPests.length === 0 ? "No Saved Pests Yet" : "No Matching Pests Found"}
              </h3>
              <p className="text-xs text-slate-400 max-w-sm font-medium leading-relaxed mb-6">
                {savedPests.length === 0
                  ? "Favorite scans from your history or scanner to keep quick reference records here."
                  : "Try adjusting your search keywords to locate your saved pest record."}
              </p>

              {savedPests.length === 0 && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/dashboard/history")}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl text-xs font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all cursor-pointer"
                >
                  <ScanSearch size={16} />
                  <span>View Scan History</span>
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div key="grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPests.map((item) => {
                const key = getNormalizedClass(item.pestName);
                const info = pestInfo[key as keyof typeof pestInfo];

                return (
                  <motion.div
                    key={item.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    className="group bg-[#070b19]/90 rounded-2xl border border-blue-900/30 overflow-hidden shadow-lg hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                        <img src={item.imageUrl} alt={item.pestName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <button
                          onClick={() => toggleFavorite(item.id, true)}
                          className="absolute top-3 right-3 bg-slate-950/70 backdrop-blur-md p-2 rounded-full border border-rose-500/40 text-rose-400 hover:scale-110 transition-transform cursor-pointer"
                          title="Remove from Library"
                        >
                          <Heart size={16} className="fill-rose-500 text-rose-500" />
                        </button>
                        <span className={`absolute bottom-3 left-3 px-3 py-0.5 rounded-full text-[10px] font-bold ${getRiskStyles(item.riskLevel)}`}>
                          {item.riskLevel} Risk
                        </span>
                      </div>

                      <div className="p-4 space-y-2">
                        <div>
                          <h3 className="text-lg font-extrabold text-white capitalize group-hover:text-blue-300 transition-colors">
                            {item.pestName}
                          </h3>
                          {info?.scientificName && (
                            <p className="text-xs text-cyan-400 italic font-mono">{info.scientificName}</p>
                          )}
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-2 font-medium leading-relaxed">
                          {info?.recommendation || item.recommendation}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-between border-t border-blue-900/20 mt-2">
                      <span className="text-[11px] font-bold text-blue-400">{item.confidence}% Match</span>
                      <button
                        onClick={() => setSelectedPest(item)}
                        className="text-xs font-bold text-slate-200 hover:text-white bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        Full Report →
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* DETAILS MODAL OVERLAY */}
      <AnimatePresence>
        {selectedPest && (() => {
          const key = getNormalizedClass(selectedPest.pestName);
          const info = pestInfo[key as keyof typeof pestInfo];

          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-50 px-4">
              <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 15 }} transition={{ type: "spring", duration: 0.35, bounce: 0.15 }} className="bg-[#080d22] border border-blue-500/30 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] relative max-h-[90vh] overflow-y-auto">
                <button onClick={() => setSelectedPest(null)} className="absolute top-4 right-5 text-slate-400 cursor-pointer hover:text-white transition-colors">
                  <X size={20} />
                </button>
                
                <div className="overflow-hidden rounded-2xl border border-blue-500/30 h-48 w-full shadow-inner">
                  <img src={selectedPest.imageUrl} alt={selectedPest.pestName} className="w-full h-full object-cover" />
                </div>

                <div className="mt-5 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white tracking-tight capitalize">{selectedPest.pestName}</h2>
                      {info?.scientificName && (
                        <p className="text-xs text-cyan-400 italic font-mono">{info.scientificName}</p>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        toggleFavorite(selectedPest.id, true);
                        setSelectedPest(null);
                      }}
                      className="text-2xl cursor-pointer select-none"
                      title="Remove from Library"
                    >
                      ❤️
                    </button>
                  </div>
                  
                  <div className="flex justify-between text-sm border-b border-blue-900/30 pb-2 font-medium">
                    <span className="text-slate-400">Confidence Match</span> 
                    <span className="font-bold text-white">{selectedPest.confidence}%</span>
                  </div>

                  <div className="flex justify-between text-sm border-b border-blue-900/30 pb-2 font-medium">
                    <span className="text-slate-400">Risk Level</span> 
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getRiskStyles(selectedPest.riskLevel)}`}>{selectedPest.riskLevel}</span>
                  </div>

                  {info?.diseases && (
                    <div>
                      <h3 className="font-bold text-rose-400 text-xs tracking-wide uppercase mb-0.5">Associated Diseases / Hazards</h3>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed">{info.diseases}</p>
                    </div>
                  )}

                  {info?.prevention && (
                    <div>
                      <h3 className="font-bold text-cyan-400 text-xs tracking-wide uppercase mb-0.5">Prevention Strategy</h3>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed">{info.prevention}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="font-bold text-blue-400 text-xs tracking-wide uppercase mb-0.5">Recommended Treatment</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">{selectedPest.recommendation || info?.recommendation}</p>
                  </div>

                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setSelectedPest(null)} className="w-full bg-blue-600/20 border border-blue-500/40 hover:bg-blue-600/30 text-white py-2.5 rounded-xl text-xs font-bold tracking-wide transition-colors cursor-pointer mt-2">
                    Close Summary
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};

export default PestLibrary;