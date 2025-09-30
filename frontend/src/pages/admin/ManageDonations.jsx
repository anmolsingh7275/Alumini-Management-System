import React, { useEffect, useState } from "react";
import userService from "../../services/userService";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  useEffect(()=> {
    userService.getStudents().then(r=>setStudents(r.data)).catch(()=>{});
  }, []);
  const toggleBlock = async (id, blocked) => {
    await userService.blockStudent(id, !blocked);
    setStudents(students.map(s => s._id===id ? {...s, blocked: !blocked} : s));
  };
  return (
    <div>
      <h2 className="text-xl mb-4">Manage Students</h2>
      <div className="space-y-3">
        {students.map(s=>(
          <div key={s._id} className="p-3 bg-white dark:bg-gray-800 rounded flex justify-between">
            <div>
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-gray-500">{s.department} — {s.batch}</div>
            </div>
            <div>
              <button onClick={()=>toggleBlock(s._id, s.blocked)} className={`px-3 py-1 rounded ${s.blocked ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}`}>
                {s.blocked ? 'Unblock' : 'Block'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
