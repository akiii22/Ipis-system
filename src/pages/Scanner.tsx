import { useRef } from "react";
import { Loader2, AlertCircle, Upload, RefreshCw, Camera } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { usePestScanner } from "../hooks/usePestScanner";
import { pestInfo, getNormalizedClass } from "../data/pestData";

const Scanner = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const { image, loading, error, prediction, handleImageUpload, clearScanner } = usePestScanner();

  const confidenceColor =
    prediction?.confidence && prediction.confidence >= 0.9
      ? "text-emerald-400"
      : prediction?.confidence && prediction.confidence >= 0.75
      ? "text-amber-400"
      : "text-red-400";

  const contentFadeVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.15 } }
  };

  const normalizedKey = prediction ? getNormalizedClass(prediction.class) : "";
  const pestData = normalizedKey ? pestInfo[normalizedKey as keyof typeof pestInfo] : null;

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
                <motion.div key="preview-active" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full h-full relative">
                  <img src={image} alt="Preview" className="w-full h-full object-cover rounded-2xl shadow-md border border-slate-800" />
                  {loading && (
                    <motion.div initial={{ top: "0%" }} animate={{ top: "100%" }} transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5, ease: "easeInOut" }} className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] pointer-events-none" />
                  )}
                </motion.div>
              ) : (
                <motion.div key="preview-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-slate-500 flex flex-col items-center gap-2">
                  <Upload size={32} className="text-slate-600 stroke-[1.5]" />
                  <p className="text-sm font-medium">No image selected or captured</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => fileInputRef.current?.click()} disabled={loading} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-750 text-slate-100 border border-slate-700/40 px-5 py-3 rounded-xl text-sm font-bold shadow-md transition-colors cursor-pointer disabled:opacity-50">
              <Upload size={16} /> Upload Image
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => cameraInputRef.current?.click()} disabled={loading} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-700 text-slate-200 hover:bg-slate-800 px-5 py-3 rounded-xl text-sm font-bold shadow-sm transition-colors cursor-pointer disabled:opacity-50">
              <Camera size={16} /> Open Camera
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { clearScanner(); if (fileInputRef.current) fileInputRef.current.value = ""; if (cameraInputRef.current) cameraInputRef.current.value = ""; }} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-950/40 border border-red-900/40 text-red-400 hover:bg-red-900 hover:text-white px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer">
              <RefreshCw size={14} /> Clear
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
            <motion.div key="loading-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3">
              <Loader2 className="animate-spin text-emerald-400 stroke-[2.5]" size={28} />
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Analyzing specimen image...</p>
            </motion.div>
          )}

          {error && (
            <motion.div key="error-box" variants={contentFadeVariants} initial="hidden" animate="visible" exit="exit" className="flex items-center gap-3 bg-red-950/30 text-red-400 border border-red-900/40 p-4 rounded-xl text-sm font-medium">
              <AlertCircle size={18} className="shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}

          {!loading && !error && !prediction && (
            <motion.p key="fallback-text" variants={contentFadeVariants} initial="hidden" animate="visible" exit="exit" className="text-center text-slate-500 py-8 text-sm font-medium">
              Upload or capture an image to initialize diagnostics.
            </motion.p>
          )}

          {!loading && prediction && (
            <motion.div key="results-table" variants={contentFadeVariants} initial="hidden" animate="visible" className="space-y-3.5">
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
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${pestData?.risk === "High" ? "bg-red-950/40 text-red-400 border-red-900/40" : pestData?.risk === "Medium" ? "bg-amber-950/40 text-amber-400 border-amber-900/40" : "bg-emerald-950/40 text-emerald-400 border-emerald-900/40"}`}>{pestData?.risk || "Unknown"}</span>
              </div>
              <div className="pt-1.5">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Diagnostic Recommendation</p>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">{pestData?.recommendation || "No immediate recommendation found."}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scanner;