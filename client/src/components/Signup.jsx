import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api.js";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // match your backend / Postman body:
      // { name, email, password }
      const { data } = await api.post("/auth/signup", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      console.log("Signup success:", data);
      setSuccess(data.message || "Account created successfully!");

      // redirect to login after short delay
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      console.error("Signup error:", err?.response?.data || err.message);
      setError(
        err?.response?.data?.message ||
          "Signup failed. Please check your details and try again."
      );
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", textAlign: "center" }}>
      <h2>Sign up</h2>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", margin: "8px 0", padding: 8 }}
        />

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
          Create account
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <p style={{ marginTop: 10 }}>
        Already have an account?{" "}
        <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
