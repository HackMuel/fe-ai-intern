import { useState } from 'react';
import PertaminaLogo from './PertaminaLogo';

// Logo Pertamina dari /icons.svg. Jika file belum tersedia,
// fallback otomatis ke mark SVG bawaan agar UI tidak pernah rusak.
export default function BrandLogo({ className = 'h-9 w-9' }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={`grid shrink-0 place-items-center rounded-lg bg-white ring-1 ring-slate-200 ${className}`}>
        <PertaminaLogo className="h-3/4 w-3/4" />
      </span>
    );
  }

  return (
    <img
      src="/icons.svg"
      alt="Logo Pertamina"
      onError={() => setFailed(true)}
      className={`shrink-0 object-contain ${className}`}
    />
  );
}
