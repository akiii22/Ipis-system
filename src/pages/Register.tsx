import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

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
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b-2 border-slate-400 py-2 outline-none text-slate-700 placeholder:text-slate-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent border-b-2 border-slate-400 py-2 outline-none text-slate-700 placeholder:text-slate-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#5d8a84] hover:bg-[#4f7772] transition-all text-white py-4 rounded-xl font-bold text-xl shadow-lg cursor-pointer"
          >
            CREATE ACCOUNT
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600 mt-8">
          Already have an account?
          <Link
            to="/"
            className="ml-2 text-green-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;