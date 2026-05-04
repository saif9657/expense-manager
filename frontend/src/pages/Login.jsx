import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token);
        setMsg("Login successful ✅");
        setTimeout(() => navigate("/dashboard"), 800);
      }
    } catch (err) {
      setMsg("Login failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleLogin}>Login</button>

      <p>{msg}</p>
    </div>
  );
}

export default Login;