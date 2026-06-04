// Base URL backend. Override lewat VITE_API_BASE (mis. saat di-proxy / production same-origin).
const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:5057';
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Kirim pertanyaan ke backend.
 * POST /api/chat  body: { message }
 * Response: { answer, sources: string[], retrievedChunks: [...] }
 *
 * @param {string} message
 * @param {{ signal?: AbortSignal }} [options]
 */
export async function sendChatMessage(message, { signal } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (API_KEY) headers['X-API-Key'] = API_KEY;

  const response = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ message }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Server merespons dengan status ${response.status}`);
  }

  const data = await response.json();

  return {
    answer: typeof data.answer === 'string' ? data.answer : '',
    sources: Array.isArray(data.sources) ? data.sources : [],
    retrievedChunks: Array.isArray(data.retrievedChunks) ? data.retrievedChunks : [],
  };
}
