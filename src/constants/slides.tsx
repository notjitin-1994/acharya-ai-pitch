import React from 'react';
import { 
  Building2, GraduationCap, Users, Lightbulb, Zap, Target, Layers, Rocket, CheckCircle2, X,
  ArrowRight, Brain, Globe, TrendingUp, Shield, Award, Briefcase, Sparkles, Binary,
  Compass, PieChart, MessageSquare, Cpu, Search, Database, BarChart3, Presentation,
  ShieldAlert, LibraryBig, RefreshCw, Gauge, Clock, Palette, Repeat, Wrench, Fingerprint,
  BookOpen, FlaskConical, EyeOff, Activity, Network, ChevronRight
} from 'lucide-react';
import { m } from 'framer-motion';
import { theme } from '../theme/branding';
import { FlipCard } from '../components/FlipCard';

export interface Slide {
  id: number;
  tag: string;
  title: string;
  content: React.ReactNode;
  notes: string;
  bgImage?: string;
  overlayColor?: string;
  tagColor?: string;
  titleColor?: string;
  hideTitle?: boolean;
  fullBleed?: boolean;
}

export const slidesData: Slide[] = [
  {
    id: 1,
    tag: "The Vision",
    title: "Project: Institutional Intelligence",
    bgImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200",
    overlayColor: "rgba(2, 12, 27, 0.2)",
    content: (
      <div className="relative h-full flex flex-col justify-center">
        <div className="relative z-20 space-y-12 max-w-5xl text-left">
          <m.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center gap-6"
          >
            <img src="/ait-logo.png" alt="AIT" className="h-24 w-auto" />
            <div className="h-16 w-px bg-white" />
            <div className="flex flex-col">
              <span className="text-xl tracking-[0.4em] font-display uppercase font-bold text-[#A7DADB]">Strategic</span>
              <span className="text-xl tracking-[0.4em] font-display uppercase font-bold text-white">Partnership</span>
            </div>
          </m.div>
          <div className="space-y-4">
            <m.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="text-[140px] font-display font-bold text-white leading-[0.9] tracking-tighter text-left"
            >
              The AI <br /><span className="italic font-serif text-[#A7DADB]">Transformation</span>
            </m.h1>
          </div>
          <m.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1.0 }}
            className="text-4xl text-[#b0c5c6] font-light max-w-none leading-relaxed text-left whitespace-nowrap"
          >
            Deploying a world-class cognitive ecosystem at Acharya Institute of Technology.
          </m.p>
        </div>
      </div>
    ),
    notes: "Thank you for having me. Today, we aren't just talking about software. We are talking about the future of Acharya Institute of Technology."
  },
  {
    id: 2,
    tag: "The Core Premise",
    title: "The Success Metric",
    content: (
      <div className="grid grid-cols-2 gap-24 h-full items-center">
        <div className="space-y-12 relative z-20">
          <div className="bg-[#142433]/60 backdrop-blur-2xl p-16 rounded-[60px] border border-white/10 shadow-2xl">
            <div className="flex items-center gap-6 mb-12">
               <div className="p-6 bg-[#A7DADB]/10 rounded-3xl border border-[#A7DADB]/30">
                  <GraduationCap size={80} className="text-[#A7DADB]" />
               </div>
               <div className="h-20 w-px bg-white/20" />
               <h4 className="text-2xl font-display font-bold text-[#A7DADB] uppercase tracking-[0.4em]">Evaluation</h4>
            </div>
            <p className="text-[64px] font-display font-medium leading-[1.2] text-white">
              "Graduates will be judged by how <span className="text-[#A7DADB] font-bold italic font-serif underline decoration-white decoration-[4.8px]">effectively</span> they work with AI."
            </p>
          </div>
        </div>
        <div className="relative h-full rounded-[80px] overflow-hidden border border-white/10 shadow-2xl group min-h-[500px]">
          <img 
            src="https://images.unsplash.com/photo-1543269664-76bc3997d9ea?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover brightness-[0.9] contrast-110 group-hover:scale-110 transition-transform duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020C1B]/60 via-transparent to-transparent z-10" />
          <div className="absolute bottom-12 left-12 flex items-center gap-4 z-20">
             <div className="w-3 h-3 rounded-full bg-[#A7DADB] animate-pulse" />
             <span className="text-xl font-mono text-[#A7DADB] uppercase tracking-[0.4em]">Campus Insight</span>
          </div>
        </div>
      </div>
    ),
    notes: "Over the next 3 to 5 years, the rules of the talent market are changing. The degree gets them in the door, but their ability to leverage AI is what will keep them in the room."
  },
  {
    id: 3,
    tag: "Market Reality",
    title: "The Innovation Gap",
    content: (
      <div className="grid grid-cols-3 gap-10 h-full items-center">
        {[
          { 
            icon: Brain, 
            label: "Students", 
            status: "Unguided Usage", 
            img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
            detail: "Students are already leveraging AI tools in the 'shadows', using them to complete assignments without institutional guidance or ethical frameworks."
          },
          { 
            icon: Users, 
            label: "Faculty", 
            status: "Limited Access", 
            img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
            detail: "Educators recognize the potential but lack subject-specific training and enterprise-grade tools to integrate AI meaningfully into their pedagogy."
          },
          { 
            icon: Building2, 
            label: "Institutions", 
            status: "Scaling Barrier", 
            img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
            detail: "Traditional institutional structures are moving slower than industry velocity, creating a strategic rift that risks brand stagnation."
          }
        ].map((item, i) => (
          <FlipCard 
            key={i}
            front={
              <div className="relative h-full w-full rounded-[60px] overflow-hidden border border-white/5 shadow-2xl">
                <div className="absolute inset-0 z-0">
                  <img src={item.img} className="w-full h-full object-cover grayscale brightness-[0.4]" alt="" />
                  <div className="absolute inset-0 bg-[#020C1B]/40 backdrop-blur-[6px]" />
                </div>
                <div className="relative z-10 p-12 h-full flex flex-col justify-between text-left">
                  <div className="p-8 bg-[#A7DADB]/20 rounded-[40px] w-fit border border-[#A7DADB]/30">
                    <item.icon size={64} className="text-[#A7DADB]" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-4xl font-display font-bold text-white uppercase tracking-tighter">{item.label}</h3>
                    <p className="text-3xl text-[#A7DADB] font-serif italic">{item.status}</p>
                  </div>
                </div>
              </div>
            }
            back={
              <div className="relative h-full w-full rounded-[60px] overflow-hidden border border-[#A7DADB]/30 bg-[#142433] shadow-2xl p-16 flex flex-col justify-center items-start text-left space-y-10">
                <div className="absolute -right-32 -bottom-32 text-[#A7DADB] opacity-[0.03] pointer-events-none">
                  <item.icon size={500} />
                </div>
                <div className="space-y-4 relative z-10">
                  <h3 className="text-4xl font-display font-bold text-white uppercase tracking-widest text-left">The Truth</h3>
                  <p className="text-4xl text-[#b0c5c6] font-light leading-relaxed">
                    {item.detail}
                  </p>
                </div>
                <div className="pt-8 text-[#A7DADB] font-mono text-sm uppercase tracking-[0.4em] relative z-10 drop-shadow-[0_0_8px_rgba(167,218,219,0.5)]">
                  Click to return
                </div>
              </div>
            }
          />
        ))}
      </div>
    ),
    notes: "The uncomfortable truth is that AI is already on your campus. But right now, it's fragmented, unguided, and operating in the shadows."
  },
  {
    id: 4,
    tag: "Strategic Gap",
    title: "Lead or Fall Behind",
    bgImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000",
    content: (
      <div className="h-full flex flex-col justify-center text-left">
        <div className="space-y-12 max-w-5xl">
          <p className="text-[52px] text-[#b0c5c6] font-body font-light leading-tight whitespace-nowrap">
            This disconnect creates a <span className="text-white font-normal italic font-serif">massive gap</span> in the ecosystem.
          </p>
          <div className="space-y-8">
            <h1 className="text-[120px] font-display font-bold text-white leading-none tracking-tighter flex flex-col gap-6 text-left">
              <span className="text-[#A7DADB] font-serif italic tracking-normal">Innovate...</span>
              <span>Or become history.</span>
            </h1>
            <div className="h-2 w-48 bg-[#A7DADB]" />
          </div>
        </div>
      </div>
    ),
    notes: "This creates a critical gap. Institutions that ignore this will become obsolete. Those that embrace it will define the next era of higher education."
  },
  {
    id: 5,
    tag: "Problem Matrix",
    title: "Student Obsolescence",
    tagColor: "#ef4444",
    titleColor: "#FFFFFF",
    bgImage: "https://images.unsplash.com/photo-1507679799987-c7377f5da5b2?auto=format&fit=crop&q=80&w=1200",
    content: (
      <div className="grid grid-cols-2 gap-24 h-full items-center">
        <div className="relative h-full flex flex-col justify-center text-left">
          <div className="bg-[#142433]/80 backdrop-blur-2xl p-16 rounded-[80px] border border-white/10 shadow-2xl relative overflow-hidden group text-left">
            <div className="absolute inset-0 z-0">
               <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale brightness-[0.2] blur-[3px] group-hover:scale-110 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-br from-[#020C1B]/80 to-transparent" />
            </div>
            <div className="absolute -right-20 -top-20 text-[#A7DADB]/5 group-hover:text-[#A7DADB]/10 transition-colors duration-1000">
               <TrendingUp size={400} />
            </div>
            <div className="relative z-10 space-y-12">
               <div className="space-y-4">
                 <h4 className="text-2xl font-display font-bold text-[#A7DADB] uppercase tracking-[0.4em]">Placement Impact</h4>
                 <h3 className="text-[120px] font-display font-bold text-white leading-none tracking-tighter">LOSS</h3>
               </div>
               <p className="text-4xl text-[#b0c5c6] font-light leading-relaxed">
                 Traditional graduates face <span className="text-white font-medium italic font-serif">zero differentiation</span> in competitive recruitment cycles.
               </p>
               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                 <m.div initial={{ width: "0%" }} whileInView={{ width: "20%" }} className="h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" transition={{ delay: 0.5, duration: 1.5 }} />
               </div>
               <p className="text-xl font-mono text-red-400 uppercase tracking-widest">Confidence Index: Critical Low</p>
            </div>
          </div>
        </div>
        <div className="space-y-16 text-left">
          <div className="space-y-12">
            {[
              { icon: ShieldAlert, title: "Skill Mismatch", desc: "Theoretical learning disconnected from AI reality." },
              { icon: Zap, title: "Zero AI Exposure", desc: "Producing graduates unequipped for the modern toolset." },
              { icon: Target, title: "Brand Erosion", desc: "Decreased student marketability in high-stakes roles." }
            ].map((item, i) => (
              <div key={i} className="flex gap-10 items-start group text-left">
                <div className="bg-red-600 p-6 rounded-3xl border border-red-500 flex items-center justify-center transition-transform group-hover:scale-105 shadow-xl text-white">
                  <item.icon size={40} />
                </div>
                <div className="space-y-3 pt-1">
                  <h4 className="text-4xl font-display font-bold text-white uppercase tracking-tighter">{item.title}</h4>
                  <p className="text-2xl text-[#b0c5c6] font-light leading-relaxed max-w-2xl">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    notes: "For students, theoretical learning isn't enough anymore. Without applied AI skills, we are producing graduates who are qualified on paper, but completely unequipped for the modern workplace."
  },
  {
    id: 6,
    tag: "Problem Matrix",
    title: "Faculty Efficiency Drain",
    tagColor: "#f97316",
    titleColor: "#FFFFFF",
    bgImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200",
    content: (
      <div className="grid grid-cols-2 gap-24 h-full items-center">
        <div className="space-y-16 text-left">
          <div className="space-y-12">
            {[
              { icon: Layers, title: "Manual Preparation", desc: "Curriculum velocity stalled by legacy administrative debt." },
              { icon: Target, title: "Assessment Debt", desc: "Manual grading cycles draining high-value faculty time." },
              { icon: Compass, title: "Static Pedagogy", desc: "Traditional methods failing to bridge the applied AI gap." }
            ].map((item, i) => (
              <div key={i} className="flex gap-10 items-start group text-left">
                <div className="bg-orange-600 p-6 rounded-3xl border border-orange-500 flex items-center justify-center transition-transform group-hover:scale-105 shadow-xl text-white">
                  <item.icon size={40} />
                </div>
                <div className="space-y-3 pt-1">
                  <h4 className="text-4xl font-display font-bold text-white uppercase tracking-tighter">{item.title}</h4>
                  <p className="text-2xl text-[#b0c5c6] font-light leading-relaxed max-w-2xl">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-full flex flex-col justify-center text-left">
          <div className="bg-[#142433]/80 backdrop-blur-2xl p-16 rounded-[80px] border border-white/10 shadow-2xl relative overflow-hidden group text-left">
            <div className="absolute inset-0 z-0">
               <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale brightness-[0.2] blur-[3px] group-hover:scale-110 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-br from-[#020C1B]/80 to-transparent" />
            </div>
            <div className="absolute -right-20 -top-20 text-orange-500/10 group-hover:text-orange-500/20 transition-colors duration-1000">
               <Presentation size={400} />
            </div>
            <div className="relative z-10 space-y-12 text-left">
               <div className="space-y-4 text-left">
                 <h4 className="text-2xl font-display font-bold text-orange-400 uppercase tracking-[0.4em]">Pedagogical Impact</h4>
                 <h3 className="text-[120px] font-display font-bold text-white leading-none tracking-tighter uppercase text-left">Barrier</h3>
               </div>
               <p className="text-4xl text-[#b0c5c6] font-light leading-relaxed">
                 Educators face a <span className="text-white font-medium italic font-serif text-left">structural ceiling</span> in productivity without AI enablement.
               </p>
               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                 <m.div initial={{ width: "0%" }} whileInView={{ width: "85%" }} className="h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]" transition={{ delay: 0.5, duration: 1.5 }} />
               </div>
               <p className="text-xl font-mono text-orange-400 uppercase tracking-widest">Effort Index: Dangerously High</p>
            </div>
          </div>
        </div>
      </div>
    ),
    notes: "For your educators, the lack of enablement means they are working harder, not smarter. They spend hours on tasks that AI could help them complete in minutes. High effort, low leverage."
  },
  {
    id: 7,
    tag: "Problem Matrix",
    title: "The Brand Attrition",
    tagColor: "#ef4444",
    titleColor: "#FFFFFF",
    bgImage: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200",
    content: (
      <div className="grid grid-cols-2 gap-24 h-full items-center">
        <div className="relative h-full flex flex-col justify-center text-left">
          <div className="bg-[#A7DADB]/40 backdrop-blur-2xl p-20 rounded-[100px] border border-white/10 shadow-2xl relative overflow-hidden group text-left">
            <div className="absolute inset-0 z-0">
               <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale brightness-[0.25] blur-[3px] group-hover:scale-110 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-br from-[#020C1B]/80 to-transparent" />
            </div>
            <div className="absolute -right-48 -bottom-48 text-white/10 group-hover:rotate-12 transition-transform duration-1000">
               <Target size={500} />
            </div>
            <div className="relative z-10 space-y-12">
               <div className="space-y-4 text-left">
                 <h4 className="text-2xl font-display font-bold text-[#A7DADB] uppercase tracking-[0.4em]">Strategic Roadmap</h4>
                 <h3 className="text-[90px] font-display font-bold text-white leading-none tracking-tighter uppercase text-left">Pioneer</h3>
               </div>
               <p className="text-4xl text-white font-medium italic font-serif leading-relaxed text-left">
                 Acharya has the choice to redefine the regional <span className="text-[#A7DADB] underline decoration-white decoration-8">standard.</span>
               </p>
            </div>
          </div>
        </div>
        <div className="space-y-16 text-left">
          <div className="space-y-12">
            {[
              { icon: ShieldAlert, title: "Legacy Drift", desc: "Institutional reputation lagging behind industry innovation velocity.", color: "text-red-500", bg: "bg-red-600" },
              { icon: Sparkles, title: "Market Leader", desc: "The opportunity to define the next era of Indian higher education.", color: "text-[#A7DADB]", bg: "bg-[#142433]" }
            ].map((item, i) => (
              <div key={i} className="flex gap-10 items-start group text-left">
                <div className={`${item.bg} p-8 rounded-[40px] flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xl border border-white/5`}>
                  <item.icon size={56} className="text-white" />
                </div>
                <div className="space-y-4 pt-4 text-left">
                  <h4 className={`text-6xl font-display font-bold text-white uppercase tracking-tighter`}>{item.title}</h4>
                  <p className="text-3xl text-[#b0c5c6] font-light leading-relaxed max-w-2xl text-left">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    notes: "And for Acharya as a brand? The risk is stagnation. If your curriculum lags behind the industry, you lose out on the top-tier enrollments to institutions that tell a better innovation story."
  },
  {
    id: 8,
    tag: "The Shift",
    title: "A New Foundation",
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    content: (
      <div className="relative w-full h-full flex flex-col items-center justify-center px-12 text-center">
        <div className="relative z-10 w-full flex flex-col items-center">
          <m.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-16 backdrop-blur-md bg-white/5 border border-white/10 px-10 py-5 rounded-sm text-center"
          >
            <span className="text-4xl text-[#b0c5c6] font-display line-through decoration-[#A7DADB] decoration-8 opacity-60 uppercase tracking-[0.3em]">
              Don't launch "AI Courses"
            </span>
          </m.div>
          <m.h1 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[160px] font-display font-bold text-white leading-[0.8] tracking-tighter text-center"
          >
            <span className="font-serif italic font-light text-white/90 block mb-6">Architect a</span>
            <span className="text-[#A7DADB] uppercase block">Cognitive Campus.</span>
          </m.h1>
        </div>
      </div>
    ),
    notes: "So, what's the solution? Most colleges think the answer is adding a 'Prompt Engineering 101' elective. That's a band-aid. The real opportunity is to build an entirely AI-powered institution."
  },
  {
    id: 9,
    tag: "The Solution",
    title: "The 3-Pillar Model",
    content: (
      <div className="grid grid-cols-3 gap-10 h-full items-center py-4">
        {[
          { 
            id: "01", 
            icon: Building2, 
            title: "AI-Enabled Campus", 
            sub: "Operations & Management", 
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800"
          },
          { 
            id: "02", 
            icon: Users, 
            title: "AI-Augmented Faculty", 
            sub: "Teaching & Efficiency", 
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
          },
          { 
            id: "03", 
            icon: GraduationCap, 
            title: "AI-First Students", 
            sub: "Learning & Outcomes", 
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
          }
        ].map((item, i) => (
          <div key={i} className="relative group h-[600px] rounded-[2.5rem] border-2 border-[#A7DADB]/30 bg-[#142433]/40 backdrop-blur-xl overflow-hidden transition-all duration-700 hover:border-[#A7DADB]/80 hover:shadow-[0_0_50px_-12px_rgba(167,218,219,0.2)]">
            <img 
              src={item.image} 
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 brightness-[0.3] group-hover:scale-110 group-hover:opacity-50 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020C1B] via-[#020C1B]/40 to-transparent z-10" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#A7DADB] rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
            <div className="relative z-20 h-full p-10 flex flex-col justify-between text-left">
              <div className="flex justify-between items-start">
                <div className="p-4 rounded-2xl bg-[#A7DADB]/20 border border-[#A7DADB]/20 group-hover:bg-[#A7DADB] group-hover:border-[#A7DADB]/40 transition-all duration-500 transform group-hover:-translate-y-1">
                  <item.icon size={36} className="text-[#A7DADB]" />
                </div>
                <span className="text-6xl font-serif italic text-[#A7DADB]/20 group-hover:text-[#A7DADB]/40 transition-colors duration-700 drop-shadow-[0_0_15px_rgba(167,218,219,0.3)]">
                  {item.id}
                </span>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-4xl font-display font-bold text-white tracking-tight uppercase text-left">
                    {item.title}
                  </h3>
                  <div className="h-1 w-12 bg-[#A7DADB] group-hover:w-24 transition-all duration-700" />
                </div>
                <p className="text-xl font-body font-light text-[#b0c5c6] leading-relaxed max-w-[240px]">
                  {item.sub}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    notes: "We achieve this through a 3-pillar framework. We optimize your operations, we supercharge your faculty, and we transform your students into AI practitioners."
  },
  {
    id: 10,
    tag: "Pillar 1",
    title: "AI-Enabled Campus",
    content: (
      <div className="grid grid-cols-12 gap-16 h-full items-center relative py-4 text-left">
        <div className="col-span-7 space-y-10 pr-8 text-left">
          <h2 className="text-[72px] text-white font-display font-bold leading-[1] tracking-tighter text-left">
            Optimizing the <br />
            <span className="text-[#A7DADB] font-serif italic font-normal text-[84px]">Institutional Footprint.</span>
          </h2>
          <div className="space-y-4 text-left">
            {[
              { icon: Zap, title: "24/7 Concierge", detail: "Automated student resolution." },
              { icon: Target, title: "Success Modeling", detail: "Real-time engagement risk." },
              { icon: Database, title: "Data Layer", detail: "Unified knowledge access." }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 items-center p-8 bg-[#142433] rounded-[32px] border border-white/10 hover:border-[#A7DADB]/40 transition-all duration-500 group text-left">
                <div className="bg-[#A7DADB] p-6 rounded-[24px] group-hover:scale-105 transition-transform duration-500">
                  <item.icon size={40} className="text-white" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-4xl font-bold text-white font-display tracking-tight uppercase leading-none text-left">{item.title}</h3>
                  <p className="text-2xl text-[#b0c5c6] font-body font-light text-left">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-5 h-[680px] relative group overflow-hidden rounded-[60px] border border-white/10 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
            alt="Institutional Architecture"
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-[3s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#020C1B] via-[#020C1B]/60 to-transparent" />
          <div className="absolute inset-0 bg-[#142433]/30 backdrop-blur-xl" />
          <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 inline-block px-5 py-1.5 rounded-full border border-[#A7DADB]/30 bg-[#A7DADB]/10 text-[#A7DADB] font-display text-lg uppercase tracking-[0.3em]">
              Benchmark
            </div>
            <div className="text-[180px] font-display font-bold text-white leading-none tracking-tighter">
              70%
            </div>
            <p className="text-4xl text-[#A7DADB] font-bold uppercase tracking-[0.2em] mt-2 font-display">
              Efficiency Surge
            </p>
            <div className="mt-12 w-24 h-1.5 bg-[#A7DADB] rounded-full shadow-[0_0_15px_rgba(79,70,229,0.8)] mx-auto" />
          </div>
        </div>
      </div>
    ),
    notes: "Pillar 1 is your campus. Imagine a 24/7 AI assistant handling basic student queries, freeing up administrative staff. Imagine leadership having real-time predictive analytics on student engagement."
  },
  {
    id: 11,
    tag: "Pillar 2",
    title: "AI-Augmented Faculty",
    bgImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
    content: (
      <div className="flex flex-col h-full justify-center space-y-12 py-4 text-left">
        <m.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          className="text-4xl text-[#A7DADB] font-display italic font-light text-left pl-2"
        >
          Turning every teacher into a high-leverage educator.
        </m.p>
        <div className="grid grid-cols-3 gap-8 h-full items-center">
          {[
            { 
              title: "AI Training", 
              detail: "Deep dive masterclasses into ChatGPT, Copilot, and specialized academic tools.", 
              icon: Brain,
              img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
            },
            { 
              title: "Pedagogy 2.0", 
              detail: "Advanced prompt engineering specifically tailored for university educators.", 
              icon: Compass,
              img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200"
            },
            { 
              title: "Task Flow", 
              detail: "AI-assisted creation of lesson plans, complex rubrics, and grading.", 
              icon: Target,
              img: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?auto=format&fit=crop&q=80&w=800"
            }
          ].map((item, i) => (
            <div key={i} className="relative group h-[600px] rounded-[2.5rem] border-2 border-[#A7DADB]/30 bg-[#142433]/60 backdrop-blur-xl overflow-hidden transition-all duration-700 shadow-2xl">
              <img src={item.img} className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 brightness-[0.3] blur-[8px]" />
              <div className="absolute inset-0 bg-[#020C1B]/40 backdrop-blur-md z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020C1B] via-transparent to-transparent z-20" />
              <div className="relative z-20 h-full p-10 flex flex-col gap-8 text-left">
                <div className="flex items-center gap-6 p-6 rounded-3xl bg-[#A7DADB] border border-[#A7DADB]/40 shadow-lg text-left">
                  <item.icon size={44} className="text-[#020C1B]" />
                  <h3 className="text-4xl font-display font-bold text-[#020C1B] uppercase tracking-tighter leading-none text-left">{item.title}</h3>
                </div>
                <p className="text-2xl text-[#b0c5c6] font-body font-light leading-relaxed px-2 text-left">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    notes: "Pillar 2 focuses on your educators. We don't replace them; we give them superpowers. We train them to use AI to draft lesson plans, build rubrics, and grade baseline assessments."
  },
  {
    id: 12,
    tag: "Pillar 2 Outcomes",
    title: "Efficiency & Impact",
    bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000",
    content: (
      <div className="grid grid-cols-12 gap-12 items-center h-full w-full text-left">
        <div className="col-span-7 space-y-12 text-left">
          <p className="text-4xl text-[#A7DADB] font-display italic font-light text-left leading-relaxed text-left">
            How we deliver <span className="text-white font-normal not-italic">Transformation</span>
          </p>
          <div className="space-y-6 pt-4 text-left">
            {[
              { icon: <Layers size={36} />, title: "Structured Workshops", desc: "From Beginner → Advanced technical proficiency" },
              { icon: <LibraryBig size={36} />, title: "Use-Case Playbooks", desc: "Subject-specific implementation guides" },
              { icon: <RefreshCw size={36} />, title: "AI Update Ecosystem", desc: "Continuous software and methodology evolution" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-10 group transition-all duration-500 text-left">
                <div className="p-6 rounded-[32px] bg-[#A7DADB] text-white border border-[#A7DADB]/40 shadow-xl group-hover:scale-105 transition-all">
                  {item.icon}
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="text-4xl font-display font-bold text-white tracking-tight uppercase leading-none text-left">{item.title}</h4>
                  <p className="text-2xl text-[#b0c5c6] font-body font-light leading-relaxed text-left">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-5 text-left">
          <div className="relative p-12 rounded-[80px] bg-[#142433]/80 border border-white/10 backdrop-blur-3xl overflow-hidden group shadow-2xl h-[700px] flex flex-col items-center justify-center text-left">
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-[#A7DADB]/15 blur-[120px] rounded-full group-hover:bg-[#A7DADB]/25 transition-all duration-1000" />
            <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-80 h-80 bg-[#A7DADB]/10 blur-[100px] rounded-full" />
            <div className="relative z-10 w-full flex flex-col items-center text-center">
              <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 flex items-center gap-3 text-center">
                <Gauge className="w-5 h-5 text-[#A7DADB]" />
                <span className="text-[#A7DADB] font-display text-sm uppercase tracking-[0.4em] opacity-70 text-center">Efficiency Quotient</span>
              </m.div>
              <div className="relative mb-16 text-center">
                <svg className="w-80 h-80 transform -rotate-90">
                  <circle cx="160" cy="160" r="145" stroke="currentColor" strokeWidth="1" fill="transparent" className="text-white/10" />
                  <circle cx="160" cy="160" r="130" stroke="currentColor" strokeWidth="20" fill="transparent" className="text-[#142433]" />
                  <m.circle cx="160" cy="160" r="130" stroke="#A7DADB" strokeWidth="20" strokeLinecap="round" fill="transparent" strokeDasharray={2 * Math.PI * 130} initial={{ strokeDashoffset: 2 * Math.PI * 130 }} whileInView={{ strokeDashoffset: (2 * Math.PI * 130) * (1 - 0.55) }} transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }} className="filter drop-shadow-[0_0_12px_rgba(167,218,219,0.3)]" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <m.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}>
                    <span className="text-7xl font-display font-bold text-white tracking-tighter text-center">40-60</span>
                    <span className="text-3xl font-display font-light text-[#A7DADB] ml-1 text-center">%</span>
                    <p className="text-[#b0c5c6] font-body text-sm uppercase tracking-widest mt-2 text-center text-center">Time Reclaimed</p>
                  </m.div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 w-full max-w-3xl px-4 text-center">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10"><Clock className="w-6 h-6 text-[#A7DADB]" /></div>
                  <div className="text-center"><p className="text-white font-display text-lg font-medium text-center text-center">Administrative</p><p className="text-[#b0c5c6] font-body text-xs uppercase tracking-tighter opacity-60 text-center text-center">Recovery Mode</p></div>
                </div>
                <div className="flex flex-col items-center text-center space-y-3 text-center">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10"><Target className="w-6 h-6 text-[#A7DADB]" /></div>
                  <div className="text-center"><p className="text-white font-display text-lg font-medium text-center text-center">Pedagogical</p><p className="text-[#b0c5c6] font-body text-xs uppercase tracking-tighter opacity-60 text-center text-center">Strategic Focus</p></div>
                </div>
              </div>
              <div className="mt-12 text-center text-center">
                <span className="text-white font-serif italic text-3xl opacity-90 text-center">Cognitive Surge</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    notes: "Through structured workshops and subject-specific playbooks, we achieve a massive reduction in preparation time, allowing faculty to focus on high-value student interaction."
  },
  {
    id: 13,
    tag: "Pillar 3",
    title: "AI-First Students",
    content: (
      <div className="grid grid-cols-2 gap-20 h-full items-center text-left">
        <div className="space-y-16 text-left">
          {[
            { title: "Literacy", desc: "Mandatory baseline AI proficiency for all streams.", icon: Brain },
            { title: "Assignments", desc: "AI-augmented project-based learning models.", icon: Target },
            { title: "Enterprise Lab", desc: "Direct delivery in enterprise-grade sandboxes.", icon: Cpu }
          ].map((item, i) => (
            <div key={i} className="flex gap-10 items-start group text-left text-left">
              <div className="bg-[#A7DADB] p-6 rounded-3xl group-hover:bg-[#A7DADB] group-hover:text-white transition-all border border-white/5 shadow-xl text-[#020C1B]">
                <item.icon size={48} />
              </div>
              <div className="space-y-4 text-left">
                <h3 className="text-6xl font-display font-bold text-white tracking-tighter uppercase leading-none text-left">{item.title}</h3>
                <p className="text-3xl text-[#b0c5c6] font-light leading-relaxed text-left text-left">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="relative h-full min-h-[700px] bg-[#142433]/60 backdrop-blur-2xl rounded-[100px] overflow-hidden border border-[#A7DADB]/20 shadow-2xl group flex flex-col justify-center items-center text-center p-20 text-left">
           <div className="absolute inset-0 z-0 text-left">
             <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-20" />
             <div className="absolute inset-0 bg-gradient-to-br from-[#020C1B]/90 via-[#020C1B]/40 to-transparent" />
           </div>
           <div className="relative z-10 space-y-12 text-center">
             <Rocket size={150} className="text-[#A7DADB] mx-auto" />
             <h2 className="text-[100px] font-display font-bold text-white leading-[0.85] tracking-tighter uppercase text-center">
                PRACTITIONER <br /><span className="italic font-serif text-[#A7DADB]">NOT</span> USER
             </h2>
             <p className="text-3xl text-[#b0c5c6] font-light italic px-12 text-center text-center">Equipping students with the intelligence to architect solutions.</p>
           </div>
        </div>
      </div>
    ),
    notes: "Pillar 3 is the students. We move them from consumers of AI to practitioners. We embed AI into their existing assignments so they learn to use it as a co-pilot, not a cheat code."
  },
  {
    id: 14,
    tag: "Pillar 3 Outcomes",
    title: "Subject Mastery",
    bgImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=2000",
    overlayColor: "rgba(2, 12, 27, 0.75)",
    content: (
      <div className="relative h-full w-full flex flex-col justify-center py-10 text-left">
        <div className="absolute inset-0 backdrop-blur-[6px] z-0 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10" style={{ backgroundImage: 'radial-gradient(#A7DADB 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
        <div className="grid grid-cols-3 gap-12 relative z-30">
          {[
            { 
              icon: Palette, 
              stream: "Arts", 
              impact: "Generative Expression", 
              detail: "AI as a creative catalyst for digital humanities, media synthesis, and the evolution of human-centric storytelling."
            },
            { 
              icon: PieChart, 
              stream: "Commerce", 
              impact: "Predictive Intelligence", 
              detail: "Algorithmic financial auditing, real-time market forecasting, and AI-driven consumer behavioral modeling."
            },
            { 
              icon: Binary, 
              stream: "Science", 
              impact: "Algorithmic Insight", 
              detail: "Accelerating research through automated hypothesis generation, complex simulations, and neural pattern recognition."
            }
          ].map((item, i) => (
            <m.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group h-[720px] text-left"
            >
              <div className="absolute inset-0 bg-[#142433]/50 backdrop-blur-3xl rounded-[60px] border border-white/10 shadow-2xl transition-all duration-700 group-hover:bg-[#142433]/70 group-hover:border-[#A7DADB]/30" />
              <div className="absolute inset-4 border border-white/5 rounded-[45px] pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(167, 218, 219, .5) 25%, rgba(167, 218, 219, .5) 26%, transparent 27%, transparent 74%, rgba(167, 218, 219, .5) 75%, rgba(167, 218, 219, .5) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(167, 218, 219, .5) 25%, rgba(167, 218, 219, .5) 26%, transparent 27%, transparent 74%, rgba(167, 218, 219, .5) 75%, rgba(167, 218, 219, .5) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }} />
              </div>
              <div className="relative h-full p-16 flex flex-col justify-between text-left">
                <div className="space-y-10 w-full text-center">
                  <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#A7DADB]/20 blur-3xl rounded-full scale-150 animate-pulse" />
                    <div className="relative z-10 p-8 bg-[#020C1B] rounded-[35px] border border-white/10 shadow-2xl group-hover:scale-110 transition-transform duration-700">
                      <item.icon size={60} className="text-[#A7DADB]" />
                    </div>
                  </div>
                  <div className="space-y-3 text-center text-center">
                    <h3 className="text-3xl font-display font-bold text-white uppercase tracking-[0.4em] text-center">{item.stream}</h3>
                  </div>
                </div>
                <div className="space-y-8 text-left text-left">
                  <h4 className="text-3xl font-serif italic text-[#A7DADB] leading-tight tracking-tight text-left uppercase opacity-90 whitespace-nowrap">
                    {item.impact}
                  </h4>
                  <p className="text-4xl text-[#b0c5c6] font-body font-light leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-700 text-left">
                    {item.detail}
                  </p>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    ),
    notes: "Subject mastery is the ultimate goal. By embedding AI into the DNA of each stream, we ensure students are not just using tools, but architecting solutions for their specific industries."
  },
  {
    id: 15,
    tag: "The Differentiator",
    title: "Us vs. The Status Quo",
    content: (
      <div className="h-full flex flex-col justify-center relative px-12 py-8 text-left">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#A7DADB]/10 blur-[120px] rounded-full text-left" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#A7DADB]/10 blur-[120px] rounded-full text-left text-left" />
        <div className="relative grid grid-cols-2 gap-20 w-full h-full items-center text-left text-left text-left">
          <div className="absolute left-1/2 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-[#A7DADB]/20 to-transparent z-10 text-left text-left">
            <m.div 
              animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute w-[3px] h-20 -left-[1px] bg-[#A7DADB] shadow-[0_0_15px_#A7DADB] text-left text-left"
            />
          </div>
          <div className="space-y-16 text-left">
            <div className="space-y-4 text-left">
              <h3 className="font-display text-5xl uppercase tracking-[0.4em] text-[#b0c5c6]/40 text-left text-left">Status Quo</h3>
              <p className="font-serif italic text-3xl text-[#b0c5c6]/30 text-left text-left">"The Legacy Approach"</p>
            </div>
            <div className="space-y-12 text-left text-left">
              {[
                { icon: <Clock size={40} />, label: "One-time weekend workshop" },
                { icon: <Wrench size={40} />, label: "Generic AI tools training" },
                { icon: <BookOpen size={40} />, label: "Theoretical learning" },
                { icon: <EyeOff size={40} />, label: "No tracking or analytics" },
              ].map((item, idx) => (
                <m.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 0.4, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx} 
                  className="flex items-center gap-10 text-[#b0c5c6] grayscale text-left"
                >
                  <div className="p-5 rounded-2xl border border-white/5 bg-white/5 text-left text-left">
                    {item.icon}
                  </div>
                  <span className="text-4xl font-light font-body text-left leading-tight text-left">{item.label}</span>
                </m.div>
              ))}
            </div>
          </div>
          <div className="space-y-16 relative text-left pl-12 text-left text-left">
            <div className="space-y-4 text-left">
              <h3 className="font-display text-5xl uppercase tracking-[0.4em] text-[#A7DADB] font-bold text-left text-left text-left">The Pivot</h3>
              <p className="font-serif italic text-3xl text-white/60 text-left text-left text-left">"Our Approach @ Acharya"</p>
            </div>
            <div className="space-y-12 text-left">
              {[
                { icon: <Repeat size={40} />, label: "Continuous learning ecosystem", highlight: "Enduring Impact" },
                { icon: <Fingerprint size={40} />, label: "Role & subject-based implementation", highlight: "Custom Tailored" },
                { icon: <FlaskConical size={40} />, label: "Applied & embedded AI labs", highlight: "Directly Integrated" },
                { icon: <BarChart3 size={40} />, label: "Measurable, data-backed outcomes", highlight: "Guaranteed ROI" },
              ].map((item, idx) => (
                <m.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.1), type: "spring", stiffness: 100 }}
                  key={idx} 
                  className="group flex items-center gap-10 text-left"
                >
                  <div className="p-5 rounded-2xl border border-[#A7DADB]/30 bg-[#A7DADB]/20 text-[#A7DADB] shadow-[0_0_15px_rgba(167,218,219,0.1)] group-hover:shadow-[0_0_25px_rgba(167,218,219,0.2)] transition-all text-left">
                    {item.icon}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-4xl font-medium text-white font-body text-left leading-tight text-left">{item.label}</span>
                    <span className="text-xl font-display uppercase tracking-widest text-[#A7DADB]/60 text-left mt-1 text-left">{item.highlight}</span>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    notes: "Most vendors will try to sell you a one-off software license or a generic weekend workshop. We are offering a deeply integrated, measurable, role-based transformation."
  },
  {
    id: 16,
    tag: "The Roadmap",
    title: "Execution Phase: [Initialization]",
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
    overlayColor: "rgba(2, 12, 27, 0.96)",
    content: (
      <div className="relative h-full w-full flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-12 left-12 border-l border-t border-white/20 w-32 h-32" />
          <div className="absolute bottom-12 right-12 border-r border-b border-white/20 w-32 h-32" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[80%] bg-gradient-to-b from-transparent via-[#A7DADB]/30 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col gap-0 w-full">
          <m.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-12 group self-start max-w-4xl"
          >
            <div className="relative shrink-0">
              <span className="font-display text-[120px] text-[#A7DADB]/30 block select-none leading-none font-bold">01</span>
            </div>
            <div className="pt-0 space-y-3 flex-grow">
              <div className="flex items-center gap-6">
                <span className="font-mono text-xl text-[#A7DADB] font-bold tracking-[0.5em] uppercase">Phase 1 // Weeks 1-3</span>
                <div className="h-px flex-grow bg-white/10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-7xl font-bold text-white tracking-tighter">Deep Discovery</h3>
                <p className="font-serif italic text-[#A7DADB] text-3xl">Mapping Institutional DNA</p>
              </div>
              <p className="font-body font-light text-[#b0c5c6] text-4xl leading-tight max-w-3xl border-l-2 border-[#A7DADB]/40 pl-8">
                Full-spectrum infrastructure audit and subject-matter frontier identification across core streams.
              </p>
            </div>
          </m.div>
          <m.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row-reverse items-start gap-12 group self-end text-right max-w-4xl"
          >
            <div className="relative shrink-0">
              <span className="font-display text-[120px] text-[#A7DADB]/30 block select-none leading-none font-bold">02</span>
            </div>
            <div className="pt-0 space-y-3 flex-grow flex flex-col items-end">
              <div className="flex items-center gap-4 flex-row-reverse w-full">
                <span className="font-mono text-xl text-[#A7DADB] font-bold tracking-[0.5em] uppercase">Phase 2 // Weeks 4-11</span>
                <div className="h-px flex-grow bg-white/10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-7xl font-bold text-white tracking-tighter">The Vanguard</h3>
                <p className="font-serif italic text-[#A7DADB] text-3xl">Proof-of-Value Launch</p>
              </div>
              <p className="font-body font-light text-[#b0c5c6] text-4xl leading-tight max-w-3xl border-r-2 border-[#A7DADB]/40 pr-8 text-right">
                Deployment in 3 lead departments to establish ROI metrics and core adoption baselines.
              </p>
            </div>
          </m.div>
        </div>
      </div>
    ),
    notes: "Our execution begins with precision. Phase 1 is about discovery, mapping the institutional DNA. Phase 2 is the Vanguard—a controlled launch to prove value before we scale."
  },
  {
    id: 17,
    tag: "The Roadmap",
    title: "Execution Phase: [Dominance]",
    bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
    overlayColor: "rgba(2, 12, 27, 0.95)",
    content: (
      <div className="relative h-full w-full flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[80%] bg-gradient-to-b from-transparent via-[#A7DADB]/30 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col gap-0 w-full">
          <m.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-12 group self-start max-w-4xl"
          >
            <div className="relative shrink-0">
              <span className="font-display text-[120px] text-[#A7DADB]/20 block select-none leading-none font-bold">03</span>
            </div>
            <div className="pt-0 space-y-3 flex-grow">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xl text-[#A7DADB] font-bold tracking-[0.4em] uppercase">Phase 3 // Months 3-6</span>
                <div className="h-px flex-grow bg-white/10" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-7xl font-bold text-white tracking-tighter">Full Scale</h3>
                <p className="font-serif italic text-[#A7DADB] text-3xl">Institutional Integration</p>
              </div>
              <p className="font-body font-light text-[#b0c5c6] text-4xl leading-tight max-w-3xl border-l-2 border-[#A7DADB]/40 pl-8">
                Seamless expansion of successful AI frameworks across all institutional departments and administrative student services.
              </p>
            </div>
          </m.div>
          <m.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row-reverse items-start gap-12 group self-end text-right max-w-4xl"
          >
            <div className="relative shrink-0">
              <span className="font-display text-[120px] text-[#A7DADB]/20 block select-none leading-none font-bold">04</span>
            </div>
            <div className="pt-0 space-y-3 flex-grow flex flex-col items-end">
              <div className="flex items-center gap-4 flex-row-reverse w-full">
                <span className="font-mono text-xl text-[#A7DADB] font-bold tracking-[0.4em] uppercase">Phase 4 // Continuous</span>
                <div className="h-px flex-grow bg-white/10" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-7xl font-bold text-white tracking-tighter">Market Leader</h3>
                <p className="font-serif italic text-[#A7DADB] text-3xl">Defining the Standard</p>
              </div>
              <p className="font-body font-light text-[#b0c5c6] text-4xl leading-tight max-w-3xl border-r-2 border-[#A7DADB]/40 pr-8 text-right">
                Solidifying Acharya as the definitive AI-native institution, leading the era of Indian higher education prestige.
              </p>
            </div>
          </m.div>
        </div>
      </div>
    ),
    notes: "Scale is where the transformation becomes irreversible. Phase 3 expands our impact, and Phase 4 is where Acharya cements itself as the market leader in AI-driven education."
  },
  {
    id: 18,
    tag: "The Case",
    title: "The ROI Story",
    content: (
      <div className="grid grid-cols-2 gap-10 h-full py-4">
        <m.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative group overflow-hidden rounded-[70px] border border-white/10 bg-[#142433]/60 backdrop-blur-3xl shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale brightness-[0.4] group-hover:scale-110 transition-transform duration-[5s]"
            alt="Growth Metrics"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#A7DADB]/20 via-transparent to-transparent z-10" />
          <div className="relative z-20 p-16 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-px w-20 bg-[#A7DADB] shadow-[0_0_15px_#A7DADB]" />
                <h3 className="text-7xl font-display font-bold text-white uppercase tracking-tighter">Tangible</h3>
              </div>
              <p className="text-lg text-[#A7DADB] font-serif italic opacity-80">Direct Fiscal & Operational Impact</p>
            </div>
            <div className="space-y-12">
              {[ 
                { icon: TrendingUp, text: "Admission Growth", sub: "Quantifiable yield increases" }, 
                { icon: Briefcase, text: "Placement Premium", sub: "Higher tier recruitment" }, 
                { icon: Zap, text: "Admin Velocity", sub: "Operational overhead reduction" } 
              ].map((item, i) => (
                <m.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.15) }}
                  className="flex gap-10 items-center group/item"
                >
                  <div className="p-6 bg-[#A7DADB]/10 rounded-3xl border border-[#A7DADB]/30 text-[#A7DADB] group-hover/item:bg-[#A7DADB] group-hover/item:text-[#020C1B] transition-all duration-500 shadow-xl">
                    <item.icon size={44} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-lg text-white font-display font-bold uppercase tracking-tight block group-hover/item:translate-x-2 transition-transform duration-500">{item.text}</span>
                    <span className="text-sm text-[#b0c5c6] font-body font-light block opacity-70">{item.sub}</span>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </m.div>
        <m.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative group overflow-hidden rounded-[70px] border border-white/10 bg-[#142433]/60 backdrop-blur-3xl shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1200" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale brightness-[0.4] group-hover:scale-110 transition-transform duration-[5s]"
            alt="Institutional Prestige"
          />
          <div className="absolute inset-0 bg-gradient-to-bl from-[#A7DADB]/20 via-transparent to-transparent z-10" />
          <div className="relative z-20 p-16 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-px w-20 bg-[#A7DADB] shadow-[0_0_15px_#A7DADB]" />
                <h3 className="text-7xl font-display font-bold text-white uppercase tracking-tighter">Intangible</h3>
              </div>
              <p className="text-lg text-[#A7DADB] font-serif italic opacity-80">Strategic Positioning & Legacy</p>
            </div>
            <div className="space-y-12">
              {[ 
                { icon: Shield, text: "Market Leadership", sub: "Defining regional excellence" }, 
                { icon: Globe, text: "Academic Legacy", sub: "Future-proof institutional brand" }, 
                { icon: Sparkles, text: "Digital Frontier", sub: "Technological prestige" } 
              ].map((item, i) => (
                <m.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (i * 0.15) }}
                  className="flex gap-10 items-center group/item"
                >
                  <div className="p-6 bg-[#A7DADB]/10 rounded-3xl border border-[#A7DADB]/30 text-[#A7DADB] group-hover/item:bg-[#A7DADB] group-hover/item:text-[#020C1B] transition-all duration-500 shadow-xl">
                    <item.icon size={44} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-lg text-white font-display font-bold uppercase tracking-tight block group-hover/item:translate-x-2 transition-transform duration-500">{item.text}</span>
                    <span className="text-sm text-[#b0c5c6] font-body font-light block opacity-70">{item.sub}</span>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </m.div>
      </div>
    ),
    notes: "Let's talk ROI. This is not an IT expense. This is an investment into enrollment growth. Being an AI-first campus becomes your strongest admissions marketing tool."
  },
  {
    id: 19,
    tag: "Decision",
    title: "Lead or Adapt.",
    content: (
      <div className="relative w-full h-full bg-[#020C1B] overflow-hidden flex items-center justify-center p-20">
        <div className="grid grid-cols-2 gap-16 w-full max-w-[1400px] h-[560px] relative z-10">
          <m.div
            initial={{ scale: 1.15, opacity: 0, filter: "brightness(2) blur(10px)" }}
            whileInView={{ scale: 1, opacity: 1, filter: "brightness(1) blur(0px)" }}
            transition={{ type: "spring", damping: 15, stiffness: 80, delay: 0.8 }}
            className="relative group flex flex-col justify-between p-6 overflow-hidden bg-[#142433]/40 backdrop-blur-2xl border-2 border-[#A7DADB] shadow-[0_0_50px_rgba(167,218,219,0.2)] rounded-[40px]"
          >
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-[#020C1B] via-transparent to-[#020C1B] z-10" />
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
                alt="AI Laboratory"
              />
            </div>
            <div className="relative z-10 flex justify-between items-start font-mono text-[10px] tracking-[0.3em] text-[#A7DADB]">
              <div className="flex gap-4 items-center">
                <Target className="w-4 h-4" />
                <span>STRATEGIC_DOMINANCE_INITIATED</span>
              </div>
              <div className="text-right">
                <div>[ COORDINATES: 12.97 / 77.59 ]</div>
                <div>SEC_ALPHA // PROTOCOL_01</div>
              </div>
            </div>
            <div className="relative z-10">
              <m.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="font-body italic text-[#A7DADB]/80 text-5xl mb-4 block"
              >
                One Led.
              </m.span>
              <h2 className="text-7xl font-display font-bold text-white leading-none tracking-tighter uppercase">
                Became <br />
                <span className="text-[#A7DADB]">AI-First.</span>
              </h2>
            </div>
            <div className="relative z-10 flex justify-between items-end">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(i => (
                  <m.div 
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                    className="w-1 h-8 bg-[#A7DADB]/30"
                  />
                ))}
              </div>
              <div className="font-mono text-[10px] text-[#A7DADB]/50 text-right">
                <p>INSTITUTIONAL_CORE_UPGRADE: 100%</p>
                <p>ECOSYSTEM_STATUS: EVOLVED</p>
              </div>
            </div>
          </m.div>
          <m.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 2.0, ease: "easeOut" }}
            className="relative flex flex-col justify-between p-6 overflow-hidden bg-black/40 backdrop-blur-xl border border-white/20 rounded-[40px] grayscale"
          >
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black/60 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
                alt="Traditional Classroom"
              />
            </div>
            <div className="relative z-10 flex justify-between items-start font-mono text-[10px] tracking-[0.3em] text-white">
              <div className="flex gap-4 items-center">
                <Activity className="w-4 h-4" />
                <span>LEGACY_MAINTENANCE_MODE</span>
              </div>
              <div className="text-right">
                <div>[ SYSTEM_LOAD: STATIC ]</div>
                <div>SEC_BETA // TRADITION_V3</div>
              </div>
            </div>
            <div className="relative z-10">
              <span className="font-body italic text-white text-5xl mb-4 block">
                One Adapted.
              </span>
              <h2 className="text-7xl font-display font-medium text-white leading-none tracking-tighter uppercase">
                Added AI <br />
                <span>Courses.</span>
              </h2>
            </div>
            <div className="relative z-10 flex justify-between items-end">
              <div className="flex gap-1">
                <div className="w-12 h-1 bg-white" />
                <div className="w-4 h-1 bg-white" />
              </div>
            </div>
          </m.div>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/5 -translate-x-1/2" />
        </div>
      </div>
    ),
    notes: "Three years from now, there will be two types of colleges in India. Those who bought a few AI courses, and those who became AI-first ecosystems. One adapted. The other led."
  },
  {
    id: 20,
    tag: "Final",
    title: "Shape the Future.",
    hideTitle: true,
    fullBleed: true,
    bgImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2000",
    content: (
      <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center select-none">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 backdrop-blur-md bg-[#020C1B]/40" />
          <div className="absolute top-[-10%] left-[-10%] w-[1200px] h-[1200px] rounded-full bg-[#A7DADB]/15 blur-[200px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] rounded-full bg-[#A7DADB]/10 blur-[180px]" />
        </div>
        <m.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, staggerChildren: 0.2 }}
          className="relative z-10 w-full max-w-lg flex flex-col items-center text-center"
        >
          <m.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-14 group"
          >
            <m.div 
              animate={{ 
                scale: [1, 1.15, 1], 
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ 
                duration: 5, repeat: Infinity, ease: "easeInOut" 
              }}
              className="absolute inset-[-40px] bg-gradient-to-tr from-[#A7DADB] to-[#A7DADB] rounded-full blur-[100px]" 
            />
            <div className="relative flex items-center justify-center gap-16 transition-all duration-1000 group-hover:scale-105">
              <img src="/ait-logo.png" alt="AIT" className="h-48 w-auto relative z-10 drop-shadow-[0_0_40px_rgba(167,218,219,0.4)]" />
              <div className="h-32 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
              <img src="/logo.png" alt="Smartslate" className="h-40 w-auto relative z-10 drop-shadow-[0_0_40px_rgba(79,70,229,0.4)]" />
            </div>
          </m.div>
          <m.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="relative inline-block">
              <h1 className="font-display font-bold text-[160px] leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-[#A7DADB] to-white/60">
                Will you lead the era?
              </h1>
            </div>
          </m.div>
        </m.div>
        <m.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-12 right-12 flex justify-between items-end border-t border-white/10 pt-8"
        >
          <div className="flex gap-20">
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[10px] text-[#b0c5c6]/40 uppercase tracking-[0.4em] font-display">Institutional readiness</span>
              <span className="text-[#A7DADB] font-mono text-2xl tracking-widest">[CRITICAL_PATH_SUCCESS]</span>
            </div>
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[10px] text-[#b0c5c6]/40 uppercase tracking-[0.4em] font-display">Strategic deployment</span>
              <span className="text-white font-mono text-2xl tracking-widest">AIT_COGNITIVE_V1.0</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-[#b0c5c6]/40 text-[10px] tracking-[0.5em] uppercase font-mono">
            <Globe className="w-4 h-4 opacity-40 animate-spin-slow" />
            <span>Academic Excellence // 2026</span>
          </div>
        </m.div>
      </div>
    ),
    notes: "The only question left is: will we shape this future, or just react to it when it's too late?"
  },
  {
    id: 21,
    tag: "Finale",
    title: "Q&A",
    bgImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2000",
    content: (
      <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-[#020C1B]/60 backdrop-blur-3xl z-0" />
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#A7DADB 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center gap-16"
        >
          <div className="space-y-6">
            <m.div
              initial={{ width: 0 }}
              whileInView={{ width: '120px' }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-1.5 bg-[#A7DADB] mx-auto rounded-full"
            />
            <h1 className="text-[180px] font-display font-black text-white tracking-tighter leading-none uppercase">
              Questions<span className="text-[#A7DADB]">?</span>
            </h1>
            <p className="text-4xl text-[#b0c5c6] font-display font-light uppercase tracking-[0.5em] opacity-60">
              Session <span className="text-white font-bold">Open</span> // Uplink Stable
            </p>
          </div>
          <div className="grid grid-cols-3 gap-12 mt-8">
            {[
              { icon: MessageSquare, label: "Interactive Dialogue" },
              { icon: Cpu, label: "Technical Scoping" },
              { icon: Building2, label: "Phase One Planning" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-6 group">
                <div className="p-8 rounded-[35px] bg-[#142433] border border-white/10 group-hover:border-[#A7DADB]/40 transition-all duration-700 shadow-xl transform group-hover:-translate-y-2">
                  <item.icon size={44} className="text-[#A7DADB]" />
                </div>
                <span className="text-xl font-mono text-white/30 uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>
        </m.div>
        <div className="absolute bottom-12 flex items-center gap-10 opacity-30">
          <span className="text-sm font-mono tracking-widest uppercase text-white/40">Ready to Architect</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#A7DADB] animate-pulse" />
          <span className="text-sm font-mono tracking-widest uppercase text-white/40">AIT_COGNITIVE_V1.0</span>
        </div>
      </div>
    ),
    notes: "Transition to Q&A. This slide provides a stable, professional backdrop for discussion. Be ready to pivot to specific technical or strategic questions."
  }
];
