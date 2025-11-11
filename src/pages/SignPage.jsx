import { useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";
import { useTheme } from "../context/ThemeContext.js";

const SignPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { themeClasses } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle auth
  };

  return (
    <main className="flex items-center justify-center min-h-screen" role="main">
      <section
        className={`flex flex-col items-center  rounded-md ${themeClasses.background} ${themeClasses.text}`}
      >
        <h1 className="text-2xl text-center font-bold mb-2">
          {showSignUp ? "Welcome to Socia" : "Welcome back"}
        </h1>

        <form
          className="flex flex-col gap-3 w-full"
          onSubmit={handleSubmit}
          noValidate
        >
          {showSignUp ? (
            <label htmlFor="email" className="sr-only">
              Email
            </label>
          ) : (
            <label htmlFor="identifier" className="sr-only">
              Username or email
            </label>
          )}
          {showSignUp ? (
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className={`p-2 px-4 border-b ${themeClasses.border} bg-transparent outline-none`}
              required
            />
          ) : (
            <input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="Username or email"
              className={`p-2 px-4 border-b ${themeClasses.border} bg-transparent outline-none`}
              required
            />
          )}

          {showSignUp && (
            <>
              <label htmlFor="username" className="sr-only">
                Create Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Create Username"
                className={`p-2 px-4 border-b ${themeClasses.border} bg-transparent outline-none`}
                required
              />
            </>
          )}

          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="flex gap-4 items-center">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={showSignUp ? "Create Password" : "Password"}
                className={`w-full p-2 px-4 border-b ${themeClasses.border} bg-transparent outline-none`}
                required
              />

              <button
                type="button"
                className="text-white"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <Eye size={18} weight="fill" />
                ) : (
                  <EyeSlash size={18} weight="fill" />
                )}
              </button>
            </div>

            <div className="flex text-gray-500 mt-2 items-center justify-end text-sm">
              {!showSignUp && (
                <button type="button" className="text-sky-600 hover:underline">
                  Forgot password?
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`bg-sky-800 font-medium p-2 mt-3 rounded-full text-white`}
          >
            {showSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <span className={`text-sm font-medium pt-3 ${themeClasses.span}`}>
          {showSignUp ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="text-sky-600 hover:underline"
                onClick={() => setShowSignUp(false)}
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                className="text-sky-600 hover:underline"
                onClick={() => setShowSignUp(true)}
              >
                Sign Up
              </button>
            </>
          )}
        </span>
      </section>
    </main>
  );
};

export default SignPage;
