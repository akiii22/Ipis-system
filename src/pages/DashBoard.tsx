import { ArrowRight, BarChart3, Bug, Target, Clock, Leaf, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePestHistory } from "../hooks/usePestHistory";

const Dashboard = () => {
  const navigate = useNavigate();
  const { historyItems, loading } = usePestHistory();

  // Get the 3 most recent scans
  const recentScans = historyItems.slice(0, 3);

  // Dynamically calculate the most detected pest
  const getMostDetectedPest = () => {
    if (!historyItems.length) return "N/A";
    const counts: Record<string, number> = {};
    historyItems.forEach((item) => {
      counts[item.pestName] = (counts[item.pestName] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  };

  // Dynamically calculate average confidence across all user scans
  const getAverageConfidence = () => {
    if (!historyItems.length) return "N/A";
    const totalConfidence = historyItems.reduce((sum, item) => sum + item.confidence, 0);
    return `${Math.round(totalConfidence / historyItems.length)}%`;
  };

  // Helper for risk badge styling
  const getRiskBadgeStyles = (risk: "High" | "Medium" | "Low") => {
    switch (risk) {
      case "High":
        return "bg-red-950/60 text-red-400 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]";
      case "Medium":
        return "bg-amber-950/60 text-amber-400 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]";
      case "Low":
        return "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
      default:
        return "bg-slate-800 text-slate-400 border border-slate-700";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto select-none">
      {/* WELCOME BANNER CARD */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#080d21] via-[#0b1433] to-[#080d21] rounded-3xl p-6 md:p-8 border border-blue-500/30 shadow-[0_0_30px_rgba(30,58,138,0.2)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 z-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center justify-center md:justify-start gap-3 tracking-tight">
            <span className="text-emerald-400 bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
              <Leaf size={28} />
            </span>
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">I.P.I.S</span>
          </h1>
          <p className="text-blue-300/70 font-medium text-sm md:text-base">
            Intelligent Pest Identification System
          </p>
        </div>

        {/* HUD Bug Scanner Visual Element */}
        <div className="relative w-40 h-28 flex items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-blue-500/10 rounded-2xl border border-blue-400/30 blur-[1px]" />
          <span className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
          <span className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
          <span className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
          <span className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
          <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent top-1/2 -translate-y-1/2 shadow-[0_0_8px_#22d3ee] animate-pulse" />
          <Bug size={42} className="text-cyan-400/80 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
        </div>
      </div>

      {/* STATS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Total Scans */}
        <div className="relative overflow-hidden bg-[#070b19]/90 rounded-2xl p-6 border border-blue-900/30 shadow-lg hover:border-blue-500/40 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="space-y-1 z-10">
              <h2 className="text-blue-300/60 text-[11px] font-bold uppercase tracking-wider">Total Scans</h2>
              <p className="text-3xl font-black text-white tracking-tight">{loading ? "..." : historyItems.length}</p>
              <p className="text-xs text-slate-400 font-medium pt-1">All time scans</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <BarChart3 size={22} />
            </div>
          </div>
          <svg className="absolute bottom-0 right-0 w-32 h-12 opacity-30 text-blue-500 pointer-events-none" viewBox="0 0 100 30">
            <path d="M0 25 Q 25 5, 50 20 T 100 10 L 100 30 L 0 30 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Card 2: Most Detected */}
        <div className="relative overflow-hidden bg-[#070b19]/90 rounded-2xl p-6 border border-blue-900/30 shadow-lg hover:border-purple-500/40 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="space-y-1 z-10">
              <h2 className="text-purple-300/60 text-[11px] font-bold uppercase tracking-wider">Most Detected</h2>
              <p className="text-2xl font-black text-white tracking-tight capitalize">{loading ? "..." : getMostDetectedPest()}</p>
              <p className="text-xs text-slate-400 font-medium pt-1">Most common pest</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <Bug size={22} />
            </div>
          </div>
          <svg className="absolute bottom-0 right-0 w-32 h-12 opacity-30 text-purple-500 pointer-events-none" viewBox="0 0 100 30">
            <path d="M0 20 Q 30 28, 60 10 T 100 15 L 100 30 L 0 30 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Card 3: Avg Confidence */}
        <div className="relative overflow-hidden bg-[#070b19]/90 rounded-2xl p-6 border border-blue-900/30 shadow-lg hover:border-emerald-500/40 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="space-y-1 z-10">
              <h2 className="text-emerald-300/60 text-[11px] font-bold uppercase tracking-wider">Avg Confidence</h2>
              <p className="text-3xl font-black text-white tracking-tight">{loading ? "..." : getAverageConfidence()}</p>
              <p className="text-xs text-slate-400 font-medium pt-1">Model accuracy rate</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Target size={22} />
            </div>
          </div>
          <svg className="absolute bottom-0 right-0 w-32 h-12 opacity-30 text-emerald-500 pointer-events-none" viewBox="0 0 100 30">
            <path d="M0 28 Q 20 15, 50 22 T 100 5 L 100 30 L 0 30 Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* RECENT SCANS SECTION */}
      <div className="bg-[#070b19]/90 rounded-3xl p-6 border border-blue-900/30 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 tracking-tight">
            <Clock size={18} className="text-blue-400" />
            Recent Scans
          </h2>
          <button 
            onClick={() => navigate('/dashboard/history')} 
            className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-8 gap-2 text-slate-400">
              <Loader2 className="animate-spin text-cyan-400" size={20} />
              <span className="text-xs font-bold uppercase tracking-wider">Loading recent scans...</span>
            </div>
          ) : recentScans.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p className="text-sm font-medium">No recent scans available.</p>
            </div>
          ) : (
            recentScans.map((scan) => (
              <div 
                key={scan.id}
                onClick={() => navigate('/dashboard/history')}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-blue-500/30 hover:bg-slate-900/80 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full border border-blue-500/40 bg-slate-950 overflow-hidden flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                    <img 
                      src={scan.imageUrl} 
                      alt={scan.pestName} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-100 group-hover:text-blue-300 transition-colors capitalize">
                      {scan.pestName}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mt-0.5">
                      <span>{scan.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock size={11} /> {scan.time}
                      </span>
                    </div>
                  </div>
                </div>

                <span className={`px-3.5 py-1 rounded-full text-xs font-bold ${getRiskBadgeStyles(scan.riskLevel)}`}>
                  {scan.riskLevel} Risk
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;