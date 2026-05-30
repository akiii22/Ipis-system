const Dashboard = () => {
  return (
    <div className="space-y-6">

      {/* Welcome Card - Added 'group' to animate children elements */}
      <div className="group bg-linear-to-r from-slate-800 to-slate-700 text-white p-6 rounded-3xl shadow-lg border border-slate-700/50 transition-all duration-300">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Welcome to I.P.I.S 
          {/* Micro-animation on the emoji */}
          <span className="inline-block transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 origin-bottom">
            🌿
          </span>
        </h1>
        <p className="mt-2 text-slate-300 font-medium">
          Intelligent Pest Identification System
        </p>
      </div>

      {/* Stats Cards - Added smooth lift and shadow transitions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
          <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
            Total Scans
          </h2>
          <p className="text-3xl font-bold text-slate-800 mt-2 tracking-tight">
            120
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
          <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
            Most Detected
          </h2>
          <p className="text-2xl font-bold text-slate-800 mt-2 tracking-tight">
            Aphids
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
          <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
            Accuracy
          </h2>
          <p className="text-3xl font-bold text-slate-800 mt-2 tracking-tight">
            94%
          </p>
        </div>
      </div>

      {/* Recent Scans - Added modern row-highlight states */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Recent Scans
        </h2>

        <div className="space-y-1">
          {/* Row 1 */}
          <div className="flex items-center justify-between p-2.5 -mx-2.5 rounded-xl transition-all duration-200 hover:bg-slate-50 cursor-pointer group">
            <div>
              <p className="font-semibold text-slate-700 transition-colors duration-200 group-hover:text-slate-900">
                Cockroach
              </p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                Detected today
              </p>
            </div>
            <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-semibold border border-red-100 transition-transform duration-200 group-hover:scale-105">
              High Risk
            </span>
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-between p-2.5 -mx-2.5 rounded-xl transition-all duration-200 hover:bg-slate-50 cursor-pointer group">
            <div>
              <p className="font-semibold text-slate-700 transition-colors duration-200 group-hover:text-slate-900">
                Caterpillar
              </p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                Detected yesterday
              </p>
            </div>
            <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-100 transition-transform duration-200 group-hover:scale-105">
              Medium Risk
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;