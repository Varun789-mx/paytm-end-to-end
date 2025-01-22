import React from "react";
import { useState } from "react";
import { Loginbut } from "./LoginBut";
import openEye from "../assets/openeye.png";
import closeEye from "../assets/closeeye.png";

const Login = () => {
  const [eye, setEye] = useState(false);
  const HandleEye = (e) => {
    e.preventDefault();
    setEye((prev) => !prev);
  };
  return (
    <div className="min-h-screen  bg-gray-100 p-4 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md justify-center">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form className="space-y-4">
          <div className="justify-center">
            <div className="p-4">
              <p className="block text-sm font-medium text-green-700 mb-3">
                Email:
                <input
                  type="text"
                  className="w-full px-4 py-3"
                  id="email"
                  placeholder="Enter your email or phone"
                />
              </p>
            </div>
            <div className="p-2">
              <label className="block text-sm font-medium text-green-700 mb-3">
                Password:
              </label>
              <div className="relative">
                <input
                  type={eye ? "text" : "password"}
                  className="w-full px-4 py-3"
                  placeholder="Enter your password"
                />
                <button type="button" onClick={HandleEye}>
                  <img src={eye ? openEye : closeEye} className="w-5" />
                </button>
              </div>

              <Loginbut text={"Login"} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
