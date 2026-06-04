import { useCallback, useEffect, useRef, useState } from 'react';
import { sendChatMessage } from '../services/api';

let seq = 0;
const makeMessage = (role, content, sources = [], retrievedChunks = []) => ({
  id: `${role}-${Date.now()}-${seq++}`,
  role,
  content,
  sources,
  retrievedChunks,
});

/**
 * State & orkestrasi percakapan. Dipakai bersama oleh ChatApp (full-page)
 * dan ChatWidget (floating), agar logika backend tidak terduplikasi.
 */
export function useChat() {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [connection, setConnection] = useState('online');

  const abortRef = useRef(null);
  const lastQuestionRef = useRef('');

  useEffect(() => () => abortRef.current?.abort(), []);

  const ask = useCallback(async (raw, { retry = false } = {}) => {
    const question = (raw ?? '').trim();
    if (!question || isLoading) return;

    setError(null);
    lastQuestionRef.current = question;
    if (!retry) {
      setDraft('');
      setMessages((current) => [...current, makeMessage('user', question)]);
    }
    setIsLoading(true);
    setConnection('connecting');

    abortRef.current = new AbortController();
    try {
      const data = await sendChatMessage(question, { signal: abortRef.current.signal });
      setMessages((current) => [
        ...current,
        makeMessage(
          'assistant',
          data.answer || 'Maaf, tidak ada jawaban yang tersedia untuk pertanyaan ini.',
          data.sources,
          data.retrievedChunks,
        ),
      ]);
      setConnection('online');
    } catch (err) {
      if (err.name === 'AbortError') return;
      setConnection('offline');
      setError('Gagal mengambil jawaban. Periksa koneksi Anda atau pastikan layanan backend sedang berjalan.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const submit = useCallback(() => ask(draft), [ask, draft]);
  const retry = useCallback(() => ask(lastQuestionRef.current, { retry: true }), [ask]);
  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setDraft('');
  }, []);

  return {
    messages,
    draft,
    setDraft,
    isLoading,
    error,
    connection,
    ask,
    submit,
    retry,
    reset,
  };
}
