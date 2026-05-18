import { useState } from "react";

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
  const [historyItems] = useState<HistoryItem[]>(MOCK_HISTORY);

  // MODAL STATE
  const [selectedPest, setSelectedPest] =
    useState<HistoryItem | null>(null);

  // FAVORITES STATE
  const [favorites, setFavorites] = useState<string[]>([]);

  // FAVORITES TOGGLE
  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  };

  // RISK BADGE COLORS
  const getRiskBadgeStyles = (
    risk: "High" | "Medium" | "Low"
  ) => {
    switch (risk) {
      case "High":
        return "bg-red-100 text-red-600 border border-red-200";

      case "Medium":
        return "bg-amber-100 text-amber-600 border border-amber-200";

      case "Low":
        return "bg-green-100 text-green-600 border border-green-200";
    }
  };

  const totalScans = historyItems.length;

  const highRiskCount = historyItems.filter(
    (i) => i.riskLevel === "High"
  ).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-700">
          Scan History
        </h1>

        <p className="text-gray-500 mt-2">
          Review your previous pest identifications and
          risk assessments.
        </p>
      </div>

      {/* STATS */}
      {totalScans > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <span className="text-sm text-gray-400 block font-medium">
              Total Scans
            </span>

            <span className="text-2xl font-bold text-slate-700">
              {totalScans}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <span className="text-sm text-gray-400 block font-medium">
              High Risk Alerts
            </span>

            <span className="text-2xl font-bold text-red-500">
              {highRiskCount}
            </span>
          </div>
        </div>
      )}

      {/* HISTORY LIST */}
      <div className="space-y-4">

        {historyItems.length === 0 ? (

          /* EMPTY STATE */
          <div className="bg-white rounded-3xl shadow-md p-12 text-center border-2 border-dashed border-slate-200">

            <div className="text-gray-400 mb-4 text-5xl">
              📋
            </div>

            <h3 className="text-xl font-semibold text-slate-700 mb-1">
              No Scans Yet
            </h3>

            <p className="text-gray-500 max-w-xs mx-auto">
              Your scan history is empty. Once you scan a
              pest, it will appear here.
            </p>
          </div>

        ) : (

          historyItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-4 border border-slate-100 flex items-center justify-between gap-4"
            >

              {/* LEFT SIDE */}
              <div className="flex items-center gap-4">

                <img
                  src={item.imageUrl}
                  alt={item.pestName}
                  className="w-16 h-16 object-cover rounded-xl bg-slate-100 flex-shrink-0"
                />

                <div>
                  <h3 className="font-bold text-slate-700 text-lg md:text-xl">
                    {item.pestName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 mt-1">

                    <span>{item.date}</span>

                    <span className="hidden sm:inline">
                      •
                    </span>

                    <span>{item.time}</span>

                    <span>•</span>

                    <span className="text-green-600 font-medium">
                      {item.confidence}% match
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskBadgeStyles(
                    item.riskLevel
                  )}`}
                >
                  {item.riskLevel} Risk
                </span>

                <button
                  className="text-xs font-semibold text-green-600 hover:bg-green-50 cursor-pointer px-3 py-2 rounded-lg transition"
                  onClick={() => setSelectedPest(item)}
                >
                  Details →
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {selectedPest && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedPest(null)}
              className="absolute top-1 right-3 text-gray-800 cursor-pointer  hover:text-black text-xl"
            >
              ✕
            </button>

            {/* IMAGE */}
            <img
              src={selectedPest.imageUrl}
              alt={selectedPest.pestName}
              className="w-full h-56 object-cover rounded-2xl"
            />

            {/* CONTENT */}
            <div className="mt-5 space-y-4">


              <div className="flex items-center justify-between">

                <h2 className="text-2xl font-bold text-slate-700">
                  {selectedPest.pestName}
                </h2>

                <button
                  onClick={() =>
                    toggleFavorite(selectedPest.id)
                  }
                  className="text-2xl cursor-pointer"
                >
                  {favorites.includes(selectedPest.id)
                    ? "❤️"
                    : "🤍"}
                </button>
              </div>

              {/* CONFIDENCE */}
              <div className="flex justify-between text-sm">

                <span className="text-gray-500">
                  Confidence
                </span>

                <span className="font-semibold text-green-600">
                  {selectedPest.confidence}%
                </span>
              </div>


              <div className="flex justify-between text-sm">

                <span className="text-gray-500">
                  Risk Level
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskBadgeStyles(
                    selectedPest.riskLevel
                  )}`}
                >
                  {selectedPest.riskLevel} Risk
                </span>
              </div>


              <div>
                <h3 className="font-semibold text-slate-700 mb-1">
                  Description
                </h3>

                <p className="text-sm text-gray-500">
                  This pest may damage crops and should
                  be monitored carefully.
                </p>
              </div>

              {/* TREATMENT */}
              <div>
                <h3 className="font-semibold text-slate-700 mb-1">
                  Recommended Treatment
                </h3>

                <p className="text-sm text-gray-500">
                  Apply appropriate insecticide and
                  maintain sanitation.
                </p>
              </div>

              {/* ACTION BUTTON */}
              <button
                onClick={() => setSelectedPest(null)}
                className="w-full bg-green-600 cursor-pointer hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold mt-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;