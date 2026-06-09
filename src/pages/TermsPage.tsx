import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  ShieldAlert, 
  Scale, 
  Fingerprint, 
  FileLock, 
  Globe, 
  ScrollText, 
  Info,
  ChevronRight,
  Copyright
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Logo } from '../components/Logo';

/**
 * Utility for Tailwind classes merging
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * BlurFade Component (Inspired by Magic UI)
 */
interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number; opacity: number; filter: string };
    visible: { y: number; opacity: number; filter: string };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 20,
  inView = true,
  blur = "8px",
}: BlurFadeProps) => {
  const defaultVariants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
  };
  const combinedVariants = variant || defaultVariants;
  return (
    <motion.div
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: "easeOut",
      }}
      variants={combinedVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Main Smartslate Terms Component
 */
const SmartslateTerms: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen w-full bg-[#020C1B] text-[#b0c5c6] font-['Lato'] overflow-x-hidden selection:bg-[#A7DADB]/30 selection:text-[#A7DADB]">
      
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#A7DADB]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#A7DADB]/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20"
             style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #A7DADB 1px, transparent 0)`, backgroundSize: '48px 48px' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#A7DADB] origin-left z-50 shadow-[0_0_15px_rgba(167,218,219,0.5)]" 
        style={{ scaleX }} 
      />

      {/* Header / Navigation Mockup */}
      <nav className="sticky top-0 w-full z-40 px-10 py-6 flex justify-between items-center backdrop-blur-md border-b border-white/5">
        <BlurFade delay={0.1}>
          <div 
            className="cursor-pointer transition-transform active:scale-95" 
            onClick={() => {
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
          >
            <Logo />
          </div>
        </BlurFade>
        <BlurFade delay={0.2}>
          <div className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#A7DADB]/60">
            Internal Governance / Institutional Protocol
          </div>
        </BlurFade>
      </nav>

      {/* Main Canvas Scaling Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-20 lg:py-32">
        
        {/* Hero Section */}
        <header className="mb-24 space-y-6">
          <BlurFade delay={0.3}>
            <h4 className="text-[#A7DADB] uppercase tracking-[0.4em] font-['Quicksand'] text-xs font-bold">
              Legal Framework 2026
            </h4>
          </BlurFade>
          <BlurFade delay={0.4}>
            <h1 className="text-5xl lg:text-7xl font-['Quicksand'] font-bold text-white leading-tight">
              Confidentiality & <br />
              <span className="italic font-['Playfair_Display'] font-light text-[#A7DADB]">Intellectual Property</span>
            </h1>
          </BlurFade>
          <BlurFade delay={0.5}>
            <p className="max-w-2xl text-lg text-[#b0c5c6]/80 font-light leading-relaxed">
              This document outlines the protective measures and legal boundaries governing the collaboration between 
              Smartslate.io and Acharya Institute of Technology.
            </p>
          </BlurFade>
        </header>

        {/* Important Notice Box */}
        <BlurFade delay={0.6}>
          <section className="relative group mb-32">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#A7DADB]/20 to-transparent rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000" />
            <div className="relative bg-[#142433] border border-white/10 p-8 lg:p-12 rounded-2xl backdrop-blur-xl">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="p-4 bg-[#A7DADB]/10 rounded-xl">
                  <Info className="w-8 h-8 text-[#A7DADB]" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-['Quicksand'] font-bold text-white">IMPORTANT NOTICE — PLEASE READ BEFORE PROCEEDING</h2>
                  <p className="text-[#b0c5c6] font-light leading-relaxed italic">
                    This document contains proprietary and confidential information of Smartslate.io. It is provided to Acharya Institute of Technology solely for the purpose of evaluating the proposed AI Transformation Programme. By receiving, accessing, or reviewing this document, you agree to be bound by the terms and conditions set forth herein.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </BlurFade>

        {/* Terms Content Sections */}
        <div className="space-y-32">
          
          {/* Section 1 */}
          <TermSection 
            number="01" 
            title="Definitions" 
            icon={<ScrollText className="w-6 h-6" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DefinitionItem term="Smartslate" definition="Smartslate.io, its directors, employees, contractors, agents, and affiliated entities." />
              <DefinitionItem term="Recipient" definition="Acharya Institute of Technology, its officers, administration, faculty, employees, agents, and any person or entity to whom this document is made available." />
              <DefinitionItem term="Proposal" definition="This document in its entirety, including all text, data, financial figures, methodologies, and frameworks." />
              <DefinitionItem term="Confidential Information" definition="All information disclosed in or through this Proposal, whether or not marked confidential, including pricing, methodology, and technology architecture." />
              <DefinitionItem term="Permitted Purpose" definition="The sole purpose of internally evaluating whether the Recipient wishes to enter into a commercial engagement with Smartslate." />
              <DefinitionItem term="Competing Engagement" definition="Any request for proposal or engagement with any third party to design services substantially similar to those described herein." />
            </div>
          </TermSection>

          {/* Section 2 */}
          <TermSection 
            number="02" 
            title="Confidentiality Obligations" 
            icon={<FileLock className="w-6 h-6" />}
          >
            <div className="space-y-12">
              <div className="space-y-4">
                <h3 className="text-white font-['Quicksand'] font-bold flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#A7DADB]" /> 2.1 Permitted Use
                </h3>
                <p className="text-[#b0c5c6]/80 font-light leading-relaxed pl-6">
                  The Recipient may use the Confidential Information solely for the Permitted Purpose. The Proposal may be shared internally within the Recipient's organisation only on a strict need-to-know basis and only with those individuals who are directly involved in evaluating this Proposal.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-white font-['Quicksand'] font-bold flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#A7DADB]" /> 2.2 Prohibited Uses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                  {[
                    "(a) Disclose or make available the Proposal outside the Recipient's organisation.",
                    "(b) Use Confidential Information to assist any competing proposal or tender.",
                    "(c) Reproduce, screenshot, or duplicate the Proposal in any medium without authorization.",
                    "(d) Use the Proposal's methodology or fee architecture as a basis for procuring similar services.",
                    "(e) Share pricing or financial projections with any third party for any reason, including benchmarking or market comparison purposes.",
                    "(f) Disclose existence or content to media, research bodies, or the public."
                  ].map((text, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#A7DADB]/30 transition-colors">
                      <p className="text-sm text-[#b0c5c6]/70 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
                <div className="space-y-4">
                  <h3 className="text-white font-['Quicksand'] font-bold flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[#A7DADB]" /> 2.3 Unauthorised Disclosure
                  </h3>
                  <p className="text-[#b0c5c6]/80 font-light text-sm leading-relaxed">
                    If the Recipient becomes aware of any actual or threatened unauthorised disclosure, it must notify Smartslate in writing within 48 hours and cooperate fully to limit further disclosure.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-white font-['Quicksand'] font-bold flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[#A7DADB]" /> 2.4 Destruction or Return
                  </h3>
                  <p className="text-[#b0c5c6]/80 font-light text-sm leading-relaxed">
                    If the Recipient decides not to proceed, they must promptly destroy or return all copies of the Proposal and certify in writing that it has done so.
                  </p>
                </div>
              </div>
            </div>
          </TermSection>

          {/* Section 3 */}
          <TermSection 
            number="03" 
            title="Intellectual Property" 
            icon={<Fingerprint className="w-6 h-6" />}
          >
            <div className="space-y-8">
              <div className="p-8 bg-gradient-to-br from-[#142433] to-[#020C1B] border border-white/5 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <Copyright className="w-6 h-6 text-[#A7DADB]" />
                  <h3 className="text-xl font-['Quicksand'] font-bold text-white">3.1 Ownership</h3>
                </div>
                <p className="text-[#b0c5c6]/80 font-light leading-relaxed">
                  All intellectual property rights in and to the Proposal and all Confidential Information — including but not limited to the programme methodology, phase structure, KPI frameworks, subject playbook concepts, implementation roadmap architecture, and fee models — remain exclusively vested in Smartslate at all times.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-white font-['Quicksand'] font-bold">3.2 No Reverse Engineering</h4>
                  <p className="text-sm text-[#b0c5c6]/70 leading-relaxed">
                    The Recipient must not use the Proposal to reverse-engineer, replicate, adapt, or derive any programme design or methodology for internal use or for use by any third party.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-['Quicksand'] font-bold">3.3 Derivative Works</h4>
                  <p className="text-sm text-[#b0c5c6]/70 leading-relaxed">
                    Any documentation or frameworks derived from or informed by the Confidential Information shall be deemed derivative works of Smartslate's IP and shall vest in Smartslate.
                  </p>
                </div>
              </div>
            </div>
          </TermSection>

          {/* Section 4 */}
          <TermSection 
            number="04" 
            title="Non-Solicitation & Non-Circumvention" 
            icon={<Scale className="w-6 h-6" />}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="text-[#A7DADB] font-['Quicksand'] font-bold text-sm tracking-widest uppercase">4.1 Competing Engagements</div>
                <p className="text-[#b0c5c6]/80 font-light leading-relaxed">
                  For a period of <span className="text-white font-medium">twelve (12) months</span>, the Recipient must not use Confidential Information to instruct any third party to design a similar programme or share elements of this Proposal to obtain competitive quotes.
                </p>
              </div>
              <div className="space-y-6">
                <div className="text-[#A7DADB] font-['Quicksand'] font-bold text-sm tracking-widest uppercase">4.2 Non-Solicitation of Personnel</div>
                <p className="text-[#b0c5c6]/80 font-light leading-relaxed">
                  For a period of <span className="text-white font-medium">twenty-four (24) months</span>, the Recipient must not solicit or engage any employee or contractor of Smartslate involved in this Proposal.
                </p>
              </div>
            </div>
          </TermSection>

          {/* Section 5 & 6 & 7 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#A7DADB]/30 flex items-center justify-center text-[#A7DADB] text-xs font-bold">05</div>
                <h2 className="text-xl font-['Quicksand'] font-bold text-white uppercase tracking-wider">No Warranties</h2>
              </div>
              <p className="text-sm text-[#b0c5c6]/70 leading-relaxed font-light">
                This Proposal is provided for evaluation purposes only. Smartslate makes no representation or warranty as to the accuracy or completeness beyond what is stated in a formally executed engagement contract.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#A7DADB]/30 flex items-center justify-center text-[#A7DADB] text-xs font-bold">06</div>
                <h2 className="text-xl font-['Quicksand'] font-bold text-white uppercase tracking-wider">Remedies for Breach</h2>
              </div>
              <p className="text-sm text-[#b0c5c6]/70 leading-relaxed font-light">
                A breach would cause irreparable harm. Smartslate is entitled to seek immediate injunctive relief, specific performance, or other equitable relief without proving actual damages.
              </p>
            </div>
          </div>

          <TermSection 
            number="07" 
            title="Governing Law & Jurisdiction" 
            icon={<Globe className="w-6 h-6" />}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 p-10 bg-[#142433] rounded-2xl border border-white/5">
              <div className="space-y-2">
                <div className="text-[#A7DADB] text-xs uppercase tracking-widest font-bold">Primary Jurisdiction</div>
                <div className="text-3xl font-['Quicksand'] font-bold text-white">Bengaluru, India</div>
              </div>
              <div className="hidden md:block w-px h-16 bg-white/10" />
              <div className="text-center md:text-right">
                <p className="text-[#b0c5c6]/60 text-sm leading-relaxed max-w-sm">
                  These Terms shall be governed by and construed in accordance with the laws of India. Any dispute shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka.
                </p>
              </div>
            </div>
          </TermSection>

          {/* Acknowledgement Footer */}
          <section className="pt-20 border-t border-white/10 text-center space-y-12">
            <BlurFade delay={0.1}>
              <div className="space-y-4">
                <h2 className="text-4xl font-['Quicksand'] font-bold text-white">Acknowledgement of Receipt</h2>
                <p className="max-w-2xl mx-auto text-[#b0c5c6]/80 font-light leading-relaxed">
                  By receiving, accessing, or reviewing this Proposal, the Recipient confirms that it has read, understood, and agrees to be bound by all terms set out in this document.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2}>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-1 bg-[#A7DADB] rounded-full" />
                <div className="font-['Quicksand'] font-bold text-white tracking-[0.3em] uppercase text-sm">
                  STRICTLY CONFIDENTIAL
                </div>
                <div className="flex items-center gap-4 text-[10px] text-[#A7DADB]/40 tracking-widest uppercase font-medium">
                  <span>SMARTSLATE.IO</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>MAY 2026</span>
                </div>
              </div>
            </BlurFade>
          </section>

        </div>
      </main>

      {/* Aesthetic Footer */}
      <footer className="relative z-10 w-full py-10 px-10 flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-[#b0c5c6]/40 border-t border-white/5">
        <div>© 2026 SMARTSLATE.IO</div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-[#A7DADB] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#A7DADB] transition-colors">Governance</a>
          <a href="#" className="hover:text-[#A7DADB] transition-colors">Compliance</a>
        </div>
      </footer>
    </div>
  );
};

/**
 * Sub-components
 */

const TermSection: React.FC<{
  number: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ number, title, icon, children }) => (
  <BlurFade yOffset={40}>
    <div className="relative">
      <div className="flex items-center gap-6 mb-12">
        <div className="relative group">
          <div className="absolute -inset-2 bg-[#A7DADB]/20 rounded-full blur group-hover:bg-[#A7DADB]/40 transition duration-500" />
          <div className="relative w-16 h-16 rounded-full bg-[#142433] border border-[#A7DADB]/30 flex items-center justify-center text-[#A7DADB]">
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-[10px] uppercase tracking-[0.5em] text-[#A7DADB] font-bold">Section {number}</div>
          <h2 className="text-3xl font-['Quicksand'] font-bold text-white tracking-tight">{title}</h2>
        </div>
      </div>
      <div className="relative pl-0 lg:pl-20">
        {children}
      </div>
    </div>
  </BlurFade>
);

const DefinitionItem: React.FC<{ term: string; definition: string }> = ({ term, definition }) => (
  <div className="group space-y-2 p-6 rounded-2xl hover:bg-white/[0.02] transition-all duration-300 border border-transparent hover:border-white/5">
    <div className="text-white font-['Quicksand'] font-bold tracking-wide italic">"{term}"</div>
    <p className="text-sm text-[#b0c5c6]/60 leading-relaxed font-light group-hover:text-[#b0c5c6]/90 transition-colors">
      {definition}
    </p>
  </div>
);

export default SmartslateTerms;
