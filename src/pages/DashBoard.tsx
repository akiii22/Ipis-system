const Dashboard = () => {
  return (
    <div className="space-y-6">

      {/* Welcome Card */}
      <div className="bg-linear-to-r from-green-500 to-emerald-400 text-white p-6 rounded-3xl shadow-lg">
        
        <h1 className="text-3xl font-bold">
          Welcome to I.P.I.S 🌿
        </h1>

        <p className="mt-2 text-green-50">
          Intelligent Pest Identification System
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-gray-500 text-sm">
            Total Scans
          </h2>

          <p className="text-3xl font-bold text-green-600 mt-2">
            120
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-gray-500 text-sm">
            Most Detected
          </h2>

          <p className="text-2xl font-bold text-green-600 mt-2">
            Aphids
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-gray-500 text-sm">
            Accuracy
          </h2>

          <p className="text-3xl font-bold text-green-600 mt-2">
            94%
          </p>
        </div>
      </div>

      {/* Recent Scans */}
      <div className="bg-white rounded-3xl p-6 shadow-md">
        
        <h2 className="text-xl font-bold text-slate-700 mb-4">
          Recent Scans
        </h2>

        <div className="space-y-4">
          
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium">Cockroach</p>
              <p className="text-sm text-gray-500">
                Detected today
              </p>
            </div>

            <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm">
              High Risk
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium">Caterpillar</p>
              <p className="text-sm text-gray-500">
                Detected yesterday
              </p>
            </div>

            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
              Medium Risk
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;