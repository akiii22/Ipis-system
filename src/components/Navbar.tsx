const Navbar = () => {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      
      <div>
        <h2 className="text-xl font-bold text-slate-700">
          Dashboard
        </h2>

        <p className="text-sm text-gray-500">
        Welcome back 
        </p>
      </div>

      {/* User */}
      <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
        A
      </div>
    </header>
  );
};

export default Navbar;