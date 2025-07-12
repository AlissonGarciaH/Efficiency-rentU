'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  listingId: string;
}

const ChatPage = () => {
  const params = useParams();
  const rawSearchParams = useSearchParams();
  const searchParams = rawSearchParams ?? new URLSearchParams();
  const { data: session } = useSession();

  const otherUserId = params?.userId as string;
  const listingId = searchParams.get('listingId') as string;
  const currentUserId = session?.user?.id as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!currentUserId || !otherUserId || !listingId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages?user1=${currentUserId}&user2=${otherUserId}&listingId=${listingId}`);
        const data: Message[] = await res.json();
        setMessages(data);
      } catch (err) {
        console.error('Error loading messages:', err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [currentUserId, otherUserId, listingId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        receiverId: otherUserId,
        content: newMessage,
        listingId,
      }),
    });

    const data: Message = await res.json();
    setMessages((prev) => [...prev, data]);
    setNewMessage('');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h2>Chat about Listing: {listingId}</h2>

      <div style={{ marginBottom: '1rem' }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              backgroundColor: msg.senderId === currentUserId ? '#DCF8C6' : '#f1f0f0',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '8px',
              textAlign: msg.senderId === currentUserId ? 'right' : 'left',
            }}
          >
            <div>{msg.content}</div>
            <div style={{ fontSize: '0.75rem', color: '#666' }}>
              {new Date(msg.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
