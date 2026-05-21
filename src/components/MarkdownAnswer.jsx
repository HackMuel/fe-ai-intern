import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const remarkPlugins = [remarkGfm];

function MarkdownAnswer({ content }) {
  return (
    <div className="chat-markdown">
      <ReactMarkdown remarkPlugins={remarkPlugins}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default memo(MarkdownAnswer);
