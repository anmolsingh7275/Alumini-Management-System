import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function AlumniDashboard() {
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    api.get("/announcements").then(res => setAnnouncements(res.data));
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Alumni Dashboard</h1>
      <section>
        <h2 className="text-lg mb-2">Announcements</h2>
        <ul className="space-y-2">
          {announcements.map(a => (
            <li key={a._id} className="p-3 bg-white dark:bg-gray-800 rounded shadow">
              <div className="font-semibold">{a.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{a.message}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
