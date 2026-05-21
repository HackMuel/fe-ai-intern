import { forwardRef, memo } from 'react';
import ChatMessage from './ChatMessage';

const LoadingIndicator = memo(function LoadingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3">
        <span className="chat-dot" />
        <span className="chat-dot delay-150" />
        <span className="chat-dot delay-300" />
      </div>
    </div>
  );
});

const EmptyState = memo(function EmptyState() {
  return (
    <div className="mx-auto mt-12 max-w-[260px] px-4 text-center">
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#00549B]/10 text-[#00549B]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-xs leading-relaxed text-slate-500">
        Halo Sam! Tanyakan informasi seputar <span className="font-semibold text-[#00549B]">SOP Balongan</span> atau <span className="font-semibold text-[#00549B]">Data Karyawan</span>.
      </p>
    </div>
  );
});

const MessageList = memo(forwardRef(function MessageList({ messages, isLoading }, ref) {
  return (
    <div ref={ref} className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">
      {messages.length === 0 && !isLoading ? <EmptyState /> : null}

      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      {isLoading ? <LoadingIndicator /> : null}
    </div>
  );
}));

export default MessageList;
