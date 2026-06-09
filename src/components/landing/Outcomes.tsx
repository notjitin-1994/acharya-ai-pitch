import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import {
  Gauge,
  Clock,
  Trophy,
  Sparkles,
  IndianRupee,
  GraduationCap,
  CalendarCheck2,
  ShieldCheck,
  ArrowDown,
  ArrowUp,
  TrendingDown,
} from 'lucide-react';
import { MeshGradient } from '../ui/atmosphere';

const easeOut = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────────
   Live spring-driven counter — springs between ANY two
   values (NumberTicker only counts up from zero).
   ───────────────────────────────────────────────────────── */
type CounterProps = {
  value: number;
  decimals?: number;
  format?: (n: number) => string;
  className?: string;
};

const LiveCounter: React.FC<CounterProps> = ({
  value,
  decimals = 0,
  format,
  className,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const spring = useSpring(mv, {
    stiffness: reduce ? 600 : 90,
    damping: reduce ? 60 : 24,
    restDelta: 0.5,
  });

  useEffect(() => {
    mv.set(value);
  }, [value, mv]);

  useEffect(() => {
    const unsub = spring.on('change', (latest) => {
      if (!ref.current) return;
      const n = Number(latest.toFixed(decimals));
      ref.current.textContent = format
        ? format(n)
        : Intl.NumberFormat('en-IN', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }).format(n);
    });
    return () => unsub();
  }, [spring, decimals, format]);

  const initial = format
    ? format(value)
    : Intl.NumberFormat('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);

  return (
    <span ref={ref} className={className}>
      {initial}
    </span>
  );
};

/* ─────────────────────────────────────────────────────────
   Scenarios — three tiers, with Realistic flagged as the
   contractually guaranteed floor.
   ───────────────────────────────────────────────────────── */
type ScenarioId = 'conservative' | 'realistic' | 'aggressive';

type Scenario = {
  id: ScenarioId;
  label: string;
  caption: string;
  guarantee?: boolean;
  // bars (% of cohort / time)
  opsLift: number;
  timeReclaimed: number;
  cert: number;
  // tiles
  hoursPerFaculty: number; // /year
  rupeesPerFaculty: number; // in lakh (₹L) per faculty/year
  certifiedCohort: number; // % students AI-certified
  monthsToROI: number;
};

const scenarios: Record<ScenarioId, Scenario> = {
  conservative: {
    id: 'conservative',
    label: 'Conservative',
    caption: 'Cautious deployment, narrow scope.',
    opsLift: 50,
    timeReclaimed: 40,
    cert: 60,
    hoursPerFaculty: 140,
    rupeesPerFaculty: 0.84,
    certifiedCohort: 60,
    monthsToROI: 14,
  },
  realistic: {
    id: 'realistic',
    label: 'Realistic',
    caption: 'The contractually guaranteed floor.',
    guarantee: true,
    opsLift: 70,
    timeReclaimed: 60,
    cert: 80,
    hoursPerFaculty: 200,
    rupeesPerFaculty: 1.2,
    certifiedCohort: 80,
    monthsToROI: 9,
  },
  aggressive: {
    id: 'aggressive',
    label: 'Aggressive',
    caption: 'Full-stack adoption, modelled ceiling.',
    opsLift: 85,
    timeReclaimed: 75,
    cert: 92,
    hoursPerFaculty: 280,
    rupeesPerFaculty: 1.68,
    certifiedCohort: 92,
    monthsToROI: 6,
  },
};

/* ─────────────────────────────────────────────────────────
   Anchor metrics — the three editorial guarantees that
   ride below the console.
   ───────────────────────────────────────────────────────── */
type Anchor = {
  numeric: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
  icon: typeof Gauge;
  // comparative bar
  beforeLabel: string;
  beforeValue: number; // 0..100
  afterLabel: string;
  afterValue: number; // 0..100
  unit: string;
  // micro stats
  micro: { label: string; value: string }[];
};

const anchors: Anchor[] = [
  {
    numeric: (
      <>
        <span>70</span>
        <span className="text-[#A7DADB] text-[0.55em] align-top translate-y-2">%</span>
      </>
    ),
    eyebrow: 'Guarantee 01 · Throughput',
    title: 'Operations runs itself.',
    body:
      'Seventy percent of administrative drag — query resolution, at-risk flagging, compliance reporting — handled by the campus AI layer. Staff hours redirect to the work only humans can do.',
    icon: Gauge,
    beforeLabel: 'Admin load / week (pre)',
    beforeValue: 100,
    afterLabel: 'Admin load / week (post)',
    afterValue: 30,
    unit: '%',
    micro: [
      { label: 'Student queries auto-resolved', value: '>90%' },
      { label: 'Average response time', value: '<30s' },
      { label: 'At-risk flagging window', value: '<72 hrs' },
      { label: 'Admin staff hours redirected', value: '~60%' },
    ],
  },
  {
    numeric: (
      <>
        <span>200</span>
        <span className="text-[#A7DADB] text-[0.45em] align-top translate-y-3 ml-2">hrs / yr</span>
      </>
    ),
    eyebrow: 'Guarantee 02 · Capacity',
    title: 'Faculty get their craft back.',
    body:
      'Two hundred hours per faculty, every year, returned from manual preparation to the work that compounds into pedagogical mastery — and to lives outside the institution.',
    icon: Clock,
    beforeLabel: 'Weekly prep time (pre)',
    beforeValue: 100,
    afterLabel: 'Weekly prep time (post)',
    afterValue: 40,
    unit: '%',
    micro: [
      { label: 'Lesson plan generation', value: '<20 min' },
      { label: 'Pre-deployment prep', value: '2–3 hrs' },
      { label: 'Hours / faculty / year', value: '~200' },
      { label: 'Value reclaimed (@ ₹600/hr)', value: '₹1.2L' },
    ],
  },
  {
    numeric: (
      <>
        <span>1</span>
        <span className="font-serif-display italic font-normal text-[#A7DADB] text-[0.5em]">
          st
        </span>
      </>
    ),
    eyebrow: 'Guarantee 03 · Positioning',
    title: 'First. Permanently.',
    body:
      'First-mover positioning cannot be purchased after the window closes. The institutions that move now own the brand weight of the era. The rest play catch-up forever.',
    icon: Trophy,
    beforeLabel: 'Competitive moat (today)',
    beforeValue: 12,
    afterLabel: 'Competitive moat (post-Phase 2)',
    afterValue: 100,
    unit: ' index',
    micro: [
      { label: 'Cohort AI-certified', value: '>80%' },
      { label: 'Accreditation uplift', value: 'NAAC / NBA' },
      { label: 'Employer signal', value: 'Certified' },
      { label: 'Moat window', value: '2024–2026' },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   Scenario toggle — three chips with a sliding indicator
   ───────────────────────────────────────────────────────── */
const ScenarioToggle: React.FC<{
  active: ScenarioId;
  onChange: (id: ScenarioId) => void;
}> = ({ active, onChange }) => {
  const order: ScenarioId[] = ['conservative', 'realistic', 'aggressive'];
  const activeIdx = order.indexOf(active);

  return (
    <div
      role="tablist"
      aria-label="Impact scenario"
      className="relative inline-flex w-full sm:w-auto items-stretch rounded-full border border-white/[0.08] bg-[#0a1729]/60 backdrop-blur-xl p-1.5"
    >
      {/* Sliding pill */}
      <motion.span
        aria-hidden
        layout
        className="absolute top-1.5 bottom-1.5 rounded-full bg-[#A7DADB]/[0.12] border border-[#A7DADB]/30 shadow-[0_0_24px_-6px_rgba(167,218,219,0.35)]"
        style={{
          width: `calc((100% - 12px) / 3)`,
          left: `calc(6px + ((100% - 12px) / 3) * ${activeIdx})`,
        }}
        transition={{ duration: 0.55, ease: easeOut }}
      />
      {order.map((id) => {
        const s = scenarios[id];
        const isActive = id === active;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onChange(id)}
            className="relative z-10 flex-1 sm:flex-initial px-2 sm:px-5 md:px-7 py-2 sm:py-2.5 font-display text-[9.5px] sm:text-[10.5px] md:text-xs tracking-[0.22em] sm:tracking-[0.32em] uppercase font-bold whitespace-nowrap cursor-pointer text-center"
            style={{
              color: isActive ? '#A7DADB' : 'rgba(176,197,198,0.7)',
              transition: 'color 280ms var(--ease-out-expo)',
            }}
          >
            <span className="inline-flex items-center justify-center gap-1 sm:gap-1.5">
              {s.guarantee && (
                <ShieldCheck
                  className="h-3 w-3 -ml-0.5 shrink-0"
                  strokeWidth={2.25}
                  style={{
                    color: isActive ? '#A7DADB' : 'rgba(167,218,219,0.55)',
                  }}
                />
              )}
              {s.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Live tile — a single dashboard tile in the console
   ───────────────────────────────────────────────────────── */
type TileProps = {
  icon: typeof Gauge;
  label: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  format?: (n: number) => string;
  hint: string;
  delta?: { dir: 'up' | 'down'; label: string };
  delay?: number;
};

const Tile: React.FC<TileProps> = ({
  icon: Icon,
  label,
  value,
  decimals = 0,
  prefix,
  suffix,
  format,
  hint,
  delta,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
      className="relative rounded-[20px] border border-white/[0.08] bg-[#0a1729]/55 backdrop-blur-xl p-6 md:p-7 overflow-hidden"
    >
      {/* Top accent line */}
      <span
        aria-hidden
        className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#A7DADB]/35 to-transparent"
      />

      <div className="flex items-start justify-between mb-6">
        <div className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-[#A7DADB]/20 bg-[#A7DADB]/[0.07]">
          <Icon className="h-4 w-4 text-[#A7DADB]" strokeWidth={1.6} />
        </div>
        {delta && (
          <span
            className={`inline-flex items-center gap-1 font-display text-[10px] tracking-[0.18em] uppercase font-bold ${
              delta.dir === 'up' ? 'text-[#A7DADB]' : 'text-[#A7DADB]/70'
            }`}
          >
            {delta.dir === 'up' ? (
              <ArrowUp className="h-3 w-3" strokeWidth={2.25} />
            ) : (
              <ArrowDown className="h-3 w-3" strokeWidth={2.25} />
            )}
            {delta.label}
          </span>
        )}
      </div>

      <p className="font-display text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/60 font-bold leading-tight">
        {label}
      </p>

      <p className="mt-3 flex items-baseline font-display font-bold text-white tabular-nums tracking-[-0.025em] leading-none">
        {prefix && (
          <span className="text-[#A7DADB] text-[1.4rem] md:text-[1.65rem] mr-1">
            {prefix}
          </span>
        )}
        <LiveCounter
          value={value}
          decimals={decimals}
          format={format}
          className="text-[2.6rem] md:text-[3.4rem]"
        />
        {suffix && (
          <span className="text-[#A7DADB] text-[1.2rem] md:text-[1.5rem] ml-1.5">
            {suffix}
          </span>
        )}
      </p>

      <p className="mt-3 font-body font-light text-[#b0c5c6]/65 text-[12.5px] leading-snug">
        {hint}
      </p>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────
   Live progress bar inside the console
   ───────────────────────────────────────────────────────── */
const ConsoleBar: React.FC<{ label: string; value: number; suffix?: string }> = ({
  label,
  value,
  suffix = '%',
}) => {
  return (
    <div className="grid grid-cols-12 items-center gap-4">
      <span className="col-span-12 md:col-span-4 font-display text-[10.5px] tracking-[0.32em] uppercase text-[#b0c5c6]/70 font-bold">
        {label}
      </span>
      <div className="col-span-9 md:col-span-6 relative h-[6px] rounded-full bg-white/[0.05] overflow-hidden">
        <motion.span
          aria-hidden
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#A7DADB]/60 via-[#A7DADB] to-[#A7DADB]/80 shadow-[0_0_18px_-2px_rgba(167,218,219,0.55)]"
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.75, ease: easeOut }}
        />
      </div>
      <span className="col-span-3 md:col-span-2 font-display text-white tabular-nums text-right text-base md:text-lg tracking-tight">
        <LiveCounter value={value} />
        {suffix}
      </span>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Impact Console — the interactive heart of the section
   ───────────────────────────────────────────────────────── */
const ImpactConsole: React.FC = () => {
  const [scenarioId, setScenarioId] = useState<ScenarioId>('realistic');
  const s = scenarios[scenarioId];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.95, ease: easeOut }}
      className="relative rounded-[24px] md:rounded-[32px] border border-white/[0.08] bg-[#0a1729]/45 backdrop-blur-2xl overflow-hidden"
    >
      {/* Soft inner radial */}
      <div
        aria-hidden
        className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[820px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(167,218,219,0.08) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 p-5 sm:p-8 md:p-12 lg:p-14">
        {/* Console header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="max-w-[58ch]">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-3.5 w-3.5 text-[#A7DADB]" strokeWidth={2} />
              <span className="font-display text-[10.5px] tracking-[0.4em] uppercase text-[#A7DADB] font-bold">
                Impact Console
              </span>
            </div>
            <h3 className="mt-5 font-display font-bold text-white text-3xl md:text-[2.6rem] leading-[1.05] tracking-[-0.02em]">
              Tune the dial.{' '}
              <span className="font-serif-display italic font-normal text-[#A7DADB]">
                Watch the institution change.
              </span>
            </h3>
            <p className="mt-4 font-body font-light text-[#b0c5c6] text-base md:text-[17px] leading-[1.6]">
              Three scenarios. One contract. Every number floors at the{' '}
              <span className="text-[#A7DADB]">Realistic</span> tier — anything
              above is upside you don&rsquo;t pay for.
            </p>
          </div>

          <div className="lg:shrink-0 w-full lg:w-auto">
            <ScenarioToggle active={scenarioId} onChange={setScenarioId} />
            <motion.p
              key={scenarioId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: easeOut }}
              className="mt-3 font-body font-light text-[#b0c5c6]/65 text-[12px] sm:text-[12.5px] lg:text-right max-w-[34ch] lg:max-w-[28ch] lg:ml-auto"
            >
              {s.guarantee && (
                <span className="inline-flex items-center gap-1 mr-1.5 text-[#A7DADB]/85">
                  <ShieldCheck className="h-3 w-3" strokeWidth={2} />
                  <span className="font-display text-[10px] tracking-[0.22em] uppercase font-bold">
                    Guaranteed
                  </span>
                </span>
              )}
              {s.caption}
            </motion.p>
          </div>
        </div>

        {/* Live tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <Tile
            icon={Clock}
            label="Faculty Hours Reclaimed"
            value={s.hoursPerFaculty}
            suffix="hrs"
            hint="Per faculty member, every academic year."
            delta={{ dir: 'up', label: 'redirected' }}
            delay={0.05}
          />
          <Tile
            icon={IndianRupee}
            label="Value Unlocked"
            value={s.rupeesPerFaculty}
            decimals={2}
            prefix="₹"
            suffix="L"
            hint="Faculty time value, per faculty, per year."
            delta={{ dir: 'up', label: 'recovered' }}
            delay={0.12}
          />
          <Tile
            icon={GraduationCap}
            label="Cohort AI-Certified"
            value={s.certifiedCohort}
            suffix="%"
            hint="Practitioner-grade fluency — verifiable credential."
            delta={{ dir: 'up', label: 'cleared' }}
            delay={0.19}
          />
          <Tile
            icon={CalendarCheck2}
            label="Months to Break-Even"
            value={s.monthsToROI}
            suffix=" mo"
            hint="From kickoff to operational ROI parity."
            delta={{ dir: 'down', label: 'shortened' }}
            delay={0.26}
          />
        </div>

        {/* Divider */}
        <div className="my-10 md:my-12 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        {/* Live progress bars */}
        <div className="space-y-5 md:space-y-6 max-w-[860px]">
          <p className="font-display text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/55 font-bold mb-2">
            Contracted Floors
          </p>
          <ConsoleBar label="Operational lift" value={s.opsLift} />
          <ConsoleBar label="Time reclaimed" value={s.timeReclaimed} />
          <ConsoleBar label="Practitioner certification" value={s.cert} />
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────
   Comparative bar — before vs after, scroll-triggered
   ───────────────────────────────────────────────────────── */
const ComparativeBar: React.FC<{
  beforeLabel: string;
  beforeValue: number;
  afterLabel: string;
  afterValue: number;
  unit: string;
}> = ({ beforeLabel, beforeValue, afterLabel, afterValue, unit }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="space-y-4">
      {/* Before row */}
      <div>
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <span className="font-display text-[10px] tracking-[0.32em] uppercase text-[#b0c5c6]/55 font-bold">
            {beforeLabel}
          </span>
          <span className="font-display text-white/40 tabular-nums text-sm tracking-tight">
            {beforeValue}
            {unit}
          </span>
        </div>
        <div className="relative h-[5px] rounded-full bg-white/[0.04] overflow-hidden">
          <motion.span
            aria-hidden
            className="absolute inset-y-0 left-0 rounded-full bg-white/15"
            initial={{ width: '0%' }}
            animate={inView ? { width: `${beforeValue}%` } : { width: '0%' }}
            transition={{ duration: 0.9, ease: easeOut }}
          />
        </div>
      </div>

      {/* After row */}
      <div>
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <span className="inline-flex items-center gap-2 font-display text-[10px] tracking-[0.32em] uppercase text-[#A7DADB] font-bold">
            <TrendingDown className="h-3 w-3" strokeWidth={2} />
            {afterLabel}
          </span>
          <span className="font-display text-[#A7DADB] tabular-nums text-sm tracking-tight">
            {afterValue}
            {unit}
          </span>
        </div>
        <div className="relative h-[5px] rounded-full bg-white/[0.04] overflow-hidden">
          <motion.span
            aria-hidden
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#A7DADB]/60 via-[#A7DADB] to-[#A7DADB]/80 shadow-[0_0_18px_-2px_rgba(167,218,219,0.5)]"
            initial={{ width: '0%' }}
            animate={inView ? { width: `${afterValue}%` } : { width: '0%' }}
            transition={{ duration: 1.05, delay: 0.25, ease: easeOut }}
          />
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Anchor row — one of the three editorial guarantees
   ───────────────────────────────────────────────────────── */
const AnchorRow: React.FC<{ a: Anchor; idx: number }> = ({ a, idx }) => {
  const Icon = a.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.95, delay: idx * 0.08, ease: easeOut }}
      className="relative border-t border-white/[0.07] py-12 md:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 md:gap-y-10 gap-x-10">
        {/* Numeric */}
        <div className="lg:col-span-5 lg:col-start-1 flex items-center">
          <span className="font-display font-bold text-white tabular-nums tracking-[-0.045em] leading-[0.85] text-[clamp(4.5rem,13vw,12rem)]">
            {a.numeric}
          </span>
        </div>

        {/* Comparative bar */}
        <div className="lg:col-span-4 lg:col-start-6 flex flex-col justify-center">
          <ComparativeBar
            beforeLabel={a.beforeLabel}
            beforeValue={a.beforeValue}
            afterLabel={a.afterLabel}
            afterValue={a.afterValue}
            unit={a.unit}
          />
          {/* Micro stats */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {a.micro.map((m) => (
              <div
                key={m.label}
                className="rounded-[12px] border border-white/[0.05] bg-white/[0.02] px-3.5 py-3"
              >
                <span className="block font-display font-bold text-[#A7DADB] text-base md:text-lg tabular-nums tracking-tight leading-none">
                  {m.value}
                </span>
                <span className="mt-1.5 block font-body font-light text-[#b0c5c6]/55 text-[11px] leading-snug">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-3 lg:col-start-10 flex flex-col justify-center max-w-[40ch]">
          <div className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-[#A7DADB]/20 bg-[#A7DADB]/[0.07] mb-5">
            <Icon className="h-4 w-4 text-[#A7DADB]" strokeWidth={1.5} />
          </div>
          <p className="font-display text-[10.5px] tracking-[0.36em] uppercase text-[#A7DADB] font-bold">
            {a.eyebrow}
          </p>
          <h3 className="mt-2.5 font-display font-bold text-white text-2xl md:text-[1.75rem] leading-[1.1] tracking-tight">
            {a.title}
          </h3>
          <p className="mt-4 font-body font-light text-[#b0c5c6] text-[15px] md:text-base leading-[1.65]">
            {a.body}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

/* ─────────────────────────────────────────────────────────
   Outcomes — Chapter 04
   ───────────────────────────────────────────────────────── */
export const Outcomes = () => {
  return (
    <section
      id="outcomes"
      className="relative py-20 md:py-40 px-5 md:px-12 lg:px-24 overflow-hidden"
    >
      <MeshGradient intensity="low" />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Chapter header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 mb-20 md:mb-24">
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
                Chapter 04
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
              className="mt-5 font-display text-2xl md:text-3xl text-white tracking-tight"
            >
              By the Numbers
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
              Numbers
              <br />
              <span className="font-serif-display italic font-normal text-[#A7DADB]">
                you can hold us to.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
              className="mt-8 font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.6] max-w-[60ch]"
            >
              Three guaranteed floors. Four live levers. Move the dial — the
              math moves with it.{' '}
              <span className="text-[#A7DADB]/70 text-sm">
                Switch scenarios to explore upside.
              </span>
            </motion.p>
          </div>
        </div>

        {/* Impact Console — the interactive centerpiece */}
        <ImpactConsole />

        {/* Anchor Guarantees — the contracted floors */}
        <div className="mt-28 md:mt-36">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="flex items-center gap-3 mb-10 md:mb-12"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-[#A7DADB]" strokeWidth={2} />
            <span className="font-display text-[10.5px] tracking-[0.4em] uppercase text-[#A7DADB] font-bold">
              The Guaranteed Floor
            </span>
            <span
              aria-hidden
              className="flex-1 h-px bg-gradient-to-r from-[#A7DADB]/25 to-transparent"
            />
          </motion.div>

          <div className="space-y-0">
            {anchors.map((a, i) => (
              <AnchorRow key={a.title} a={a} idx={i} />
            ))}
          </div>
        </div>

        {/* Closing pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="mt-28 md:mt-36 pt-12 border-t border-white/[0.07] grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-10"
        >
          <span
            aria-hidden
            className="lg:col-span-1 lg:col-start-1 font-serif-display italic text-[#A7DADB]/60 leading-none -translate-y-2"
            style={{ fontSize: 'clamp(4rem,7vw,6rem)' }}
          >
            &ldquo;
          </span>
          <p className="lg:col-span-9 lg:col-start-2 font-serif-display italic text-white text-2xl md:text-4xl leading-[1.25] tracking-tight max-w-[40ch]">
            Not progress.{' '}
            <span className="text-[#A7DADB]">
              Positioning no competitor can purchase after the fact.
            </span>
          </p>
          <span className="lg:col-span-2 lg:col-start-11 self-end font-display text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/55 font-bold whitespace-nowrap">
            Section 04 / 04
          </span>
        </motion.div>
      </div>
    </section>
  );
};
