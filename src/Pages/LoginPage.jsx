import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  // Validation helpers
  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const isValidUsername = (value) => /^[a-zA-Z0-9_]{3,20}$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(identifier) && !isValidUsername(identifier)) {
      setError("Please enter a valid email or username.");
      return;
    }

    if (!password || password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setError(""); // Clear previous errors

    const success = await login(identifier, password); // login logic supports both
    if (success) {
      navigate("/profile");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 transition-all duration-500">
      <form
        onSubmit={handleSubmit}
        className={`backdrop-blur-md bg-white/30 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md transform transition-all duration-700 ${
          animate ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6 drop-shadow">
          🔐 Welcome Back
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-800 font-semibold mb-1">
              Email or Username
            </label>
            <input
              type="text"
              placeholder="you@example.com or johndoe"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-inner"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-800 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-inner"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm mt-2 font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            🚀 Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
