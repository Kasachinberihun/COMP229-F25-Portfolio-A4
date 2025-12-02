import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      await signin(cleanEmail, cleanPassword);

      // go to Projects page after successful login
      navigate("/projects");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", textAlign: "center" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          required
          style={{ width: "100%", margin: "8px 0", padding: 8 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", margin: "8px 0", padding: 8 }}
        />

        <button type="submit" style={{ padding: 10, width: "100%" }}>
          Login
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p style={{ marginTop: 10 }}>
        Don&apos;t have an account?{" "}
        <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
