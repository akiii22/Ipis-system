import { useRef } from "react";
import { Loader2, AlertCircle, Upload, RefreshCw, Camera, Search, FileSearch, Bug } from "lucide-react";
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
    <div className="space-y-6 max-w-5xl mx-auto pb-12 select-none">
      
      {/* MAIN SCANNER CONTAINER */}
      <div className="relative overflow-hidden bg-[#070b19]/90 rounded-3xl border border-blue-900/30 shadow-[0_0_40px_rgba(15,23,42,0.6)] p-6 md:p-8">
        
        {/* HEADER SECTION WITH TOP-RIGHT HUD TARGET */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Pest Scanner</h1>
            <p className="text-blue-300/60 mt-1.5 text-sm font-medium">
              Upload or capture a pest image for rapid system detection.
            </p>
          </div>

          {/* HUD Bug Target Element */}
          <div className="hidden sm:flex relative w-16 h-16 items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-blue-500/10 rounded-xl border border-blue-400/30 blur-[1px]" />
            <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400" />
            <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400" />
            <Bug size={26} className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          </div>
        </div>

        {/* DASHED UPLOAD DROPZONE CARD */}
        <div className="border-2 border-dashed border-blue-900/40 rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center text-center bg-[#030612]/60">
          
          <div className="relative w-full max-w-sm h-64 flex items-center justify-center mb-6">
            <AnimatePresence mode="wait">
              {image ? (
                <motion.div 
                  key="preview-active" 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.95 }} 
                  className="w-full h-full relative rounded-2xl overflow-hidden border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                >
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  
                  {/* Laser Scanning Line Overlay */}
                  {loading && (
                    <motion.div 
                      initial={{ top: "0%" }} 
                      animate={{ top: "100%" }} 
                      transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5, ease: "easeInOut" }} 
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] pointer-events-none" 
                    />
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="preview-empty" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  className="flex flex-col items-center justify-center gap-3"
                >
                  {/* Glowing Circular Upload Icon */}
                  <div className="w-16 h-16 rounded-full bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)] mb-1">
                    <Upload size={28} />
                  </div>
                  <p className="text-slate-200 font-bold text-sm">No image selected or captured</p>
                  <p className="text-[11px] text-slate-500 font-medium">Supported formats: JPG, PNG, WEBP (Max. 10MB)</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ACTION BUTTONS GROUP */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
            
            {/* Upload Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              onClick={() => fileInputRef.current?.click()} 
              disabled={loading} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-3 rounded-xl text-xs font-bold shadow-[0_0_20px_rgba(37,99,235,0.35)] transition-all cursor-pointer disabled:opacity-50"
            >
              <Upload size={16} /> Upload Image
            </motion.button>

            {/* Camera Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              onClick={() => cameraInputRef.current?.click()} 
              disabled={loading} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#080e22] border border-blue-900/50 hover:border-blue-500/40 text-slate-200 px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              <Camera size={16} /> Open Camera
            </motion.button>

            {/* Clear Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              onClick={() => { 
                clearScanner(); 
                if (fileInputRef.current) fileInputRef.current.value = ""; 
                if (cameraInputRef.current) cameraInputRef.current.value = ""; 
              }} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-950/50 border border-red-500/40 text-red-400 hover:bg-red-900/80 hover:text-white px-5 py-3 rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-all cursor-pointer"
            >
              <RefreshCw size={14} /> Clear
            </motion.button>
          </div>

          {/* Hidden File Inputs */}
          <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleImageUpload} />
          <input type="file" accept="image/*" capture="environment" hidden ref={cameraInputRef} onChange={handleImageUpload} />
        </div>
      </div>

      {/* DETECTION RESULT CARD */}
      <div className="bg-[#070b19]/90 rounded-3xl border border-blue-900/30 shadow-xl p-6 md:p-8 min-h-48 relative overflow-hidden">
        
        {/* Title with Search Icon Pill */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.2)]">
            <Search size={18} />
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">Detection Result</h2>
        </div>

        <AnimatePresence mode="wait">
          
          {/* Loading State Overlay */}
          {loading && (
            <motion.div 
              key="loading-overlay" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-[#030612]/90 backdrop-blur-xs flex flex-col items-center justify-center gap-3 z-20"
            >
              <Loader2 className="animate-spin text-cyan-400 stroke-[2.5]" size={32} />
              <p className="text-xs text-blue-300 font-bold uppercase tracking-widest">Analyzing specimen image...</p>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div 
              key="error-box" 
              variants={contentFadeVariants} 
              initial="hidden" 
              animate="visible" 
              exit="exit" 
              className="flex items-center gap-3 bg-red-950/40 text-red-400 border border-red-500/40 p-4 rounded-xl text-sm font-medium"
            >
              <AlertCircle size={18} className="shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}

          {/* Empty Fallback State */}
          {!loading && !error && !prediction && (
            <motion.div 
              key="fallback-text" 
              variants={contentFadeVariants} 
              initial="hidden" 
              animate="visible" 
              exit="exit" 
              className="flex flex-col items-center justify-center text-center py-8 text-slate-500"
            >
              <FileSearch size={38} className="text-blue-500/30 mb-3 stroke-[1.5]" />
              <p className="text-sm font-medium text-slate-400">
                Upload or capture an image to initialize diagnostics.
              </p>
            </motion.div>
          )}

          {/* Prediction Results Display */}
          {!loading && prediction && (
            <motion.div key="results-table" variants={contentFadeVariants} initial="hidden" animate="visible" className="space-y-4">
              <div className="flex justify-between border-b border-blue-900/30 pb-3 text-sm font-medium">
                <span className="text-slate-400">Detected Classification</span>
                <span className="font-bold text-white capitalize">{prediction.class}</span>
              </div>
              <div className="flex justify-between border-b border-blue-900/30 pb-3 text-sm font-medium">
                <span className="text-slate-400">System Confidence</span>
                <span className={`font-bold ${confidenceColor}`}>{Math.round(prediction.confidence * 100)}%</span>
              </div>
              <div className="flex justify-between border-b border-blue-900/30 pb-3 text-sm font-medium items-center">
                <span className="text-slate-400">Risk Severity</span>
                <span className={`px-3.5 py-0.5 rounded-full text-xs font-bold border ${pestData?.risk === "High" ? "bg-red-950/60 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : pestData?.risk === "Medium" ? "bg-amber-950/60 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]" : "bg-emerald-950/60 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]"}`}>{pestData?.risk || "Unknown"}</span>
              </div>
              <div className="pt-2">
                <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">Diagnostic Recommendation</p>
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