import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "alumni") navigate("/alumni");
      else navigate("/student");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
      <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full mb-3 p-2 border rounded" />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full mb-3 p-2 border rounded" />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
