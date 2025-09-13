import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import userService from "../../services/userService";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || "", company: user?.company || "", department: user?.department || "" });
  const save = async (e) => {
    e.preventDefault();
    try {
      const res = await userService.updateProfile(user._id, form);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Profile updated");
    } catch (err) {
      alert("Update failed");
    }
  };
  const avatar = user.gender === "female" ? "/assets/avatars/avatar-female.png" : "/assets/avatars/avatar-male.png";
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <div className="flex items-center gap-4 mb-4">
        <img src={avatar} alt="avatar" className="w-20 h-20 rounded-full" />
        <div>
          <h3 className="font-semibold text-xl">{user.name}</h3>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      </div>
      <form onSubmit={save} className="space-y-3">
        <input className="w-full p-2 border rounded" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input className="w-full p-2 border rounded" value={form.company} onChange={e=>setForm({...form, company:e.target.value})}/>
        <input className="w-full p-2 border rounded" value={form.department} onChange={e=>setForm({...form, department:e.target.value})}/>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
      </form>
    </div>
  );
}
