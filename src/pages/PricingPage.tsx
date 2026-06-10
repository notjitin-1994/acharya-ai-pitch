import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  motion, AnimatePresence, useScroll, useSpring,
  useMotionValue, useInView, useReducedMotion,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, ArrowLeft, Check, Mail, X as XIcon, Play, Pause,
  Users, Shield, Cpu, BookOpen, Activity,
  Cloud, Server, Database, ChevronDown,
  Clock, Coins, Gauge, Megaphone, Newspaper,
  TrendingUp, GraduationCap, Wallet, Sparkles,
  Menu, ArrowRight, ShieldCheck, FileSignature, AlertTriangle,
  type LucideIcon,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { MeshGradient, Vignette, GrainOverlay } from '../components/ui/atmosphere';
import { FlickeringGrid } from '../components/ui/flickering-grid';
import { CursorSpotlight } from '../components/ui/CursorSpotlight';
import { BackgroundVideo, FOOTAGE } from '../components/ui/BackgroundVideo';
import { PlayNarrationButton } from '../audio/PlayNarrationButton';
import { useNarration } from '../audio/NarrationContext';

const easeOut = [0.16, 1, 0.3, 1] as const;
const springModal = { type: 'spring' as const, duration: 0.45, bounce: 0.18 };
const springCard  = { type: 'spring' as const, duration: 0.35, bounce: 0.1 };

// AIT pricing data
const phases = [
  {
    id: '1',
    name: 'Deep Discovery',
    timeline: 'Weeks 1–4',
    fee: '₹15L',
    includes: 'Readiness report, frontier map, custom roadmap, KPI baseline',
  },
  {
    id: '2',
    name: 'The Vanguard',
    timeline: 'Weeks 4–12',
    fee: '₹33L',
    includes: 'Platform live, 3-dept training, 3 playbooks, ROI report',
  },
  {
    id: '3',
    name: 'Full Scale Deployment',
    timeline: 'Months 4–12+',
    fee: '₹40L',
    includes: 'Institution-wide rollout, all-faculty training, literacy programme',
  },
] as const;

type PhaseDeliverable = { item: string; dueLabel: string };
const phaseDeliverables: Record<string, PhaseDeliverable[]> = {
  '1': [
    { item: 'AI Readiness Assessment Report',                      dueLabel: 'Week 2' },
    { item: 'Infrastructure Audit & Gap Analysis',                 dueLabel: 'Week 2' },
  ],
  '2': [
    { item: 'AI Governance Framework & Data Policy',               dueLabel: 'Week 6'  },
  ],
  '3': [
    { item: 'Institution-Wide Platform Rollout (All Departments)', dueLabel: 'Month 4'  },
  ],
};

const commitmentPillars = [
  {
    clause: '§01',
    Icon: FileSignature,
    title: 'Contractually Defined',
    body: 'Every deliverable, KPI, and timeline written into the contract. No ambiguity.',
  },
  {
    clause: '§02',
    Icon: ShieldCheck,
    title: 'Measurement Guaranteed',
    body: 'Quarterly business reviews with real ROI tracking. No hand-waving.',
  },
  {
    clause: '§03',
    Icon: AlertTriangle,
    title: 'Risk Coverage',
    body: 'Performance guarantees. If targets miss, we iterate at no additional cost.',
  },
];

export default function PricingPage() {
  const [selectedPhase, setSelectedPhase] = useState('2');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.01 });

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020C1B] text-white overflow-y-auto">
      <CursorSpotlight />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#020C1B]/80 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Logo />
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#phases" className="text-sm font-medium text-[#b0c5c6] hover:text-[#A7DADB] transition-colors">Phases</a>
            <a href="#deliverables" className="text-sm font-medium text-[#b0c5c6] hover:text-[#A7DADB] transition-colors">Deliverables</a>
            <a href="#commitment" className="text-sm font-medium text-[#b0c5c6] hover:text-[#A7DADB] transition-colors">Commitment</a>
          </div>

          <button className="md:hidden p-2 text-[#b0c5c6]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#A7DADB] via-white to-[#A7DADB] bg-clip-text text-transparent">
                Investment in Institutional Intelligence
              </span>
            </h1>
            <p className="text-xl text-[#b0c5c6] max-w-2xl mx-auto">
              Three phases. Clear deliverables. Measurable ROI. Contractually guaranteed outcomes.
            </p>
          </div>

          {/* Phase Cards */}
          <div id="phases" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {phases.map((phase) => (
              <motion.button
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                className={`text-left p-8 rounded-xl border transition-all cursor-pointer group ${
                  selectedPhase === phase.id
                    ? 'bg-gradient-to-br from-[#A7DADB]/20 to-[#A7DADB]/5 border-[#A7DADB]/50'
                    : 'bg-[#A7DADB]/5 border-[#A7DADB]/20 hover:border-[#A7DADB]/40'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mb-4">
                  <span className="text-sm font-semibold text-[#A7DADB] uppercase tracking-wider">Phase {phase.id}</span>
                  <h3 className="text-2xl font-bold text-white mt-2">{phase.name}</h3>
                </div>
                <p className="text-[#b0c5c6] text-sm mb-4">{phase.timeline}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">{phase.fee}</span>
                  <span className="text-sm text-[#b0c5c6]">investment</span>
                </div>
                <p className="text-sm text-[#b0c5c6] mt-4">{phase.includes}</p>
              </motion.button>
            ))}
          </div>

          {/* Deliverables */}
          <section id="deliverables" className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Detailed Deliverables</h2>
            <div className="space-y-6">
              {Object.entries(phaseDeliverables).map(([phaseId, items]) => (
                <AnimatePresence key={phaseId}>
                  {selectedPhase === phaseId && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                      {items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-start gap-4 p-4 bg-[#A7DADB]/5 border border-[#A7DADB]/20 rounded-lg"
                        >
                          <Check className="w-5 h-5 text-[#A7DADB] flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-white font-medium">{item.item}</p>
                            <p className="text-sm text-[#b0c5c6] mt-1">Due: {item.dueLabel}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>
          </section>

          {/* Commitment */}
          <section id="commitment" className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Commitment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {commitmentPillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 bg-gradient-to-br from-[#A7DADB]/10 to-[#A7DADB]/5 border border-[#A7DADB]/20 rounded-xl"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <pillar.Icon className="w-6 h-6 text-[#A7DADB] flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[#A7DADB] font-semibold">{pillar.clause}</p>
                      <h3 className="text-lg font-bold text-white mt-1">{pillar.title}</h3>
                    </div>
                  </div>
                  <p className="text-[#b0c5c6] text-sm">{pillar.body}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-20 pt-20 border-t border-[#A7DADB]/10"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to transform AIT?</h2>
            <p className="text-[#b0c5c6] mb-8 max-w-2xl mx-auto">
              Let's discuss how the Cognitive Campus framework can position Acharya Institute of Technology as a leader in AI-native education.
            </p>
            <a
              href="mailto:hello@smartslate.io?subject=AIT%20Cognitive%20Campus%20Inquiry"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#A7DADB] text-[#020C1B] font-semibold rounded-lg hover:bg-white transition-colors"
            >
              Start the Conversation
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </section>
      </main>

      <GrainOverlay opacity={0.06} />
    </div>
  );
}
