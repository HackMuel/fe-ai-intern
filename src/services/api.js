const CHAT_ENDPOINT = 'http://localhost:5057/api/chat';

export async function sendChatMessage(message) {
  const response = await fetch(CHAT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  return response.json();
}
