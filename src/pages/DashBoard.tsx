const Dashboard = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">

      {/* Welcome Card */}
      <div className="group bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 rounded-3xl shadow-lg border border-slate-800/60 transition-all duration-300">
        <h1 className="text-3xl font-bold flex items-center gap-2 tracking-tight">
          Welcome to I.P.I.S 
          <span className="inline-block transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 origin-bottom">
            🌿
          </span>
        </h1>
        <p className="mt-2 text-slate-400 font-medium text-sm">
          Intelligent Pest Identification System
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1 */}
        <div className="bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700/60 hover:shadow-lg cursor-pointer">
          <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider">
            Total Scans
          </h2>
          <p className="text-3xl font-extrabold text-slate-100 mt-2 tracking-tight">
            120
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700/60 hover:shadow-lg cursor-pointer">
          <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider">
            Most Detected
          </h2>
          <p className="text-2xl font-extrabold text-slate-100 mt-2 tracking-tight">
            Aphids
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700/60 hover:shadow-lg cursor-pointer">
          <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider">
            Accuracy
          </h2>
          <p className="text-3xl font-extrabold text-slate-100 mt-2 tracking-tight">
            94%
          </p>
        </div>
      </div>

      {/* Recent Scans */}
      <div className="bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-800/80">
        <h2 className="text-xl font-bold text-slate-100 mb-4 tracking-tight">
          Recent Scans
        </h2>

        <div className="space-y-1">
          {/* Row 1 */}
          <div className="flex items-center justify-between p-3 -mx-3 rounded-xl transition-all duration-200 hover:bg-slate-800/50 cursor-pointer group">
            <div>
              <p className="font-semibold text-slate-300 transition-colors duration-200 group-hover:text-slate-100">
                Cockroach
              </p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Detected today
              </p>
            </div>
            <span className="bg-red-950/40 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-900/40 transition-transform duration-200 group-hover:scale-105">
              High Risk
            </span>
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-between p-3 -mx-3 rounded-xl transition-all duration-200 hover:bg-slate-800/50 cursor-pointer group">
            <div>
              <p className="font-semibold text-slate-300 transition-colors duration-200 group-hover:text-slate-100">
                Caterpillar
              </p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Detected yesterday
              </p>
            </div>
            <span className="bg-amber-950/40 text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-900/40 transition-transform duration-200 group-hover:scale-105">
              Medium Risk
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;