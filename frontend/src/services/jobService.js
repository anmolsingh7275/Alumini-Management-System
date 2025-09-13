import api from "./api";

export default {
  getJobs: () => api.get("/jobs"),
  createJob: (payload) => api.post("/jobs", payload),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  applyJob: (id, payload) => api.post(`/jobs/${id}/apply`, payload)
};
