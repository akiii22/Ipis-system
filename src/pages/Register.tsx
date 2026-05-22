import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';
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
  <div className="relative min-h-screen overflow-hidden bg-[#edf7e7] flex items-center justify-center px-4 py-10">
    
    {/* Background Blobs */}
    <div className="absolute w-80 h-80 bg-green-400 rounded-full blur-3xl opacity-60 left-20 top-50" />
    <div className="absolute w-80 h-80 bg-lime-300 rounded-full blur-3xl opacity-60 right-20 top-50" />
    <div className="absolute w-60 h-60 bg-green-300 rounded-full blur-3xl opacity-50 right-50 bottom-12.5" />

    {/* Glass Card */}
    <div className="relative w-full max-w-md backdrop-blur-xl bg-white/30 border border-white/40 rounded-[40px] shadow-2xl p-10">

      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-600 tracking-wide">
          REGISTER
        </h1>
        <p className="mt-4 text-sm text-slate-500">
          Create your I.P.I.S account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Username */}
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent border-b-2 border-slate-400 py-2 outline-none text-slate-700 placeholder:text-slate-500"
          />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b-2 border-slate-400 py-2 outline-none text-slate-700 placeholder:text-slate-500"
          />
        </div>

        {/* Password */}
        <div className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b-2 border-slate-400 py-2 pr-10 outline-none text-slate-700 placeholder:text-slate-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 bottom-2.5 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative flex items-center">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-transparent border-b-2 border-slate-400 py-2 pr-10 outline-none text-slate-700 placeholder:text-slate-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 bottom-2.5 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-slate-800 hover:bg-slate-900 transition-all text-white py-4 rounded-xl font-bold text-xl shadow-lg cursor-pointer"
        >
          CREATE ACCOUNT
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-slate-600 mt-8">
        Already have an account?
        <Link
          to="/"
          className="ml-2 text-slate-700 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
  );
};

export default Register;