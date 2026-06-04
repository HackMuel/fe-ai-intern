import { memo } from 'react';
import MarkdownAnswer from './MarkdownAnswer';
import SourceList from './SourceList';
import { AssistantAvatar, UserAvatar } from './Avatars';

const toText = (value) => (typeof value === 'string' ? value : JSON.stringify(value));

function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="chat-msg-in flex justify-end gap-3">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-[#00549B] px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm">
          <p className="whitespace-pre-wrap break-words">{toText(message.content)}</p>
        </div>
        <UserAvatar />
      </div>
    );
  }

  return (
    <div className="chat-msg-in flex gap-3">
      <AssistantAvatar />
      <div className="min-w-0 max-w-[80%]">
        <div className="mb-1 text-xs font-semibold text-slate-500">Asisten Pertamina</div>
        <div className="rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm">
          <MarkdownAnswer content={toText(message.content)} />
          <SourceList sources={message.sources} chunkCount={message.retrievedChunks?.length ?? 0} />
        </div>
      </div>
    </div>
  );
}

export default memo(ChatMessage);
