import React, { useState } from "react";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";

export default function Chat() {
  const { messages, sendMessage } = useChat();
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [to, setTo] = useState(""); // in real app you'd pick a user from a list

  const submit = (e) => {
    e.preventDefault();
    if (!to) return alert("Enter recipient userId");
    sendMessage(to, text);
    setText("");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Simple Chat (dev)</h2>
      <div className="mb-3"><input placeholder="Recipient userId" value={to} onChange={(e)=>setTo(e.target.value)} className="p-2 border rounded w-full max-w-sm" /></div>
      <div className="h-64 overflow-auto p-3 mb-3 bg-white dark:bg-gray-800 rounded">
        {messages.map((m,i)=>(
          <div key={i} className={`${m.from === user._id ? 'text-right' : 'text-left'} mb-2`}>
            <div className="inline-block p-2 rounded bg-gray-100 dark:bg-gray-700">{m.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="flex gap-2">
        <input value={text} onChange={(e)=>setText(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Type message..." />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      </form>
    </div>
  );
}
