export type Prediction = {
  class: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PestInfoDetails = {
  scientificName: string;
  risk: "High" | "Medium" | "Low";
  recommendation: string;
  prevention: string;
  diseases: string;
};

export const CONFIDENCE_THRESHOLD = 0.6;

export const pestInfo: Record<string, PestInfoDetails> = {
  ants: {
    scientificName: "Formicidae",
    risk: "Medium",
    recommendation: "Remove food crumbs, clean surfaces regularly, and seal entry points.",
    prevention: "Store food in airtight containers, repair water leaks, and seal wall cracks.",
    diseases: "Salmonellosis, E. coli contamination",
  },
  aphid: {
    scientificName: "Aphidoidea",
    risk: "Medium",
    recommendation: "Use insecticidal soap, remove affected leaves, and monitor plants regularly.",
    prevention: "Introduce natural predators (ladybugs), avoid excess nitrogen fertilizer, and use row covers.",
    diseases: "Cucumber Mosaic Virus, Potato Virus Y (plant viral vectors)",
  },
  beetle: {
    scientificName: "Coleoptera",
    risk: "Medium",
    recommendation: "Inspect crops and storage areas, remove infested materials, and use approved pest controls.",
    prevention: "Clear crop residues, rotate crops annually, and keep grain storage areas dry.",
    diseases: "Fungal leaf blights, Bacterial wilt transmission",
  },
  catterpillar: {
    scientificName: "Lepidoptera (Larvae)",
    risk: "Medium",
    recommendation: "Inspect plants frequently and remove caterpillars before they damage crops.",
    prevention: "Install fine mesh netting, encourage predatory birds, and check leaf undersides.",
    diseases: "Contact dermatitis / Lepidopterism (skin irritation from stinging hairs)",
  },
  cockroach: {
    scientificName: "Blattodea",
    risk: "High",
    recommendation: "Maintain sanitation, seal food containers, remove standing water, and use traps if necessary.",
    prevention: "Fix leaking pipes, seal baseboards, dispose of trash daily, and eliminate indoor clutter.",
    diseases: "Salmonellosis, Dysentery, Gastroenteritis, Typhoid, Asthma triggers",
  },
  earthworm: {
    scientificName: "Lumbricina",
    risk: "Low",
    recommendation: "Earthworms are beneficial to soil health and generally do not require treatment.",
    prevention: "No prevention needed; beneficial organism.",
    diseases: "None (Harmless to humans and crop tissue)",
  },
  mosquito: {
    scientificName: "Culicidae",
    risk: "High",
    recommendation: "Remove stagnant water, clean drainage areas, and use mosquito repellents.",
    prevention: "Empty water containers weekly, install window screens, and treat standing water with larvicides.",
    diseases: "Dengue, Malaria, Zika Virus, Chikungunya, Yellow Fever",
  },
  slug: {
    scientificName: "Gastropoda",
    risk: "Medium",
    recommendation: "Reduce moisture, remove hiding spots, and protect plants from feeding damage.",
    prevention: "Water crops in early morning, apply copper tape barriers, and clear damp leaf litter.",
    diseases: "Rat Lungworm Disease (Angiostrongyliasis) via foliage contamination",
  },
  termite: {
    scientificName: "Isoptera",
    risk: "High",
    recommendation: "Inspect wooden structures immediately and seek professional pest control if infestation is suspected.",
    prevention: "Eliminate wood-to-soil contact, slope drainage away from foundation, and reduce subfloor humidity.",
    diseases: "Asthma & allergic reactions (spurred by airborne wood dust/spores)",
  },
};

export const getNormalizedClass = (className: string): string => {
  const lookup = className.toLowerCase().trim();
  if (lookup === "aphids") return "aphid";
  if (lookup === "caterpillar") return "catterpillar";
  if (lookup === "mosquitio") return "mosquito";
  if (lookup === "slu") return "slug";
  return lookup;
};