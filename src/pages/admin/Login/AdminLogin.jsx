import "./Login.css";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useLogin from "../../../hooks/useLogin";
import { FaEye, FaEyeSlash, FaX, FaUser, FaLock } from "react-icons/fa6";
import { Link } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);


  const login = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password, rememberMe);
  };

  return (
    <div className="loginpage w-full h-screen flex items-center justify-center flex-col bg-gradient-to-br from-[#0830df] to-[#000000]">
      <div className="w-full max-w-lg px-6">
        <div className="text-center mb-12">
          <h1 className="text-white text-4xl font-bold tracking-wider">
            EVO - COURSES
          </h1>
          <h2 className="text-white/90 text-2xl font-medium mt-2">
            ADMIN PANEL
          </h2>
        </div>
        <form
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
          onSubmit={handleLogin}
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium pl-1 flex items-center gap-2">
                <FaUser /> Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-colors"
                placeholder="Enter username"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium pl-1 flex items-center gap-2">
                <FaLock /> Password
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={type ? "text" : "password"}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-colors"
                  placeholder="Enter password"
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white/70 hover:text-white transition-colors"
                  onClick={() => setType(!type)}
                >
                  {type ? (
                    <FaEye size={18} className="text-blue-600" />
                  ) : (
                    <FaEyeSlash size={20} className="text-blue-600" />
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pl-1">
              <div
                className="checkbox-wrapper-31 scale-90"
                onClick={() => setRememberMe(!rememberMe)}
              >
                <input type="checkbox" checked={rememberMe} readOnly />
                <svg viewBox="0 0 35.6 35.6">
                  <circle
                    className="background"
                    cx="17.8"
                    cy="17.8"
                    r="17.8"
                  ></circle>
                  <circle
                    className="stroke"
                    cx="17.8"
                    cy="17.8"
                    r="14.37"
                  ></circle>
                  <polyline
                    className="check"
                    points="11.78 18.12 15.55 22.23 25.17 12.87"
                  ></polyline>
                </svg>
              </div>
              <span className="text-white/90 text-sm font-medium">
                Remember me
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-[#D0273E]/20"
            >
              Login
            </button>
            <div className="w-full">
          <Link className="text-white/90 mx-auto text-sm text-center w-full font-medium mt-4" to="/">Back to Home</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
