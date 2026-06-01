import { useState } from "react";
import { loginUser } from "../api/authAPI";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // 🔹 Step 1: Store user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Step 2: Handle login button click
  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("⚠️ Please enter email and password");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Call API function
      const data = await loginUser(email, password);

      // Print backend response
      console.log("Login success:", data);
      setMessage("✅ Login successful! Redirecting...");
      
      // Store session/token if needed
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("session", JSON.stringify(data.session));
      
      // Redirect after 1 second
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      // Handle error
      const errorMsg = error.response?.data?.message || error.message || "Login failed";
      console.error("Login failed:", errorMsg);
      setMessage(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Login Page</h2>

      {/* 🔹 Email Input */}
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px", width: "200px" }}
      />

      <br /><br />

      {/* 🔹 Password Input */}
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px", width: "200px" }}
      />

      <br /><br />

      {/* 🔹 Login Button */}
      <button 
        onClick={handleLogin}
        disabled={loading}
        style={{ padding: "8px 16px", cursor: loading ? "not-allowed" : "pointer" }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* 🔹 Message Display */}
      {message && (
        <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Login;