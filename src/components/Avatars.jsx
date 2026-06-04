import { memo } from 'react';
import BrandLogo from './BrandLogo';

export const AssistantAvatar = memo(function AssistantAvatar() {
  return (
    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white ring-1 ring-slate-200 shadow-sm">
      <BrandLogo className="h-6 w-6" />
    </div>
  );
});

export const UserAvatar = memo(function UserAvatar() {
  return (
    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#00549B] text-white">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>
  );
});
