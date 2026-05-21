import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PERTAMINA_RED = '#ED1C24';
const PERTAMINA_BLUE = '#00549B';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const chatVariants = {
  hidden: {
    opacity: 0,
    scale: 0.88,
    y: 28,
    transformOrigin: '100% 100%',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 420,
      damping: 32,
      mass: 0.9,
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 18,
    transition: { duration: 0.18, ease: 'easeInOut' },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 360, damping: 28 },
  },
};

const messageVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 420, damping: 30 },
  },
  exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } },
};

const typingDotTransition = {
  duration: 0.72,
  repeat: Infinity,
  repeatType: 'mirror',
  ease: 'easeInOut',
};

const ChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleReset = () => {
    if (window.confirm("Hapus semua percakapan demo ini?")) {
      setMessages([]);
      setInput('');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsFullscreen(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Sesuaikan URL dengan backend .NET kamu
      const response = await fetch('http://localhost:5057/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();

      const aiMsg = {
        role: 'assistant',
        content: data.answer || "Maaf, tidak ada jawaban.",
        sources: Array.isArray(data.sources) ? data.sources : [] // Backend harus kirim array string nama file
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Waduh, koneksi ke backend putus bray. Cek dotnet-nya!"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className="fixed inset-0 z-50 pointer-events-none font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="pertamina-chat-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute inset-0 bg-slate-950/30 backdrop-blur-[2px] pointer-events-auto"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      <div className={isFullscreen ? "absolute inset-0 flex items-stretch p-0 pointer-events-auto sm:p-4" : "absolute bottom-5 right-5 pointer-events-auto"}>
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.button
              key="pertamina-chat-fab"
              onClick={() => setIsOpen(true)}
              className="group flex items-center justify-end gap-3 rounded-full px-4 py-4 text-white shadow-[0_18px_45px_rgba(237,28,36,0.35)] outline-none ring-1 ring-white/20"
              style={{ backgroundColor: PERTAMINA_RED }}
              initial={{ opacity: 0, scale: 0.82, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              whileHover={{
                scale: 1.06,
                boxShadow: '0 20px 50px rgba(237, 28, 36, 0.42)',
                transition: { type: 'spring', stiffness: 520, damping: 18 },
              }}
              whileTap={{
                scale: 0.92,
                transition: { type: 'spring', stiffness: 700, damping: 20 },
              }}
              transition={{ type: 'spring', stiffness: 430, damping: 26 }}
              aria-label="Open Pertamina AI assistant"
            >
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold leading-none opacity-0 transition-all duration-300 group-hover:max-w-[46px] group-hover:opacity-100">
                Ask AI
              </span>
              <span className="flex h-6 w-6 items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </span>
            </motion.button>
          )}

          {isOpen && (
            <motion.section
              key="pertamina-chat-window"
              variants={chatVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`flex flex-col overflow-hidden border border-white/70 bg-white shadow-[0_28px_80px_rgba(0,0,0,0.28)] ${isFullscreen
                  ? 'h-full w-full rounded-none sm:rounded-[28px]'
                  : 'h-[520px] w-80 rounded-[28px] sm:w-[360px]'
                }`}
              role="dialog"
              aria-label=" AI Internal Assistant"
            >
              <motion.header
                variants={contentVariants}
                className="flex items-center justify-between border-b border-white/20 p-4 text-white shadow-lg backdrop-blur-xl"
                style={{
                  background: `linear-gradient(135deg, rgba(237, 28, 36, 0.88) 0%, rgba(237, 28, 36, 0.82) 42%, rgba(0, 84, 155, 0.88) 100%)`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-white/20 ring-1 ring-white/25">
                    <motion.div
                      className="absolute h-3 w-3 rounded-full"
                      style={{ backgroundColor: PERTAMINA_RED }}
                      animate={{ scale: [1, 2.15], opacity: [0.48, 0] }}
                      transition={{ duration: 1.45, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <div
                      className="relative h-2.5 w-2.5 rounded-full shadow-[0_0_14px_rgba(255,255,255,0.75)]"
                      style={{ backgroundColor: PERTAMINA_BLUE }}
                    />
                  </div>
                  <div>
                    <h1 className="text-[11px] font-bold uppercase leading-none tracking-wider">Chatbot demo</h1>
                    <p className="mt-1 text-[9px] font-medium text-white/80">AI Internal Assistant</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => setIsFullscreen((current) => !current)}
                    className="rounded-xl p-2 text-white/90 outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/70"
                    title={isFullscreen ? "Keluar fullscreen" : "Fullscreen"}
                    aria-label={isFullscreen ? "Keluar fullscreen" : "Fullscreen"}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                  >
                    {isFullscreen ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v6H3m12-6v6h6M9 21v-6H3m12 6v-6h6" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9V3h6m6 0h6v6M3 15v6h6m12-6v6h-6" />
                      </svg>
                    )}
                  </motion.button>

                  <motion.button
                    onClick={handleReset}
                    className="rounded-xl p-2 text-white/90 outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/70"
                    title="Bersihkan Percakapan"
                    aria-label="Bersihkan percakapan"
                    whileHover={{ rotate: 180, scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 11a8.1 8.1 0 00-15.5-2M4 4v5h5m-5 4a8.1 8.1 0 0015.5 2M20 20v-5h-5" />
                    </svg>
                  </motion.button>

                  <motion.button
                    onClick={handleClose}
                    className="rounded-xl p-2 text-white/90 outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/70"
                    aria-label="Close chat"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </motion.header>

              <motion.div
                ref={scrollRef}
                variants={contentVariants}
                className="flex-1 space-y-4 overflow-y-auto bg-slate-50/80 p-4"
              >
                <AnimatePresence>
                  {messages.length === 0 && (
                    <motion.div
                      key="empty-state"
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mt-12 px-4 text-center"
                    >
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00549B]/10 text-[#00549B]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-500">
                        Halo Sam! Tanyakan informasi seputar <span className="font-semibold text-[#00549B]">SOP Balongan</span> atau <span className="font-semibold text-[#00549B]">Data Karyawan</span>.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  className="space-y-4"
                  initial={false}
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.045 } },
                  }}
                >
                  <AnimatePresence initial={false}>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={`${msg.role}-${i}-${String(msg.content ?? '').slice(0, 18)}`}
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`min-w-0 max-w-[85%] p-3 shadow-sm ${msg.role === 'user'
                          ? 'rounded-2xl rounded-tr-md bg-[#00549B] text-white shadow-[#00549B]/20'
                          : 'rounded-2xl rounded-tl-md border border-slate-100 bg-white text-slate-800'
                          }`}>
                          {msg.role === 'assistant' ? (
                            <div className="chat-markdown">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <p className="text-[13px] leading-relaxed">{typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}</p>
                          )}

                          {msg.sources && msg.sources.length > 0 && (
                            <div className="mt-2 flex items-center gap-1 border-t border-slate-100 pt-2 text-[10px] font-medium text-[#00549B]">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 4.804A7.993 7.993 0 002 12a7.998 7.998 0 003 6.336A10.012 10.012 0 019 4.804zM3.908 18A5.99 5.99 0 012 12c0-1.761.76-3.341 1.968-4.43A9.011 9.011 0 013.908 18zM16.092 18A9.011 9.011 0 0116.032 7.57 5.99 5.99 0 0118 12c0 3.125-2.392 5.688-5.468 5.982A10.012 10.012 0 0116.092 18zM11 4.804a10.012 10.012 0 013.064 13.196A7.998 7.998 0 0018 12a7.993 7.993 0 00-7-7.196z" />
                              </svg>
                              <span>Ref: {msg.sources.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      key="typing"
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex justify-start"
                    >
                      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-slate-100 bg-white px-4 py-3 shadow-sm">
                        {[0, 1, 2].map((dot) => (
                          <motion.span
                            key={dot}
                            className="h-2 w-2 rounded-full bg-[#ED1C24]"
                            animate={{ y: [0, -5, 0], opacity: [0.35, 1, 0.35] }}
                            transition={{ ...typingDotTransition, delay: dot * 0.12 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.footer variants={contentVariants} className="border-t border-slate-200 bg-white p-4">
                <div className="flex gap-2 rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-4 pr-2 shadow-inner outline-none transition-all focus-within:ring-2 focus-within:ring-[#00549B]/40">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Tanya asisten..."
                    className="flex-1 border-none bg-transparent py-1 text-[13px] text-slate-800 outline-none placeholder:text-slate-400"
                  />
                  <motion.button
                    onClick={sendMessage}
                    className="rounded-full bg-[#00549B] p-2 text-white shadow-md shadow-[#00549B]/25 outline-none focus-visible:ring-2 focus-visible:ring-[#00549B]/45"
                    whileHover={{ scale: 1.08, backgroundColor: PERTAMINA_RED }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 520, damping: 22 }}
                    aria-label="Send message"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </motion.button>
                </div>
              </motion.footer>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatWidget;
