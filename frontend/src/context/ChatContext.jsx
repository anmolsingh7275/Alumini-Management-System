import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { token, user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user || !token) return;
    const s = io(import.meta.env.VITE_API_URL || "http://localhost:5000", {
      path: "/socket.io",
      auth: { token }
    });
    setSocket(s);
    s.on("connect", () => console.log("socket connected", s.id));
    s.on("message", (m) => setMessages((p) => [...p, m]));
    return () => s.disconnect();
  }, [user, token]);

  const sendMessage = (to, text) => {
    if (!socket) return;
    const payload = { from: (user && user._id) || null, to, text, createdAt: new Date() };
    socket.emit("message", payload);
    setMessages((p) => [...p, payload]);
  };

  return <ChatContext.Provider value={{ socket, messages, sendMessage }}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);
