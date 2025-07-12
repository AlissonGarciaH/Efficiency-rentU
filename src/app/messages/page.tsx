'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  listingId: string;
}

const MessagesPage = () => {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const currentUserId = session?.user?.id as string;

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages?userId=${currentUserId}`);
        const data: Message[] = await res.json();
        setMessages(data);
      } catch {
        setError("Failed to load messages.");
      }
    };

    fetchMessages();
  }, [status, currentUserId]);

  const conversations = Array.from(
    new Map(
      messages
        .filter((msg) => msg.receiverId === currentUserId)
        .map((msg) => [`${msg.senderId}-${msg.listingId}`, msg])
    ).values()
  );

  if (status === 'loading') return <div>Loading messages...</div>;
  if (status === 'unauthenticated') return <div>Please login to see your messages.</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Guest Conversations</h1>
      {conversations.length === 0 ? (
        <p>No guests have contacted you yet.</p>
      ) : (
        conversations.map((msg) => (
          <div
            key={msg.id}
            onClick={() =>
              router.push(`/messages/${msg.senderId}?listingId=${msg.listingId}`)
            }
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              cursor: 'pointer',
              background: '#f9f9f9',
            }}
          >
            <strong>Guest:</strong> {msg.senderId}<br />
            <strong>Listing:</strong> {msg.listingId}<br />
            <em>{msg.content.slice(0, 60)}...</em>
          </div>
        ))
      )}
    </div>
  );
};

export default MessagesPage;
