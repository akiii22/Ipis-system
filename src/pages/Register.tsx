import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      email,
      username,
      password,
      confirmPassword,
    });
    navigate("/");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#edf7e7] flex items-center justify-center px-4 py-10 select-none">
      
      {/* Background Blobs - Synced fluid animations matching Login */}
      <div className="absolute w-80 h-80 bg-green-400 rounded-full blur-3xl opacity-40 left-20 top-40 animate-pulse duration-[4000ms]" />
      <div className="absolute w-80 h-80 bg-lime-300 rounded-full blur-3xl opacity-50 right-20 top-50 animate-pulse duration-[6000ms] delay-75" />
      <div className="absolute w-60 h-60 bg-green-300 rounded-full blur-3xl opacity-40 right-50 bottom-12 animate-pulse duration-[5000ms] delay-150" />

      {/* Glass Card - Smooth component slide and pop */}
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/40 border border-white/60 rounded-[40px] shadow-2xl p-10 animate-in fade-in slide-in-from-bottom-6 zoom-in-95 duration-500 ease-out">

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-700 tracking-wider">
            REGISTER
          </h1>
          <p className="mt-3 text-xs text-slate-500 font-semibold uppercase tracking-widest">
            Create your I.P.I.S account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Username */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-b-2 border-slate-300 py-2 outline-none text-slate-800 font-medium placeholder:text-slate-400 transition-all duration-300 focus:border-slate-700 focus:-translate-y-0.5"
              required
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-2 border-slate-300 py-2 outline-none text-slate-800 font-medium placeholder:text-slate-400 transition-all duration-300 focus:border-slate-700 focus:-translate-y-0.5"
              required
            />
          </div>

          {/* Password */}
          <div className="relative flex items-center group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b-2 border-slate-300 py-2 pr-10 outline-none text-slate-800 font-medium placeholder:text-slate-400 transition-all duration-300 focus:border-slate-700 focus:-translate-y-0.5"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 bottom-2.5 text-slate-400 hover:text-slate-600 transition-all duration-200 active:scale-75 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative flex items-center group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent border-b-2 border-slate-300 py-2 pr-10 outline-none text-slate-800 font-medium placeholder:text-slate-400 transition-all duration-300 focus:border-slate-700 focus:-translate-y-0.5"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 bottom-2.5 text-slate-400 hover:text-slate-600 transition-all duration-200 active:scale-75 cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer tracking-wider"
          >
            CREATE ACCOUNT
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-8 font-medium">
          Already have an account?
          <Link
            to="/"
            className="ml-2 text-slate-700 font-bold hover:text-slate-900 hover:underline transition-colors duration-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;