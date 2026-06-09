import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SCRIPTS, SECTION_ORDER } from '../audio/scripts';
import { GrainOverlay } from '../components/ui/atmosphere';

const TranscriptPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#020C1B] selection:bg-[#A7DADB]/30 selection:text-[#A7DADB]">
      <GrainOverlay opacity={0.06} />

      {/* Nav */}
      <nav className="sticky top-0 z-10 flex items-center gap-4 px-6 md:px-12 lg:px-24 h-20 border-b border-white/[0.06] bg-[#020C1B]/80 backdrop-blur-2xl">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-display text-xs tracking-[0.3em] uppercase font-bold text-[#b0c5c6]/70 hover:text-white"
          style={{ transition: 'color 200ms var(--ease-out-expo)' }}
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5" style={{ transition: 'transform 200ms var(--ease-out-expo)' }} strokeWidth={2} />
          Back
        </Link>
        <span className="h-4 w-px bg-white/10" aria-hidden />
        <span className="font-display text-[11px] tracking-[0.4em] uppercase text-[#A7DADB] font-bold">
          Full Transcript
        </span>
      </nav>

      <main className="max-w-[720px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Page header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB]" />
            <span className="font-display text-[11px] tracking-[0.45em] uppercase text-[#A7DADB] font-bold">
              Narrated Tour
            </span>
          </div>
          <h1 className="font-display font-bold text-white text-[clamp(2.5rem,6vw,5rem)] leading-[0.94] tracking-[-0.025em]">
            The full
            <br />
            <span className="font-serif-display italic font-normal text-[#A7DADB]">transcript.</span>
          </h1>
          <p className="mt-6 font-body font-light text-[#b0c5c6] text-lg leading-[1.6] max-w-[55ch]">
            This transcript provides full text of the narrated tour audio, per WCAG 2.1 SC 1.2.1.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {SECTION_ORDER.map((id, i) => {
            const script = SCRIPTS[id];
            return (
              <article
                key={id}
                className="group relative"
              >
                {/* Connector line */}
                {i < SECTION_ORDER.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute left-0 top-full h-16 w-px bg-gradient-to-b from-white/10 to-transparent"
                  />
                )}

                {/* Chapter overline */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/40 font-bold tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 max-w-[40px] bg-white/[0.08]" aria-hidden />
                  <span className="font-display text-[11px] tracking-[0.35em] uppercase text-[#A7DADB]/80 font-bold">
                    {script.title}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#b0c5c6]/35 tabular-nums">
                    ~{Math.round(script.durationSec)}s
                  </span>
                </div>

                {/* Script text */}
                <p className="font-body font-light text-[#b0c5c6] text-[1.0625rem] leading-[1.7] border-l-2 border-white/[0.07] pl-6">
                  {script.transcript}
                </p>
              </article>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-20 pt-10 border-t border-white/[0.06]">
          <p className="font-display text-[10px] tracking-[0.35em] uppercase text-[#b0c5c6]/35 font-bold">
            Smartslate × AIT  ·  Academic Excellence 2026  ·  AIT_COGNITIVE_V1.0
          </p>
        </div>
      </main>
    </div>
  );
};

export default TranscriptPage;
