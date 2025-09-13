import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Announcements() {
  const [ann, setAnn] = useState([]);
  useEffect(()=> {
    api.get('/announcements').then(r=>setAnn(r.data)).catch(()=>{});
  }, []);
  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Announcements</h2>
      <div className="space-y-3">
        {ann.map(a=>(
          <div key={a._id} className="p-3 bg-white dark:bg-gray-800 rounded">
            <div className="font-semibold">{a.title}</div>
            <div className="text-sm text-gray-500">{a.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
