import { Heart } from "lucide-react";
import { useState } from "react";
// Imported motion, AnimatePresence, and type Variants to satisfy your strict TS flags
import { motion, AnimatePresence, type Variants } from "framer-motion";

type Pest = {
  id: string;
  name: string;
  category: string;
  riskLevel: "High" | "Medium" | "Low";
  image: string;
  description: string;
  treatment: string;
};

const MOCK_PESTS: Pest[] = [
  {
    id: "1",
    name: "Aphids",
    category: "Crop Pest",
    riskLevel: "High",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500",
    description: "Aphids are small insects that suck plant sap and damage crops.",
    treatment: "Use neem oil or insecticide spray.",
  },
  {
    id: "2",
    name: "Cockroach",
    category: "Household Pest",
    riskLevel: "High",
    image: "https://images.unsplash.com/photo-1727198634627-645ef5356455?q=80&w=1000",
    description: "Cockroaches spread bacteria and contaminate food.",
    treatment: "Maintain cleanliness and apply pest control.",
  },
  {
    id: "3",
    name: "Ladybug",
    category: "Beneficial Insect",
    riskLevel: "Low",
    image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=500",
    description: "Ladybugs help control harmful insects naturally.",
    treatment: "No treatment needed.",
  },
];

const PestLibrary = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedPest, setSelectedPest] = useState<Pest | null>(null);

  const filteredPests = MOCK_PESTS.filter((pest) =>
    pest.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Translucent dark-mode risk badge tokens
  const getRiskStyles = (risk: "High" | "Medium" | "Low") => {
    switch (risk) {
      case "High":
        return "bg-red-950/40 text-red-400 border border-red-900/40";
      case "Medium":
        return "bg-amber-950/40 text-amber-400 border border-amber-900/40";
      case "Low":
        return "bg-emerald-950/40 text-emerald-400 border border-emerald-900/40";
    }
  };

  // Shared card transition variants for filtering animations
  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.92, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 140, damping: 16 }
    },
    exit: { opacity: 0, scale: 0.92, y: 5, transition: { duration: 0.18 } }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 select-none">
      
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Pest Library</h1>
        <p className="text-slate-400 mt-1.5 text-sm font-medium">
          Browse and learn about detected pests.
        </p>
      </div>

      {/* SEARCH BAR - Premium dark glow transition */}
      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800/80 focus-within:shadow-lg focus-within:border-slate-700/60 transition-all duration-300">
        <input
          type="text"
          placeholder="Search pests by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent p-2 outline-none text-slate-200 placeholder-slate-500 text-sm font-medium"
        />
      </div>

      {/* GRID CONTAINER */}
      <div className="relative">
        <AnimatePresence mode="popLayout">
          {filteredPests.length === 0 ? (
            /* EMPTY SEARCH FALLBACK */
            <motion.div 
              key="empty-search"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-slate-900 rounded-3xl p-12 text-center border border-slate-800/80 shadow-sm bg-slate-950/20"
            >
              <p className="text-slate-400 font-medium text-sm">No pests match your search criteria.</p>
            </motion.div>
          ) : (
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPests.map((pest) => (
                <motion.div
                  key={pest.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout // Enables smooth position swapping when cards around it update
                  className="group bg-slate-900 rounded-3xl overflow-hidden border border-slate-800/80 shadow-sm hover:border-slate-700/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* IMAGE WRAPPER */}
                  <div className="w-full h-52 overflow-hidden bg-slate-950 relative">
                    <img
                      src={pest.image}
                      alt={pest.name}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* CARD DATA CONTENT */}
                  <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h2 className="text-xl font-bold text-slate-200 tracking-tight group-hover:text-slate-100 transition-colors">
                            {pest.name}
                          </h2>
                          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                            {pest.category}
                          </p>
                        </div>

                        {/* HEART FAVORITE BUTTON */}
                        <motion.button
                          whileTap={{ scale: 0.75 }}
                          onClick={() => toggleFavorite(pest.id)}
                          className="p-1.5 rounded-xl hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                        >
                          <Heart
                            size={18}
                            className={`transition-all duration-300 ${
                              favorites.includes(pest.id)
                                ? "fill-red-500 text-red-500 scale-105 drop-shadow-sm"
                                : "text-slate-500 hover:text-slate-400"
                            }`}
                          />
                        </motion.button>
                      </div>

                      <div className="inline-block">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getRiskStyles(pest.riskLevel)}`}>
                          {pest.riskLevel} Risk
                        </span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedPest(pest)}
                      className="w-full bg-slate-800 border border-slate-700/40 hover:bg-slate-750 text-slate-200 py-2.5 rounded-xl font-bold text-sm transition-colors cursor-pointer"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
              
              {/* CLOSE CROSS */}
              <button
                onClick={() => setSelectedPest(null)}
                className="absolute top-4 right-5 text-slate-400 cursor-pointer hover:text-slate-200 font-medium transition-transform duration-200 hover:rotate-90 text-lg"
              >
                ✕
              </button>

              <div className="w-full h-52 overflow-hidden rounded-2xl border border-slate-800 shadow-inner">
                <img
                  src={selectedPest.image}
                  alt={selectedPest.name}
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
                      {selectedPest.name}
                    </h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                      {selectedPest.category}
                    </p>
                  </div>
                  <span className={`px-3 py-0.5 rounded-full text-xs font-bold shrink-0 ${getRiskStyles(selectedPest.riskLevel)}`}>
                    {selectedPest.riskLevel}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-300 text-xs tracking-wide uppercase mb-1">Description</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    {selectedPest.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-300 text-xs tracking-wide uppercase mb-1">Recommended Treatment</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    {selectedPest.treatment}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedPest(null)}
                  className="w-full bg-slate-800 border border-slate-700/40 hover:bg-slate-750 text-slate-200 py-3 rounded-xl font-bold tracking-wide transition-colors cursor-pointer"
                >
                  Return to Library
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PestLibrary;