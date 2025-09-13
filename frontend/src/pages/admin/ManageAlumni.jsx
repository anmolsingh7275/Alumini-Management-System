import React, { useEffect, useState } from "react";
import userService from "../../services/userService";

export default function ManageAlumni() {
  const [list, setList] = useState([]);

  useEffect(()=> {
    userService.getAlumni().then(r=>setList(r.data)).catch(()=>{});
  }, []);

  const approve = async (id) => {
    await userService.approveAlumni(id);
    setList(list.map(u => u._id===id ? {...u, approved:true} : u));
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Manage Alumni</h2>
      <div className="space-y-3">
        {list.map(a=>(
          <div key={a._id} className="p-3 bg-white dark:bg-gray-800 rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{a.name} ({a.batch})</div>
              <div className="text-sm text-gray-500">{a.company || "-"}</div>
            </div>
            <div>
              {a.approved ? <span className="text-green-600">Approved</span> : <button onClick={()=>approve(a._id)} className="px-3 py-1 bg-blue-600 text-white rounded">Approve</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
