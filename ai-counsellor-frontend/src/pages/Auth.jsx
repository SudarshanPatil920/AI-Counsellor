import { useState } from "react";
import { api } from "../api/api";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signup"); // signup | login
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api("/auth/signup", "POST", {
        name: "Demo User",
        email,
        password,
      });

      localStorage.setItem("token", res.token);
      localStorage.setItem("page", "onboarding");
      window.location.reload();
    } catch (err) {
      setError("User already exists. Please login.");
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api("/auth/login", "POST", {
        email,
        password,
      });

      localStorage.setItem("token", res.token);
      localStorage.setItem("page", "dashboard");
      window.location.reload();
    } catch (err) {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 border rounded w-80 bg-white">
        <h1 className="text-xl font-bold mb-4 text-center">
          AI Counsellor
        </h1>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          disabled={loading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4"
          placeholder="Password"
          type="password"
          disabled={loading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        {mode === "signup" ? (
          <>
            <button
              onClick={handleSignup}
              disabled={loading}
              className={`w-full p-2 text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>

            <p className="text-sm text-center mt-3">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
              >
                Login
              </span>
            </p>
          </>
        ) : (
          <>
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full p-2 text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center mt-3">
              New here?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  setMode("signup");
                  setError("");
                }}
              >
                Signup
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
