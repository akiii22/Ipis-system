export type Prediction = {
  class: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export const CONFIDENCE_THRESHOLD = 0.7;

export const pestInfo = {
  ants: { risk: "Medium", recommendation: "Remove food crumbs, clean surfaces regularly, and seal entry points." },
  aphid: { risk: "Medium", recommendation: "Use insecticidal soap, remove affected leaves, and monitor plants regularly." },
  beetle: { risk: "Medium", recommendation: "Inspect crops and storage areas, remove infested materials, and use approved pest controls." },
  catterpillar: { risk: "Medium", recommendation: "Inspect plants frequently and remove caterpillars before they damage crops." },
  cockroach: { risk: "High", recommendation: "Maintain sanitation, seal food containers, remove standing water, and use traps if necessary." },
  earthworm: { risk: "Low", recommendation: "Earthworms are beneficial to soil health and generally do not require treatment." },
  mosquito: { risk: "High", recommendation: "Remove stagnant water, clean drainage areas, and use mosquito repellents." },
  slug: { risk: "Medium", recommendation: "Reduce moisture, remove hiding spots, and protect plants from feeding damage." },
  termite: { risk: "High", recommendation: "Inspect wooden structures immediately and seek professional pest control if infestation is suspected." },
};

// Helper to smooth out typos or model classification string differences
export const getNormalizedClass = (className: string): string => {
  const lookup = className.toLowerCase().trim();
  if (lookup === "aphids") return "aphid";
  if (lookup === "caterpillar") return "catterpillar";
  if (lookup === "mosquitio") return "mosquito";
  if (lookup === "slu") return "slug";
  return lookup;
};