import { memo } from 'react';
import MarkdownAnswer from './MarkdownAnswer';
import SourceList from './SourceList';

function toDisplayText(value) {
  return typeof value === 'string' ? value : JSON.stringify(value);
}

function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`min-w-0 max-w-[88%] rounded-2xl px-3.5 py-3 text-[13px] leading-relaxed ${isUser
        ? 'rounded-tr-md bg-[#00549B] text-white'
        : 'rounded-tl-md border border-slate-200 bg-white text-slate-800'
      }`}
      >
        {isUser ? (
          <p>{toDisplayText(message.content)}</p>
        ) : (
          <>
            <MarkdownAnswer content={toDisplayText(message.content)} />
            <SourceList sources={message.sources} />
          </>
        )}
      </div>
    </div>
  );
}

export default memo(ChatMessage);
