import { memo } from 'react';
import BrandLogo from './BrandLogo';
import { APP_NAME, EXAMPLE_QUESTIONS } from '../constants';

function EmptyState({ onSelectExample }) {
  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center px-4 py-10 text-center">
      <BrandLogo className="h-16 w-16" />

      <h2 className="mt-5 text-xl font-bold text-slate-900 sm:text-2xl">{APP_NAME}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
        Asisten pengetahuan internal berbasis AI. Ajukan pertanyaan seputar SOP, K3, data operasional,
        dan kepegawaian untuk mendapatkan jawaban yang dirangkum dari dokumen resmi.
      </p>

      <div className="mt-8 grid w-full gap-2.5 sm:grid-cols-2">
        {EXAMPLE_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => onSelectExample(q)}
            className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-3.5 text-left text-sm text-slate-700 shadow-sm transition hover:border-[#00549B]/40 hover:bg-[#00549B]/5 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00549B]/30"
          >
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-[#00549B]/10 text-[#00549B]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </span>
            <span className="leading-snug">{q}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default memo(EmptyState);
