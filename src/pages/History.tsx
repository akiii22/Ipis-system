import { useState } from "react";
import { Trash2 } from "lucide-react"; 

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

  const getRiskBadgeStyles = (risk: "High" | "Medium" | "Low") => {
    switch (risk) {
      case "High":
        return "bg-red-50 text-red-600 border border-red-100";
      case "Medium":
        return "bg-amber-50 text-amber-600 border border-amber-100";
      case "Low":
        return "bg-slate-50 text-slate-600 border border-slate-100";
    }
  };

  const totalScans = historyItems.length;
  const highRiskCount = historyItems.filter((i) => i.riskLevel === "High").length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Scan History</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Review your previous pest identifications and risk assessments.
          </p>
        </div>

        {totalScans > 0 && (
          <button
            onClick={clearAllHistory}
            className="self-start sm:self-center border border-red-200 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer"
          >
            Clear All History
          </button>
        )}
      </div>

      {/* STATS SECTION */}
      {totalScans > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md">
            <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Total Scans</span>
            <span className="text-3xl font-extrabold text-slate-800 mt-1 block tracking-tight">{totalScans}</span>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md">
            <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">High Risk Alerts</span>
            <span className="text-3xl font-extrabold text-red-500 mt-1 block tracking-tight">{highRiskCount}</span>
          </div>
        </div>
      )}

      {/* HISTORY ITEMS */}
      <div className="space-y-3">
        {historyItems.length === 0 ? (
          
          /* EMPTY STATE DISPLAY - Added bounce entrance */
          <div className="bg-white rounded-3xl shadow-sm p-12 text-center border-2 border-dashed border-slate-200 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-gray-400 mb-4 text-5xl animate-bounce duration-1000">📋</div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">No Scans Yet</h3>
            <p className="text-sm text-slate-500 max-w-xs mx-auto font-medium">
              Your scan history is empty. Once you scan a pest, it will appear here.
            </p>
          </div>
        ) : (
          historyItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-slate-200 transition-all duration-300 p-4 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* LEFT CONTAINER (Pest Info) */}
              <div className="flex items-center gap-4">
                {/* Image Container with scale logic */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-inner">
                  <img
                    src={item.imageUrl}
                    alt={item.pestName}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg group-hover:text-slate-900 transition-colors duration-200">
                    {item.pestName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-medium mt-1">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                    <span>•</span>
                    <span className="text-indigo-600 font-semibold bg-indigo-50/60 px-1.5 py-0.5 rounded-md">
                      {item.confidence}% match
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT CONTAINER (Badges and Item Actions) */}
              <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-0 pt-3 sm:pt-0 border-slate-50">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskBadgeStyles(item.riskLevel)}`}>
                  {item.riskLevel} Risk
                </span>

                <div className="flex items-center gap-1">
                  <button
                    className="text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer px-3 py-2 rounded-lg transition-colors flex items-center gap-1 group/btn"
                    onClick={() => setSelectedPest(item)}
                  >
                    Details 
                    <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
                  </button>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 active:scale-90 transition-all cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DETAILS MODAL OVERLAY */}
      {selectedPest && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 px-4 animate-in fade-in duration-200">
          
          {/* Modal Panel Container - Smooth entrance scaling and slide up */}
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-300 ease-out">
            
            <button
              onClick={() => setSelectedPest(null)}
              className="absolute top-4 right-5 text-slate-400 cursor-pointer hover:text-slate-600 font-medium transition-colors text-lg"
            >
              ✕
            </button>

            <div className="overflow-hidden rounded-2xl shadow-sm h-52 w-full">
              <img
                src={selectedPest.imageUrl}
                alt={selectedPest.pestName}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">{selectedPest.pestName}</h2>
                <button
                  onClick={() => toggleFavorite(selectedPest.id)}
                  className="text-2xl cursor-pointer select-none active:scale-75 transition-transform duration-150"
                >
                  {favorites.includes(selectedPest.id) ? "❤️" : "🤍"}
                </button>
              </div>

              <div className="flex justify-between text-sm border-b border-slate-100 pb-2.5 font-medium">
                <span className="text-slate-400">Confidence Match</span>
                <span className="font-bold text-slate-800">{selectedPest.confidence}%</span>
              </div>

              <div className="flex justify-between text-sm border-b border-slate-100 pb-2.5 font-medium">
                <span className="text-slate-400">Risk Level</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getRiskBadgeStyles(selectedPest.riskLevel)}`}>
                  {selectedPest.riskLevel}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase mb-1">Description</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  This pest may damage crops and should be monitored carefully.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase mb-1">Recommended Treatment</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  Apply appropriate insecticide and maintain sanitation.
                </p>
              </div>

              <button
                onClick={() => setSelectedPest(null)}
                className="w-full bg-slate-800 cursor-pointer hover:bg-slate-900 transition-colors text-white py-3 rounded-xl font-bold tracking-wide shadow-md active:scale-[0.99]"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;