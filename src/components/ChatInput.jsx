import { memo, useState } from 'react';

function ChatInput({ isLoading, onSendMessage }) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    const text = input.trim();
    if (!text || isLoading) return;

    onSendMessage(text);
    setInput('');
  };

  return (
    <footer className="border-t border-slate-200 bg-white p-4">
      <div className="flex gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition focus-within:border-[#00549B]/50 focus-within:ring-2 focus-within:ring-[#00549B]/10">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleSubmit();
          }}
          placeholder="Tanya asisten..."
          className="min-w-0 flex-1 border-none bg-transparent text-[13px] text-slate-800 outline-none placeholder:text-slate-400"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !input.trim()}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#00549B] text-white transition hover:bg-[#00447d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00549B]/30 disabled:cursor-not-allowed disabled:bg-slate-300"
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rotate-90" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </footer>
  );
}

export default memo(ChatInput);
