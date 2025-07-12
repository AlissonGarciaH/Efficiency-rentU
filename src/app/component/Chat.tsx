"use client";

import { useEffect, useState } from "react";

// Type for each message
type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  listingId: string;
};

// Props for the Chat component
interface ChatProps {
  userId: string;
  receiverId: string;
  listingId: string;
}

export default function Chat({ userId, receiverId, listingId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || !receiverId || !listingId) return;

    const fetchMessages = async () => {
      try {
        const [sorted1, sorted2] = [userId, receiverId].sort();

        const res = await fetch(
          `/api/messages?user1=${sorted1}&user2=${sorted2}&listingId=${listingId}`
        );
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        setError("Could not load messages.");
      }
    };

    fetchMessages(); // Initial load
    const interval: NodeJS.Timeout = setInterval(fetchMessages, 5000); // ✅ declared after fetchMessages

    return () => clearInterval(interval); // Clean up
  }, [userId, receiverId, listingId]);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId, content: newMsg, listingId }),
      });

      if (!res.ok) throw new Error("Message failed");

      const newMessage: Message = await res.json();
      setMessages((prev) => [...prev, newMessage]);
      setNewMsg("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message.");
    }
  };

  return (
    <div
      className="chat-container"
      style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}
    >
      <div
        className="messages"
        style={{
          maxHeight: 300,
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          paddingBottom: 8,
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              alignSelf: msg.senderId === userId ? "flex-end" : "flex-start",
              backgroundColor: msg.senderId === userId ? "#DCF8C6" : "#f1f0f0",
              padding: "8px 12px",
              borderRadius: 12,
              maxWidth: "75%",
            }}
          >
            {msg.content}
          </div>
        ))}
        {error && (
          <div style={{ color: "red", fontSize: "0.9rem" }}>{error}</div>
        )}
      </div>

      <div style={{ display: "flex", marginTop: 10 }}>
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          style={{
            flex: 1,
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 6,
          }}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: 8,
            padding: "10px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
