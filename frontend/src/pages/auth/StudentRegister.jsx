import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerStudentAPI } from "../../services/authService";

export default function StudentRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "", batch: "", department: "", gender: "male" });
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await registerStudentAPI(form);
      alert("Student registered! You can login now.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  }

  return (
    <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Student Registration</h2>
      <input className="w-full mb-2 p-2 border rounded" placeholder="Full Name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})}/>
      <input className="w-full mb-2 p-2 border rounded" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})}/>
      <input type="password" className="w-full mb-2 p-2 border rounded" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})}/>
      <input className="w-full mb-2 p-2 border rounded" placeholder="Batch (e.g. 2025)" value={form.batch} onChange={(e)=>setForm({...form, batch:e.target.value})}/>
      <input className="w-full mb-2 p-2 border rounded" placeholder="Department" value={form.department} onChange={(e)=>setForm({...form, department:e.target.value})}/>
      <div className="flex gap-3 mb-3">
        <label className="flex items-center gap-2"><input type="radio" name="gender" checked={form.gender==="male"} onChange={()=>setForm({...form, gender:"male"})}/> Male</label>
        <label className="flex items-center gap-2"><input type="radio" name="gender" checked={form.gender==="female"} onChange={()=>setForm({...form, gender:"female"})}/> Female</label>
      </div>
      <button className="w-full bg-green-600 text-white py-2 rounded">Register as Student</button>
    </form>
  );
}
