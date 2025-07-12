"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
}

const ListingChatPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const listingId = params?.listingId as string;
  const hostId = searchParams?.get("ownerId") as string;
  const userId = session?.user?.id as string | undefined; // ✅ FIXED

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!userId || !hostId || !listingId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `/api/messages?user1=${userId}&user2=${hostId}&listingId=${listingId}`
        );
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    fetchMessages();
  }, [userId, hostId, listingId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId: hostId, content: newMessage, listingId }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, data]);
    setNewMessage("");
  };

  if (status === "loading" || !userId || !hostId || !listingId) {
    return <div>Loading chat...</div>;
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
      <h2>Messages for Listing: {listingId}</h2>
      <div style={{ marginBottom: "1rem" }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <strong>{msg.senderId === userId ? "You" : "Host"}:</strong> {msg.content}
            <div style={{ fontSize: "0.75rem", color: "#888" }}>
              {new Date(msg.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{
            flexGrow: 1,
            padding: "0.5rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#42D9B0",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ListingChatPage;

