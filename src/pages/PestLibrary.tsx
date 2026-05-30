import { Heart } from "lucide-react";
import { useState } from "react";

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

  const getRiskStyles = (risk: "High" | "Medium" | "Low") => {
    switch (risk) {
      case "High":
        return "bg-red-50 text-red-600 border border-red-100";
      case "Medium":
        return "bg-amber-50 text-amber-600 border border-amber-100";
      case "Low":
        return "bg-emerald-50 text-emerald-600 border border-emerald-100";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Pest Library</h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">
          Browse and learn about detected pests.
        </p>
      </div>

      {/* SEARCH BAR - Dynamic ring transition */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 focus-within:shadow-md focus-within:border-slate-200 transition-all duration-300">
        <input
          type="text"
          placeholder="Search pests by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent p-2 outline-none text-slate-800 placeholder-slate-400 text-sm font-medium"
        />
      </div>

      {/* GRID CONTAINER */}
      {filteredPests.length === 0 ? (
        /* Empty search fall-back layout */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm animate-in fade-in zoom-in-95 duration-200">
          <p className="text-slate-400 font-medium">No pests match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPests.map((pest) => (
            <div
              key={pest.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-100 transition-all duration-300 flex flex-col"
            >
              {/* IMAGE WRAPPER - Image scales safely within bounding box */}
              <div className="w-full h-52 overflow-hidden bg-slate-50 relative">
                <img
                  src={pest.image}
                  alt={pest.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* CARD DATA CONTENT */}
              <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-slate-900 transition-colors">
                        {pest.name}
                      </h2>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                        {pest.category}
                      </p>
                    </div>

                    {/* HEART BUTTON - Click compression & color pop */}
                    <button
                      onClick={() => toggleFavorite(pest.id)}
                      className="p-1.5 rounded-xl hover:bg-slate-50 transition-colors active:scale-75 duration-150 shrink-0"
                    >
                      <Heart
                        size={20}
                        className={`transition-all duration-300 ${
                          favorites.includes(pest.id)
                            ? "fill-red-500 text-red-500 scale-110 drop-shadow-xs"
                            : "text-slate-300 hover:text-slate-400"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="inline-block">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getRiskStyles(pest.riskLevel)}`}>
                      {pest.riskLevel} Risk
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPest(pest)}
                  className="w-full bg-slate-800 hover:bg-slate-900 active:scale-[0.99] transition-all duration-200 text-white py-3 rounded-xl font-bold text-sm shadow-xs cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL WINDOW */}
      {selectedPest && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 px-4 animate-in fade-in duration-200">
          
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-300 ease-out">
            
            {/* CLOSE CROSS - Spins out of view on hover */}
            <button
              onClick={() => setSelectedPest(null)}
              className="absolute top-4 right-5 text-slate-400 hover:text-slate-600 font-medium transition-transform duration-200 hover:rotate-90 text-lg cursor-pointer"
            >
              ✕
            </button>

            <div className="w-full h-52 overflow-hidden rounded-2xl shadow-xs">
              <img
                src={selectedPest.image}
                alt={selectedPest.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                    {selectedPest.name}
                  </h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                    {selectedPest.category}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${getRiskStyles(selectedPest.riskLevel)}`}>
                  {selectedPest.riskLevel} Risk
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 text-xs tracking-wide uppercase mb-1">Description</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {selectedPest.description}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 text-xs tracking-wide uppercase mb-1">Recommended Treatment</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {selectedPest.treatment}
                </p>
              </div>

              <button
                onClick={() => setSelectedPest(null)}
                className="w-full bg-slate-800 hover:bg-slate-900 transition-colors text-white py-3 rounded-xl font-bold tracking-wide shadow-md active:scale-[0.99] mt-2 cursor-pointer"
              >
                Return to Library
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PestLibrary;