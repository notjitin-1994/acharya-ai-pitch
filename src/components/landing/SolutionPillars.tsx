import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Users,
  GraduationCap,
  ArrowUpRight,
  X,
  Network,
  Cpu,
  Database,
  Workflow,
  BookOpen,
  Layers,
  RefreshCcw,
  BrainCircuit,
  Code,
  Terminal,
  Briefcase,
  Award,
} from 'lucide-react';
import { MeshGradient, Vignette } from '../ui/atmosphere';
import { NumberTicker } from '../ui/number-ticker';
import { BackgroundVideo, FOOTAGE } from '../ui/BackgroundVideo';

const easeOut = [0.16, 1, 0.3, 1] as const;

/* ───── Data ─────────────────────────────────────────── */
const pillars = [
  {
    id: '01',
    title: 'AI-Enabled Campus',
    sub: 'Operations & Management',
    icon: Building2,
    img: '/v2-pillar-1.jpg',
    video: FOOTAGE.campusInteriorTimelapse,
    body: 'A 24/7 cognitive concierge, at-risk student modelling, and a unified institutional data layer. The campus runs on intelligence, not paperwork.',
    metric: { k: 'Operational Lift', v: 70, suffix: '%' },
    span: 'lg:col-span-7',
    feature: true,
    details: [
      { icon: Network, text: 'Unified Institutional Knowledge Graph connecting silos' },
      { icon: Cpu, text: '24/7 Cognitive Concierge for student and faculty queries' },
      { icon: Database, text: 'Predictive modelling for at-risk student intervention' },
      { icon: Workflow, text: 'Automated compliance and administrative reporting' },
    ],
  },
  {
    id: '02',
    title: 'AI-Augmented Faculty',
    sub: 'Teaching & Efficiency',
    icon: Users,
    img: '/v2-pillar-2.jpg',
    video: FOOTAGE.professorSmartboard,
    body: 'Subject-specific masterclasses, AI-designed assessment cycles, and a continuous update ecosystem. The hours buried in prep return to the craft of teaching.',
    metric: { k: 'Time Reclaimed', v: 60, suffix: '%' },
    span: 'lg:col-span-5',
    feature: false,
    details: [
      { icon: BookOpen, text: 'AI-designed dynamic assessment and grading rubrics' },
      { icon: Layers, text: 'Subject-specific AI workflow masterclasses' },
      { icon: RefreshCcw, text: 'Continuous curriculum updates via frontier models' },
      { icon: BrainCircuit, text: 'Personalized pedagogy and learning path generation' },
    ],
  },
  {
    id: '03',
    title: 'AI-First Students',
    sub: 'Learning & Outcomes',
    icon: GraduationCap,
    img: '/v2-pillar-3.jpg',
    video: FOOTAGE.studentsLab,
    body: 'Mandatory AI literacy across every stream, real-world AI-augmented assignments, and an enterprise lab with industry-grade tooling. Graduates do not use AI; they practise it.',
    metric: { k: 'Practitioner Ready', v: 100, suffix: '%' },
    span: 'lg:col-span-12',
    feature: false,
    horizontal: true,
    details: [
      { icon: Code, text: 'Enterprise-grade AI Sandbox and API access' },
      { icon: Terminal, text: 'Mandatory cross-disciplinary AI literacy modules' },
      { icon: Briefcase, text: 'Real-world AI-augmented capstone projects' },
      { icon: Award, text: 'Verifiable practitioner-level AI fluency credentials' },
    ],
  },
];

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

export const SolutionPillars = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeData = pillars.find((p) => p.id === activeId);

  return (
    <section
      id="solution"
      className="relative py-20 md:py-40 px-5 md:px-12 lg:px-24 overflow-hidden"
    >
      <MeshGradient intensity="low" />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Chapter header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 mb-20 md:mb-28">
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
                Chapter 03
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
              className="mt-5 font-display text-2xl md:text-3xl text-white tracking-tight"
            >
              The 3-Pillar Model
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
              Architect the
              <br />
              <span className="font-serif-display italic font-normal text-[#A7DADB]">
                Cognitive Campus.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
              className="mt-8 font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.6] max-w-[60ch]"
            >
              Three interconnected pillars. One operating system. Intelligence is no longer a
              subject on the timetable — it is the substrate the institution runs on.{' '}
              <span className="text-[#A7DADB]/70 text-sm">Click to explore.</span>
            </motion.p>
          </div>
        </div>

        {/* Asymmetric bento with 3D tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[480px_minmax(500px,auto)] gap-6 md:gap-8 w-full">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            const isHorizontal = p.horizontal;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.85, delay: i * 0.08, ease: easeOut }}
                className={`${p.span} h-full`}
              >
                <TiltCard
                  onClick={() => setActiveId(p.id)}
                  className="group relative isolate overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a1729]/70 backdrop-blur-xl glass-refract h-full cursor-pointer transition-all duration-700 hover:border-[#A7DADB]/30"
                >
                  {/* Image layer */}
                  <div
                    className={`${
                      isHorizontal
                        ? 'lg:absolute lg:inset-y-0 lg:left-0 lg:w-5/12'
                        : 'absolute inset-0'
                    } overflow-hidden`}
                  >
                    <div
                      className="absolute inset-0 scale-100 group-hover:scale-[1.04]"
                      style={{
                        transition:
                          'transform 1200ms var(--ease-out-expo), filter 700ms var(--ease-out-expo)',
                      }}
                    >
                      <BackgroundVideo
                        src={p.video}
                        poster={p.img}
                        style={{ filter: 'contrast(1.1) saturate(0.85) brightness(0.55)' }}
                      />
                    </div>
                    {/* Gradient cap */}
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background: isHorizontal
                          ? 'linear-gradient(90deg, rgba(10,23,41,0.3) 0%, rgba(10,23,41,0.95) 90%)'
                          : 'linear-gradient(180deg, rgba(10,23,41,0.25) 0%, rgba(10,23,41,0.92) 75%, rgba(10,23,41,1) 100%)',
                      }}
                    />
                  </div>
                  <Vignette strength={0.4} />

                  {/* Sheen on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 rounded-[28px]"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(167,218,219,0.05) 0%, transparent 50%)',
                      transition: 'opacity 400ms var(--ease-out-expo)',
                    }}
                  />

                  {/* Content */}
                  <div
                    className={`relative z-10 ${
                      isHorizontal
                        ? 'lg:ml-[41.6667%] p-8 md:px-14 md:py-16 lg:py-20'
                        : 'p-8 md:p-10'
                    } flex flex-col h-full ${isHorizontal ? 'gap-6' : 'gap-8'}`}
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-6">
                      <div
                        className="inline-flex items-center justify-center h-12 w-12 rounded-xl border border-[#A7DADB]/20 bg-[#A7DADB]/[0.07] group-hover:bg-[#A7DADB]/[0.12] group-hover:border-[#A7DADB]/35"
                        style={{
                          transition:
                            'background-color 350ms var(--ease-out-expo), border-color 350ms var(--ease-out-expo)',
                        }}
                      >
                        <Icon className="h-5 w-5 text-[#A7DADB]" strokeWidth={1.5} />
                      </div>
                      <span
                        className="font-serif-display italic text-[#A7DADB]/15 leading-none tracking-tighter group-hover:text-[#A7DADB]/30"
                        style={{
                          fontSize: 'clamp(5rem,10vw,6rem)',
                          transition: 'color 700ms var(--ease-out-expo)',
                        }}
                      >
                        {p.id}
                      </span>
                    </div>

                    {/* Middle: title + body */}
                    <div className={`flex-1 flex flex-col ${isHorizontal ? '' : 'justify-end'}`}>
                      <p className="font-display text-[11px] tracking-[0.4em] uppercase text-[#A7DADB] font-bold">
                        {p.sub}
                      </p>
                      <h3 className="mt-3 font-display font-bold text-white text-3xl md:text-4xl tracking-tight uppercase">
                        {p.title}
                      </h3>
                      <p className="mt-5 font-body font-light text-[#b0c5c6] text-base md:text-[17px] leading-[1.6] max-w-[48ch]">
                        {p.body}
                      </p>
                    </div>

                    {/* Bottom: metric + link */}
                    <div className="flex items-end justify-between gap-6 pt-6 border-t border-white/[0.06]">
                      <div className="flex flex-col">
                        <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/55 font-bold">
                          {p.metric.k}
                        </span>
                        <span className="mt-1.5 font-display text-2xl md:text-3xl text-white tabular-nums tracking-tight">
                          <NumberTicker value={p.metric.v} delay={0.5} />{p.metric.suffix}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-2 font-display text-xs tracking-[0.3em] uppercase font-bold text-[#A7DADB] group-hover:text-white transition-colors duration-300">
                        View Details
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2} />
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Detail Modal Portal */}
      <AnimatePresence>
        {activeId && activeData && (
          <DetailModal data={activeData} onClose={() => setActiveId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

/* ───── Detail Modal Component ────────────────────────────────────── */

const DetailModal = ({ data, onClose }: { data: any; onClose: () => void }) => {
  const Icon = data.icon;

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
        className="relative z-10 w-full max-w-[900px] max-h-full overflow-y-auto md:overflow-hidden custom-scrollbar rounded-[32px] border border-white/[0.08] bg-[#0a1729]/95 backdrop-blur-2xl glass-refract isolate flex flex-col md:flex-row"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        {/* Left Side (Image/Header) */}
        <div className="w-full md:w-5/12 relative min-h-[250px] md:min-h-full">
          <div className="absolute inset-0 overflow-hidden">
             <img
                src={data.img}
                alt={data.title}
                className="h-full w-full object-cover"
                style={{
                  filter: 'contrast(1.1) saturate(0.85) brightness(0.65)',
                }}
              />
              {/* Gradient overlays to blend into right side */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1729] via-[#0a1729]/40 to-transparent md:bg-gradient-to-r md:from-transparent md:via-[#0a1729]/60 md:to-[#0a1729]" />
          </div>
          
          <div className="absolute top-6 left-6 z-10 flex items-center justify-center h-12 w-12 rounded-xl border border-[#A7DADB]/20 bg-[#A7DADB]/10 backdrop-blur-md">
             <Icon className="h-5 w-5 text-[#A7DADB]" strokeWidth={1.5} />
          </div>
          
          <div className="absolute bottom-6 left-6 z-10 right-6">
             <p className="font-display text-[10px] tracking-[0.4em] uppercase text-[#A7DADB] font-bold mb-2">
                {data.sub}
             </p>
             <h3 className="font-display font-bold text-white text-3xl leading-none">
                {data.title}
             </h3>
          </div>
        </div>
        
        {/* Right Side (Content) — scrolls within the rounded modal on desktop */}
        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative md:overflow-y-auto md:custom-scrollbar">
           <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.05] hover:border-white/[0.1] transition-all text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <p className="font-body font-light text-[#b0c5c6] text-base leading-relaxed mb-10">
             {data.body}
          </p>
          
          <div className="space-y-4 mb-10">
             {data.details.map((detail: any, idx: number) => {
                const DetailIcon = detail.icon;
                return (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                     className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]"
                   >
                     <div className="flex-shrink-0 mt-0.5 p-1.5 rounded-lg bg-[#A7DADB]/10 text-[#A7DADB]">
                        <DetailIcon className="w-4 h-4" />
                     </div>
                     <p className="font-body text-sm text-white/80 leading-relaxed">
                        {detail.text}
                     </p>
                   </motion.div>
                )
             })}
          </div>
          
          <div className="mt-auto pt-6 border-t border-white/[0.06] flex items-end justify-between">
             <span className="font-display text-[10px] tracking-[0.3em] uppercase text-[#b0c5c6]/60 font-bold">
                {data.metric.k}
             </span>
             <span className="font-display text-4xl text-[#A7DADB] font-bold tabular-nums tracking-tighter">
                <NumberTicker value={data.metric.v} delay={0.5} />
                <span className="text-2xl text-[#A7DADB]/70">{data.metric.suffix}</span>
             </span>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};
