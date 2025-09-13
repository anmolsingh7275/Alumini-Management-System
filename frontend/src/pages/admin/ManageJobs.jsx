import React, { useEffect, useState } from "react";
import jobService from "../../services/jobService";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  useEffect(()=> {
    jobService.getJobs().then(r=>setJobs(r.data)).catch(()=>{});
  }, []);

  const remove = async (id) => {
    if (!confirm("Delete job?")) return;
    await jobService.deleteJob(id);
    setJobs(jobs.filter(j => j._id !== id));
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Manage Jobs</h2>
      <div className="space-y-3">
        {jobs.map(job=>(
          <div key={job._id} className="p-3 bg-white dark:bg-gray-800 rounded flex justify-between">
            <div>
              <div className="font-semibold">{job.title} — {job.company}</div>
              <div className="text-sm text-gray-500">{job.description}</div>
            </div>
            <div>
              <button onClick={()=>remove(job._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
