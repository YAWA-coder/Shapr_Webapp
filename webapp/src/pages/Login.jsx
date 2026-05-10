import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { login, fetchProfile } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername]         = useState("");
  const [password, setPassword]         = useState("");
  const [error, setError]               = useState("");
  const [loading, setLoading]           = useState(false);
  const navigate    = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async () => {
    setError("");
    if (!username || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    try {
      await login({ username, password });
      const profile = await fetchProfile();
      setUser(profile);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <header className="login-topbar">
        <div className="login-brand">ShapR</div>
      </header>
      <main className="login-main">
        <section className="login-card">
          <div className="login-card-inner">
            <h1 className="login-title">ShapR</h1>
            <p className="login-subtitle">Welcome Back!</p>

            {error && (
              <div style={{ background:"#fee2e2", color:"#dc2626", padding:"10px 14px", borderRadius:"8px", marginBottom:"12px", fontSize:"14px" }}>
                {error}
              </div>
            )}

            <label className="login-label" htmlFor="username">Username</label>
            <div className="login-input-wrap">
              <input id="username" className="login-input" placeholder="your_username" type="text"
                value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <label className="login-label" htmlFor="password">Password</label>
            <div className="login-input-wrap">
              <input id="password" className="login-input" placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={password} onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
              <button className="login-pass-toggle" type="button" onClick={() => setShowPassword(v => !v)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button className="login-btn-primary" type="button" onClick={handleLogin} disabled={loading}>
              <span>{loading ? "Logging in…" : "Login to Dashboard"}</span>
            </button>

            <p className="login-footer-text">
              Don&apos;t have an account?{" "}
              <button className="login-link login-footer-link" type="button" onClick={() => navigate("/signup")}>
                Sign up for free
              </button>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}