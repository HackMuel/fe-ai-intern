import { memo } from 'react';

// Mark tiga panah Pertamina (biru - hijau - merah) yang menanjak ke atas.
function PertaminaLogo({ className = '' }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10 12 L20 7 L30 12" stroke="#ED1C24" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 20 L20 15 L30 20" stroke="#009A44" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 28 L20 23 L30 28" stroke="#00549B" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default memo(PertaminaLogo);
