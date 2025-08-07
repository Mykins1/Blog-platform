import { useState } from "react";
import {Eye, EyeSlash} from "phosphor-react";

const SignPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center h-130">
      <div className="flex flex-col items-center bg-white p-8 w-full rounded-md ">
        <h1 className="text-2xl text-center font-bold mb-2">
          {showSignUp ? "Welcome to Socia" : "Welcome back"}
        </h1>
        <form className="flex flex-col gap-3 w-full">
          {showSignUp ? (
            <input
              type="email"
              placeholder="Email"
              className=" p-2 px-4 border-b border-gray-400 "
            />
          ) : (
            <input
              type="email"
              placeholder="Username or email"
              className=" p-2 px-4 border-b border-gray-400 "
            />
          )}
          {showSignUp && (
            <input
              type="text"
              placeholder="Create Username"
              className=" p-2 px-4 border-b border-gray-400 "
            />
          )}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className=" w-full p-2 px-4  border-b border-gray-400 "
            />
            <button
              type="button"
              className="text-gray-500 absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <Eye size={18} weight="fill"/> : <EyeSlash size={18} weight="fill"/>}
            </button>
          </div>
          <button
            type="submit"
            className="bg-gray-800 text-white p-2 mt-3 rounded-full"
          >
            {showSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <span className="text-sm text-gray-500 pt-3">
          {showSignUp ? (
            <>
              Already have an account?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setShowSignUp(false)}
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setShowSignUp(true)}
              >
                Sign Up
              </button>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default SignPage;