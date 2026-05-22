const Dashboard = () => {
  return (
   <div className="space-y-6">

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6 rounded-3xl shadow-lg">
        
        <h1 className="text-3xl font-bold">
          Welcome to I.P.I.S 🌿
        </h1>

        <p className="mt-2 text-slate-300">
          Intelligent Pest Identification System
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-gray-500 text-sm">
            Total Scans
          </h2>

          <p className="text-3xl font-bold text-slate-800 mt-2">
            120
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-gray-500 text-sm">
            Most Detected
          </h2>

          <p className="text-2xl font-bold text-slate-800 mt-2">
            Aphids
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-gray-500 text-sm">
            Accuracy
          </h2>

          <p className="text-3xl font-bold text-slate-800 mt-2">
            94%
          </p>
        </div>
      </div>

      {/* Recent Scans */}
      <div className="bg-white rounded-3xl p-6 shadow-md">
        
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Recent Scans
        </h2>

        <div className="space-y-4">
          
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium text-slate-700">Cockroach</p>
              <p className="text-sm text-gray-500">
                Detected today
              </p>
            </div>

            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
              High Risk
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium text-slate-700">Caterpillar</p>
              <p className="text-sm text-gray-500">
                Detected yesterday
              </p>
            </div>

            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              Medium Risk
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;