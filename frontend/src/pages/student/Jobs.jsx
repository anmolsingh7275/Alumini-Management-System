import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function StudentJobs() {
  const [jobs, setJobs] = useState([]);
  useEffect(()=> {
    api.get('/jobs').then(r=>setJobs(r.data));
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Job Board</h1>
      <div className="grid gap-4">
        {jobs.map(job => (
          <div key={job._id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <div className="font-semibold">{job.title} — {job.company}</div>
            <div className="text-sm text-gray-500">{job.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
