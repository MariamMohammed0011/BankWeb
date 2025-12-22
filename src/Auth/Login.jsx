import React, { useState, Suspense } from "react";
import { useFormValidation } from "../hooks/useFormValidation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLogin } from "../hooks/useLogin";
import { LoginStrategyFactory } from "../strategies/auth/LoginStrategyFactory";

const LuLayoutDashboard = React.lazy(() =>
  import("react-icons/lu").then((mod) => ({ default: mod.LuLayoutDashboard }))
);
const LuLoader = React.lazy(() =>
  import("react-icons/lu").then((mod) => ({ default: mod.LuLoader }))
);

function Login() {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { errors, validateForm } = useFormValidation();
  const { loginRequest, loading, error: apiError } = useLogin();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm({ Username, password })) return;

    try {
      const data = await loginRequest(Username, password);
console.log(data.role);
      login(data.token, data.role);

     // Strategy
  const strategy = LoginStrategyFactory.getStrategy(data.role);
  strategy.loginAction(data, navigate);
  
} catch (err) {
  console.log("Login failed:", err);
}
    
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-full md:max-w-1/2 bg-blue-600 clip-ellipse"></div>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-8">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div className="text-white text-center md:text-left space-y-4 sm:space-y-6 order-2 md:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold leading-tight">
              Government complaints management
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 max-w-md mx-auto md:mx-0">
              Together, let's make serving the citizen easier.
            </p>
            <Suspense
              fallback={<div className="text-white">Loading icon...</div>}
            >
              <LuLayoutDashboard className="text-4xl mt-4" />
            </Suspense>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-md mx-auto order-1 md:order-2 w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
              sign in
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {apiError && (
                <p className="text-red-600 text-center font-medium bg-red-100 py-2 rounded">
                  {apiError}
                </p>
              )}

              <div className="relative">
                <span
                  className={`absolute left-4 transition-all duration-300 pointer-events-none text-gray-500 ${
                    Username ? "top-1 text-xs" : "top-4 text-lg"
                  }`}
                >
                 Username
                </span>
                <input
                  type="text"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off"
                  name="Username-fake"
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {errors.Username && (
                  <p className="text-red-500 text-sm mt-1">{errors.Username}</p>
                )}
              </div>

              <div className="relative">
                <span
                  className={`absolute left-4 transition-all duration-300 pointer-events-none text-gray-500 ${
                    password ? "top-1 text-xs" : "top-4 text-lg"
                  }`}
                >
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  name="password-fake"
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-full font-bold text-base sm:text-lg hover:bg-blue-700 transition shadow-md flex justify-center items-center gap-2 disabled:bg-blue-300"
              >
                {loading && (
                  <Suspense fallback={<div className="animate-spin">...</div>}>
                    <LuLoader className="animate-spin text-xl" />
                  </Suspense>
                )}
                {loading ? "Signing In..." : "Submit"}
              </button>

              <a
                href="#"
                className="block text-center text-blue-600 hover:underline text-sm sm:text-base"
              >
                Forgot password?
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
