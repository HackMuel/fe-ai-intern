import { useCallback, useEffect, useRef, useState } from 'react';
import { sendChatMessage } from '../services/api';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

const createMessage = (role, content, sources = []) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  role,
  content,
  sources,
});

export default function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages.length, isLoading]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsFullscreen(false);
  }, []);

  const handleReset = useCallback(() => {
    if (window.confirm('Hapus semua percakapan demo ini?')) {
      setMessages([]);
    }
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen((current) => !current);
  }, []);

  const handleSendMessage = useCallback(async (message) => {
    const text = message.trim();
    if (!text || isLoading) return;

    setMessages((current) => [...current, createMessage('user', text)]);
    setIsLoading(true);

    try {
      const data = await sendChatMessage(text);
      setMessages((current) => [
        ...current,
        createMessage(
          'assistant',
          data.answer || 'Maaf, tidak ada jawaban.',
          Array.isArray(data.sources) ? data.sources : [],
        ),
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((current) => [
        ...current,
        createMessage('assistant', 'Koneksi ke backend terputus. Pastikan service .NET berjalan.'),
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none font-sans">
      {isOpen && (
        <button
          type="button"
          className="absolute inset-0 bg-slate-950/20 pointer-events-auto transition-opacity"
          onClick={handleClose}
          aria-label="Close chat overlay"
        />
      )}

      <div className={isFullscreen ? 'absolute inset-0 flex items-stretch p-0 pointer-events-auto sm:p-4' : 'absolute bottom-5 right-5 pointer-events-auto'}>
        {!isOpen ? (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00549B] text-white shadow-lg shadow-slate-900/20 transition hover:bg-[#00447d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00549B]/40 focus-visible:ring-offset-2"
            aria-label="Open Pertamina AI assistant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
        ) : (
          <section
            className={`chat-window flex flex-col overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-900/15 ${isFullscreen
              ? 'h-full w-full rounded-none sm:rounded-2xl'
              : 'h-[540px] w-[calc(100vw-2.5rem)] rounded-2xl sm:w-[380px]'
            }`}
            role="dialog"
            aria-label="AI Internal Assistant"
          >
            <ChatHeader
              isFullscreen={isFullscreen}
              onClose={handleClose}
              onReset={handleReset}
              onToggleFullscreen={handleToggleFullscreen}
            />

            <MessageList ref={scrollRef} messages={messages} isLoading={isLoading} />

            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </section>
        )}
      </div>
    </div>
  );
}
