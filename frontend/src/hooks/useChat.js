// convenience hook to import chat context methods
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext"; // using context file (it exports ChatContext)
export default function useChat() {
  return useContext(ChatContext);
}
