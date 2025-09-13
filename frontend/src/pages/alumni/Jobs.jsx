import React, { useEffect, useState } from "react";
import jobService from "../../services/jobService";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: "", company: "", description: "" });

  useEffect(()=> {
    jobService.getJobs().then(r=>setJobs(r.data)).catch(()=>{});
  }, []);

  const create = async (e) => {
    e.preventDefault();
    const res = await jobService.createJob(form);
    setJobs([res.data, ...jobs]);
    setForm({ title: "", company: "", description: "" });
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Post a Job</h2>
      <form onSubmit={create} className="mb-4 bg-white dark:bg-gray-800 p-4 rounded">
        <input className="w-full mb-2 p-2 border rounded" placeholder="Job Title" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})}/>
        <input className="w-full mb-2 p-2 border rounded" placeholder="Company" value={form.company} onChange={(e)=>setForm({...form, company:e.target.value})}/>
        <textarea className="w-full mb-2 p-2 border rounded" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})}/>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Post Job</button>
      </form>

      <h3 className="text-lg mb-3">Existing Jobs</h3>
      <div className="space-y-3">
        {jobs.map(job => (
          <div key={job._id} className="p-3 bg-white dark:bg-gray-800 rounded">
            <div className="font-semibold">{job.title} — {job.company}</div>
            <div className="text-sm text-gray-500">{job.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
