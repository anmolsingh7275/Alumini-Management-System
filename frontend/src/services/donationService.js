import api from "./api";

export default {
  createDonation: (payload) => api.post("/donations", payload),
  getDonations: () => api.get("/donations")
};
