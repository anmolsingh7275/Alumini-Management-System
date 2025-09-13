import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats").then((r)=>setStats(r.data)).catch(()=>{});
  }, []);

  const data = stats ? [
    { name: "Alumni", value: stats.alumniCount },
    { name: "Students", value: stats.studentCount },
    { name: "Jobs", value: stats.jobCount },
    { name: "Donations", value: stats.donationCount }
  ] : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h3 className="font-semibold mb-2">Platform Overview</h3>
          {stats ? (
            <ul className="space-y-1 text-sm">
              <li>Alumni: {stats.alumniCount}</li>
              <li>Students: {stats.studentCount}</li>
              <li>Jobs: {stats.jobCount}</li>
              <li>Donations: {stats.donationCount}</li>
            </ul>
          ) : <div>Loading...</div>}
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h3 className="font-semibold mb-2">Quick Stats</h3>
          <div style={{ height: 200 }}>
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%"><BarChart data={data}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#3182ce" /></BarChart></ResponsiveContainer>
            ) : <div>Loading chart...</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
