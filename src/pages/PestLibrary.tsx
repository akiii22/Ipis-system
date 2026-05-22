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
    image:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500",
    description:
      "Aphids are small insects that suck plant sap and damage crops.",
    treatment:
      "Use neem oil or insecticide spray.",
  },

  {
    id: "2",
    name: "Cockroach",
    category: "Household Pest",
    riskLevel: "High",
    image:
      "https://images.unsplash.com/photo-1727198634627-645ef5356455?q=80&w=1000",
    description:
      "Cockroaches spread bacteria and contaminate food.",
    treatment:
      "Maintain cleanliness and apply pest control.",
  },

  {
    id: "3",
    name: "Ladybug",
    category: "Beneficial Insect",
    riskLevel: "Low",
    image:
      "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=500",
    description:
      "Ladybugs help control harmful insects naturally.",
    treatment:
      "No treatment needed.",
  },
];

const PestLibrary = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedPest, setSelectedPest] =
    useState<Pest | null>(null);

  const filteredPests = MOCK_PESTS.filter((pest) =>
    pest.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  };

  const getRiskStyles = (
    risk: "High" | "Medium" | "Low"
  ) => {
    switch (risk) {
      case "High":
        return "bg-red-100 text-red-600";

      case "Medium":
        return "bg-yellow-100 text-yellow-600";

      case "Low":
        return "bg-green-100 text-green-600";
    }
  };

  return (
   <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Pest Library
        </h1>

        <p className="text-gray-500 mt-2">
          Browse and learn about detected pests.
        </p>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-2xl shadow-sm">
        <input
          type="text"
          placeholder="Search pests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}

          className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-slate-500 transition-colors"
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredPests.map((pest) => (
          <div
            key={pest.id}
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition"
          >

            {/* IMAGE */}
            <img
              src={pest.image}
              alt={pest.name}
              className="w-full h-52 object-cover"
            />

            {/* CONTENT */}
            <div className="p-5 space-y-4">

              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {pest.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {pest.category}
                  </p>
                </div>

                <button
                  onClick={() => toggleFavorite(pest.id)}
                >
                  <Heart size={20} className={`flex justify-center items-center ml-4 cursor-pointer ${favorites.includes(pest.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                </button>
              </div>

              {/* RISK */}
              <div className="block">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskStyles(
                    pest.riskLevel
                  )}`}
                >
                  {pest.riskLevel} Risk
                </span>
              </div>

              {/* BUTTON - Changed from Green to Slate Theme */}
              <button
                onClick={() => setSelectedPest(pest)}
                className="w-full bg-slate-800 hover:bg-slate-900 cursor-pointer transition text-white py-3 rounded-xl font-semibold"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedPest && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-3xl p-10 max-w-md w-full relative">

            {/* CLOSE */}
            <button
              onClick={() => setSelectedPest(null)}
              className="absolute top-2 right-3 text-xl cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
            >
              ✕
            </button>

            <img
              src={selectedPest.image}
              alt={selectedPest.name}
              className="w-full h-56 object-cover rounded-2xl"
            />

            {/* CONTENT */}
            <div className="mt-5 space-y-4">

              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">
                  {selectedPest.name}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskStyles(
                    selectedPest.riskLevel
                  )}`}
                >
                  {selectedPest.riskLevel}
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-1">
                  Description
                </h3>
                <p className="text-gray-500 text-sm">
                  {selectedPest.description}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-1">
                  Recommended Treatment
                </h3>
                <p className="text-gray-500 text-sm">
                  {selectedPest.treatment}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PestLibrary;

