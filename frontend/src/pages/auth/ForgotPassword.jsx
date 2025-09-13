import React, { useState } from "react";
import api from "../../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
    } catch (err) {
      alert("Error sending reset link");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Forgot Password</h2>
      {sent ? (
        <div className="text-green-600">Reset link sent if that email exists.</div>
      ) : (
        <form onSubmit={submit}>
          <input className="w-full mb-3 p-2 border rounded" placeholder="Your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <button className="w-full bg-blue-600 text-white py-2 rounded">Send Reset Link</button>
        </form>
      )}
    </div>
  );
}
