import { useRef, useState } from "react";
import { Loader2, AlertCircle, Upload, RefreshCw, Camera } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { toast } from "react-toastify";

const ROBOFLOW_API_KEY = import.meta.env.VITE_ROBOFLOW_API_KEY;
const MODEL_ENDPOINT = import.meta.env.VITE_MODEL_ENDPOINT;

type Prediction = {
  class: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

const CONFIDENCE_THRESHOLD = 0.7;

// Fixed dictionary mappings matching core model output classifications
const pestInfo = {
  ants: {
    risk: "Medium",
    recommendation: "Remove food crumbs, clean surfaces regularly, and seal entry points.",
  },
  aphids: { // Fixed typo from 'asphids'
    risk: "Medium",
    recommendation: "Use insecticidal soap, remove affected leaves, and monitor plants regularly.",
  },
  beetle: {
    risk: "Medium",
    recommendation: "Inspect crops and storage areas, remove infested materials, and use approved pest controls.",
  },
  caterpillar: { // Fixed typo from 'catterpillar'
    risk: "Medium",
    recommendation: "Inspect plants frequently and remove caterpillars before they damage crops.",
  },
  cockroach: {
    risk: "High",
    recommendation: "Maintain sanitation, seal food containers, remove standing water, and use traps if necessary.",
  },
  earthworm: {
    risk: "Low",
    recommendation: "Earthworms are beneficial to soil health and generally do not require treatment.",
  },
  mosquito: { // Fixed typo from 'mosquitio'
    risk: "High",
    recommendation: "Remove stagnant water, clean drainage areas, and use mosquito repellents.",
  },
  slug: { // Fixed typo from 'slu'
    risk: "Medium",
    recommendation: "Reduce moisture, remove hiding spots, and protect plants from feeding damage.",
  },
  termite: {
    risk: "High",
    recommendation: "Inspect wooden structures immediately and seek professional pest control if infestation is suspected.",
  },
};

const Scanner = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setPrediction(null);

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      const pureBase64 = base64.split(",")[1];
      processImageWithRoboflow(pureBase64);
    };
    reader.readAsDataURL(file);
  };

  const processImageWithRoboflow = async (base64Image: string) => {
    if (!MODEL_ENDPOINT || !ROBOFLOW_API_KEY) {
      setError("System configuration missing API parameters.");
      toast.error("Missing Roboflow environment keys.");
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // Swapped domain configuration to standard browser endpoint handling CORS reliably
      const response = await fetch(
        `https://serverless.roboflow.com/${MODEL_ENDPOINT}?api_key=${ROBOFLOW_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: base64Image,
        }
      );

      if (!response.ok) {
        throw new Error(`Roboflow returned verification error status (${response.status})`);
      }

      const data = await response.json();

      if (!data.predictions || data.predictions.length === 0) {
        setError("No pest detected in sample view.");
        toast.info("No pests identified in this image.");
        return;
      }

      const bestPrediction = data.predictions.sort(
        (a: Prediction, b: Prediction) => b.confidence - a.confidence
      )[0];

      if (bestPrediction.confidence < CONFIDENCE_THRESHOLD) {
        setError(
          `Specimen analysis inconclusive. Confidence score low (${Math.round(
            bestPrediction.confidence * 100
          )}%).`
        );
        return;
      }

      setPrediction(bestPrediction);
      toast.success("Specimen analyzed successfully!");
    } catch (err: any) {
      console.error("Roboflow operational failure:", err);
      setError(err?.message || "Unexpected telemetry processing error.");
    } finally {
      setLoading(false);
    }
  };

  const clearScanner = () => {
    setImage(null);
    setPrediction(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const confidenceColor =
    prediction?.confidence && prediction.confidence >= 0.9
      ? "text-emerald-400"
      : prediction?.confidence && prediction.confidence >= 0.75
      ? "text-amber-400"
      : "text-red-400";

  const contentFadeVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" }
    },
    exit: { opacity: 0, y: -8, transition: { duration: 0.15 } }
  };

  // Normalizes matching variations (e.g. mapping "caterpillars" or "slugs" safely)
  const getNormalizedClass = (className: string) => {
    let lookup = className.toLowerCase().trim();
    if (lookup === "catterpillar") return "caterpillar";
    if (lookup === "asphids") return "aphids";
    if (lookup === "mosquitio") return "mosquito";
    if (lookup === "slu") return "slug";
    return lookup;
  };

  const pestKey = prediction ? getNormalizedClass(prediction.class) : "";
  const pestData = pestKey ? pestInfo[pestKey as keyof typeof pestInfo] : null;

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12 select-none">
      <div>
        <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Pest Scanner</h1>
        <p className="text-slate-400 mt-1.5 text-sm font-medium">
          Upload or capture a pest image for rapid system detection.
        </p>
      </div>

      <div className="bg-slate-900 rounded-3xl shadow-xl border border-slate-800/80 p-6">
        <div className="border-2 border-dashed border-slate-800/60 rounded-3xl p-8 flex flex-col items-center justify-center text-center bg-slate-950/40">
          
          <div className="relative w-64 h-64 flex items-center justify-center mb-6">
            <AnimatePresence mode="wait">
              {image ? (
                <motion.div 
                  key="preview-active"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full h-full relative"
                >
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-2xl shadow-md border border-slate-800"
                  />
                  {loading && (
                    <motion.div 
                      initial={{ top: "0%" }}
                      animate={{ top: "100%" }}
                      transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5, ease: "easeInOut" }}
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] pointer-events-none"
                    />
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="preview-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-slate-500 flex flex-col items-center gap-2"
                >
                  <Upload size={32} className="text-slate-600 stroke-[1.5]" />
                  <p className="text-sm font-medium">No image selected or captured</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 border border-slate-700/40 hover:bg-slate-755 text-slate-100 px-5 py-3 rounded-xl text-sm font-bold shadow-md transition-colors cursor-pointer disabled:opacity-50"
            >
              <Upload size={16} />
              Upload Image
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => cameraInputRef.current?.click()}
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-700 text-slate-200 hover:bg-slate-800 px-5 py-3 rounded-xl text-sm font-bold shadow-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              <Camera size={16} />
              Open Camera
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearScanner}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-950/40 border border-red-900/40 text-red-400 hover:bg-red-900 hover:text-white px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer"
            >
              <RefreshCw size={14} />
              Clear
            </motion.button>
          </div>

          <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleImageUpload} />
          <input type="file" accept="image/*" capture="environment" hidden ref={cameraInputRef} onChange={handleImageUpload} />
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl shadow-xl border border-slate-800/80 p-6 min-h-48 relative overflow-hidden">
        <h2 className="text-xl font-bold text-slate-100 mb-4 tracking-tight">Detection Result</h2>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div 
              key="loading-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3"
            >
              <Loader2 className="animate-spin text-emerald-400 stroke-[2.5]" size={28} />
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Analyzing specimen image...</p>
            </motion.div>
          )}

          {error && (
            <motion.div 
              key="error-box"
              variants={contentFadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex items-center gap-3 bg-red-950/30 text-red-400 border border-red-900/40 p-4 rounded-xl text-sm font-medium"
            >
              <AlertCircle size={18} className="shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}

          {!loading && !error && !prediction && (
            <motion.p 
              key="fallback-text"
              variants={contentFadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center text-slate-500 py-8 text-sm font-medium"
            >
              Upload or capture an image to initialize diagnostics.
            </motion.p>
          )}

          {!loading && prediction && (
            <motion.div 
              key="results-table"
              variants={contentFadeVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3.5"
            >
              <div className="flex justify-between border-b border-slate-800/60 pb-2.5 text-sm font-medium">
                <span className="text-slate-400">Detected Classification</span>
                <span className="font-bold text-slate-200 capitalize">{prediction.class}</span>
              </div>

              <div className="flex justify-between border-b border-slate-800/60 pb-2.5 text-sm font-medium">
                <span className="text-slate-400">System Confidence</span>
                <span className={`font-bold ${confidenceColor}`}>{Math.round(prediction.confidence * 100)}%</span>
              </div>

              <div className="flex justify-between border-b border-slate-800/60 pb-2.5 text-sm font-medium">
                <span className="text-slate-400">Risk Severity</span>
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${
                  pestData?.risk === "High"
                    ? "bg-red-950/40 text-red-400 border-red-900/40"
                    : pestData?.risk === "Medium"
                    ? "bg-amber-950/40 text-amber-400 border-amber-900/40"
                    : "bg-emerald-950/40 text-emerald-400 border-emerald-900/40"
                }`}>
                  {pestData?.risk || "Unknown"}
                </span>
              </div>

              <div className="pt-1.5">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Diagnostic Recommendation</p>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {pestData?.recommendation || "No immediate classification match found inside local database matrix."}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scanner;