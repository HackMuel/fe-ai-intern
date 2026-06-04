import { memo } from 'react';

const toLabel = (source) => (typeof source === 'string' ? source : source?.name ?? JSON.stringify(source));

function SourceList({ sources, chunkCount = 0 }) {
  const items = Array.isArray(sources) ? sources : [];
  if (items.length === 0 && !chunkCount) return null;

  return (
    <div className="mt-3 border-t border-slate-100 pt-2.5">
      <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        Sumber{chunkCount ? ` · ${chunkCount} kutipan` : ''}
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {items.map((source, index) => {
            const label = toLabel(source);
            return (
              <span
                key={`${label}-${index}`}
                title={label}
                className="inline-flex max-w-full items-center gap-1 rounded-md border border-[#00549B]/15 bg-[#00549B]/5 px-2 py-1 text-[11px] font-medium text-[#00549B]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z M13 3v6h6" />
                </svg>
                <span className="truncate">{label}</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default memo(SourceList);
