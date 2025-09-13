import api from "./api";

export default {
  getConversation: (userId) => api.get(`/chats/${userId}`),
  getAllContacts: () => api.get("/users/contacts")
};
