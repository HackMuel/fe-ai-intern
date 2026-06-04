import { memo } from 'react';
import { EXAMPLE_QUESTIONS, KNOWLEDGE_SOURCES } from '../constants';

function Sidebar({ onSelectExample }) {
  return (
    <div className="chat-scroll flex h-full flex-col overflow-y-auto p-5">
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Tentang Aplikasi</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Asisten pengetahuan internal Pertamina. Ajukan pertanyaan seputar SOP, prosedur K3,
          data operasional, dan informasi kepegawaian — jawaban dirangkum dari dokumen resmi perusahaan.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Contoh Pertanyaan</h2>
        <div className="mt-3 space-y-2">
          {EXAMPLE_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => onSelectExample(q)}
              className="flex w-full items-start gap-2 rounded-xl border border-slate-200 bg-white p-3 text-left text-sm text-slate-700 transition hover:border-[#00549B]/40 hover:bg-[#00549B]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00549B]/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 shrink-0 text-[#00549B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.9 9.9 0 01-4-.8L3 20l1.3-3.2A7.8 7.8 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{q}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Sumber Pengetahuan</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          {KNOWLEDGE_SOURCES.map((src) => (
            <li key={src.label} className="flex items-center gap-2.5">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: src.color }} />
              {src.label}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-auto pt-6">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
          <span className="font-semibold">Penggunaan Internal.</span> Jawaban bersifat referensi.
          Verifikasi pada dokumen resmi sebelum mengambil keputusan.
        </div>
      </div>
    </div>
  );
}

export default memo(Sidebar);
