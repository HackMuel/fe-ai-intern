import { memo } from 'react';

const STATUS = {
  online: { dot: 'bg-emerald-500', label: 'Terhubung', text: 'text-emerald-700', bg: 'bg-emerald-50', ring: 'ring-emerald-200', pulse: true },
  connecting: { dot: 'bg-amber-500', label: 'Memproses', text: 'text-amber-700', bg: 'bg-amber-50', ring: 'ring-amber-200', pulse: true },
  offline: { dot: 'bg-[#ED1C24]', label: 'Terputus', text: 'text-[#ED1C24]', bg: 'bg-[#ED1C24]/5', ring: 'ring-[#ED1C24]/20', pulse: false },
};

function ConnectionStatus({ status = 'online', compact = false }) {
  const s = STATUS[status] ?? STATUS.online;

  return (
    <span
      title={s.label}
      className={`inline-flex items-center gap-1.5 rounded-full text-xs font-medium ring-1 ring-inset ${compact ? 'p-1' : 'px-2.5 py-1'} ${s.bg} ${s.text} ${s.ring}`}
    >
      <span className="relative flex h-2 w-2">
        {s.pulse && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${s.dot}`} />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${s.dot}`} />
      </span>
      {!compact && <span className="hidden sm:inline">{s.label}</span>}
    </span>
  );
}

export default memo(ConnectionStatus);
