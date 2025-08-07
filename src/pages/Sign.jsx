import { useState } from "react";

const SignPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="flex items-center justify-center h-130">
      <div className="flex flex-col items-center bg-white p-8 w-full rounded-md ">
        <h1 className="text-2xl font-bold mb-4">
          {showSignUp ? "Sign Up" : "Sign In"}
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
          <input
            type="password"
            placeholder="Password"
            className=" p-2 px-4  border-b border-gray-400 "
          />
          {showSignUp && (
            <input
              type="text"
              placeholder="Username"
              className=" p-2 px-4 border-b border-gray-400 "
            />
          )}
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