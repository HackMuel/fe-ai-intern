import { memo } from 'react';
import BrandLogo from './BrandLogo';
import ConnectionStatus from './ConnectionStatus';
import { APP_NAME, APP_TAGLINE } from '../constants';

function AppHeader({ connection, onToggleSidebar }) {
  return (
    <header className="z-10 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-2.5 shadow-sm">
      <button
        type="button"
        onClick={onToggleSidebar}
        className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00549B]/30 lg:hidden"
        aria-label="Buka menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <BrandLogo className="h-9 w-9" />

      <div className="min-w-0">
        <h1 className="truncate text-sm font-bold leading-tight text-slate-900 sm:text-base">{APP_NAME}</h1>
        <p className="hidden truncate text-xs text-slate-500 sm:block">{APP_TAGLINE}</p>
      </div>

      <div className="ml-auto">
        <ConnectionStatus status={connection} />
      </div>
    </header>
  );
}

export default memo(AppHeader);
