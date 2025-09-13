import api from "./api";
export const loginAPI = (email, password) => api.post("/auth/login", { email, password });
export const registerAlumniAPI = (payload) => api.post("/auth/register-alumni", payload);
export const registerStudentAPI = (payload) => api.post("/auth/register-student", payload);
