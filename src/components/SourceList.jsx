import { memo } from 'react';

function SourceList({ sources }) {
  if (!Array.isArray(sources) || sources.length === 0) return null;

  return (
    <div className="mt-3 border-t border-slate-100 pt-2">
      <div className="mb-1 text-[10px] font-semibold uppercase text-slate-400">Sumber</div>
      <div className="flex flex-wrap gap-1.5">
        {sources.map((source, index) => (
          <span
            key={`${source}-${index}`}
            className="max-w-full truncate rounded-full border border-[#00549B]/15 bg-[#00549B]/5 px-2 py-1 text-[10px] font-medium text-[#00549B]"
            title={source}
          >
            {source}
          </span>
        ))}
      </div>
    </div>
  );
}

export default memo(SourceList);
