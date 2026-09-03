import { useRef } from "react";
import { Loader2, AlertCircle, Upload, RefreshCw, Camera, Search, FileSearch, Bug, Download, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import jsPDF from "jspdf";
import { usePestScanner } from "../hooks/usePestScanner";
import { pestInfo, getNormalizedClass } from "../data/pestData";

const Scanner = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const { image, loading, error, warning, prediction, handleImageUpload, clearScanner } = usePestScanner();

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

  // PDF Report Generator
  const generatePdfReport = () => {
    if (!prediction || !pestData) return;

    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const currentDate = new Date().toLocaleString();

    // Document Header
    doc.setFillColor(15, 23, 42); // Dark slate bg header
    doc.rect(0, 0, 210, 35, "F");
    
    doc.setTextColor(56, 189, 248);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("I.P.I.S DIAGNOSTIC REPORT", 14, 18);

    doc.setTextColor(148, 163, 184);
    doc.setFontSize(9);
    doc.text("Intelligent Pest Identification System • Automated Inspection Log", 14, 25);
    doc.text(`Generated: ${currentDate}`, 130, 25);

    // Section 1: Classification Overview
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("1. Specimen Identification Details", 14, 45);

    doc.setLineWidth(0.5);
    doc.setDrawColor(226, 232, 240);
    doc.line(14, 47, 196, 47);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Detected Species:`, 14, 55);
    doc.setFont("helvetica", "bold");
    doc.text(`${prediction.class.toUpperCase()}`, 60, 55);

    doc.setFont("helvetica", "normal");
    doc.text(`Scientific Name:`, 14, 62);
    doc.setFont("helvetica", "italic");
    doc.text(`${pestData.scientificName || "N/A"}`, 60, 62);

    doc.setFont("helvetica", "normal");
    doc.text(`Confidence Match:`, 14, 69);
    doc.setFont("helvetica", "bold");
    doc.text(`${Math.round(prediction.confidence * 100)}%`, 60, 69);

    doc.setFont("helvetica", "normal");
    doc.text(`Risk Severity:`, 14, 76);
    doc.setFont("helvetica", "bold");
    doc.text(`${pestData.risk || "Unknown"}`, 60, 76);

    // Section 2: Hazard Analysis & Strategy
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("2. Health Hazards & Associated Diseases", 14, 90);
    doc.line(14, 92, 196, 92);

    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    const diseaseLines = doc.splitTextToSize(pestData.diseases || "None reported.", 180);
    doc.text(diseaseLines, 14, 100);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("3. Prevention & Control Strategy", 14, 120);
    doc.line(14, 122, 196, 122);

    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    const preventionLines = doc.splitTextToSize(pestData.prevention || "No specific steps available.", 180);
    doc.text(preventionLines, 14, 130);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("4. Diagnostic Recommendation", 14, 155);
    doc.line(14, 157, 196, 157);

    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    const recLines = doc.splitTextToSize(pestData.recommendation || "No immediate recommendation found.", 180);
    doc.text(recLines, 14, 165);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("Confidential • Official IPIS Capstone Inspection Document", 14, 285);

    // Trigger Save
    doc.save(`IPIS_Pest_Report_${prediction.class}_${Date.now()}.pdf`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 select-none">
      
      {/* MAIN SCANNER CONTAINER */}
      <div className="relative overflow-hidden bg-[#070b19]/90 rounded-3xl border border-blue-900/30 shadow-[0_0_40px_rgba(15,23,42,0.6)] p-6 md:p-8">
        
        {/* HEADER SECTION WITH HUD TARGET */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Pest Scanner</h1>
            <p className="text-blue-300/60 mt-1.5 text-sm font-medium">
              Upload or capture a pest image for rapid system detection.
            </p>
          </div>

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
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              onClick={() => fileInputRef.current?.click()} 
              disabled={loading} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-3 rounded-xl text-xs font-bold shadow-[0_0_20px_rgba(37,99,235,0.35)] transition-all cursor-pointer disabled:opacity-50"
            >
              <Upload size={16} /> Upload Image
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              onClick={() => cameraInputRef.current?.click()} 
              disabled={loading} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#080e22] border border-blue-900/50 hover:border-blue-500/40 text-slate-200 px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              <Camera size={16} /> Open Camera
            </motion.button>

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

          <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleImageUpload} />
          <input type="file" accept="image/*" capture="environment" hidden ref={cameraInputRef} onChange={handleImageUpload} />
        </div>
      </div>

      {/* DETECTION RESULT CARD */}
      <div className="bg-[#070b19]/90 rounded-3xl border border-blue-900/30 shadow-xl p-6 md:p-8 min-h-48 relative overflow-hidden">
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.2)]">
              <Search size={18} />
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">Detection Result</h2>
          </div>

          {/* Download PDF Button */}
          {prediction && pestData && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={generatePdfReport}
              className="flex items-center gap-2 bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-900/80 hover:text-white px-4 py-2 rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all cursor-pointer"
            >
              <Download size={14} /> Export PDF Report
            </motion.button>
          )}
        </div>

        <AnimatePresence mode="wait">
          
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

          {/* BLUR / ERROR ALERT BOX */}
          {error && (
            <motion.div 
              key="error-box" 
              variants={contentFadeVariants} 
              initial="hidden" 
              animate="visible" 
              exit="exit" 
              className="flex items-start gap-3 bg-red-950/40 text-red-400 border border-red-500/40 p-4 rounded-xl text-sm font-medium"
            >
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-300">Detection Failed / Image Quality Warning</p>
                <p className="text-xs text-red-400/90 mt-1">{error}</p>
              </div>
            </motion.div>
          )}

          {/* MODERATE CONFIDENCE WARNING BADGE */}
          {warning && (
            <motion.div 
              key="warning-box" 
              variants={contentFadeVariants} 
              initial="hidden" 
              animate="visible" 
              className="mb-4 flex items-center gap-2 bg-amber-950/40 text-amber-400 border border-amber-500/40 p-3 rounded-xl text-xs font-medium"
            >
              <AlertTriangle size={16} className="shrink-0" />
              <p>{warning}</p>
            </motion.div>
          )}

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

          {!loading && prediction && (
            <motion.div key="results-table" variants={contentFadeVariants} initial="hidden" animate="visible" className="space-y-4">
              <div className="flex justify-between border-b border-blue-900/30 pb-3 text-sm font-medium items-center">
                <span className="text-slate-400">Detected Classification</span>
                <div className="text-right">
                  <span className="font-bold text-white capitalize block">{prediction.class}</span>
                  {pestData?.scientificName && (
                    <span className="text-xs text-cyan-400 italic font-mono">{pestData.scientificName}</span>
                  )}
                </div>
              </div>

              <div className="flex justify-between border-b border-blue-900/30 pb-3 text-sm font-medium">
                <span className="text-slate-400">System Confidence</span>
                <span className={`font-bold ${confidenceColor}`}>{Math.round(prediction.confidence * 100)}%</span>
              </div>

              <div className="flex justify-between border-b border-blue-900/30 pb-3 text-sm font-medium items-center">
                <span className="text-slate-400">Risk Severity</span>
                <span className={`px-3.5 py-0.5 rounded-full text-xs font-bold border ${pestData?.risk === "High" ? "bg-red-950/60 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : pestData?.risk === "Medium" ? "bg-amber-950/60 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]" : "bg-emerald-950/60 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]"}`}>{pestData?.risk || "Unknown"}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="bg-[#030612]/70 border border-blue-900/40 p-3.5 rounded-xl">
                  <p className="text-xs text-rose-400 font-bold uppercase tracking-wider mb-1">Associated Diseases / Hazards</p>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">{pestData?.diseases || "None reported."}</p>
                </div>

                <div className="bg-[#030612]/70 border border-blue-900/40 p-3.5 rounded-xl">
                  <p className="text-xs text-cyan-400 font-bold uppercase tracking-wider mb-1">Prevention Strategy</p>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">{pestData?.prevention || "No specific steps available."}</p>
                </div>
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