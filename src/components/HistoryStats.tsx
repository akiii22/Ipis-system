// components/HistoryStats.tsx
import { type HistoryItem } from "../hooks/usePestHistory";

interface HistoryStatsProps {
  items: HistoryItem[];
}

export const HistoryStats = ({ items }: HistoryStatsProps) => {
  const totalScans = items.length;
  const highRiskCount = items.filter((i) => i.riskLevel === "High").length;

  if (totalScans === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800/80 shadow-sm transition-all duration-300 hover:border-slate-700/50">
        <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider">Total Scans</span>
        <span className="text-3xl font-extrabold text-slate-100 mt-1 block tracking-tight">{totalScans}</span>
      </div>

      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800/80 shadow-sm transition-all duration-300 hover:border-slate-700/50">
        <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider">High Risk Alerts</span>
        <span className="text-3xl font-extrabold text-red-400 mt-1 block tracking-tight">{highRiskCount}</span>
      </div>
    </div>
  );
};