import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(email, password);

    navigate("/dashboard");
  };

  return (
<div className="relative min-h-screen overflow-hidden bg-[#edf7e7] flex items-center justify-center px-4">
    
    {/* Background Blobs */}
    <div className="absolute w-80 h-80 bg-green-400 rounded-full blur-3xl opacity-60 left-20 top-50" />
    <div className="absolute w-80 h-80 bg-lime-300 rounded-full blur-3xl opacity-60 right-20 top-50" />
    <div className="absolute w-60 h-60 bg-green-300 rounded-full blur-3xl opacity-50 right-50 bottom-12.5" />

    {/* Glass Card */}
    <div className="relative w-full max-w-md backdrop-blur-xl bg-white/30 border border-white/40 rounded-[40px] shadow-2xl p-10">
      
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-slate-600 tracking-wide">
          LOGIN
        </h1>
        <p className="mt-4 text-sm text-slate-500">
          Intelligent Pest Identification System
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Email Input */}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b-2 border-slate-400 py-2 outline-none text-slate-700 placeholder:text-slate-500"
          />
        </div>

        {/* Password Input Container */}
        <div className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"} // Switches input type based on state
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b-2 border-slate-400 py-2 pr-10 outline-none text-slate-700 placeholder:text-slate-500"
          />
          
          {/* Eye Icon Button */}
          <button
            type="button" // Crucial: stops the form from accidentally submitting when clicking the eye
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 bottom-2.5 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff
             size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-slate-800 hover:bg-slate-900 transition-all text-white py-4 rounded-xl font-bold text-2xl shadow-lg cursor-pointer"
        >
          SIGN IN
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-slate-600 mt-8">
        Don’t have an account?
        <Link
          to="/register"
          className="ml-2 text-slate-700 font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  </div>
  );
};

export default LogIn;