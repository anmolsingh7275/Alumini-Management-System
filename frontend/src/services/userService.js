import api from "./api";

export default {
  getAlumni: () => api.get("/users?role=alumni"),
  getStudents: () => api.get("/users?role=student"),
  approveAlumni: (id) => api.put(`/users/${id}/approve`),
  blockStudent: (id, blocked) => api.put(`/users/${id}/block`, { blocked }),
  getUser: (id) => api.get(`/users/${id}`),
  updateProfile: (id, payload) => api.put(`/users/${id}`, payload)
};
