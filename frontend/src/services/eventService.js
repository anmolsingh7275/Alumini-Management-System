import api from "./api";

export default {
  getEvents: () => api.get("/events"),
  createEvent: (payload) => api.post("/events", payload),
  registerEvent: (id) => api.post(`/events/${id}/register`)
};
