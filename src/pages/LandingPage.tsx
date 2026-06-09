import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Play, Pause } from 'lucide-react';
import { Logo } from '../components/Logo';
import { useNarration } from '../audio/NarrationContext';
import { Hero } from '../components/landing/Hero';
import { ProblemMatrix } from '../components/landing/ProblemMatrix';
import { SolutionPillars } from '../components/landing/SolutionPillars';
import { Outcomes } from '../components/landing/Outcomes';
import { CTA } from '../components/landing/CTA';
import { GrainOverlay } from '../components/ui/atmosphere';
import { CursorSpotlight } from '../components/ui/CursorSpotlight';

const navLinks: { href: string; label: string; route?: boolean }[] = [
  { href: '#problem', label: 'Premise' },
  { href: '#solution', label: 'Solution' },
  { href: '#outcomes', label: 'Outcomes' },
  { href: '/pricing', label: 'Pricing', route: true },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

const NarrationMiniButton: React.FC = () => {
  const { isPlaying, toggle } = useNarration();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
      className="press-scale inline-flex items-center justify-center h-9 w-9 rounded-full border border-[#A7DADB]/22 bg-[#A7DADB]/[0.06] backdrop-blur-md text-[#A7DADB] hover:bg-[#A7DADB]/[0.14] hover:border-[#A7DADB]/40"
      style={{ transition: 'background-color 200ms, border-color 200ms' }}
    >
      {isPlaying ? (
        <Pause className="h-3.5 w-3.5" strokeWidth={2.5} fill="currentColor" />
      ) : (
        <Play className="h-3.5 w-3.5 translate-x-[1px]" strokeWidth={2.5} fill="currentColor" />
      )}
    </button>
  );
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[90]"
      style={{
        transition: 'background-color 350ms var(--ease-out-expo), backdrop-filter 350ms var(--ease-out-expo), border-color 350ms var(--ease-out-expo)',
      }}
    >
      <div
        className={`flex items-center justify-between px-5 md:px-12 lg:px-24 h-16 md:h-[88px] border-b ${
          scrolled || menuOpen
            ? 'border-white/[0.06] bg-[#020C1B]/85 backdrop-blur-2xl'
            : 'border-transparent bg-transparent backdrop-blur-0'
        }`}
        style={{ transition: 'inherit' }}
      >
        <a href="#hero" aria-label="Smartslate home" className="flex items-center gap-3">
          <Logo />
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((l) =>
            l.route ? (
              <Link
                key={l.href}
                to={l.href}
                className="group relative font-display text-xs tracking-[0.3em] uppercase font-bold text-[#b0c5c6]/85 hover:text-white"
                style={{ transition: 'color 200ms var(--ease-out-expo)' }}
              >
                {l.label}
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 right-0 h-px bg-[#A7DADB] origin-left scale-x-0 group-hover:scale-x-100"
                  style={{ transition: 'transform 350ms var(--ease-out-expo)' }}
                />
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-display text-xs tracking-[0.3em] uppercase font-bold text-[#b0c5c6]/85 hover:text-white"
                style={{ transition: 'color 200ms var(--ease-out-expo)' }}
              >
                {l.label}
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 right-0 h-px bg-[#A7DADB] origin-left scale-x-0 group-hover:scale-x-100"
                  style={{ transition: 'transform 350ms var(--ease-out-expo)' }}
                />
              </a>
            )
          )}
        </div>

        <div className="flex items-center gap-2.5 md:gap-5">
          <NarrationMiniButton />
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="press-scale lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-white"
            style={{ transition: 'background-color 200ms, border-color 200ms' }}
          >
            <motion.div
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ duration: 0.3, ease: easeOut }}
            >
              {menuOpen ? <X className="h-4 w-4" strokeWidth={2.25} /> : <Menu className="h-4 w-4" strokeWidth={2.25} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: easeOut }}
            className="lg:hidden bg-[#020C1B]/95 backdrop-blur-2xl border-b border-white/[0.06]"
          >
            <div className="px-5 py-6 flex flex-col gap-1">
              {navLinks.map((l, i) => {
                const inner = (
                  <span className="flex items-center justify-between w-full py-3.5 border-b border-white/[0.04]">
                    <span className="font-display text-[13px] tracking-[0.3em] uppercase font-bold text-white">
                      {l.label}
                    </span>
                    <span className="font-display text-[10px] tabular-nums text-[#A7DADB]/55 font-bold">
                      0{i + 1}
                    </span>
                  </span>
                );
                return l.route ? (
                  <Link key={l.href} to={l.href} onClick={() => setMenuOpen(false)}>
                    {inner}
                  </Link>
                ) : (
                  <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
                    {inner}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 130, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX: x, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[95] bg-gradient-to-r from-[#A7DADB]/0 via-[#A7DADB] to-[#A7DADB]/70"
    />
  );
};

const LandingPage: React.FC = () => {
  return (
    <div className="relative bg-[#020C1B] min-h-screen selection:bg-[#A7DADB]/30 selection:text-[#A7DADB]">
      <CursorSpotlight />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <ProblemMatrix />
        <SolutionPillars />
        <Outcomes />
        <CTA />
      </main>
      <GrainOverlay opacity={0.06} />
    </div>
  );
};

export default LandingPage;
