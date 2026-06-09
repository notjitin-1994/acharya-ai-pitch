import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Users,
  Building2,
  AlertTriangle,
  Clock,
  TrendingDown,
  ShieldOff,
  FileX,
  Zap,
  Target,
  X,
} from 'lucide-react';
import { MeshGradient, Vignette } from '../ui/atmosphere';
import { NumberTicker } from '../ui/number-ticker';
import { FlickeringGrid } from '../ui/flickering-grid';
import { BackgroundVideo, FOOTAGE } from '../ui/BackgroundVideo';

const easeOut = [0.16, 1, 0.3, 1] as const;

/* ───── Data ─────────────────────────────────────────── */

const failures = [
  {
    id: 'students',
    num: '01',
    label: 'Students',
    status: 'Unguided adoption.',
    icon: GraduationCap,
    accentColor: '#A7DADB',
    accentGlow: 'rgba(167, 218, 219, 0.15)',
    img: '/pricing-pillar-students.jpg',
    video: FOOTAGE.campusVibrantLife,
    imgAlt: 'Indian university students collaborating with laptops',
    body: 'A generation using artificial intelligence in the shadows. Without guidance. Without ethical framing. Without the practitioner skill that industry now demands at the entry rung.',
    stat: { value: 76, suffix: '%', label: 'use AI without any institutional guidance' },
    details: [
      { icon: ShieldOff, text: 'AI used without institutional framework or ethical guardrails' },
      { icon: FileX, text: 'No verifiable credential to differentiate graduates' },
      { icon: Target, text: 'Employers increasingly require practitioner-level AI fluency' },
      { icon: Zap, text: 'Peer institutions are building certification programmes now' },
    ],
  },
  {
    id: 'faculty',
    num: '02',
    label: 'Faculty',
    status: 'Held back.',
    icon: Users,
    accentColor: '#8AC8C9',
    accentGlow: 'rgba(138, 200, 201, 0.15)',
    img: '/pricing-pillar-faculty.jpg',
    video: FOOTAGE.professorSmartboard,
    imgAlt: 'Indian educator preparing lesson materials',
    body: "Educators ready to lead, buried by yesterday's tooling. Manual preparation, static pedagogy, and assessment debt drain the very hours that compound into pedagogical mastery.",
    stat: { value: 60, suffix: '%', label: 'of faculty time lost to manual prep work' },
    details: [
      { icon: Clock, text: '40–60% of weekly preparation time consumed by manual tasks' },
      { icon: FileX, text: 'No AI-assisted content generation or assessment design tools' },
      { icon: TrendingDown, text: "Professional development budgets don't reach frontier tools" },
      { icon: AlertTriangle, text: 'Faculty motivation erodes when tooling lags behind students' },
    ],
  },
  {
    id: 'institutions',
    num: '03',
    label: 'Institutions',
    status: 'Velocity mismatch.',
    icon: Building2,
    accentColor: '#C8E9EA',
    accentGlow: 'rgba(200, 233, 234, 0.15)',
    img: '/pricing-pillar-campus.jpg',
    video: FOOTAGE.campusTimelapse,
    imgAlt: 'Traditional Indian college campus exterior',
    body: 'Change measured in years, while industry moves in months. The compounding gap erodes brand and legacy every single semester it remains unaddressed.',
    stat: { value: 2027, suffix: '', label: 'accreditation bodies add AI-readiness metrics' },
    details: [
      { icon: Clock, text: 'Accreditation bodies moving to AI-readiness as a metric by 2027' },
      { icon: Target, text: 'Employer hiring criteria shifting to AI-competency baseline' },
      { icon: AlertTriangle, text: 'First-mover positioning cannot be purchased after the fact' },
      { icon: TrendingDown, text: 'Compounding semester-on-semester brand erosion is silent but terminal' },
    ],
  },
];

/* ───── 3D Tilt Card ─────────────────────────────────── */

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className, style, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const halfW = rect.width / 2;
    const halfH = rect.height / 2;
    rotateY.set(((e.clientX - rect.left - halfW) / halfW) * 4);
    rotateX.set(-((e.clientY - rect.top - halfH) / halfH) * 4);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="perspective-1000 h-full">
      <motion.div
        ref={cardRef}
        className={className}
        style={{ ...style, rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ───── Detail Modal ─────────────────────────────────── */

interface DetailModalProps {
  failure: (typeof failures)[0];
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ failure, onClose }) => {
  const Icon = failure.icon;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[250] flex items-center justify-center px-4 md:px-8 py-12 md:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-[#020C1B]/85 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Content */}
      <motion.div
        className="relative z-10 w-full max-w-[900px] max-h-full overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#0a1729]/95 backdrop-blur-2xl glass-refract isolate flex flex-col"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        {/* Top accent line — stays pinned, not part of scroll area */}
        <div className="shrink-0 h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${failure.accentColor}, transparent)` }} />

        {/* Scrollable content — scrollbar lives inside the rounded modal */}
        <div className="overflow-y-auto custom-scrollbar flex-1">

        {/* Image Header */}
        <div className="relative h-[220px] md:h-[280px] overflow-hidden">
          <BackgroundVideo
            src={failure.video}
            poster={failure.img}
            style={{ filter: 'contrast(1.1) saturate(0.85) brightness(0.5)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1729] via-[#0a1729]/60 to-transparent" />
          <Vignette strength={0.5} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-all duration-300 cursor-pointer"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>

          {/* Floating badge */}
          <div className="absolute bottom-6 left-8 flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center border"
              style={{
                borderColor: `${failure.accentColor}33`,
                backgroundColor: `${failure.accentColor}15`,
              }}
            >
              <Icon className="w-7 h-7" style={{ color: failure.accentColor }} />
            </div>
            <div>
              <p className="font-display text-[10px] tracking-[0.4em] uppercase font-bold" style={{ color: `${failure.accentColor}CC` }}>
                Failure {failure.num}
              </p>
              <h3 className="font-display font-bold text-white text-2xl md:text-3xl tracking-tight uppercase">
                {failure.label}
              </h3>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 md:p-10">
          <p className="font-serif-display italic text-xl md:text-2xl mb-4" style={{ color: failure.accentColor }}>
            {failure.status}
          </p>
          <p className="font-body font-light text-[#b0c5c6] text-base md:text-lg leading-relaxed mb-8 max-w-[60ch]">
            {failure.body}
          </p>

          {/* Stat callout */}
          <div
            className="rounded-2xl p-6 mb-8 border"
            style={{
              backgroundColor: `${failure.accentColor}08`,
              borderColor: `${failure.accentColor}20`,
            }}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl md:text-6xl font-bold tabular-nums" style={{ color: failure.accentColor }}>
                <NumberTicker value={failure.stat.value} delay={0.3} />
              </span>
              {failure.stat.suffix && (
                <span className="font-display text-3xl font-bold" style={{ color: failure.accentColor }}>
                  {failure.stat.suffix}
                </span>
              )}
            </div>
            <p className="mt-2 font-body text-sm text-[#b0c5c6]/80">{failure.stat.label}</p>
          </div>

          {/* Detail bullets */}
          <p className="font-display text-[10px] tracking-[0.4em] uppercase font-bold mb-5" style={{ color: `${failure.accentColor}99` }}>
            The Compounding Gap
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {failure.details.map((d, idx) => {
              const DIcon = d.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + idx * 0.08, ease: easeOut }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]"
                >
                  <div
                    className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${failure.accentColor}15` }}
                  >
                    <DIcon className="w-4 h-4" style={{ color: failure.accentColor }} />
                  </div>
                  <span className="font-body font-light text-white/85 text-sm leading-relaxed">{d.text}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

/* ───── Main Component ───────────────────────────────── */

export const ProblemMatrix = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <section id="problem" className="relative py-20 md:py-40 px-5 md:px-12 lg:px-24 overflow-hidden bg-[#020C1B]">
      <MeshGradient intensity="low" />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* ── Chapter Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 mb-16 md:mb-24">
          <div className="lg:col-span-3 lg:col-start-1">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="flex items-center gap-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse" />
              <span className="font-display text-[11px] tracking-[0.45em] uppercase text-[#A7DADB] font-bold">
                Chapter 02
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
              className="mt-5 font-display text-2xl md:text-3xl text-white tracking-tight"
            >
              The Innovation Gap
            </motion.p>
          </div>

          <div className="lg:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.85, ease: easeOut }}
              className="font-display font-bold text-white leading-[1] tracking-[-0.025em] text-[clamp(2.5rem,5vw,5rem)]"
            >
              Three forces.
              <br />
              <span className="font-serif-display italic font-normal text-[#A7DADB]">
                One systemic moment of truth.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
              className="mt-8 font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.6] max-w-[60ch]"
            >
              Across every campus in India, three failures are converging. They are not separate
              problems. They are facets of one systemic moment, compounding every semester it goes
              unaddressed.
            </motion.p>
          </div>
        </div>

        {/* ── Bento Grid — 12-col × 2-row coherent rectangle ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[380px_380px] gap-5 md:gap-6 w-full">
          {failures.map((f, i) => {
            const Icon = f.icon;

            const gridClass =
              i === 0
                ? 'md:col-span-1 lg:col-span-5'
                : i === 1
                ? 'md:col-span-1 lg:col-span-7'
                : 'md:col-span-1 lg:col-span-4';

            const cardHeight = '';

            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.85, delay: i * 0.1, ease: easeOut }}
                className={`${gridClass} h-full`}
              >
                <TiltCard
                  className={`group relative isolate overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#0a1729]/70 backdrop-blur-xl glass-refract cursor-pointer h-full ${cardHeight} transition-all duration-700 hover:border-white/[0.12]`}
                  onClick={() => setSelectedIdx(i)}
                >
                  {/* ── Video / Image Layer ── */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div
                      className="absolute inset-0 scale-100 group-hover:scale-[1.06]"
                      style={{
                        transition:
                          'transform 1200ms var(--ease-out-expo), filter 700ms var(--ease-out-expo)',
                      }}
                    >
                      <BackgroundVideo
                        src={f.video}
                        poster={f.img}
                        style={{ filter: 'contrast(1.1) saturate(0.85) brightness(0.45)' }}
                      />
                    </div>
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(10,23,41,0.2) 0%, rgba(10,23,41,0.85) 60%, rgba(10,23,41,0.98) 100%)',
                      }}
                    />
                  </div>
                  <Vignette strength={0.35} />

                  {/* ── FlickeringGrid ── */}
                  <div className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-1000 pointer-events-none">
                    <FlickeringGrid
                      color={f.accentColor}
                      maxOpacity={0.4}
                      squareSize={3}
                      gridGap={8}
                      flickerChance={0.15}
                    />
                  </div>

                  {/* ── Hover sheen ── */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 rounded-[28px]"
                    style={{
                      background: `linear-gradient(135deg, ${f.accentGlow} 0%, transparent 50%)`,
                      transition: 'opacity 500ms var(--ease-out-expo)',
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-20 rounded-[28px] opacity-0 group-hover:opacity-100"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${f.accentColor}30, 0 0 30px ${f.accentGlow}`,
                      transition: 'opacity 500ms var(--ease-out-expo)',
                    }}
                  />

                  {/* ── Content ── */}
                  <div className="relative z-10 p-7 md:p-9 flex flex-col h-full">
                    {/* Top: icon + numeral */}
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className="inline-flex items-center justify-center h-11 w-11 rounded-xl border group-hover:border-opacity-40 transition-all duration-500"
                        style={{
                          borderColor: `${f.accentColor}25`,
                          backgroundColor: `${f.accentColor}10`,
                        }}
                      >
                        <Icon className="h-5 w-5 transition-colors duration-500" style={{ color: f.accentColor }} />
                      </div>
                      <span
                        className="font-serif-display italic leading-none tracking-tighter group-hover:opacity-30 transition-opacity duration-700"
                        style={{
                          fontSize: i === 0 ? 'clamp(4.5rem,10vw,7rem)' : 'clamp(3.5rem,7vw,5rem)',
                          color: `${f.accentColor}12`,
                        }}
                      >
                        {f.num}
                      </span>
                    </div>

                    {/* Bottom: title + body + metric */}
                    <div className="flex-1 flex flex-col justify-end mt-auto">
                      <p
                        className="font-display text-[10px] tracking-[0.4em] uppercase font-bold mb-1.5"
                        style={{ color: `${f.accentColor}AA` }}
                      >
                        Failure {f.num}
                      </p>
                      <h3 className={`font-display font-bold text-white tracking-tight uppercase ${i === 0 ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl'}`}>
                        {f.label}
                      </h3>
                      <p
                        className={`mt-1.5 font-serif-display italic ${i === 0 ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}
                        style={{ color: f.accentColor }}
                      >
                        {f.status}
                      </p>
                      <p className={`mt-3 font-body font-light text-[#b0c5c6] leading-relaxed max-w-[45ch] ${i === 0 ? 'text-sm md:text-base line-clamp-4' : 'text-xs md:text-sm line-clamp-2'}`}>
                        {f.body}
                      </p>

                      {/* Metric bar */}
                      <div className="flex items-end justify-between gap-4 pt-5 mt-4 border-t border-white/[0.06]">
                        <div className="flex flex-col">
                          <span className="font-display text-[9px] tracking-[0.35em] uppercase text-[#b0c5c6]/50 font-bold">
                            {f.stat.label.split(' ').slice(0, 3).join(' ')}
                          </span>
                          <span className="mt-1 font-display text-xl md:text-2xl tabular-nums tracking-tight" style={{ color: f.accentColor }}>
                            <NumberTicker value={f.stat.value} delay={0.4 + i * 0.2} />
                            {f.stat.suffix}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 font-display text-[10px] tracking-[0.25em] uppercase font-bold text-[#A7DADB] press-scale opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                          Explore →
                        </span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}

          {/* ── Card 4: Cost of Inaction Infographic (bottom-left) ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.3, ease: easeOut }}
            className="md:col-span-1 lg:col-span-5 h-full"
          >
            <TiltCard
              className="group relative isolate overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#0a1729]/80 backdrop-blur-xl glass-refract h-full transition-all duration-700 hover:border-[#A7DADB]/20"
            >
              {/* Flickering grid background */}
              <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-1000 pointer-events-none">
                <FlickeringGrid
                  color="rgb(167, 218, 219)"
                  maxOpacity={0.3}
                  squareSize={3}
                  gridGap={7}
                  flickerChance={0.12}
                />
              </div>

              {/* Hover sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 rounded-[28px]"
                style={{
                  background: 'linear-gradient(135deg, rgba(167,218,219,0.06) 0%, transparent 55%)',
                  transition: 'opacity 500ms var(--ease-out-expo)',
                }}
              />

              <div className="relative z-10 p-7 md:p-9 flex flex-col h-full justify-between">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse" />
                    <span className="font-display text-[9px] tracking-[0.4em] uppercase text-[#A7DADB] font-bold">
                      Cost of Inaction
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-white text-lg md:text-xl tracking-tight leading-tight">
                    Every semester of delay{' '}
                    <span className="font-serif-display italic font-normal text-[#A7DADB]">compounds the gap.</span>
                  </h4>
                </div>

                {/* Semester erosion visual */}
                <div className="my-5">
                  <div className="flex items-end justify-between mb-3">
                    <span className="font-display text-[9px] tracking-[0.3em] uppercase text-[#b0c5c6]/50 font-bold">
                      Semester Erosion Index
                    </span>
                  </div>
                  <div className="flex items-end gap-1.5 h-[80px]">
                    {[
                      { h: 20, sem: 'S1' },
                      { h: 32, sem: 'S2' },
                      { h: 45, sem: 'S3' },
                      { h: 56, sem: 'S4' },
                      { h: 64, sem: 'S5' },
                      { h: 72, sem: 'S6' },
                      { h: 80, sem: 'S7' },
                    ].map((bar, k) => (
                      <div key={bar.sem} className="flex flex-col items-center gap-1 flex-1">
                        <motion.div
                          className="w-full rounded-t-md"
                          style={{
                            backgroundColor: k >= 5 ? '#7BBFC1' : k >= 3 ? '#8AC8C9' : '#A7DADB',
                            opacity: 0.7 + k * 0.04,
                          }}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${bar.h}px` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.5 + k * 0.08, ease: easeOut }}
                        />
                        <span className="font-display text-[8px] tracking-wider uppercase text-[#b0c5c6]/40 font-bold">
                          {bar.sem}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom stats row */}
                <div className="pt-4 border-t border-white/[0.06] flex items-end justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="font-display text-[9px] tracking-[0.3em] uppercase text-[#b0c5c6]/40 font-bold">
                      Cumulative Brand Loss
                    </span>
                    <span className="mt-0.5 font-display text-2xl font-bold text-[#A7DADB] tabular-nums">
                      <NumberTicker value={34} delay={1.0} />%
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-display text-[9px] tracking-[0.3em] uppercase text-[#b0c5c6]/40 font-bold">
                      Peer Advantage
                    </span>
                    <span className="mt-0.5 font-display text-2xl font-bold text-[#8AC8C9] tabular-nums">
                      +<NumberTicker value={3} delay={1.1} /> sem.
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* ── Card 5: Convergence Infographic ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.35, ease: easeOut }}
            className="md:col-span-1 lg:col-span-3 h-full"
          >
            <TiltCard
              className="group relative isolate overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#0a1729]/80 backdrop-blur-xl glass-refract h-full transition-all duration-700 hover:border-[#A7DADB]/20"
            >
              {/* Flickering grid background */}
              <div className="absolute inset-0 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-1000 pointer-events-none">
                <FlickeringGrid
                  color="rgb(167, 218, 219)"
                  maxOpacity={0.35}
                  squareSize={4}
                  gridGap={6}
                  flickerChance={0.2}
                />
              </div>

              {/* Hover sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 rounded-[28px]"
                style={{
                  background: 'linear-gradient(135deg, rgba(167,218,219,0.08) 0%, transparent 60%)',
                  transition: 'opacity 500ms var(--ease-out-expo)',
                }}
              />

              {/* Content */}
              <div className="relative z-10 p-7 md:p-8 flex flex-col h-full justify-between">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse" />
                    <span className="font-display text-[9px] tracking-[0.4em] uppercase text-[#A7DADB] font-bold">
                      Crisis Convergence
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-white text-base md:text-lg tracking-tight leading-tight">
                    The Compounding
                    <br />
                    <span className="font-serif-display italic font-normal text-[#A7DADB]">Semester Gap</span>
                  </h4>
                </div>

                {/* Infographic: Radial severity bars */}
                <div className="flex flex-col gap-3 my-4">
                  {[
                    { label: 'Student Risk', pct: 76, color: '#A7DADB' },
                    { label: 'Faculty Drag', pct: 60, color: '#8AC8C9' },
                    { label: 'Inst. Lag', pct: 88, color: '#C8E9EA' },
                  ].map((bar) => (
                    <div key={bar.label} className="flex flex-col gap-1">
                      <div className="flex justify-between items-baseline">
                        <span className="font-display text-[9px] tracking-[0.2em] uppercase text-[#b0c5c6]/60 font-bold">
                          {bar.label}
                        </span>
                        <span className="font-display text-xs tabular-nums font-bold" style={{ color: bar.color }}>
                          <NumberTicker value={bar.pct} delay={0.8} />%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: bar.color }}
                          initial={{ width: '0%' }}
                          whileInView={{ width: `${bar.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.9, ease: easeOut }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom: timeline tick */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-display text-[9px] tracking-[0.3em] uppercase text-[#b0c5c6]/40 font-bold">
                        Window closes
                      </span>
                      <span className="mt-0.5 font-display text-lg font-bold text-[#A7DADB] tabular-nums">
                        <NumberTicker value={18} delay={1.2} /> mo.
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(6)].map((_, k) => (
                        <motion.div
                          key={k}
                          className="w-1 rounded-full"
                          style={{
                            backgroundColor: k < 4 ? '#A7DADB' : 'rgba(255,255,255,0.08)',
                            height: k < 4 ? '16px' : '10px',
                          }}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 1.0 + k * 0.08, ease: easeOut }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* ── Closing Line ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="mt-20 md:mt-24 pt-8 border-t border-white/[0.07] flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        >
          <p className="font-display text-2xl md:text-4xl text-white max-w-[28ch] leading-[1.15] tracking-tight">
            Three failures.{' '}
            <span className="font-serif-display italic text-[#A7DADB]">One moment of truth.</span>
          </p>
          <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/55 font-bold whitespace-nowrap">
            Section 02 / 04
          </span>
        </motion.div>
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <DetailModal
            failure={failures[selectedIdx]}
            onClose={() => setSelectedIdx(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
